"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";

// MUI ICON COMPONENTS
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import CircularProgress from "@mui/material/CircularProgress";
import { enqueueSnackbar } from "notistack";

// GLOBAL CUSTOM HOOKS
import useCart from "hooks/useCart";

// CUSTOM COMPONENTS
import { FavoriteButton, AddToCartButton, QuickViewButton } from "./styles";

// CUSTOM DATA MODEL


// ==============================================================


// ==============================================================

export default function HoverActions({
  product
}) {
  const {
    slug,
    id,
    title,
    price,
    thumbnail
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
  return <Fragment>
      {/* ADD TO CART BUTTON */}
      <AddToCartButton className="product-actions" onClick={handleAddToCart} style={isLoading ? { pointerEvents: "none", opacity: 0.7 } : undefined}>
        {isLoading ? <CircularProgress size={18} /> : <AddShoppingCart className="icon" fontSize="small" />}
      </AddToCartButton>

      {/* PRODUCT FAVORITE BUTTON */}
      <FavoriteButton className="product-actions" onClick={handleFavorite}>
        {isFavorite ? <Favorite className="icon" fontSize="small" color="primary" /> : <FavoriteBorder className="icon" fontSize="small" />}
      </FavoriteButton>

      {/* PRODUCT QUICK VIEW BUTTON */}
      <div className="quick-view-btn">
        <QuickViewButton fullWidth size="large" color="dark" variant="contained" className="product-view-action" onClick={() => {
          if (typeof window !== 'undefined' && window.NProgress) {
            window.NProgress.start();
          }
          sessionStorage.setItem(`product_${slug}`, JSON.stringify(product));
          setTimeout(() => router.push(`/products/${slug}`), 50);
        }}>
          Quick View
        </QuickViewButton>
      </div>
    </Fragment>;
}