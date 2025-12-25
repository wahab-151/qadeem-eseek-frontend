"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

// MUI
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

// GLOBAL CUSTOM COMPONENTS
import { MiniCart } from "pages-sections/mini-cart";
import { useNavigation } from "contexts/NavigationContext";
import useUser from "hooks/useUser";
export default function MiniCartDrawer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { previousPath } = useNavigation();
  const { state: authState } = useUser();
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    try {
      // Indicate closing action while we navigate back
      setIsClosing(true);
      // Navigate back to the origin page; do not alter UI layout/animation
      const fromParam = searchParams?.get("from");
      const sameOriginReferrer =
        typeof window !== "undefined" && document.referrer &&
        new URL(document.referrer).origin === window.location.origin
          ? new URL(document.referrer).pathname
          : null;

      // Prefer going back in history when we actually navigated here
      if (sameOriginReferrer && sameOriginReferrer !== "/mini-cart") {
        router.back();
        return;
      }
      
      // Highest priority: explicit from param
      if (fromParam && fromParam !== "/mini-cart") {
        router.push(fromParam);
        return;
      }

      // Use the tracked previous path from NavigationContext
      if (previousPath && previousPath !== "/mini-cart") {
        // Navigate back to the previous page
        router.push(previousPath);
      } else if (typeof window !== "undefined" && document.referrer) {
        // Fallback: use document.referrer to get the actual previous page
        const referrerUrl = new URL(document.referrer);
        const referrerPath = referrerUrl.pathname;
        
        // Only use referrer if it's not the same path and not a login/register page
        if (referrerPath && referrerPath !== "/mini-cart" && 
            !referrerPath.includes("/login") && !referrerPath.includes("/register")) {
          router.push(referrerPath);
          return;
        }
      }
      
      // If no valid previous path, just navigate to home
      router.push("/home");
    } catch (_err) {
      // Ultimate fallback
      router.push("/home");
    }
  };

  if (pathname !== "/mini-cart") return null;
  return <Drawer 
    open 
    anchor="right" 
    onClose={handleClose} 
    sx={{
      zIndex: 99999,
      '& .MuiDrawer-paper': {
        right: 0,
        left: 'auto !important',
        marginLeft: 'auto',
      }
    }} 
    PaperProps={{
      sx: {
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        position: "relative",
        width: { xs: '85%', sm: 380, md: 380 },
        maxWidth: 420,
        right: 0,
        left: 'auto !important',
      }
    }}
  >
      <Box sx={{ position: "relative", height: "100%" }}>
        <MiniCart onClose={handleClose} />
        {isClosing && (
          <Box
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 1,
            }}
          >
            <CircularProgress size={18} />
          </Box>
        )}
      </Box>
    </Drawer>;
}