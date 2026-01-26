"use client";
import { Box, Typography } from "@mui/material";
import { keyframes } from "@mui/system";

// Fade in animation for logo
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Pulse animation for the loader
const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

// Spin animation
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export default function FullScreenLoader() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "80px", // Start below navbar (approximate navbar height)
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FEFAF0", // Warm cream background matching theme
        zIndex: 999,
        gap: 3,
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          animation: `${fadeIn} 0.6s ease-out`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <img
          src="/assets/images/small-screen-logo.png"
          alt="QADEEM"
          style={{
            width: "180px",
            height: "auto",
            objectFit: "contain",
          }}
        />
        
        {/* Loading text */}
        <Typography
          variant="h6"
          sx={{
            color: "#8B7548", // Heritage bronze
            fontWeight: 600,
            letterSpacing: "2px",
            fontSize: "14px",
            animation: `${pulse} 1.5s ease-in-out infinite`,
          }}
        >
          LOADING...
        </Typography>
      </Box>

      {/* Spinner */}
      <Box
        sx={{
          width: 50,
          height: 50,
          border: "3px solid #EFE6D5", // Light beige
          borderTop: "3px solid #8B7548", // Heritage bronze
          borderRadius: "50%",
          animation: `${spin} 1s linear infinite`,
        }}
      />

      {/* Tagline */}
      <Typography
        variant="body2"
        sx={{
          color: "#6B5D4F", // Medium brown
          fontSize: "12px",
          letterSpacing: "1px",
          textAlign: "center",
          maxWidth: "300px",
          animation: `${fadeIn} 0.8s ease-out 0.3s both`,
        }}
      >
        Crafting Heritage, One Piece at a Time
      </Typography>
    </Box>
  );
}
