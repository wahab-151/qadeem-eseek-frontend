"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// GLOBAL CUSTOM HOOK
import useAddToCart from "hooks/useAddToCart";
import { FlexBox } from "components/flex-box";
import OrderQuantity from "pages-sections/mini-cart/components/productQuantity";
import NotifyMe from "./notify-me";

// CUSTOM add to cart button

// ================================================================

// ================================================================

export default function AddToCart({
  product,
  quantity,
  setQuantity,
  buttonsDirection = "column",
}) {
  const {
    _id,
    name,
    price,
    images,
    pricing,
  } = product;
  // console.log("product", product)

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { addToCart } = useAddToCart();
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();
  
  // Local loading state for this specific button instance

  const handleAddToCart = async () => {
    setIsLoading(true);
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
      // If error indicates login required
      if (error?.message === "LOGIN_REQUIRED" || error?.status === 401) {
        const currentPath = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
        router.push(
          `/login?id=${product._id}&qty=${quantity}&category=${product?.category?._id}&returnTo=${encodeURIComponent(currentPath)}`
        );
      }
    } finally {
      setIsLoading(false);
    }
  };


  // const handleAddToCart = async () => {
  //   // console.log("Adding to cart:", _id, quantity);
    
  //   setIsLoading(true);
    
  //   try {
  //     // Prepare product data for the unified hook
  //     const productData = {
  //       id: _id,
  //       title: name,
  //       price: price,
  //       pricing: product?.pricing,
  //       thumbnail: images?.[0]?.preview || "/assets/images/logo.jpeg",
  //       slug: name, // Use name as slug if no slug available
  //       stock: product?.stock,
  //       category: product?.category,
  //       sku: product?.sku || "",
  //     };

  //     await addToCart(productData, quantity, product?.category?._id);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <FlexBox
      fullWidth
      flexDirection={buttonsDirection}
      alignItems="stretch"
      gap={2}
      sx={{
        width: "99%",
        maxWidth: 300,
        // minWidth: 280, // optional: prevent it from shrinking too small
      }}
    >
      {/* Add notify me component when out of stock */}
      {product?.stock === 0 ? (
        <Box sx={{ width: "100%" }}>
          <NotifyMe product={product} />
        </Box>
      ) : (
        <>
          <OrderQuantity
            quantity={quantity}
            onChange={(newQty) => setQuantity(newQty)}
            max={product?.stock}
            fullWidth
          />

          <LoadingButton
            variant="contained"
            onClick={handleAddToCart}
            loading={isLoading}
            disabled={product?.stock === 0}
            startIcon={<ShoppingCartIcon />} // <-- This adds the trolley icon
            sx={(theme) => ({
              borderRadius: "34px",
              mx: "auto",
              mb: 0,
              height: 40,
              textTransform: "none",
              backgroundColor: theme.palette.secondary.main,
              width: "100%",
              color: "#fff",
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
              },
              "&.Mui-disabled": {
                color: "#fff",
                backgroundColor: theme.palette.primary[400],
              },
            })}
          >
            {product?.stock === 0 ? "Out of stock" : "Add to Cart"}
          </LoadingButton>
        </>
      )}
    </FlexBox>
  );
}