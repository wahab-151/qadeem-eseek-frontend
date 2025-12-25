"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  FormControlLabel,
  Switch,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { ArrowBack, Save, CloudUpload, Delete, AddPhotoAlternate } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useAddTagMutation, useUploadImageMutation } from "app/store/services";
import DropZone from "components/DropZone";
import { ImageGallery } from "components/image-gallery";
import { v4 as uuidv4 } from "uuid";
import { addWatermark, compressImage } from "utils/helpers";
import { uploadToS3 } from "utils/s3Helper";

export default function CreateTagPage() {
  const [name, setName] = useState("");
  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageProcessing, setImageProcessing] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [addTag, { isLoading: loading }] = useAddTagMutation();
  const [uploadImageHandle, { isLoading: uploadingImage }] = useUploadImageMutation();

  const handleImageUpload = async (files) => {
    if (files.length === 0) return;
    
    const file = files[0];
    if (!file) {
      enqueueSnackbar("No file selected.", { variant: "error" });
      return;
    }
    
    if (file.size > 20 * 1024 * 1024) {
      enqueueSnackbar(`${file.name} exceeds the maximum size of 20 MB.`, {
        variant: "error",
      });
      return;
    }
    
    setImageProcessing(true);
    
    try {
      const uniqueId = uuidv4();
      const compressedFile = await compressImage(file);
      const watermarkedImageUrl = await addWatermark(compressedFile, "");
      const response = await fetch(watermarkedImageUrl);
      const blob = await response.blob();
      
      // Get tag name for filename
      const tagName = name || 'tag';
      const cleanTagName = tagName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
      const descriptiveFileName = `tag-${cleanTagName}-${uniqueId}-${file.name}`;
      
      const s3data = await uploadImageHandle({
        fileName: descriptiveFileName,
        fileType: file.type,
        imageType: 'tag',
      }).unwrap();
      
      const uploadedUrl = await uploadToS3({
        url: s3data.url,
        blob,
        fileType: file.type,
      });
      
      if (uploadedUrl) {
        const finalImageUrl = uploadedUrl.split("?")[0];
        setImage(finalImageUrl);
        setImagePreview(finalImageUrl);
        setFiles([{ name: file.name, preview: finalImageUrl }]);
        enqueueSnackbar("Image uploaded successfully", { variant: "success" });
      } else {
        enqueueSnackbar("Image upload failed!", { variant: "error" });
      }
    } catch (error) {
      console.error("Upload error:", error);
      enqueueSnackbar("Failed to upload image", { variant: "error" });
    } finally {
      setImageProcessing(false);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    setFiles([]);
  };

  // Handle image gallery selection
  const handleGalleryImageSelect = (imageUrl) => {
    setImage(imageUrl);
    setImagePreview(imageUrl);
    setFiles([{ name: imageUrl.split("/").pop(), preview: imageUrl }]);
    setGalleryOpen(false);
    enqueueSnackbar("Image selected from gallery!", { variant: "success" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError("Tag name is required");
      return;
    }

    try {
      setError("");
      
      const result = await addTag({ 
        name: name.trim(), 
        featured,
        image: image || null
      }).unwrap();

      if (result?.success) {
        enqueueSnackbar("Tag created successfully", { variant: "success" });
        // After navigating back, ensure table refetches
        router.push("/admin/tags");
      } else {
        throw new Error(result?.message || "Failed to create tag");
      }
    } catch (error) {
      console.error("Error creating tag:", error);
      const errorMessage = error?.data?.message || error?.message || "Failed to create tag";
      setError(errorMessage);
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => router.back()}
          variant="outlined"
        >
          Back
        </Button>
        <Typography variant="h4">Create New Tag</Typography>
      </Box>

      <Card sx={{ maxWidth: 600 }}>
        <Box p={3}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Tag Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              margin="normal"
              required
              disabled={loading}
              helperText="Enter a unique tag name"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  disabled={loading}
                  color="primary"
                />
              }
              label="Featured Tag"
              sx={{ mt: 2 }}
            />

            {/* Image Upload Section */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" fontWeight={500} sx={{ mb: 1 }}>
                Tag Icon/Image (Optional)
              </Typography>
              
              <DropZone
                onChange={handleImageUpload}
                processing={imageProcessing}
                info="Upload tag icon/image"
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
              <Box display="flex" flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                {files.map((file, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: "relative",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 1,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      component="img"
                      src={file.preview}
                      alt={file.name}
                      sx={{
                        width: 80,
                        height: 80,
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={handleRemoveImage}
                      sx={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        backgroundColor: "error.main",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "error.dark",
                        },
                        width: 24,
                        height: 24,
                      }}
                    >
                      <Delete sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Box>
                ))}
              </Box>
              
              {imageProcessing && (
                <Box display="flex" alignItems="center" gap={1} mt={1}>
                  <CircularProgress size={16} />
                  <Typography variant="body2" color="text.secondary">
                    Processing image...
                  </Typography>
                </Box>
              )}
            </Box>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Box display="flex" gap={2} mt={3}>
              <Button
                type="submit"
                variant="contained"
                startIcon={loading ? <CircularProgress size={20} /> : <Save />}
                disabled={loading || !name.trim()}
              >
                {loading ? "Creating..." : "Create Tag"}
              </Button>
              <Button
                variant="outlined"
                onClick={() => router.push("/admin/tags")}
                disabled={loading}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
          </Card>

          {/* Image Gallery Dialog */}
          <ImageGallery
            open={galleryOpen}
            onClose={() => setGalleryOpen(false)}
            onSelectImage={handleGalleryImageSelect}
            selectedImageUrl={image}
            imageType="tag"
            allowMultiSelectToggle={false}
          />
        </Box>
      );
    }
