"use client";

import { MiniCart } from "pages-sections/mini-cart";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme, alpha } from "@mui/material/styles";

export default function MiniCartDrawer({ isOpen, onClose, isLoading = false }) {
  const theme = useTheme();

  return (
    <Drawer 
      open={isOpen} 
      anchor="right" 
      onClose={onClose}
      transitionDuration={{ enter: 250, exit: 200 }}
      sx={{
        zIndex: 99999,
        '& .MuiBackdrop-root': {
          backgroundColor: alpha('#000000', 0.5),
          background: alpha('#000000', 0.5),
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          // Remove any linear gradient
          backgroundImage: 'none !important',
          WebkitBackgroundImage: 'none !important',
        },
        '& .MuiDrawer-paper': {
          right: 0,
          left: 'auto !important',
          marginLeft: 'auto',
          transition: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1) !important',
        }
      }} 
      PaperProps={{
        sx: {
          borderRadius: 0,
          position: "relative",
          width: { xs: '85%', sm: 380, md: 380 },
          maxWidth: 420,
          right: 0,
          left: 'auto !important',
        }
      }}
    >
      <Box sx={{ position: "relative", height: "100%" }}>
        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            <CircularProgress size={24} />
          </Box>
        )}
        <MiniCart onClose={onClose} />
      </Box>
    </Drawer>
  );
}

