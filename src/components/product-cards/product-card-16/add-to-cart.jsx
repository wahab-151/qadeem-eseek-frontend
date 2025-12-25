"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// MUI
import Add from "@mui/icons-material/Add";
import LoadingButton from "@mui/lab/LoadingButton";
import { enqueueSnackbar } from "notistack";

// GLOBAL CUSTOM HOOKS
import useCart from "hooks/useCart";

// CUSTOM DATA MODEL


// ==============================================================


// ==============================================================

export default function AddToCart({
  product
}) {
  const {
    slug,
    title,
    thumbnail,
    price,
    id
  } = product;
  const {
    dispatch
  } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleAddToCart = () => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: {
          id,
          slug,
          price,
          title,
          thumbnail,
          qty: 1
        }
      });
      
      // Show success toast notification
      enqueueSnackbar("Product added to cart successfully!", {
        variant: "success",
      });
      
      const from = typeof window !== 'undefined' 
        ? `${window.location.pathname}${window.location.search}` 
        : '/';
      router.push(`/mini-cart?from=${encodeURIComponent(from)}`, {
        scroll: false
      });
      setIsLoading(false);
    }, 1000);
  };
  return <LoadingButton color="primary" variant="outlined" disabled={isLoading} onClick={handleAddToCart} sx={{
    padding: "3px"
  }}>
      <Add fontSize="small" />
    </LoadingButton>;
}