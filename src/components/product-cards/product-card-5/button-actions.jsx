"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// MUI
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import { enqueueSnackbar } from "notistack";

// MUI ICON COMPONENTS
import Add from "@mui/icons-material/Add";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

// GLOBAL CUSTOM HOOKS
import useAddToCart from "hooks/useAddToCart";

// STYLED COMPONENT
import { ButtonGroup } from "./styles";

// CUSTOM DATA MODEL

// ==============================================================

// ==============================================================

export default function ButtonActions({
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
  const [isFavorite, setFavorite] = useState(false);

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
    <ButtonGroup>
      <LoadingButton 
        disableElevation 
        disabled={isLoading} 
        variant="contained" 
        onClick={handleAddToCart} 
        sx={{
          py: "5px",
          fontSize: 13,
          width: "100%",
          lineHeight: 1
        }}
      >
        <Add fontSize="small" sx={{
          marginInlineEnd: 0.5
        }} /> Add to Cart
      </LoadingButton>
    </ButtonGroup>
  );
}