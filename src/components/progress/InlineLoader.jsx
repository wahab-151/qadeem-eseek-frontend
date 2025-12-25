"use client";

import { Box, CircularProgress } from "@mui/material";

export default function InlineLoader({ size = 24, color = "primary" }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 1,
      }}
    >
      <CircularProgress size={size} color={color} />
    </Box>
  );
}
