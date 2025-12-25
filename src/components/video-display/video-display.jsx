"use client";

import { useState, useEffect, useRef } from "react";
import { Box, Card, CardContent, Typography, IconButton, Chip } from "@mui/material";
import { PlayArrow, Pause, VolumeOff, VolumeUp } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// STYLED COMPONENTS
const VideoContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "300px",
  borderRadius: "12px",
  overflow: "hidden",
  cursor: "pointer",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[8],
  },
}));

const VideoOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "linear-gradient(45deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1))",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2,
  transition: "opacity 0.3s ease",
}));

const PlayButton = styled(IconButton)(({ theme }) => ({
  width: 80,
  height: 80,
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  color: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 1)",
    transform: "scale(1.1)",
  },
  transition: "all 0.3s ease",
}));

const VideoInfo = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
  padding: theme.spacing(2),
  color: "white",
  zIndex: 3,
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: theme.shadows[4],
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: theme.shadows[8],
  },
}));

// UTILITY FUNCTION
const getYouTubeVideoId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const getYouTubeThumbnail = (url) => {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
};

// MAIN COMPONENT
function VideoDisplay({ 
  video, 
  onVideoClick, 
  isPlaying = false,
  showControls = true,
  autoplay = false,
  muted = false
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  const videoRef = useRef(null);
  const iframeRef = useRef(null);

  // Intersection Observer for viewport-based playback control
  // This ensures videos only play when visible and pause when scrolled out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setIsInView(isIntersecting);
        
        // Only allow autoplay when in viewport
        if (autoplay) {
          setShouldPlay(isIntersecting);
          
          // Pause/play iframe when entering/leaving viewport
          if (iframeRef.current && iframeRef.current.contentWindow) {
            try {
              if (isIntersecting) {
                // Video enters viewport - will autoplay via URL params
                // No need to manually play as autoplay param handles it
              } else {
                // Video leaves viewport - pause it to save resources
                iframeRef.current.contentWindow.postMessage(
                  '{"event":"command","func":"pauseVideo","args":""}',
                  '*'
                );
              }
            } catch (error) {
              // Cross-origin restrictions may prevent this, but autoplay param will handle it
              console.debug('Video pause/play control:', error.message);
            }
          }
        } else {
          // For non-autoplay videos, just track visibility for lazy loading
          setShouldPlay(false);
        }
      },
      { 
        threshold: 0.5, // Video must be at least 50% visible to play
        rootMargin: '50px' // Start loading slightly before entering viewport
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      observer.disconnect();
      // Cleanup: pause video when component unmounts
      if (iframeRef.current && iframeRef.current.contentWindow) {
        try {
          iframeRef.current.contentWindow.postMessage(
            '{"event":"command","func":"pauseVideo","args":""}',
            '*'
          );
        } catch (error) {
          // Ignore errors during cleanup
        }
      }
    };
  }, [autoplay]);

  if (!video || !video.url) {
    return (
      <StyledCard>
        <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "300px" }}>
          <Typography color="text.secondary">No video available</Typography>
        </CardContent>
      </StyledCard>
    );
  }

  const thumbnailUrl = getYouTubeThumbnail(video.url);
  const videoId = getYouTubeVideoId(video.url);

  const handlePlayClick = (e) => {
    e.stopPropagation();
    if (onVideoClick) {
      onVideoClick(video);
    }
  };

  const handleMuteToggle = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  // Create autoplay iframe URL - only autoplay when in viewport
  const getAutoplayUrl = () => {
    if (!videoId) return null;
    const params = new URLSearchParams({
      autoplay: (autoplay && shouldPlay) ? '1' : '0', // Only autoplay when in viewport
      mute: muted ? '1' : '0',
      controls: '1',
      rel: '0',
      modestbranding: '1',
      loop: '1',
      playlist: videoId,
      // Performance optimizations
      preload: shouldPlay ? 'auto' : 'metadata', // Only load full video when in view
      playsinline: '1', // Better mobile performance
      enablejsapi: '1' // Enable JS API for pause/play control
    });
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  };

  return (
    <StyledCard
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        border: '2px solid transparent',
        backgroundClip: 'padding-box',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          margin: '-2px',
          borderRadius: 'inherit',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }
      }}
    >
      <VideoContainer 
        ref={videoRef}
        onClick={handlePlayClick}
        sx={{
          height: '400px',
          borderRadius: '12px',
          overflow: 'hidden',
          position: 'relative',
          '&:hover': {
            transform: 'scale(1.02)',
            transition: 'transform 0.3s ease',
          }
        }}
      >
        {autoplay && isInView && shouldPlay ? (
          <Box
            component="iframe"
            ref={iframeRef}
            src={getAutoplayUrl()}
            title={video.title || "Video"}
            sx={{
              width: "100%",
              height: "100%",
              border: "none",
              borderRadius: "12px",
            }}
            loading="lazy"
            decoding="async"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            key={`${videoId}-${shouldPlay}`} // Force re-render when shouldPlay changes
          />
        ) : (
          <>
            {thumbnailUrl && (
              <Box
                component="img"
                src={thumbnailUrl}
                alt={video.title || "Video thumbnail"}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                loading="lazy"
                decoding="async"
              />
            )}
            
            <VideoOverlay sx={{ opacity: isHovered || isPlaying ? 0 : 1 }}>
              <PlayButton 
                size="large"
                sx={{
                  width: 100,
                  height: 100,
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  color: "#667eea",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 1)",
                    transform: "scale(1.15)",
                  },
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                }}
              >
                <PlayArrow sx={{ fontSize: 48 }} />
              </PlayButton>
            </VideoOverlay>
          </>
        )}

        {showControls && !autoplay && (
          <Box
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 4,
            }}
          >
            <IconButton
              onClick={handleMuteToggle}
              sx={{
                backgroundColor: "rgba(0,0,0,0.6)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.8)",
                },
                backdropFilter: "blur(10px)",
              }}
            >
              {isMuted ? <VolumeOff /> : <VolumeUp />}
            </IconButton>
          </Box>
        )}

        <VideoInfo
          sx={{
            background: "linear-gradient(transparent, rgba(0,0,0,0.9))",
            padding: 3,
            borderRadius: "0 0 12px 12px",
          }}
        >
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 700, 
              mb: 1,
              textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
              background: "linear-gradient(45deg, #fff, #f0f0f0)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {video.title || "Untitled Video"}
          </Typography>
          
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* <Chip
              label="YouTube"
              size="small"
              sx={{
                backgroundColor: "rgba(255,0,0,0.8)",
                color: "white",
                fontWeight: 600,
                fontSize: "0.75rem",
              }}
            /> */}
            {video.views > 0 && (
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {video.views} views
              </Typography>
            )}
          </Box>
        </VideoInfo>
      </VideoContainer>
    </StyledCard>
  );
}

export { VideoDisplay };
export default VideoDisplay;
