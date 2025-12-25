"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// MUI
import Divider from "@mui/material/Divider";
import LoadingButton from "@mui/lab/LoadingButton";
import { enqueueSnackbar } from "notistack";

// MUI ICON COMPONENTS
import Add from "@mui/icons-material/Add";
import Favorite from "@mui/icons-material/Favorite";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";

// GLOBAL CUSTOM HOOKS
import useCart from "hooks/useCart";

// STYLED COMPONENTS
import { HoverButtonBox, ItemController } from "./styles";

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
  const [isLoading, setLoading] = useState(false);
  const [isFavorite, setFavorite] = useState(false);
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
  return <HoverButtonBox className="hoverButtonBox">
      <div className="buttonBox">
        <ItemController>
          <span onClick={() => {
            if (typeof window !== 'undefined' && window.NProgress) {
              window.NProgress.start();
            }
            sessionStorage.setItem(`product_${slug}`, JSON.stringify(product));
            setTimeout(() => router.push(`/products/${slug}`), 50);
          }}>
            <RemoveRedEye />
          </span>

          <Divider orientation="vertical" flexItem />

          <span onClick={handleFavorite}>
            {isFavorite ? <Favorite color="primary" fontSize="small" /> : <FavoriteBorder color="primary" fontSize="small" />}
          </span>

          <Divider orientation="vertical" flexItem />

          <span onClick={handleAddToCart}>
            <AddShoppingCart />
          </span>
        </ItemController>

        <LoadingButton color="primary" variant="outlined" disabled={isLoading} onClick={handleAddToCart} className="addCartButton">
          <Add /> Add to Cart
        </LoadingButton>
      </div>
    </HoverButtonBox>;
}