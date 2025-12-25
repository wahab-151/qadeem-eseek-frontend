"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";

// MUI
import Favorite from "@mui/icons-material/Favorite";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

// STYLED COMPONENTS
import { StyledIconButton, FavoriteButton } from "./styles";


// ==============================================================


// ==============================================================

export default function HoverActions({
  slug,
  product
}) {
  const router = useRouter();
  const [isFavorite, setFavorite] = useState(false);
  const handleFavorite = () => {
    setFavorite(state => !state);
  };
  return <Fragment>
      {/* PRODUCT VIEW BUTTON */}
      <StyledIconButton className="product-actions" onClick={() => {
        if (typeof window !== 'undefined' && window.NProgress) {
          window.NProgress.start();
        }
        if (product) {
          sessionStorage.setItem(`product_${slug}`, JSON.stringify(product));
        }
        setTimeout(() => router.push(`/products/${slug}`), 50);
      }}>
        <RemoveRedEye color="disabled" fontSize="small" />
      </StyledIconButton>

      {/* PRODUCT FAVORITE BUTTON */}
      <FavoriteButton className="product-actions" onClick={handleFavorite}>
        {isFavorite ? <Favorite color="primary" fontSize="small" /> : <FavoriteBorder color="disabled" fontSize="small" />}
      </FavoriteButton>
    </Fragment>;
}