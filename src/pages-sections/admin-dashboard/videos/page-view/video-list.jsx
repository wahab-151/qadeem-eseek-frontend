"use client";

import { useState } from "react";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Avatar,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import {
  Edit,
  Delete,
  Add,
  Visibility,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

// RTK QUERY HOOKS
import { 
  useGetAllVideosQuery, 
  useDeleteVideoMutation 
} from "app/store/services";

// UTILITY FUNCTIONS
const getYouTubeThumbnail = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 
    ? `https://img.youtube.com/vi/${match[2]}/mqdefault.jpg` 
    : null;
};

function VideoList() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  
  const [deleteDialog, setDeleteDialog] = useState({ open: false, video: null });

  // RTK Query hooks
  const { 
    data: videosResponse, 
    isLoading: loading, 
    error 
  } = useGetAllVideosQuery({});
  
  const [deleteVideo, { isLoading: isDeleting }] = useDeleteVideoMutation();

  const videos = videosResponse?.data?.videos || [];

  const handleDelete = async (video) => {
    try {
      await deleteVideo(video._id).unwrap();
      enqueueSnackbar("Video deleted successfully", { variant: "success" });
    } catch (error) {
      console.error("Error deleting video:", error);
      enqueueSnackbar("Error deleting video", { variant: "error" });
    }
    setDeleteDialog({ open: false, video: null });
  };

  const handleEdit = (video) => {
    router.push(`/admin/videos/edit/${video._id}`);
  };

  const handleAdd = () => {
    router.push("/admin/videos/create");
  };

  const handlePreview = (video) => {
    window.open(video.url, "_blank");
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <Typography color="error">Error loading videos</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" component="h1">
          Video Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAdd}
        >
          Add Video
        </Button>
      </Box>

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Thumbnail</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Order</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {videos.map((video) => (
                <TableRow key={video._id}>
                  <TableCell>
                    <Avatar
                      src={getYouTubeThumbnail(video.url)}
                      variant="rounded"
                      sx={{ width: 80, height: 60 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {video.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {video.order || 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={video.isActive ? "Published" : "Draft"} 
                      size="small" 
                      color={video.isActive ? "success" : "default"}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Tooltip title="Preview">
                        <IconButton 
                          size="small" 
                          onClick={() => handlePreview(video)}
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton 
                          size="small" 
                          onClick={() => handleEdit(video)}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => setDeleteDialog({ open: true, video })}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, video: null })}
      >
        <DialogTitle>Delete Video</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete &quot;{deleteDialog.video?.title}&quot;? 
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDeleteDialog({ open: false, video: null })}
          >
            Cancel
          </Button>
          <Button 
            onClick={() => handleDelete(deleteDialog.video)}
            color="error"
            variant="contained"
            disabled={isDeleting}
          >
            {isDeleting ? <CircularProgress size={20} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export { VideoList };
export default VideoList;
