"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// MUI
import Add from "@mui/icons-material/Add";
import LoadingButton from "@mui/lab/LoadingButton";
import { enqueueSnackbar } from "notistack";

// GLOBAL CUSTOM HOOKS
import useAddToCart from "hooks/useAddToCart";

// CUSTOM DATA MODEL

// ==============================================================

// ==============================================================

export default function AddToCartButton({
  product
}) {
  const {
    thumbnail,
    title,
    price,
    id,
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
      disabled={isLoading} 
      variant="contained" 
      sx={{
        padding: 0.5,
        minHeight: 0
      }} 
      onClick={handleAddToCart}
    >
      <Add fontSize="small" />
    </LoadingButton>
  );
}