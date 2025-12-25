"use client";

import { useState } from "react";
import { Box, Grid, Typography, Modal, IconButton, styled } from "@mui/material";
import { Close } from "@mui/icons-material";
import VideoDisplay from "./video-display";
import { useVideoManagement } from "hooks/useVideoManagement";

// STYLED COMPONENTS
const ModalContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "1200px",
  height: "80%",
  backgroundColor: "white",
  borderRadius: "12px",
  boxShadow: theme.shadows[24],
  outline: "none",
  display: "flex",
  flexDirection: "column",
}));

const VideoModal = styled(Box)(({ theme }) => ({
  flex: 1,
  position: "relative",
  "& iframe": {
    width: "100%",
    height: "100%",
    border: "none",
    borderRadius: "0 0 12px 12px",
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 16,
  right: 16,
  zIndex: 10,
  backgroundColor: "rgba(0,0,0,0.5)",
  color: "white",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.7)",
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(4),
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

// UTILITY FUNCTION
const getYouTubeEmbedUrl = (url) => {
  const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return videoId ? `https://www.youtube.com/embed/${videoId[1]}?autoplay=1&rel=0&preload=metadata&playsinline=1` : null;
};

// MAIN COMPONENT
function VideoGrid({ 
  videos = [], 
  title = "Featured Videos",
  maxVideos = 2,
  columns = 2,
  autoplay = false,
  muted = false,
  showTitle = true
}) {
  const { 
    selectedVideo, 
    isVideoModalOpen, 
    openVideoModal, 
    closeVideoModal 
  } = useVideoManagement();

  const handleVideoClick = (video) => {
    openVideoModal(video);
  };

  const displayVideos = videos.slice(0, maxVideos);

  if (displayVideos.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h5" color="text.secondary">
          No videos available
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {showTitle && title && (
        <SectionTitle variant="h4" component="h2">
          {title}
        </SectionTitle>
      )}
      
      <Grid container spacing={3}>
        {displayVideos.map((video, index) => (
          <Grid item xs={12} md={12 / columns} key={video._id || index}>
            <VideoDisplay
              video={video}
              onVideoClick={handleVideoClick}
              isPlaying={selectedVideo?._id === video._id}
              autoplay={autoplay}
              muted={muted}
            />
          </Grid>
        ))}
      </Grid>

      {/* Video Modal */}
      <Modal
        open={isVideoModalOpen}
        onClose={closeVideoModal}
        aria-labelledby="video-modal"
      >
        <ModalContainer>
          <CloseButton onClick={closeVideoModal}>
            <Close />
          </CloseButton>
          
          {selectedVideo && (
            <VideoModal>
              <iframe
                src={getYouTubeEmbedUrl(selectedVideo.url)}
                title={selectedVideo.title || "Video"}
                loading="lazy"
                decoding="async"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </VideoModal>
          )}
        </ModalContainer>
      </Modal>
    </Box>
  );
}

export { VideoGrid };
export default VideoGrid;
