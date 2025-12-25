"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Box,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  IconButton,
  CircularProgress,
  TextField,
  InputAdornment,
  Pagination,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Close as CloseIcon,
  Check as CheckIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";
import Image from "next/image";
import { logoUrl } from "utils/constants";

const ImageGallery = ({ 
  open, 
  onClose, 
  onSelectImage, 
  selectedImageUrl = null, 
  multiSelect = false,
  onSelectMultipleImages,
  selectedImageUrls = [],
  imageType = 'all', // 'all', 'product', 'category'
  allowMultiSelectToggle = true, // Allow toggling between single and multi-select
  refreshTrigger = 0 // External trigger to refresh images
}) => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(selectedImageUrl);
  const [selectedImages, setSelectedImages] = useState(selectedImageUrls || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [imageErrors, setImageErrors] = useState(new Set());
  const retryCountsRef = useRef(new Map());
  const getSafeUrl = useCallback((url) => {
    if (!url) return url;
    // Fix double-encoded spaces coming from API (e.g., %2520 -> %20)
    if (url.includes('%2520')) return url.replaceAll('%2520', '%20');
    return url;
  }, []);
  const [filterType, setFilterType] = useState('all');
  const [searchCategory, setSearchCategory] = useState('all'); // 'all', 'filename', 'product', 'category', 'tag'
  const [isMultiSelect, setIsMultiSelect] = useState(multiSelect);
  const fetchingRef = useRef(false);
  
  const { enqueueSnackbar } = useSnackbar();
  const imagesPerPage = 20;

  // Fetch images from multiple sources
  const fetchImages = useCallback(async () => {
    if (fetchingRef.current) return; // Prevent multiple simultaneous calls
    
    fetchingRef.current = true;
    setLoading(true);
    try {
      const allImages = [];
      
      // Get the API base URL from environment or use default
      const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL || 'https://server.sifraatl.com';

      // 1. Fetch product images
      try {
        const productResponse = await fetch(`${API_BASE_URL}/api/products?limit=1000`);
        if (productResponse.ok) {
          const productData = await productResponse.json();
          const productImages = (productData.data?.products || productData.products || [])
            ?.flatMap(product => {
              // Handle both single image and images array
              const images = product.images || (product.image ? [{ preview: product.image }] : []);
              
              return images.map((image, index) => {
                const imageUrl = image.preview || image.url || image;
                const fileName = imageUrl?.split('/').pop() || `product-${index}`;
                
                // Parse metadata from filename if it follows the new format
                let parsedProductName = product.name;
                let parsedCategoryName = product.category?.name || 'Unknown Category';
                
                if (fileName.startsWith('product-')) {
                  const parts = fileName.split('-');
                  if (parts.length >= 4) {
                    // Format: product-{productName}-{categoryName}-{uuid}-{originalName}
                    parsedProductName = parts[1]?.replace(/-/g, ' ') || product.name;
                    parsedCategoryName = parts[2]?.replace(/-/g, ' ') || product.category?.name || 'Unknown Category';
                  }
                }
                
                return {
                  id: `product-${product._id}-${index}`,
                  url: imageUrl,
                  fileName: fileName,
                  type: 'product',
                  isExisting: true,
                  productName: parsedProductName,
                  categoryName: parsedCategoryName,
                  searchText: `${parsedProductName || ''} ${parsedCategoryName || ''} ${fileName || ''}`.toLowerCase()
                };
              });
            })
            .filter(img => img.url && img.url.trim() !== '') || [];
          allImages.push(...productImages);
        }
      } catch (error) {
        console.error('Error fetching product images:', error);
      }

      // 2. Fetch category images
      try {
        const categoryResponse = await fetch(`${API_BASE_URL}/api/categories`);
        if (categoryResponse.ok) {
          const categoryData = await categoryResponse.json();
          const categoryImages = (categoryData.data || categoryData || [])
            ?.map(category => {
              const fileName = category.image?.split('/').pop() || 'unknown';
              // Parse metadata from filename if it follows the new format
              let parsedCategoryName = category.name;
              
              if (fileName.startsWith('category-')) {
                const parts = fileName.split('-');
                if (parts.length >= 3) {
                  // Format: category-{categoryName}-{uuid}-{originalName}
                  parsedCategoryName = parts[1]?.replace(/-/g, ' ') || category.name;
                }
              }
              
              return {
                id: `category-${category._id}`,
                url: category.image,
                fileName: fileName,
                type: 'category',
                isExisting: true,
                categoryName: parsedCategoryName,
                productName: null,
                searchText: `${parsedCategoryName || ''} ${fileName || ''}`.toLowerCase()
              };
            })
            .filter(img => img.url && img.url.trim() !== '') || [];
          allImages.push(...categoryImages);
        }
      } catch (error) {
        console.error('Error fetching category images:', error);
      }

      // 3. Fetch tag images
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('auth-token') : '';
        const role = typeof window !== 'undefined' ? localStorage.getItem('auth-user-role') : '';
        const tagResponse = await fetch(`${API_BASE_URL}/api/tags/admin`, {
          headers: {
            'x-access-token': token || '',
            'x-user-role': role || '',
          },
          credentials: 'include'
        });
        if (tagResponse.ok) {
          const tagData = await tagResponse.json();
          const tagImages = (tagData.data?.tags || tagData.tags || [])
            ?.map(tag => {
              const fileName = tag.image?.split('/').pop() || 'unknown';
              // Parse metadata from filename if it follows the new format
              let parsedTagName = tag.name;
              
              if (fileName.startsWith('tag-')) {
                const parts = fileName.split('-');
                if (parts.length >= 3) {
                  // Format: tag-{tagName}-{uuid}-{originalName}
                  parsedTagName = parts[1]?.replace(/-/g, ' ') || tag.name;
                }
              }
              
              return {
                id: `tag-${tag._id}`,
                url: tag.image,
                fileName: fileName,
                type: 'tag',
                isExisting: true,
                tagName: parsedTagName,
                productName: null,
                categoryName: null,
                searchText: `${parsedTagName || ''} ${fileName || ''}`.toLowerCase()
              };
            })
            .filter(img => img.url && img.url.trim() !== '') || [];
          allImages.push(...tagImages);
        }
      } catch (error) {
        console.error('Error fetching tag images:', error);
      }

      // 4. Add some sample S3 images for demonstration (in real implementation, fetch from S3)
      const sampleImages = [
        {
          id: 'sample-1',
          url: 'https://eseek.s3.us-east-2.amazonaws.com/eseek/1757533166464-4b4a8b71-d23a-46cc-b7f1-8d787d724229-We%2520Carry%2520wide%2520range%2520of%2520products...%2520%282%29.png',
          fileName: 'sample-product-1.png',
          type: 'product',
          isExisting: true,
          productName: 'Sample Product',
          categoryName: 'Electronics',
          searchText: 'sample product electronics sample-product-1.png'
        }
      ];
      
      // Only add sample images if no real images were found
      if (allImages.length === 0) {
        allImages.push(...sampleImages);
      }

      // Sort by type and then by name
      allImages.sort((a, b) => {
        if (a.type !== b.type) {
          return a.type.localeCompare(b.type);
        }
        return (a.productName || a.categoryName || '').localeCompare(b.productName || b.categoryName || '');
      });

      setImages(allImages);
      setFilteredImages(allImages);
      setTotalPages(Math.ceil(allImages.length / imagesPerPage));
    } catch (error) {
      console.error('Error fetching images:', error);
      enqueueSnackbar("Error loading images", { variant: "error" });
      setImages([]);
      setFilteredImages([]);
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  }, [enqueueSnackbar]);

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      setSelectedImage(selectedImageUrl);
      setSelectedImages(selectedImageUrls || []);
      setSearchTerm("");
      setCurrentPage(1);
      setImageErrors(new Set());
      setFilterType(imageType);
      setSearchCategory('all');
      setIsMultiSelect(multiSelect);
    }
  }, [open, imageType, multiSelect]); // Removed selectedImageUrl and selectedImageUrls from dependencies

  // Fetch images when dialog opens
  useEffect(() => {
    if (open) {
      fetchImages();
    }
  }, [open, fetchImages]);

  // Refresh images when refreshTrigger changes
  useEffect(() => {
    if (open && refreshTrigger > 0) {
      fetchImages();
    }
  }, [refreshTrigger, open, fetchImages]);

  // Filter images based on search term and filters
  useEffect(() => {
    let filtered = images;

    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(image => image.type === filterType);
    }

    // Apply search term filter
    if (searchTerm.trim() !== "") {
      if (searchCategory === 'all') {
        filtered = filtered.filter(image =>
          image.searchText.includes(searchTerm.toLowerCase())
        );
      } else if (searchCategory === 'filename') {
        filtered = filtered.filter(image =>
          image.fileName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else if (searchCategory === 'product') {
        filtered = filtered.filter(image =>
          image.productName && image.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else if (searchCategory === 'category') {
        filtered = filtered.filter(image =>
          image.categoryName && image.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else if (searchCategory === 'tag') {
        filtered = filtered.filter(image =>
          image.tagName && image.tagName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    }

    setFilteredImages(filtered);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filtered.length / imagesPerPage));
  }, [searchTerm, images, filterType, searchCategory, imagesPerPage]);

  // Get paginated images
  const getPaginatedImages = () => {
    const startIndex = (currentPage - 1) * imagesPerPage;
    const endIndex = startIndex + imagesPerPage;
    return filteredImages.slice(startIndex, endIndex);
  };

  const handleImageSelect = (image) => {
    if (isMultiSelect) {
      const isSelected = selectedImages.some(selected => selected.id === image.id);
      if (isSelected) {
        setSelectedImages(prev => prev.filter(selected => selected.id !== image.id));
      } else {
        setSelectedImages(prev => [...prev, image]);
      }
    } else {
      setSelectedImage(image.url);
    }
  };

  const handleConfirmSelection = () => {
    if (isMultiSelect) {
      if (selectedImages.length > 0) {
        onSelectMultipleImages(selectedImages);
        // Don't reset state when confirming selection
        onClose();
      } else {
        enqueueSnackbar("Please select at least one image", { variant: "warning" });
      }
    } else {
      if (selectedImage) {
        onSelectImage(selectedImage);
        // Don't reset state when confirming selection
        onClose();
      } else {
        enqueueSnackbar("Please select an image", { variant: "warning" });
      }
    }
  };

  const handleCancel = () => {
    setSearchTerm("");
    setSelectedImage(selectedImageUrl);
    setSelectedImages(selectedImageUrls || []);
    onClose();
  };

  const handleClose = () => {
    // This is called when clicking outside the dialog or pressing escape
    // Reset state to original values
    setSearchTerm("");
    setSelectedImage(selectedImageUrl);
    setSelectedImages(selectedImageUrls || []);
    onClose();
  };

  const handleImageLoad = (imageId) => {
    // Clear any previous error for this image on successful load
    if (imageErrors.has(imageId)) {
      setImageErrors(prev => {
        const next = new Set(prev);
        next.delete(imageId);
        return next;
      });
    }
    retryCountsRef.current.delete(imageId);
  };

  const handleImageError = (imageId, event) => {
    const currentCount = retryCountsRef.current.get(imageId) || 0;
    if (currentCount < 2 && event?.target) {
      // Retry with cache-busting query param to avoid transient/cached 403/404
      retryCountsRef.current.set(imageId, currentCount + 1);
      const imgEl = event.target;
      try {
        const cleanSrc = imgEl.src.split("?")[0];
        imgEl.src = `${cleanSrc}?retry=${Date.now()}`;
        return;
      } catch (_) {
        // fall through to marking as error
      }
    }
    setImageErrors(prev => new Set([...prev, imageId]));
  };

  const paginatedImages = getPaginatedImages();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: { height: "90vh" }
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6">
              {isMultiSelect ? 'Select Images from Gallery' : 'Select Image from Gallery'}
            </Typography>
            {isMultiSelect && selectedImages.length > 0 && (
              <Typography variant="body2" color="text.secondary">
                {selectedImages.length} image{selectedImages.length !== 1 ? 's' : ''} selected
              </Typography>
            )}
          </Box><Box>
          {allowMultiSelectToggle && (
            <Button
              variant={isMultiSelect ? "contained" : "outlined"}
              size="small"
              onClick={() => {
                setIsMultiSelect(!isMultiSelect);
                // Clear selections when switching modes
                setSelectedImage(selectedImageUrl);
                setSelectedImages([]);
              }}
              sx={{ ml: 2 }}
            >
              {isMultiSelect ? 'Allow only Single Select' : 'Allow Multi Select'}
            </Button>
          )}
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent dividers sx={{ overflow: 'auto' }}>
        {/* Search and Filter Controls */}
        <Box mb={2} display="flex" gap={2} alignItems="center" flexWrap="wrap">
          <TextField
            fullWidth
            placeholder="Search images by filename, product name, category name, or tag name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 300 }}
          />
          
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Search In</InputLabel>
            <Select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <FilterIcon />
                </InputAdornment>
              }
            >
              <MenuItem value="all">All Fields</MenuItem>
              <MenuItem value="filename">Filename Only</MenuItem>
              <MenuItem value="product">Product Name</MenuItem>
              <MenuItem value="category">Category Name</MenuItem>
              <MenuItem value="tag">Tag Name</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="product">Products</MenuItem>
              <MenuItem value="category">Categories</MenuItem>
              <MenuItem value="tag">Tags</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Loading State */}
        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center" py={4}>
            <CircularProgress />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
              Loading images...
            </Typography>
          </Box>
        )}

        {/* No Images State */}
        {!loading && filteredImages.length === 0 && (
          <Box display="flex" justifyContent="center" alignItems="center" py={4}>
            <Typography variant="body2" color="text.secondary">
            {searchTerm ? "No images found matching your search." : "No images available."}
            </Typography>
          </Box>
        )}

        {/* Images Grid */}
        {!loading && paginatedImages.length > 0 && (
          <>
            <Box mb={2}>
              <Typography variant="body2" color="text.secondary">
                Showing {paginatedImages.length} of {filteredImages.length} images
                {filteredImages.length !== images.length && ` (${images.length} total)`}
              </Typography>
            </Box>
            
            <Grid container spacing={2}>
              {paginatedImages.map((image) => (
                <Grid item xs={6} sm={4} md={3} key={image.id}>
                <Card
                  sx={{
                    position: "relative",
                      border: (isMultiSelect ? selectedImages.some(selected => selected.id === image.id) : selectedImage === image.url) ? 2 : 1,
                      borderColor: (isMultiSelect ? selectedImages.some(selected => selected.id === image.id) : selectedImage === image.url) ? "primary.main" : "divider",
                    cursor: "pointer",
                    "&:hover": {
                      boxShadow: 3,
                    },
                  }}
                >
                  <CardActionArea onClick={() => handleImageSelect(image)}>
                      {imageErrors.has(image.id) ? (
                      <Box
                        sx={{
                          height: 140,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'grey.200',
                          flexDirection: 'column',
                          gap: 1
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          Image failed to load
                        </Typography>
                      </Box>
                    ) : (
                      <Box sx={{ position: "relative", height: 140, width: "100%" }}>
                        <Image
                          src={imageErrors.has(image.id) ? logoUrl : getSafeUrl(image.url)}
                          alt={image.fileName}
                          fill
                          sizes="(max-width: 600px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          priority={false}
                          onLoad={() => handleImageLoad(image.id)}
                          onError={(e) => handleImageError(image.id, e)}
                          style={{ objectFit: "cover" }}
                        />
                      </Box>
                    )}
                      
                      {(isMultiSelect ? selectedImages.some(selected => selected.id === image.id) : selectedImage === image.url) && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          backgroundColor: "primary.main",
                          borderRadius: "50%",
                          p: 0.5,
                        }}
                      >
                        <CheckIcon sx={{ color: "white", fontSize: 16 }} />
                      </Box>
                    )}
                  </CardActionArea>
                  
                  {/* Image Info */}
                  <Box p={1}>
                    <Box display="flex" alignItems="center" gap={0.5} mb={0.5}>
                      <Typography
                        variant="caption"
                        display="block"
                        noWrap
                        title={image.fileName}
                        sx={{ flex: 1 }}
                      >
                          {image.fileName}
                      </Typography>
                        <Chip
                          label={image.type}
                          size="small"
                          color={image.type === 'product' ? 'primary' : image.type === 'tag' ? 'success' : 'secondary'}
                          variant="outlined"
                          sx={{ fontSize: '0.6rem', height: '16px' }}
                        />
                      </Box>
                      
                      {image.productName && (
                        <Typography variant="caption" color="text.secondary" display="block" noWrap>
                          Product: {image.productName}
                        </Typography>
                      )}
                      
                      {image.categoryName && (
                        <Typography variant="caption" color="text.secondary" display="block" noWrap>
                          Category: {image.categoryName}
                        </Typography>
                      )}
                      
                      {image.tagName && (
                        <Typography variant="caption" color="text.secondary" display="block" noWrap>
                          Tag: {image.tagName}
                        </Typography>
                      )}
                  </Box>
                </Card>
              </Grid>
            ))}
            </Grid>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box display="flex" justifyContent="center" mt={3}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(event, page) => setCurrentPage(page)}
                  color="primary"
                />
              </Box>
            )}
          </>
        )}

        {/* Selected Image Info */}
        {!isMultiSelect && selectedImage && (
          <Box mt={2} p={2} bgcolor="grey.50" borderRadius={1}>
            <Typography variant="subtitle2" gutterBottom>
              Selected Image:
            </Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <Box
                component="img"
                src={selectedImage}
                alt="Selected"
                sx={{
                  width: 60,
                  height: 60,
                  objectFit: "cover",
                  borderRadius: 1,
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {selectedImage.split("/").pop()}
              </Typography>
            </Box>
          </Box>
        )}

        {/* Multi-select Summary */}
        {isMultiSelect && selectedImages.length > 0 && (
          <Box mt={2} p={2} bgcolor="grey.50" borderRadius={1}>
            <Typography variant="subtitle2" gutterBottom>
              Selected Images ({selectedImages.length}):
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {selectedImages.map((image, index) => (
                <Box
                  key={index}
                  component="img"
                  src={image.url}
                  alt={image.fileName}
                  sx={{
                    width: 40,
                    height: 40,
                    objectFit: "cover",
                    borderRadius: 1,
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                />
              ))}
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCancel} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleConfirmSelection}
          variant="contained"
          disabled={isMultiSelect ? selectedImages.length === 0 : !selectedImage}
          startIcon={<CheckIcon />}
        >
          {isMultiSelect ? `Select ${selectedImages.length} Image${selectedImages.length !== 1 ? 's' : ''}` : 'Select Image'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageGallery;