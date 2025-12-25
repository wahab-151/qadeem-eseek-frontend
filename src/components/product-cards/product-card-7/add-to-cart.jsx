"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// MUI ICON COMPONENTS
import Add from "@mui/icons-material/Add";
import { enqueueSnackbar } from "notistack";

// GLOBAL CUSTOM HOOKS
import useCart from "hooks/useCart";

// STYLED COMPONENT
import { StyledButton } from "./styles";

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
  const {
    dispatch
  } = useCart();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const handleAddToCart = () => {
    setLoading(true);
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
      setLoading(false);
    }, 500);
  };
  return <StyledButton disabled={isLoading} variant="outlined" onClick={handleAddToCart}>
      <Add fontSize="small" />
    </StyledButton>;
}