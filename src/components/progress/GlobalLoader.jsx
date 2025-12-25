"use client";

import { useLoading } from "contexts/LoadingContext";
import { Box, CircularProgress, Backdrop } from "@mui/material";

export default function GlobalLoader() {
  const { loadingState } = useLoading();
  
  // Keep full-page overlay for true page-level and blocking loads only.
  // Card clicks should rely on inline/skeleton loaders on destination, not a global backdrop.
  const isAnyLoaderActive = 
    loadingState.pageLoader || 
    loadingState.productDetailLoader || 
    loadingState.searchLoader;

  if (!isAnyLoaderActive) return null;

  return (
    <Backdrop
      open={true}
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white
      }}
    >
      <CircularProgress 
        size={60} 
        thickness={4}
        sx={{
          color: (theme) => theme.palette.primary.main,
        }}
      />
    </Backdrop>
  );
}
