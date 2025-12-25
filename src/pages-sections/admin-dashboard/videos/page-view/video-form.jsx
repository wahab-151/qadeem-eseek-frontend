"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Typography,
  FormControlLabel,
  Switch,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { Save, Cancel, Preview } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

// RTK QUERY HOOKS
import { 
  useGetVideoByIdQuery, 
  useCreateVideoMutation, 
  useUpdateVideoMutation 
} from "app/store/services";

// UTILITY FUNCTIONS
const getYouTubeThumbnail = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 
    ? `https://img.youtube.com/vi/${match[2]}/mqdefault.jpg` 
    : null;
};

const validateYouTubeUrl = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11;
};

function VideoForm({ videoId = null }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    isActive: true,
    order: 1,
  });
  const [errors, setErrors] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  // RTK Query hooks
  const { 
    data: videoResponse, 
    isLoading: loadingVideo, 
    error: videoError 
  } = useGetVideoByIdQuery(videoId, {
    skip: !videoId
  });

  const [createVideo, { isLoading: isCreating }] = useCreateVideoMutation();
  const [updateVideo, { isLoading: isUpdating }] = useUpdateVideoMutation();

  const loading = isCreating || isUpdating;

  useEffect(() => {
    if (videoId) {
      setIsEditMode(true);
    }
  }, [videoId]);

  useEffect(() => {
    if (videoResponse?.data) {
      setFormData(videoResponse.data);
    }
  }, [videoResponse]);

  const handleChange = (field) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!formData.url.trim()) {
      newErrors.url = "YouTube URL is required";
    } else if (!validateYouTubeUrl(formData.url)) {
      newErrors.url = "Please enter a valid YouTube URL";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      if (isEditMode) {
        await updateVideo({ id: videoId, ...formData }).unwrap();
        enqueueSnackbar("Video updated successfully", { variant: "success" });
      } else {
        await createVideo(formData).unwrap();
        enqueueSnackbar("Video created successfully", { variant: "success" });
      }
      
      router.push("/admin/videos");
    } catch (error) {
      console.error("Error saving video:", error);
      enqueueSnackbar("Error saving video", { variant: "error" });
    }
  };

  const handleCancel = () => {
    router.push("/admin/videos");
  };

  const handlePreview = () => {
    if (formData.url && validateYouTubeUrl(formData.url)) {
      window.open(formData.url, "_blank");
    } else {
      enqueueSnackbar("Please enter a valid YouTube URL first", { variant: "warning" });
    }
  };

  const thumbnailUrl = formData.url ? getYouTubeThumbnail(formData.url) : null;

  if (loadingVideo && isEditMode) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (videoError && isEditMode) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <Typography color="error">Error loading video</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        {isEditMode ? "Edit Video" : "Add New Video"}
      </Typography>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Video Preview */}
              {thumbnailUrl && (
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Avatar
                      src={thumbnailUrl}
                      variant="rounded"
                      sx={{ width: 120, height: 90 }}
                    />
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Video Preview
                      </Typography>
                      <Button
                        startIcon={<Preview />}
                        onClick={handlePreview}
                        size="small"
                      >
                        Preview Video
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              )}

              {/* Name */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Video Name"
                  value={formData.title}
                  onChange={handleChange("title")}
                  error={!!errors.title}
                  helperText={errors.title}
                  required
                />
              </Grid>

              {/* Display Order */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Display Order"
                  type="number"
                  value={formData.order}
                  onChange={handleChange("order")}
                  helperText="Lower numbers appear first (starts from 1)"
                />
              </Grid>

              {/* Link */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="YouTube Link"
                  value={formData.url}
                  onChange={handleChange("url")}
                  error={!!errors.url}
                  helperText={errors.url || "Enter the full YouTube URL (e.g., https://www.youtube.com/watch?v=...)"}
                  required
                />
              </Grid>

              {/* Published Status */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isActive}
                      onChange={handleChange("isActive")}
                    />
                  }
                  label="Published (visible on website)"
                />
              </Grid>

              {/* Action Buttons */}
              <Grid item xs={12}>
                <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                  <Button
                    variant="outlined"
                    startIcon={<Cancel />}
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Save />}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={20} /> : (isEditMode ? "Update" : "Create")}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}


export { VideoForm };
export default VideoForm;
