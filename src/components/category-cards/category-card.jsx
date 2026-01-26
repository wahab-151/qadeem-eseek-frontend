"use client";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import { Box, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState, useCallback, memo } from "react";
import { useRouter } from "next/navigation";
import HoverBox from "components/HoverBox";
import LazyImage from "components/LazyImage";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

function CategoryCard({ category = {} }) {
  const { _id, name, image, productCount = 0, isRecentlyAdded = false, createdAt } = category;
  const theme = useTheme();
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const truncate = (str, n) =>
    str && str.length > n ? str.slice(0, n - 1) + "…" : str;

  const handleCardClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      if (typeof window !== 'undefined' && window.NProgress) {
        window.NProgress.start();
      }
    } catch {}
    setIsNavigating(true);
    
    router.push(`/allProducts?category=${_id}`);
  }, [_id, router]);

  const handleMouseEnter = useCallback(() => {
    try { router.prefetch(`/allProducts?category=${_id}`); } catch (_) {}
  }, [_id, router]);

  return (
    <Box
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      sx={{
        border: "none",
        boxShadow: "none",
        height: "450px",
        borderRadius: 0,
        padding: 0,
        transition: "all 0.3s ease",
        cursor: "pointer",
        position: "relative",
        zIndex: 1, // Lower z-index to prevent overlapping with navigation dropdown
        "&:hover .category-image img": {
          transform: "scale(1.1)",
        },
        "&:hover .product-count-button": {
          opacity: 1,
          transform: "translateY(0)",
        },
        "&:hover .category-badge": {
          opacity: 0,
        },
      }}
    >
      {isNavigating && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(255,255,255,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            borderRadius: 0,
          }}
        >
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              border: (theme) => `3px solid ${theme.palette.grey[300]}`,
              borderTopColor: (theme) => theme.palette.primary.main,
              animation: "spin 0.8s linear infinite",
              "@keyframes spin": {
                from: { transform: "rotate(0deg)" },
                to: { transform: "rotate(360deg)" },
              },
            }}
          />
        </Box>
      )}
      
      <HoverBox 
        overflow="hidden" 
        borderRadius={0}
        className="category-image"
        sx={{ 
          position: "relative", 
          height: "340px", 
          overflow: "hidden", 
          width: "100%",
        }}
      >
        {/* New Badge - Only show if category is marked as recently added */}
        {isRecentlyAdded && (
          <Chip
            className="category-badge"
            label="New"
            size="small"
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              zIndex: 1,
              pointerEvents: "none",
              bgcolor: "#2EC1AC",
              color: "white",
              fontWeight: 600,
              borderRadius: "50%",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 1,
              transition: "opacity 0.3s ease",
              "& .MuiChip-label": {
                padding: 0,
              },
            }}
          />
        )}

        {/* Category Image */}
        <Box sx={{ 
          width: "100%", 
          height: "100%",
          "& img": {
            transition: "transform 0.5s ease",
          }
        }}>
          <LazyImage
            src={image || "/assets/images/placeholder.png"}
            alt={name}
            width={300}
            height={340}
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover" 
            }}
          />
        </Box>

        {/* Product Count Button - Shows on hover */}
        <Box
          className="product-count-button"
          sx={{
            position: "absolute",
            bottom: 12,
            left: 0,
            right: 0,
            width: "100%",
            zIndex: 2,
            px: "34px",
            opacity: 0,
            transform: "translateY(10px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              bgcolor: theme.palette.primary.main,
              color: "white",
              py: 1.5,
              px: 3,
              borderRadius: 0,
              fontWeight: 600,
              fontSize: "14px",
            }}
          >
            <Inventory2OutlinedIcon sx={{ fontSize: 20 }} />
            {productCount} {productCount === 1 ? "Product" : "Products"}
          </Box>
        </Box>
      </HoverBox>

      {/* Category Name */}
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: "16px",
            color: theme.palette.text.primary,
            lineHeight: 1.4,
          }}
        >
          {truncate(name, 40)}
        </Typography>
      </Box>
    </Box>
  );
}

export default memo(CategoryCard);
