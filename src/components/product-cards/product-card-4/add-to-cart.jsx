"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// MUI ICON COMPONENTS
import LoadingButton from "@mui/lab/LoadingButton";
import Add from "@mui/icons-material/Add";
import { enqueueSnackbar } from "notistack";

// GLOBAL CUSTOM HOOKS
import useAddToCart from "hooks/useAddToCart";

// CUSTOM DATA MODEL

// ==============================================================

// ==============================================================

export default function AddToCart({
  product
}) {
  const {
    id,
    title,
    price,
    thumbnail,
    slug
  } = product;
  
  const { addToCart, isLoading } = useAddToCart();
  const router = useRouter();

  const handleAddToCart = async () => {
    // Prepare product data for the unified hook
    const productData = {
      id,
      title,
      price,
      thumbnail,
      slug,
      stock: product?.stock,
      category: product?.category,
    };

    await addToCart(productData, 1, product?.category?._id);
    
    // Navigate to mini cart after adding, preserving origin for return on close
    const from = typeof window !== 'undefined' 
      ? `${window.location.pathname}${window.location.search}` 
      : '/';
    router.push(`/mini-cart?from=${encodeURIComponent(from)}`, {
      scroll: false
    });
  };

  return (
    <LoadingButton 
      color="primary" 
      variant="outlined" 
      disabled={isLoading} 
      onClick={handleAddToCart} 
      sx={{
        padding: "3px",
        alignSelf: "self-end"
      }}
    >
      <Add fontSize="small" />
    </LoadingButton>
  );
}