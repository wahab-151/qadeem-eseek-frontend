"use client";

import { useState, useEffect, useRef } from "react";
import FlexBox from "components/flex-box/flex-box";
import { NavLink } from "components/nav-link";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Box from "@mui/material/Box";
import HeaderDropdown from "./header-dropdown";

// Standard navigation items
const standardNavItems = [
  { title: "Home", url: "/home" },
  { title: "Categories", url: "/allProducts", hasDropdown: true },
  { title: "Product", url: "/allProducts" },
  { title: "Blogs", url: "/blog" },
  { title: "About", url: "/aboutUs" },
  { title: "Contact", url: "/contact" },
];

export default function HeaderNavigation({ navigation }) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const timeoutRef = useRef(null);

  // Handle mouse enter for dropdown
  const handleMouseEnter = (itemTitle) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHoveredItem(itemTitle);
  };

  // Handle mouse leave for dropdown
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
    }, 200); // Increased delay to allow smoother mouse movement
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Find General menu item from navigation to use its data for Shop dropdown
  const foundGeneralItem = navigation?.find((nav) => 
    nav?.title?.toLowerCase() === "general"
  );
  
  // Only use General item if it has children, otherwise null (no dropdown)
  // Check both 'child' and 'children' properties for compatibility
  const shopMenuData = foundGeneralItem && (
    (foundGeneralItem.child && foundGeneralItem.child.length > 0) ||
    (foundGeneralItem.children && foundGeneralItem.children.length > 0)
  )
    ? foundGeneralItem
    : null;

  return (
    <FlexBox
      alignItems="center"
      gap={3}
      sx={{
        position: "relative",
        zIndex: 999999,
        "& .menu-wrapper": {
          border: "none",
          backgroundColor: "transparent",
          borderRadius: 0,
          padding: 0,
          "& .menu-title": {
            color: "#424242", // Dark grey
            fontFamily: "sans-serif",
            fontWeight: 400,
            fontSize: "0.875rem",
            padding: "0 20px",
            "&:hover": {
              color: "primary.main",
            },
          },
          // Active state styling - white background and bold text
          "&[data-active='true']": {
            backgroundColor: "#FFFFFF !important",
            borderRadius: "0",
            padding: "6px 12px",
            "& .menu-title": {
              fontWeight: "700 !important",
              color: "#271E03 !important",
            },
          },
        },
        "& .nav-link": {
          color: "#424242",
          fontFamily: "sans-serif",
          fontWeight: 400,
          fontSize: "0.875rem",
          textDecoration: "none",
          padding: "0 8px",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          transition: "color 0.2s ease, font-weight 0.2s ease",
          "&:hover": {
            color: "primary.main",
          },
          // Active state - bold text
          "&[data-active='true']": {
            fontWeight: "700 !important",
          },
        },
        "& .shop-dropdown-wrapper": {
          position: "relative",
        },
      }}
    >
      {/* Standard Navigation Items */}
      {standardNavItems.map((item) => {
        // If it's Shop, render with dropdown (always show dropdown for Shop)
        if (item.hasDropdown) {
          return (
            <Box
              key={item.title}
              className="shop-dropdown-wrapper"
              onMouseEnter={() => {
                handleMouseEnter(item.title);
              }}
              onMouseLeave={handleMouseLeave}
              sx={{ 
                position: "relative",
                cursor: "pointer",
              }}
            >
              <Box
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Don't navigate, just show dropdown
                }}
                sx={{
                  color: "#424242",
                  fontFamily: "sans-serif",
                  fontWeight: 400,
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  padding: "0 8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  transition: "color 0.2s ease",
                  cursor: "pointer",
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                <Box component="span">{item.title}</Box>
                <KeyboardArrowDown sx={{ fontSize: "0.875rem" }} />
              </Box>
              {hoveredItem === item.title && (
                <Box
                  onMouseEnter={() => {
                    if (timeoutRef.current) {
                      clearTimeout(timeoutRef.current);
                    }
                    setHoveredItem(item.title);
                  }}
                  onMouseLeave={handleMouseLeave}
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 999999,
                    pt: 0.5,
                    mt: 0,
                    pointerEvents: "auto",
                    width: { xs: "80vw", sm: "75vw", md: "700px", lg: "800px" },
                    maxWidth: "800px",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: "-8px",
                      left: "-50%",
                      right: "-50%",
                      height: "8px",
                      backgroundColor: "transparent",
                      pointerEvents: "auto",
                      zIndex: 999999,
                    },
                  }}
                >
                  {shopMenuData && (
                    (shopMenuData.child && shopMenuData.child.length > 0) ||
                    (shopMenuData.children && shopMenuData.children.length > 0)
                  ) ? (
                    <HeaderDropdown
                      title={shopMenuData.title}
                      menuList={shopMenuData.child || shopMenuData.children || []}
                      nav={shopMenuData}
                    />
                  ) : (
                    <Box sx={{ 
                      p: 3, 
                      backgroundColor: "#FEFAF0", 
                      borderRadius: 0,
                      textAlign: "center",
                      color: "grey.600"
                    }}>
                      No categories available. Check console for navigation data.
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          );
        }
        
        // Regular navigation item without dropdown
        return (
          <NavLink key={item.title} href={item.url} className="nav-link">
            <Box component="span">{item.title}</Box>
            {item.hasDropdown && !shopMenuData && (
              <KeyboardArrowDown sx={{ fontSize: "0.875rem" }} />
            )}
          </NavLink>
        );
      })}
    </FlexBox>
  );
}

