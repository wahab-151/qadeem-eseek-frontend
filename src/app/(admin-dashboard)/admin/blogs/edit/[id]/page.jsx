'use client';
import { Fragment, useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Paper,
  Grid,
  Alert,
  CircularProgress,
  Switch,
  FormControlLabel,
  Divider
} from "@mui/material";
import { Save as SaveIcon, ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { useRouter, useParams } from "next/navigation";
import FlexBox from "components/flex-box/flex-box";
import DropZone from "components/DropZone";
import TagsInput from "components/tagsinput";
import CategoriesInput from "components/categoriesinput";
import { ImageGallery } from "components/image-gallery";
import ImageDeleteDialog from "components/ImageDeleteDialog";
import { FormProvider, useForm } from "react-hook-form";
import { 
  useGetMegaMenuCategoriesQuery,
  useGetAllTagsQuery,
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
  useUploadImageMutation,
  useDeleteImageMutation,
  useDeleteImageCompletelyMutation
} from "app/store/services";
import { v4 as uuidv4 } from "uuid";
import { addWatermark, compressImage } from "utils/helpers";
import { getFileType, uploadToS3 } from "utils/s3Helper";
import { useSnackbar } from "notistack";

export default function EditBlogPage() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    status: 'draft',
    categories: [],
    tags: [],
    metaTitle: '',
    metaDescription: '',
    isFeatured: false,
    displayOrder: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [imageProcessing, setImageProcessing] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [galleryRefreshTrigger, setGalleryRefreshTrigger] = useState(0);
  const [files, setFiles] = useState([]);

  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({
    defaultValues: {
      tags: [],
      categories: []
    }
  });

  // RTK Query hooks
  const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError } = useGetMegaMenuCategoriesQuery();
  const { data: tagsData, isLoading: tagsLoading } = useGetAllTagsQuery();
  const { data: blogData, isLoading: blogLoading, error: blogError } = useGetBlogByIdQuery(id, {
    skip: !id
  });
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
  
  const [
    uploadImageHandle,
    { isLoading: uploadingImage, error: uploadingImageError },
  ] = useUploadImageMutation();

  const [
    deleteImageHandle,
    { isLoading: deletingImage, error: deletingImageError },
  ] = useDeleteImageMutation();

  const [
    deleteImageCompletelyHandle,
    { isLoading: deletingImageCompletely, error: deletingImageCompletelyError },
  ] = useDeleteImageCompletelyMutation();

  // Get categories and tags from RTK Query
  const [categories, setCategories] = useState([]);
  const tags = tagsData?.data || [];

  // Set categories like in product form
  useEffect(() => {
    if (!categoriesLoading && categoriesData?.success) {
      const all = categoriesData?.data;
      const filtered = all.filter((cat) => cat.level === 1 || cat.level === 2);
      setCategories(filtered);
      setCategories(all);
    }
    if (categoriesError) {
      console.error("Error fetching categories:", categoriesError);
    }
  }, [categoriesData?.data, categoriesLoading, categoriesError]);

  // Update form data when blog data is loaded
  useEffect(() => {
    if (blogData?.success && blogData.data.blog) {
      const blog = blogData.data.blog;
      console.log('Blog data received:', blog);
      console.log('Categories:', blog.categories);
      console.log('Category (old):', blog.category);
      console.log('Tags:', blog.tags);
      const formValues = {
        title: blog.title || '',
        content: blog.content || '',
        excerpt: blog.excerpt || '',
        featuredImage: blog.featuredImage || '',
        status: blog.status || 'draft',
        categories: blog.categories?.map(cat => ({ name: cat })) || 
                   (blog.category ? [{ name: blog.category }] : []),
        tags: blog.tags || [],
        metaTitle: blog.metaTitle || '',
        metaDescription: blog.metaDescription || '',
        isFeatured: blog.isFeatured || false,
        displayOrder: blog.displayOrder || 0
      };
      
      setFormData(formValues);
      
      // Also set the form values using react-hook-form methods
      methods.reset(formValues);
      
      console.log('Form data set:', {
        categories: formValues.categories,
        tags: formValues.tags
      });
      
      // Check form values after reset
      setTimeout(() => {
        const currentValues = methods.getValues();
        console.log('Form values after reset:', {
          categories: currentValues.categories,
          tags: currentValues.tags
        });
      }, 100);
      
      // Set files for existing images
      if (blog.featuredImage) {
        setFiles([{ name: blog.featuredImage.split("/").pop(), preview: blog.featuredImage }]);
      }
    }
  }, [blogData, methods]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Check if image filename already exists in database
  const checkDuplicateImage = async (filename) => {
    try {
      // For now, we'll skip duplicate check for blogs
      return false;
    } catch (error) {
      console.error('Error checking for duplicate images:', error);
      return false;
    }
  };

  const handleChangeDropZone = async (files) => {
    setImageProcessing(true);
    for (const file of files) {
      if (!file) {
        enqueueSnackbar("No file selected.", { variant: "error" });
        continue;
      }
      if (file.size > 20 * 1024 * 1024) {
        enqueueSnackbar(`${file.name} exceeds the maximum size of 20 MB.`, {
          variant: "error",
        });
        continue;
      }
      
      const isDuplicate = await checkDuplicateImage(file.name);
      if (isDuplicate) {
        enqueueSnackbar(`Image "${file.name}" already exists. Please choose a different image or use the gallery to select the existing one.`, {
          variant: "warning",
        });
        continue;
      }
      
      try {
        const uniqueId = uuidv4();
        const compressedFile = await compressImage(file);
        const watermarkedImageUrl = await addWatermark(compressedFile, "");
        const response = await fetch(watermarkedImageUrl);
        const blob = await response.blob();
        
        const blogTitle = formData.title || 'blog';
        const categoryName = formData.categories?.[0]?.name || 'general';
        
        const cleanBlogTitle = blogTitle.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
        const cleanCategoryName = categoryName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
        const descriptiveFileName = `blog-${cleanBlogTitle}-${cleanCategoryName}-${uniqueId}-${file.name}`;
        
        const s3data = await uploadImageHandle({
          fileName: descriptiveFileName,
          fileType: file.type,
          imageType: 'blog',
        }).unwrap();
        const uploadedUrl = await uploadToS3({
          url: s3data.url,
          blob,
          fileType: file.type,
        });
        if (uploadedUrl) {
          const finalImageUrl = uploadedUrl.split("?")[0];
          setFiles((prevFiles) => [
            ...prevFiles,
            { name: file.name, preview: finalImageUrl },
          ]);
          enqueueSnackbar("Image uploaded Successfully!", {
            variant: "success",
          });
          setFormData(prev => ({
            ...prev,
            featuredImage: finalImageUrl
          }));
        } else {
          enqueueSnackbar("Image upload failed!", { variant: "error" });
        }
      } catch (error) {
        enqueueSnackbar("Image upload failed!", { variant: "error" });
        console.error(`Image upload failed for: ${file.name}`, error);
      }
    }
    setImageProcessing(false);
  };

  const handleFileDelete = (fileToDelete) => () => {
    setImageToDelete(fileToDelete);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async (deleteType) => {
    if (!imageToDelete) return;

    setImageProcessing(true);
    setDeleteDialogOpen(false);

    try {
      if (deleteType === "s3") {
        const fileDetails = getFileType(imageToDelete);
        const result = await deleteImageCompletelyHandle({
          fileName: fileDetails.fileName,
          fileType: fileDetails.fileType,
          imageUrl: imageToDelete.preview,
        });
        
        const { deletedFromProducts, deletedFromCategories, totalAffected } = result.data;
        enqueueSnackbar(
          `Image deleted from S3 and ${totalAffected} blogs/categories!`, 
          { variant: "success" }
        );
        
        setGalleryRefreshTrigger(prev => prev + 1);
      } else {
        enqueueSnackbar("Image removed from blog!", { variant: "success" });
      }

      setFiles((prevFiles) =>
        prevFiles.filter(
          (file) =>
            file.name !== imageToDelete.name ||
            file.preview !== imageToDelete.preview
        )
      );

      if (formData.featuredImage === imageToDelete.preview) {
        setFormData(prev => ({
          ...prev,
          featuredImage: ''
        }));
      }

    } catch (err) {
      enqueueSnackbar("Error while deleting the image!", { variant: "error" });
      console.error("Image delete failed", err);
    } finally {
      setImageProcessing(false);
      setImageToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setImageToDelete(null);
  };

  const handleGalleryImageSelect = (imageUrl) => {
    const newFile = { name: imageUrl.split("/").pop(), preview: imageUrl };
    setFiles((prevFiles) => [...prevFiles, newFile]);
    setFormData(prev => ({
      ...prev,
      featuredImage: imageUrl
    }));
    setGalleryOpen(false);
    enqueueSnackbar("Image selected from gallery!", { variant: "success" });
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!formData.content.trim()) {
      setError('Content is required');
      return;
    }

    setError(null);

    try {
      // Get form values from react-hook-form
      const formValues = methods.getValues();
      const payload = {
        ...formData,
        categories: formValues.categories?.map(cat => cat.name) || [],
        tags: formValues.tags || [],
        images: files
      };
      
      await updateBlog({ id, ...payload }).unwrap();
      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/blogs');
      }, 2000);
    } catch (error) {
      console.error('Error updating blog:', error);
      setError(error?.data?.message || 'Failed to update blog post');
    }
  };

  if (blogLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (blogError) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <Typography color="error">Error loading blog data</Typography>
      </Box>
    );
  }

  return (
    <Fragment>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <FlexBox alignItems="center" sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
            sx={{ mr: 2 }}
          >
            Back
          </Button>
          <Typography variant="h4" fontWeight={700}>
            Edit Blog Post
          </Typography>
        </FlexBox>

        {/* Success Alert */}
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Blog post updated successfully! Redirecting...
          </Alert>
        )}

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
            {/* Main Content */}
            <Grid item xs={12} lg={8}>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Content
                </Typography>
                
                {/* Title */}
                <TextField
                  fullWidth
                  label="Title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                  sx={{ mb: 3 }}
                />

                {/* Excerpt */}
                <TextField
                  fullWidth
                  label="Excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  multiline
                  rows={3}
                  placeholder="Brief description of the blog post..."
                  sx={{ mb: 3 }}
                />

                {/* Content Editor */}
                <TextField
                  fullWidth
                  label="Blog Content (HTML) *"
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  multiline
                  rows={12}
                  sx={{ mb: 3 }}
                  helperText="Enter HTML content for your blog post. You can use HTML tags like <p>, <h1>, <h2>, <strong>, <em>, <ul>, <li>, etc."
                  placeholder="<p>Write your blog post content here using HTML tags...</p>"
                />

                {/* Featured Image Upload */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight={500} sx={{ mb: 1 }}>
                    Featured Image
                  </Typography>
                  <DropZone
                    onChange={handleChangeDropZone}
                    processing={imageProcessing}
                    info="Upload featured image for your blog post"
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setGalleryOpen(true)}
                    sx={{ mt: 1 }}
                  >
                    Choose from Gallery
                  </Button>
                  
                  {/* Image Preview */}
                  <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                    {files.map((file, index) => (
                      <Box key={index} sx={{ position: 'relative' }}>
                        <Box
                          component="img"
                          src={file.preview}
                          alt="Image preview"
                          sx={{
                            width: 100,
                            height: 100,
                            objectFit: 'cover',
                            borderRadius: 1,
                            border: (theme) => `1px solid ${theme.palette.grey[300]}`,
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={handleFileDelete(file)}
                          sx={{ 
                            position: 'absolute', 
                            top: -8, 
                            right: -8, 
                            minWidth: 'auto',
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            p: 0
                          }}
                        >
                          ×
                        </Button>
                      </Box>
                    ))}
                  </FlexBox>
                </Box>
              </Paper>
            </Grid>

            {/* Sidebar */}
            <Grid item xs={12} lg={4}>
              {/* Publish Settings */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Publish Settings
                </Typography>
                
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    label="Status"
                  >
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="published">Published</MenuItem>
                    <MenuItem value="archived">Archived</MenuItem>
                  </Select>
                </FormControl>

                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isFeatured}
                      onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                    />
                  }
                  label="Featured Post"
                />
              </Paper>

              {/* Categories & Tags */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Categories & Tags
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight={500} sx={{ mb: 1 }}>
                    Categories
                  </Typography>
                  <CategoriesInput
                    name="categories"
                    label="Categories"
                    placeholder="Type a category and press Enter"
                    categories={categories}
                    loading={categoriesLoading}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight={500} sx={{ mb: 1 }}>
                    Tags
                  </Typography>
                  <TagsInput
                    name="tags"
                    label="Tags"
                    placeholder="Type a tag and press Enter"
                  />
                </Box>
              </Paper>

              {/* SEO Settings */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  SEO Settings
                </Typography>
                
                  <TextField
                    fullWidth
                    label="Meta Title"
                    value={formData.metaTitle}
                    onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                    sx={{ mb: 2 }}
                    helperText="Recommended: 50-120 characters"
                  />

                  <TextField
                    fullWidth
                    label="Meta Description"
                    value={formData.metaDescription}
                    onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                    multiline
                    rows={3}
                    helperText="Recommended: 150-300 characters"
                  />
              </Paper>

              {/* Display Order */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Display Settings
                </Typography>
                
                <TextField
                  fullWidth
                  label="Display Order"
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) => handleInputChange('displayOrder', parseInt(e.target.value) || 0)}
                  helperText="Lower numbers appear first"
                />
              </Paper>

              {/* Reading Time */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Content Analysis
                </Typography>
                
                <TextField
                  fullWidth
                  label="Estimated Reading Time"
                  value={formData.content ? Math.ceil(formData.content.split(/\s+/).length / 200) : 0}
                  InputProps={{
                    readOnly: true,
                  }}
                  helperText="Automatically calculated based on content (200 words per minute)"
                  sx={{
                    '& .MuiInputBase-input': {
                      color: 'primary.main',
                      fontWeight: 500
                    }
                  }}
                />
              </Paper>
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              startIcon={isUpdating ? <CircularProgress size={20} /> : <SaveIcon />}
              disabled={isUpdating}
              size="large"
            >
              {isUpdating ? 'Updating...' : 'Update Blog Post'}
            </Button>
          </Box>
        </form>
      </FormProvider>

      {/* Image Gallery Modal */}
      <ImageGallery
        open={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        onSelectImage={handleGalleryImageSelect}
        selectedImageUrl={formData.featuredImage}
        allowMultiSelectToggle={false}
        refreshTrigger={galleryRefreshTrigger}
      />

      {/* Image Delete Confirmation Dialog */}
      <ImageDeleteDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        imageName={imageToDelete?.name || "Image"}
        isProcessing={imageProcessing}
      />
    </Container>
    </Fragment>
  );
}
