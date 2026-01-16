"use client";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// GLOBAL CUSTOM COMPONENTS
import { NavLink2 } from "components/nav-link";
import { VideoGrid } from "components/video-display";

// STYLED COMPONENT
import { StyledCard } from "./styles";

// RTK QUERY HOOKS
import { useGetPublicVideosQuery } from "app/store/services";

export default function Section6() {
  const { 
    data: videosResponse, 
    isLoading: loading, 
    error 
  } = useGetPublicVideosQuery({ limit: 2 });

  const videos = videosResponse?.data || [];

  return (
    <Container
      className="mt-4"
      maxWidth={false}
      sx={{
        maxWidth: 1240,
        mx: "auto",
        px: { xs: 2, sm: 3 },
      }}
    >
      {!loading && videos.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <VideoGrid 
            videos={videos} 
            maxVideos={2}
            columns={2}
            title=""
            autoplay={true}
            muted={true}
            showTitle={false}
          />
        </Box>
      )}
    </Container>
  );
}