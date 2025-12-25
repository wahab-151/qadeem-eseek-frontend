"use client";

import { usePathname, useSearchParams } from "next/navigation";
import React, { Fragment, useEffect, useRef, useState } from "react";

// MUI
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

// MUI ICON COMPONENT
import Clear from "@mui/icons-material/Clear";
import Search from "@mui/icons-material/Search";

// GLOBAL CUSTOM COMPONENTS
import FlexBetween from "components/flex-box/flex-between";
import { Link } from "@mui/material";
import Image from "next/image";

export default function HeaderSearch({
  children
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentUrl = useRef(`${pathname}?${searchParams}`);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  
  useEffect(() => {
    const newUrl = `${pathname}?${searchParams}`;
    if (currentUrl.current !== newUrl) {
      handleClose();
      currentUrl.current = newUrl;
    }
  }, [pathname, searchParams]);
  
  const enhancedChildren = React.Children.map(children, (child) => (
    React.isValidElement(child) ? React.cloneElement(child, { onClose: handleClose }) : child
  ));

  return <Fragment>
      <IconButton onClick={() => setOpen(true)}>
        <Search sx={{
        color: "grey.600"
      }} />
      </IconButton>

      <Drawer open={open} anchor="top" onClose={handleClose} sx={{
      zIndex: 9999
    }}>
        <Box width="auto" padding={2} height="100vh">
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 2,
            position: 'relative'
          }}>
            {/* Logo centered */}
            <Box sx={{ 
              flex: 1, 
              display: 'flex', 
              justifyContent: 'center',
              maxWidth: '100%',
              overflow: 'hidden'
            }}>
              <Link href="/home" style={{ display: 'block', maxWidth: '100%' }}> 
                <Image 
                  alt="logo" 
                  width={105} 
                  height={50} 
                  src="/assets/images/logo.jpeg"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    objectFit: 'contain'
                  }}
                  sizes="(max-width: 600px) 90px, 105px"
                />
              </Link>
            </Box>

            {/* Close button positioned absolutely on the right */}
            <IconButton 
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 0,
                top: 0
              }}
            >
              <Clear />
            </IconButton>
          </Box>

          {/* CATEGORY BASED SEARCH FORM */}
          {enhancedChildren}
        </Box>
      </Drawer>
    </Fragment>;
}