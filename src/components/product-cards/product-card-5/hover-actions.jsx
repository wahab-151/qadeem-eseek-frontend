"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import { enqueueSnackbar } from "notistack";

// MUI ICON COMPONENTS
import Favorite from "@mui/icons-material/Favorite";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";

// GLOBAL CUSTOM HOOK
import useCart from "hooks/useCart";

// STYLED COMPONENT
import { HoverWrapper } from "./styles";

// CUSTOM DATA MODEL


// ==============================================================


// ==============================================================

export default function HoverActions({
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
  const [isFavorite, setFavorite] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const handleFavorite = () => {
    setFavorite(state => !state);
  };
  const handleAddToCart = () => {
    if (isLoading) return;
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
  return <HoverWrapper className="controller">
      <span onClick={() => {
        if (typeof window !== 'undefined' && window.NProgress) {
          window.NProgress.start();
        }
        sessionStorage.setItem(`product_${slug}`, JSON.stringify(product));
        setTimeout(() => router.push(`/products/${slug}`), 50);
      }}>
        <RemoveRedEye />
      </span>

      <Divider orientation="horizontal" flexItem />

      <span onClick={handleFavorite}>
        {isFavorite ? <Favorite color="primary" fontSize="small" /> : <FavoriteBorder fontSize="small" color="primary" />}
      </span>

      <Divider orientation="horizontal" flexItem />

      <span onClick={handleAddToCart} style={isLoading ? { pointerEvents: "none", opacity: 0.7 } : undefined}>
        {isLoading ? <CircularProgress size={18} /> : <AddShoppingCart />}
      </span>
    </HoverWrapper>;
}