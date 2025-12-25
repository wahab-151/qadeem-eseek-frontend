"use client";
import Link from "next/link";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

// LOCAL CUSTOM COMPONENTS
import FavoriteButton from "./favorite-button";
import ProductPrice from "../product-price";

// GLOBAL CUSTOM COMPONENTS
import HoverBox from "components/HoverBox";
import LazyImage from "components/LazyImage";
import FlexBox from "components/flex-box/flex-box";

import LoadingButton from "@mui/lab/LoadingButton";
import { useState, useCallback } from "react";
import useCart from "hooks/useCart";
import AddToCart from "pages-sections/product-details/product-intro/add-to-cart";
import { Box, Tooltip, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useUser from "hooks/useUser";
import { useLoading } from "contexts/LoadingContext";
import { memo } from "react";

// CUSTOM product card

// ========================================================

// ========================================================

function ProductCard2({
  product = {},
  rounded = true,
  showReview = false,
  showFavorite = false,
  // userRole
}) {
  // console.log("product 2",product)
  const { slug, _id, name, price, images, rating, pricing, stock } = product;
  const [quantity, setQuantity] = useState(1);

  const { state } = useUser()
  // console.log("price state ", state?.user?.id)

  const theme = useTheme();
  const truncate = (str, n) =>
    str && str.length > n ? str.slice(0, n - 1) + "…" : str;

  const router = useRouter();
  const { showProductCardLoader, showProductDetailLoader } = useLoading();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleCardClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Start route transition loader immediately for better feedback
    try {
      if (typeof window !== 'undefined' && window.NProgress) {
        window.__navTriggerType = 'product-card';
        window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
        window.__startTimeRef && (window.__startTimeRef.current = Date.now());
        window.NProgress.start();
      }
    } catch {}
    // Show a global detail loader backdrop so the app never appears stuck
    try { showProductDetailLoader(); } catch {}
    setIsNavigating(true);
    
    // Store the full product object in sessionStorage for instant loading
    sessionStorage.setItem(`product_${_id}`, JSON.stringify(product));
    
    // Prefetch route and navigate immediately
    try { router.prefetch(`/products/${_id}`); } catch (_) {}
    // Small timeout to ensure the overlay renders before navigation starts
    setTimeout(() => {
      router.push(`/products/${_id}`);
    }, 60);
  }, [_id, router, product, showProductCardLoader]);

  const handleMouseEnter = useCallback(() => {
    try { router.prefetch(`/products/${_id}`); } catch (_) {}
  }, [_id, router]);

  return (
    <Box
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      sx={{
        border: `1px solid ${theme.palette.grey[200]}`,
        height:'100%',
        borderRadius: 2,
        padding: "8px",
        transition: "all 0.3s ease",
        cursor: "pointer", // Optional: indicates it's clickable
        position: "relative",
        "&:hover": {
          border: (theme) => `2px solid ${theme.palette.secondary[500]}`,
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
            borderRadius: 2,
          }}
        >
          {/* Simple inline spinner using CSS animation to avoid extra imports */}
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
      {stock === 0 && (
        <Chip
          label="Out of stock"
          size="medium"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1,
            pointerEvents: "none",
            bgcolor: (theme) => theme.palette.primary.main,
          }}
        />
      )}
      <HoverBox overflow="hidden" borderRadius={rounded ? 3 : 0}>
        <Image
          width={270}
          height={300}
          alt={name}
          src={images?.[0]?.preview || "/assets/images/logo3.jpeg"}
          sizes="(max-width: 600px) 50vw, (max-width: 1200px) 33vw, 20vw"
          loading="lazy"
          quality={85}
          style={{
            width: "100%",
            height: "270px",
            objectFit: "contain",
            borderRadius: "8px",
          }}
        />
      </HoverBox>

      <FlexBox flexDirection="column" mt={2} gap={1} alignItems="center">
        <Tooltip title={name} arrow placement="top">
          <Typography
            variant="h4"
            textAlign="center"
            sx={{
              mb: 0.5,
              ml: 0.5,
              wordBreak: "break-word",
              maxWidth: { xs: "100%", sm: 300, md: 350, lg: 400 },
              fontSize: "14px",
              lineHeight: 1.2,
              fontWeight: 400,
              textTransform: "capitalize",
              minHeight: "2.76em",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              whiteSpace: "normal",
            }}
          >
            {name}
            {/* {truncate(name, 50)} */}
          </Typography>
        </Tooltip>

        <ProductPrice 
          price={price} 
          discount={pricing} 
          quantity={quantity} 
          userLoggedIn={state?.user?.id ? true : false}  
        />

        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center"
          onClick={(e) => e.stopPropagation()} // prevent parent click
          sx={{ width: "100%" }}
        >
          <AddToCart
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
            buttonsDirection={"column"}
          />
        </Box>
      </FlexBox>
    </Box>
  );
}

export default memo(ProductCard2);