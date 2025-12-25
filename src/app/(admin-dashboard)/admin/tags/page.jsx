"use client";
import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Alert,
  CircularProgress,
  Pagination,
  Stack,
  Switch,
  FormControlLabel,
  Tooltip,
  TableContainer,
  Avatar,
} from "@mui/material";
import { Edit, Delete, Add, Search, Visibility, AddPhotoAlternate } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { 
  useGetTagsAdminQuery, 
  useUpdateTagMutation, 
  useDeleteTagMutation,
  useGetAllTagsQuery,
  useUploadImageMutation
} from "app/store/services";
import { useDispatch } from "react-redux";
import appSlice from "app/store/services";
import { v4 as uuidv4 } from "uuid";
import { addWatermark, compressImage } from "utils/helpers";
import { uploadToS3 } from "utils/s3Helper";

// GLOBAL CUSTOM COMPONENTS
import OverlayScrollbar from "components/overlay-scrollbar";
import { TableHeader, TablePagination } from "components/data-table";
import { ImageGallery } from "components/image-gallery";
import DropZone from "components/DropZone";

// GLOBAL CUSTOM HOOK
import useMuiTable from "hooks/useMuiTable";

// TABLE HEADING DATA LIST
const tableHeading = [
  {
    id: "image",
    label: "Icon",
    align: "center",
    width: "10%"
  },
  {
    id: "name",
    label: "Tag Name",
    align: "left",
    width: "30%"
  },
  {
    id: "featured",
    label: "Featured Status",
    align: "left",
    width: "25%"
  },
  {
    id: "createdAt",
    label: "Created Date",
    align: "left",
    width: "20%"
  },
  {
    id: "action",
    label: "Actions",
    align: "center",
    width: "15%"
  }
];

export default function TagsListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  // Debounced value to avoid firing API on every keystroke
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, tag: null });
  const [editDialog, setEditDialog] = useState({ open: false, tag: null, name: "", image: "", featured: false });
  const [viewDialog, setViewDialog] = useState({ open: false, tag: null });
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryRefreshTrigger, setGalleryRefreshTrigger] = useState(0);
  const [imageProcessing, setImageProcessing] = useState(false);
  const [editFiles, setEditFiles] = useState([]);

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  // Table sorting state
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const { 
    data: tagsData, 
    isLoading: loading, 
    error, 
    refetch 
  } = useGetTagsAdminQuery({
    page: currentPage,
    limit: 10,
    search: debouncedSearchTerm,
    sortBy,
    sortOrder,
  });

  // Force refetch on mount (ensures fresh list after create navigation)
  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fallback to public tags API if admin API fails
  const { 
    data: publicTagsData, 
    isLoading: publicLoading, 
    error: publicError 
  } = useGetAllTagsQuery();

  const [updateTag, { isLoading: updating }] = useUpdateTagMutation();
  const [deleteTag, { isLoading: deleting }] = useDeleteTagMutation();
  const [uploadImageHandle] = useUploadImageMutation();

  // Use admin data if available, otherwise fallback to public data
  let tags = tagsData?.data?.tags || [];
  if (tags.length === 0 && publicTagsData?.data) {
    // Convert public tags (strings) to objects with required properties
    tags = publicTagsData.data.map((tagName, index) => ({
      _id: `public_${index}`,
      name: tagName,
      featured: false,
      createdAt: new Date().toISOString()
    }));
  }
  
  const pagination = tagsData?.data?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalItems: tags.length,
  };

  const handleSearch = () => {
    // Immediate search on button click
    setDebouncedSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  // Handle search input change; debouncing is applied via effect below
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  // Debounce searchTerm → debouncedSearchTerm
  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, 400);
    return () => clearTimeout(handle);
  }, [searchTerm]);

  // Derive display list: use server page; fallback to client filtering/pagination when using public tags
  const { displayTags, totalPagesForUI } = useMemo(() => {
    if (tagsData?.data?.tags && tagsData?.data?.pagination) {
      return {
        displayTags: tags,
        totalPagesForUI: tagsData.data.pagination.totalPages,
      };
    }

    const filtered = tags.filter(tag =>
      tag.name.toLowerCase().includes((debouncedSearchTerm || "").toLowerCase())
    );
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    return {
      displayTags: filtered.slice(startIndex, endIndex),
      totalPagesForUI: Math.max(1, Math.ceil(filtered.length / 10)),
    };
  }, [tagsData?.data?.tags, tagsData?.data?.pagination, tags, debouncedSearchTerm, currentPage]);

  // Get table controls from the mui hook
  const {
    order,
    orderBy,
    handleRequestSort
  } = useMuiTable({
    listData: displayTags
  });

  // Hook up header sort to server-side sort
  const onHeaderSort = (property) => {
    // Toggle if same column; otherwise default to asc
    if (sortBy === property) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(property);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  const handleDelete = async () => {
    try {
      const result = await deleteTag(deleteDialog.tag._id).unwrap();
      console.log("Delete result:", result);
      
      enqueueSnackbar(
        result?.message || "Tag deleted successfully", 
        { variant: "success" }
      );
      
      setDeleteDialog({ open: false, tag: null });
      
      // Manually invalidate cache to force immediate refresh
      dispatch(appSlice.util.invalidateTags(['Tags', 'FeaturedTags', 'Products', 'AdminProducts']));
      
      // Force immediate refetch to ensure UI updates
      setTimeout(() => {
        refetch();
      }, 100);
      
    } catch (error) {
      console.error("Error deleting tag:", error);
      const errorMessage = error?.data?.message || error?.message || "Failed to delete tag";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  const handleEdit = async () => {
    try {
      await updateTag({ 
        id: editDialog.tag._id, 
        name: editDialog.name,
        image: editDialog.image || null,
        featured: Boolean(editDialog.featured)
      }).unwrap();
      enqueueSnackbar("Tag updated successfully", { variant: "success" });
      setEditDialog({ open: false, tag: null, name: "", image: "", featured: false });
      refetch();
    } catch (error) {
      console.error("Error updating tag:", error);
      const errorMessage = error?.data?.message || error?.message || "Failed to update tag";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  // Handle image upload for editing
  const handleEditImageUpload = async (files) => {
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
      const tagName = editDialog.name || 'tag';
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
        setEditDialog(prev => ({ ...prev, image: finalImageUrl }));
        setEditFiles([{ name: file.name, preview: finalImageUrl }]);
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

  // Handle image gallery selection for editing
  const handleGalleryImageSelect = (imageUrl) => {
    setEditDialog(prev => ({ ...prev, image: imageUrl }));
    setEditFiles([{ name: imageUrl.split("/").pop(), preview: imageUrl }]);
    setGalleryOpen(false);
    enqueueSnackbar("Image selected from gallery!", { variant: "success" });
  };

  // Handle remove image in edit dialog
  const handleRemoveEditImage = () => {
    setEditDialog(prev => ({ ...prev, image: "" }));
    setEditFiles([]);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page + 1);
  };

  const handleFeaturedToggle = async (tag) => {
    try {
      // Check if we're trying to feature a tag and if we're at the limit
      if (!tag.featured) {
        const featuredCount = tags.filter(t => t.featured).length;
        if (featuredCount >= 10) {
          enqueueSnackbar("Maximum 10 tags can be featured at a time", { variant: "warning" });
          return;
        }
      }

      await updateTag({ 
        id: tag._id, 
        featured: !tag.featured 
      }).unwrap();
      enqueueSnackbar(`Tag ${tag.featured ? 'unfeatured' : 'featured'} successfully`, { variant: "success" });
      refetch();
    } catch (error) {
      console.error("Error toggling featured status:", error);
      const errorMessage = error?.data?.message || error?.message || "Failed to update tag";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  if (error) {
    return (
      <Box>
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load tags: {error?.data?.message || error?.message || "Unknown error"}
        </Alert>
        <Button onClick={() => refetch()} variant="outlined">
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Tags Management</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => router.push("/admin/tags/create")}
        >
          Create Tag
        </Button>
      </Box>

      <Card>
        <Box p={2}>
          <Box display="flex" gap={2} mb={2}>
            <TextField
              placeholder="Search tags..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              size="small"
              sx={{ flexGrow: 1 }}
            />
            <Button
              variant="outlined"
              startIcon={<Search />}
              onClick={handleSearch}
            >
              Search
            </Button>
            {searchTerm && (
              <Button
                variant="outlined"
                onClick={() => handleSearchChange("")}
                sx={{ minWidth: 80 }}
              >
                Clear
              </Button>
            )}
          </Box>

          {/* Table Summary */}
          {!loading && displayTags.length > 0 && (
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Showing {displayTags.length} of {pagination.totalItems || displayTags.length} tags
                  {searchTerm && ` for "${searchTerm}"`}
                </Typography>
                <Typography variant="caption" color="primary.main" sx={{ fontWeight: 500 }}>
                  Featured: {tagsData?.data?.counts?.featured ?? tags.filter(t => t.featured).length}/10
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {orderBy && order && `Sorted by ${orderBy} (${order})`}
              </Typography>
            </Box>
          )}

          {(loading || publicLoading) ? (
            <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <OverlayScrollbar>
                <TableContainer sx={{ minWidth: 900 }}>
                  <Table sx={{ tableLayout: 'fixed' }}>
                    <TableHeader 
                      order={sortOrder === "asc" ? "asc" : "desc"} 
                      orderBy={sortBy} 
                      heading={tableHeading} 
                      onRequestSort={onHeaderSort} 
                    />
                    <TableBody>
                      {displayTags.length > 0 ? (
                        displayTags.map((tag, index) => (
                          <TableRow key={tag._id} hover>
                            <TableCell sx={{ width: '10%', textAlign: 'center' }}>
                              <Avatar
                                src={tag.image}
                                sx={{ 
                                  width: 40, 
                                  height: 40,
                                  mx: 'auto'
                                }}
                                variant="rounded"
                              >
                                {tag.name?.charAt(0)?.toUpperCase()}
                              </Avatar>
                            </TableCell>
                            <TableCell sx={{ width: '30%', wordWrap: 'break-word' }}>
                              <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                                <Typography 
                                  variant="body2"
                                  sx={{ 
                                    fontWeight: 600,
                                    fontSize: '0.875rem',
                                    lineHeight: 1.4,
                                      whiteSpace: 'normal',
                                    wordBreak: 'break-word',
                                    maxWidth: '100%'
                                  }}
                                >
                                  {tag.name}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell sx={{ width: '25%', wordWrap: 'break-word' }}>
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={tag.featured || false}
                                    onChange={() => handleFeaturedToggle(tag)}
                                    disabled={updating || deleting || tag._id.startsWith('public_')}
                                    color="primary"
                                    size="small"
                                  />
                                }
                                label={
                                  <Typography 
                                    variant="body2" 
                                    color={tag.featured ? "success.main" : "text.secondary"}
                                    sx={{ 
                                      fontWeight: tag.featured ? 600 : 400,
                                      whiteSpace: 'normal',
                                      wordBreak: 'break-word'
                                    }}
                                  >
                                    {tag.featured ? "Featured" : "Regular"}
                                    {tag._id.startsWith('public_') && " (Read-only)"}
                                  </Typography>
                                }
                                sx={{ margin: 0, flexWrap: 'wrap' }}
                              />
                            </TableCell>
                            <TableCell sx={{ width: '20%', wordWrap: 'break-word' }}>
                              <Typography 
                                variant="body2" 
                                color="text.secondary"
                                sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
                              >
                                {new Date(tag.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </Typography>
                            </TableCell>
                            <TableCell align="center" sx={{ width: '15%' }}>
                              <Box display="flex" gap={0.5} justifyContent="center" flexWrap="wrap">
                                <Tooltip title="View Details">
                                  <IconButton
                                    onClick={() => setViewDialog({ open: true, tag })}
                                    disabled={updating || deleting}
                                    color="info"
                                    size="small"
                                    sx={{ 
                                      '&:hover': { 
                                        backgroundColor: 'info.light',
                                        color: 'info.contrastText'
                                      }
                                    }}
                                  >
                                    <Visibility fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                    <Tooltip title={tag._id.startsWith('public_') ? "Edit not available for public tags" : "Edit Tag"}>
                                      <span>
                                        <IconButton
                                          onClick={() => {
                                            setEditDialog({ open: true, tag, name: tag.name, image: tag.image || "", featured: Boolean(tag.featured) });
                                            setEditFiles(tag.image ? [{ name: tag.image.split("/").pop(), preview: tag.image }] : []);
                                          }}
                                      disabled={updating || deleting || tag._id.startsWith('public_')}
                                      color="primary"
                                      size="small"
                                      sx={{ 
                                        '&:hover': { 
                                          backgroundColor: 'primary.light',
                                          color: 'primary.contrastText'
                                        }
                                      }}
                                    >
                                      <Edit fontSize="small" />
                                    </IconButton>
                                  </span>
                                </Tooltip>
                                <Tooltip title={tag._id.startsWith('public_') ? "Delete not available for public tags" : "Delete Tag"}>
                                  <span>
                                    <IconButton
                                      onClick={() =>
                                        setDeleteDialog({ open: true, tag })
                                      }
                                      color="error"
                                      disabled={updating || deleting || tag._id.startsWith('public_')}
                                      size="small"
                                      sx={{ 
                                        '&:hover': { 
                                          backgroundColor: 'error.light',
                                          color: 'error.contrastText'
                                        }
                                      }}
                                    >
                                      <Delete fontSize="small" />
                                    </IconButton>
                                  </span>
                                </Tooltip>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                              {searchTerm ? 'No tags found matching your search' : 'No tags found'}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {searchTerm ? 'Try adjusting your search criteria' : 'Create your first tag to get started'}
                            </Typography>
                            {searchTerm && (
                              <Button
                                variant="outlined"
                                onClick={() => handleSearchChange("")}
                                sx={{ mt: 2 }}
                              >
                                Clear Search
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </OverlayScrollbar>

              {totalPagesForUI > 1 && (
                <Stack alignItems="center" my={4}>
                  <TablePagination
                    count={totalPagesForUI}
                    page={currentPage - 1}
                    onChange={handlePageChange}
                    color="primary"
                    showFirstButton
                    showLastButton
                  />
                </Stack>
              )}
            </>
          )}
        </Box>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, tag: null })}>
        <DialogTitle>Delete Tag</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the tag "{deleteDialog.tag?.name}"? 
            This action will also remove the tag from all products that have it.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDeleteDialog({ open: false, tag: null })}
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDelete} 
            color="error" 
            variant="contained"
            disabled={deleting}
            startIcon={deleting ? <CircularProgress size={20} /> : null}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

          {/* Edit Dialog */}
          <Dialog open={editDialog.open} onClose={() => {
            setEditDialog({ open: false, tag: null, name: "", image: "", featured: false });
            setEditFiles([]);
          }} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Tag</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Tag Name"
                fullWidth
                variant="outlined"
                value={editDialog.name}
                onChange={(e) => setEditDialog({ ...editDialog, name: e.target.value })}
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={Boolean(editDialog.featured)}
                    onChange={(e) => setEditDialog({ ...editDialog, featured: e.target.checked })}
                    color="primary"
                  />
                }
                label="Featured Tag"
                sx={{ mt: 1, mb: 2 }}
              />
              
              {/* Image Section */}
              <Box sx={{ mb: 2, mt: 2 }}>
                <Typography variant="subtitle1" fontWeight={500} sx={{ mb: 1 }}>
                  Tag Icon/Image (Optional)
                </Typography>
                
                <DropZone
                  onChange={handleEditImageUpload}
                  processing={imageProcessing}
                  info="Upload tag icon/image"
                />
                
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setGalleryOpen(true)}
                  disabled={updating || imageProcessing}
                  startIcon={<AddPhotoAlternate />}
                  sx={{ mt: 1 }}
                >
                  Choose from Gallery
                </Button>
                
                {/* Image Preview */}
                <Box display="flex" flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                  {editFiles.map((file, index) => (
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
                        onClick={handleRemoveEditImage}
                        disabled={updating || imageProcessing}
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
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={() => {
                  setEditDialog({ open: false, tag: null, name: "", image: "", featured: false });
                  setEditFiles([]);
                }}
                disabled={updating || imageProcessing}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleEdit} 
                variant="contained"
                disabled={updating || imageProcessing}
                startIcon={updating ? <CircularProgress size={20} /> : null}
              >
                {updating ? "Updating..." : "Update"}
              </Button>
            </DialogActions>
          </Dialog>

      {/* View Dialog */}
      <Dialog open={viewDialog.open} onClose={() => setViewDialog({ open: false, tag: null })}>
        <DialogTitle>Tag Details</DialogTitle>
        <DialogContent>
          {viewDialog.tag && (
            <Box>
              <Box mb={2}>
                <Typography variant="subtitle2" color="text.secondary">
                  Tag Name
                </Typography>
                <Chip 
                  label={viewDialog.tag.name} 
                  color="primary" 
                  variant="outlined"
                  sx={{ mt: 1 }}
                />
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle2" color="text.secondary">
                  Status
                </Typography>
                <Chip 
                  label={viewDialog.tag.featured ? "Featured" : "Regular"} 
                  color={viewDialog.tag.featured ? "success" : "default"}
                  variant={viewDialog.tag.featured ? "filled" : "outlined"}
                  sx={{ mt: 1 }}
                />
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle2" color="text.secondary">
                  Created At
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {new Date(viewDialog.tag.createdAt).toLocaleString()}
                </Typography>
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle2" color="text.secondary">
                  Last Updated
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {viewDialog.tag.updatedAt ? new Date(viewDialog.tag.updatedAt).toLocaleString() : 'N/A'}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialog({ open: false, tag: null })}>
            Close
          </Button>
        </DialogActions>
          </Dialog>

          {/* Image Gallery Dialog */}
          <ImageGallery
            open={galleryOpen}
            onClose={() => setGalleryOpen(false)}
            onSelectImage={handleGalleryImageSelect}
            selectedImageUrl={editDialog.image}
            imageType="tag"
            allowMultiSelectToggle={false}
            refreshTrigger={galleryRefreshTrigger}
          />
        </Box>
      );
    }
