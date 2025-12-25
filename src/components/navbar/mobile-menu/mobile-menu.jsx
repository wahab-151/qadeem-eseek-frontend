"use client";

import { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

// MUI ICON COMPONENTS
import MenuIcon from "@mui/icons-material/Menu";
import Clear from "@mui/icons-material/Clear";

// GLOBAL CUSTOM COMPONENT
import OverlayScrollbar from "components/overlay-scrollbar";

// RENDER MENU LEVEL FUNCTION
import { renderLevels } from "./render-levels";

// NAVIGATION DATA LIST
import { updateNavigation } from "./modified-navigation";

// Use guarded router to prevent duplicate navigation calls
import useGuardedRouter from "hooks/useGuardedRouter";

// CUSTOM DATA MODEL


// ==============================================================


// ==============================================================

export default function MobileMenu({
  navigation
}) {
  // console.log("moile menu Nav", navigation)
  const { push } = useGuardedRouter();
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleClose = () => {
    // Diagnostic
    // console.log("MobileMenu: closing drawer");
    setOpenDrawer(false);
  };
  return <Fragment>
      <IconButton onClick={() => {
        // console.log("MobileMenu: menu icon clicked");
        setOpenDrawer(true);
      }} sx={{
      flexShrink: 0,
      color: "grey.600",
      zIndex: 20000,
      pointerEvents: 'auto'
    }}>
        <MenuIcon />
      </IconButton>

      <Drawer 
        anchor="left" 
        open={openDrawer}
        onClose={handleClose}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
          }
        }}
        sx={{
          zIndex: 15001,
          '& .MuiDrawer-paper': {
            width: '70%',
            maxWidth: '350px'
          }
        }}
      >
        <Box width="100%" height="100%" position="relative">
          <OverlayScrollbar sx={{
          height: "100dvh",
          WebkitOverflowScrolling: 'touch',
          overflowY: 'auto'
        }}>
            <Box px={3} py={6} position="relative" height="100%">
              {/* CLOSE BUTTON */}
              <IconButton onClick={handleClose} sx={{
              position: "absolute",
              right: 20,
              top: 15
            }}>
                <Clear fontSize="small" />
              </IconButton>

              {/* MULTI LEVEL MENU RENDER */}
              {renderLevels(updateNavigation(navigation), handleClose, push)}
            </Box>
          </OverlayScrollbar>
        </Box>
      </Drawer>
    </Fragment>;
}