"use client";
import Link from "next/link";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

// LOCAL CUSTOM COMPONENTS
import FavoriteButton from "./favorite-button";
import ProductPrice from "../product-price";
import ProductImageCarousel from "./product-image-carousel";

// GLOBAL CUSTOM COMPONENTS
import HoverBox from "components/HoverBox";
import LazyImage from "components/LazyImage";
import FlexBox from "components/flex-box/flex-box";

import { useState, useCallback } from "react";
import useCart from "hooks/useCart";
import AddToCart from "pages-sections/product-details/product-intro/add-to-cart";
import { Box, Tooltip, Chip, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useUser from "hooks/useUser";
import { useLoading } from "contexts/LoadingContext";
import { memo } from "react";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { currency } from "lib";
import QadeemButton from "components/QadeemButton";

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
  const [carouselIndex, setCarouselIndex] = useState(0);
  const validImages = images?.filter(img => img?.preview) || [];
  const totalImages = validImages.length > 0 ? validImages.length : (images?.[0]?.preview ? 1 : 0);

  const { state } = useUser()
  // console.log("price state ", state?.user?.id)

  const theme = useTheme();
  const truncate = (str, n) =>
    str && str.length > n ? str.slice(0, n - 1) + "…" : str;

  const router = useRouter();
  const { showProductCardLoader, showProductDetailLoader } = useLoading();
  const [isNavigating, setIsNavigating] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart } = useCart();

  // Calculate effective price and discount
  const userRole = state?.user?.role;
  const pricingSource = pricing || (typeof pricing === "object" ? pricing : undefined);
  const tierPrice = userRole && pricingSource && pricingSource[userRole] && typeof pricingSource[userRole].price === "number"
    ? pricingSource[userRole].price
    : undefined;
  const effectivePrice = typeof tierPrice === "number" ? tierPrice : price;
  const originalPrice = price;
  const hasDiscount = typeof originalPrice === "number" && typeof effectivePrice === "number" && effectivePrice < originalPrice;
  const discountPercent = hasDiscount ? Math.round(((originalPrice - effectivePrice) / originalPrice) * 100) : 0;

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
  }, [_id, router, product, showProductDetailLoader]);

  const handleMouseEnter = useCallback(() => {
    try { router.prefetch(`/products/${_id}`); } catch (_) {}
  }, [_id, router]);

  const handleAddToCartClick = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAddingToCart(true);
    try {
      const productData = {
        id: product._id,
        title: product.name,
        price: product.price,
        pricing: product?.pricing,
        thumbnail: product?.images?.[0]?.preview || "/assets/images/logo.jpeg",
        slug: product.name,
        stock: product?.stock,
        category: product?.category,
        sku: product?.sku || "",
      };
      await addToCart(productData, quantity, product?.category?._id);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  }, [product, quantity, addToCart]);

  return (
    <Box
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      sx={{
        border: "none",
        boxShadow: "none",
        width: "288px",
        height: "532px",
        borderRadius: 0,
        padding: 0,
        transition: "all 0.3s ease",
        cursor: "pointer", // Optional: indicates it's clickable
        position: "relative",
        "&:hover .product-carousel-container img": {
          transform: "scale(1.1)",
        },
        "&:hover .card-actions": {
          opacity: 1,
          transform: "translateY(0)",
        },
        "&:hover .add-to-cart-button": {
          opacity: 1,
          transform: "translateY(0)",
        },
        "&:hover .new-badge": {
          opacity: 0,
        },
        "&:hover .image-counter-badge": {
          opacity: 1,
        },
        "&:hover .carousel-dots": {
          bottom: 54,
          "& .carousel-dot-inactive": {
            bgcolor: (theme) => theme.palette.primary.main,
          },
          "& .carousel-dot-active": {
            bgcolor: "white",
          },
        },
        "&:hover .carousel-arrow": {
          opacity: 1,
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
            zIndex: 3,
            pointerEvents: "none",
            bgcolor: (theme) => theme.palette.primary.main,
          }}
        />
      )}
      <HoverBox 
        overflow="hidden" 
        borderRadius={0}
        sx={{ 
          position: "relative", 
          height: "418px", 
          overflow: "hidden", 
          width: "100%",
          "&:hover:after": {
            opacity: 0,
          },
          "&:after": {
            opacity: 0,
          },
        }}
      >
        {/* New Product Badge */}
        <Chip
          className="new-badge"
          label="New"
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            zIndex: 3,
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
        {/* Image Counter Badge - Shows on hover */}
        {totalImages > 0 && (
          <Box
            className="image-counter-badge"
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              zIndex: 15,
              pointerEvents: "none",
              bgcolor: "rgba(0, 0, 0, 0.6)",
              color: "white",
              fontWeight: 600,
              borderRadius: 1,
              padding: "4px 10px",
              opacity: 0,
              transition: "opacity 0.3s ease",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {carouselIndex + 1}/{totalImages}
          </Box>
        )}
        <ProductImageCarousel 
          images={images} 
          alt={name}
          height="418px"
          onIndexChange={(index, total) => {
            setCarouselIndex(index);
          }}
        />
        
        {/* Icons in top right corner */}
        <Box
          className="card-actions"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            zIndex: 2,
            opacity: 0,
            transform: "translateY(-10px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <IconButton
            size="small"
            sx={{
              color: "white",
              transition: "width 0.3s ease, height 0.3s ease",
              position: "relative",
              "& svg": {
                fontSize: 24,
                transition: "font-size 0.3s ease, opacity 0.3s ease",
              },
              "& .favorite-outline": {
                color: "white",
                opacity: 1,
              },
              "& .favorite-filled": {
                opacity: 0,
                position: "absolute",
              },
              "&:hover": {
                "& .favorite-outline": {
                  opacity: 0,
                },
                "& .favorite-filled": {
                  opacity: 1,
                },
              },
            }}
          >
            <FavoriteBorder className="favorite-outline" />
            <Favorite className="favorite-filled" />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              color: "white",
              transition: "width 0.3s ease, height 0.3s ease",
              position: "relative",
              "& svg": {
                fontSize: 24,
                transition: "font-size 0.3s ease, opacity 0.3s ease",
              },
              "& .cart-outline": {
                color: "white",
                opacity: 1,
              },
              "& .cart-filled": {
                opacity: 0,
                position: "absolute",
              },
              "&:hover": {
                "& .cart-outline": {
                  opacity: 0,
                },
                "& .cart-filled": {
                  opacity: 1,
                },
              },
            }}
          >
            <ShoppingBagOutlined className="cart-outline" />
            <ShoppingBag className="cart-filled" />
          </IconButton>
        </Box>

        {/* ADD TO CART button overlaid on bottom center */}
        {stock !== 0 && (
          <Box
            className="add-to-cart-button"
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
            onClick={handleAddToCartClick}
          >
            <QadeemButton
              variant="outlined"
              fullWidth
              loading={isAddingToCart}
              disabled={stock === 0}
              startIcon={<ShoppingCartIcon />}
              sx={{
                color: "white",
                borderColor: "white",
                "&:hover": {
                  bgcolor: (theme) => theme.palette.primary.main,
                  color: (theme) => theme.palette.primary.contrastText,
                  borderColor: "transparent",
                },
              }}
            >
              ADD TO CART
            </QadeemButton>
          </Box>
        )}
      </HoverBox>

      <FlexBox flexDirection="column" mt={2} gap={1} alignItems="flex-start" sx={{ width: "100%" }}>
        {/* Product Name */}
        <Tooltip title={name} arrow placement="top">
          <Typography
            variant="h4"
            sx={{
              fontSize: "18px",
              fontWeight: 500,
              color: "#424242",
              lineHeight: 1.3,
              wordBreak: "break-word",
              textTransform: "capitalize",
            }}
          >
            {name}
          </Typography>
        </Tooltip>

        {/* Price and Stock Status Row */}
        <FlexBox alignItems="center" justifyContent="space-between" sx={{ width: "100%" }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#424242",
            }}
          >
            {currency(Number(effectivePrice) || 0)}
          </Typography>
          {stock !== undefined && stock > 0 && (
            <FlexBox alignItems="center" gap={0.5}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "#4CAF50",
                }}
              />
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#4CAF50",
                  fontWeight: 400,
                }}
              >
                In Stock
              </Typography>
            </FlexBox>
          )}
        </FlexBox>

        {/* Original Price and Discount Row */}
        {hasDiscount && (
          <FlexBox alignItems="center" justifyContent="space-between" sx={{ width: "100%" }}>
            <Typography
              component="del"
              sx={{
                fontSize: "16px",
                fontWeight: 400,
                color: "#9E9E9E",
              }}
            >
              {currency(Number(originalPrice) || 0)}
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#F44336",
              }}
            >
              -{discountPercent}% off
            </Typography>
          </FlexBox>
        )}
      </FlexBox>
    </Box>
  );
}

export default memo(ProductCard2);