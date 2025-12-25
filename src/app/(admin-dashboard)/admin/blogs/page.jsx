'use client';
import { Fragment, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Pagination,
  CircularProgress,
  Alert,
  Tooltip
} from "@mui/material";
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import FlexBox from "components/flex-box/flex-box";
import { 
  useGetAllBlogsQuery,
  useDeleteBlogMutation 
} from "app/store/services";
import { useSnackbar } from "notistack";

export default function AdminBlogsPage() {
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    tag: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10
  });
  const [pageSize, setPageSize] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  // RTK Query hooks
  const { 
    data: blogsData, 
    isLoading: loading, 
    error: blogsError,
    refetch 
  } = useGetAllBlogsQuery({
    page: pagination.page,
    limit: pageSize,
    status: filters.status || 'all', // Show all blogs by default for admin
    tag: filters.tag,
    search: filters.search
  });

  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

  // Get blogs and pagination from RTK Query
  const blogs = blogsData?.data?.blogs || [];
  const paginationData = blogsData?.data?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalBlogs: 0
  };

  const handleMenuClick = (event, blog) => {
    setAnchorEl(event.currentTarget);
    setSelectedBlog(blog);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedBlog(null);
  };

  const handleEdit = () => {
    router.push(`/admin/blogs/edit/${selectedBlog._id}`);
    handleMenuClose();
  };

  const handleView = () => {
    console.log('Selected blog for view:', selectedBlog);
    if (!selectedBlog?.slug) {
      enqueueSnackbar('Blog slug not found', { variant: 'error' });
      return;
    }
    window.open(`/blog/${selectedBlog.slug}`, '_blank');
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setDeleteDialog(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteBlog(selectedBlog._id).unwrap();
      setDeleteDialog(false);
      enqueueSnackbar('Blog deleted successfully!', { variant: 'success' });
      refetch();
    } catch (error) {
      console.error('Error deleting blog:', error);
      enqueueSnackbar(error?.data?.message || 'Failed to delete blog', { variant: 'error' });
    }
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (event, page) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const clearAllFilters = () => {
    setFilters({ search: '', status: '', tag: '' });
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageSizeChange = (event) => {
    const newPageSize = parseInt(event.target.value);
    setPageSize(newPageSize);
    setPagination(prev => ({ ...prev, page: 1, limit: newPageSize }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'success';
      case 'draft':
        return 'warning';
      case 'archived':
        return 'default';
      default:
        return 'default';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Fragment>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <FlexBox justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700}>
            Blog Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => router.push('/admin/blogs/create')}
          >
            Create New Post
          </Button>
        </FlexBox>

        {/* Filters */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <FlexBox gap={2} alignItems="center" flexWrap="wrap">
            <TextField
              placeholder="Search by title, content, or tag..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
              }}
              sx={{ minWidth: 250 }}
              helperText="Search in blog title, content, or tags"
            />
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                label="Status"
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="published">Published</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="archived">Archived</MenuItem>
              </Select>
            </FormControl>
            <TextField
              placeholder="Filter by specific tag..."
              value={filters.tag}
              onChange={(e) => handleFilterChange('tag', e.target.value)}
              sx={{ minWidth: 200 }}
              helperText="Enter a specific tag to filter"
            />
            <Button
              variant="outlined"
              startIcon={<ClearIcon />}
              onClick={clearAllFilters}
              sx={{ 
                minWidth: 120,
                borderColor: 'grey.400',
                color: 'text.secondary',
                '&:hover': {
                  borderColor: 'grey.600',
                  color: 'text.primary'
                }
              }}
            >
              Clear All
            </Button>
          </FlexBox>
        </Paper>

        {/* Error Alert */}
        {blogsError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {blogsError?.data?.message || 'Failed to fetch blogs'}
          </Alert>
        )}

        {/* Table */}
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Reading Time</TableCell>
                  <TableCell>Published</TableCell>
                  <TableCell>Views</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : blogs.length > 0 ? (
                  blogs.map((blog) => (
                    <TableRow key={blog._id} hover>
                      <TableCell>
                        <Box>
                          <Typography variant="body1" fontWeight={500} sx={{ mb: 0.5 }}>
                            {blog.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {blog.slug}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {blog.author?.firstName} {blog.author?.lastName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={blog.category || 'Uncategorized'}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={blog.status}
                          color={getStatusColor(blog.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {blog.readingTime ? `${blog.readingTime} min` : '-'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {blog.publishedAt ? formatDate(blog.publishedAt) : '-'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {blog.viewCount || 0}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={(e) => handleMenuClick(e, blog)}
                          size="small"
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                          No blogs found
                        </Typography>
                        {(filters.search || filters.status || filters.tag) && (
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Try adjusting your filters or search terms
                          </Typography>
                        )}
                        <Button
                          variant="outlined"
                          onClick={clearAllFilters}
                          startIcon={<ClearIcon />}
                          size="small"
                        >
                          Clear Filters
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Results Summary */}
        {!loading && blogs.length > 0 && (
          <Box sx={{ mt: 2, mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {paginationData.totalBlogs} blog{paginationData.totalBlogs !== 1 ? 's' : ''} found
              {filters.search && ` matching "${filters.search}"`}
              {filters.status && ` with status "${filters.status}"`}
              {filters.tag && ` with tag "${filters.tag}"`}
            </Typography>
          </Box>
        )}

        {/* Pagination */}
        {paginationData.totalPages > 1 && (
          <Box sx={{ mt: 3 }}>
            {/* Pagination Info */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Showing {((paginationData.currentPage - 1) * pageSize) + 1} to {Math.min(paginationData.currentPage * pageSize, paginationData.totalBlogs)} of {paginationData.totalBlogs} blogs
                </Typography>
                <FormControl size="small" sx={{ minWidth: 80 }}>
                  <InputLabel>Per page</InputLabel>
                  <Select
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    label="Per page"
                  >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Page {paginationData.currentPage} of {paginationData.totalPages}
              </Typography>
            </Box>
            
            {/* Pagination Controls */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={paginationData.totalPages}
                page={paginationData.currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </Box>
          </Box>
        )}

        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {/* Hide View option for now since it only works for published blogs */}
          {/* <MenuItem onClick={handleView}>
            <VisibilityIcon sx={{ mr: 1 }} />
            View
          </MenuItem> */}
          <MenuItem onClick={handleEdit}>
            <EditIcon sx={{ mr: 1 }} />
            Edit
          </MenuItem>
          <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
            <DeleteIcon sx={{ mr: 1 }} />
            Delete
          </MenuItem>
        </Menu>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
          <DialogTitle>Delete Blog Post</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete &quot;{selectedBlog?.title}&quot;? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
            <Button 
              onClick={handleDeleteConfirm} 
              color="error" 
              variant="contained"
              disabled={isDeleting}
              startIcon={isDeleting ? <CircularProgress size={20} /> : null}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Fragment>
  );
}
