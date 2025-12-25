"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// MUI
import LoadingButton from "@mui/lab/LoadingButton";

// LOCAL CUSTOM HOOKS
import useCart from "hooks/useCart";

// CUSTOM DATA MODEL


// ==============================================================


// ==============================================================

export default function AddToCart({
  product
}) {
  const {
    id,
    slug,
    title,
    thumbnail,
    price
  } = product;
  const {
    dispatch
  } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleCart = () => {
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
      const from = typeof window !== 'undefined' 
        ? `${window.location.pathname}${window.location.search}` 
        : '/';
      router.push(`/mini-cart?from=${encodeURIComponent(from)}`, {
        scroll: false
      });
      setIsLoading(false);
    }, 1000);
  };
  return <LoadingButton fullWidth color="primary" disableElevation variant="contained" disabled={isLoading} onClick={handleCart}>
      Add To Cart
    </LoadingButton>;
}