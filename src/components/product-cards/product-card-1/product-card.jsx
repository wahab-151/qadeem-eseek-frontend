"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";

// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import useUser from "hooks/useUser";
import { useLoading } from "contexts/LoadingContext";

// LOCAL CUSTOM COMPONENTS
import AddToCart from "./add-to-cart";
import ProductPrice from "../product-price";
import ProductTitle from "../product-title";
import DiscountChip from "../discount-chip";
import FavoriteButton from "./favorite-button";

// STYLED COMPONENTS
import { ImageWrapper, ContentWrapper, StyledCard, HoverIconWrapper } from "./styles";

// CUSTOM DATA MODEL


// ========================================================


// ========================================================

export default function ProductCard1({
  product,
  showProductSize,
  showRating = true
}) {
  const { state } = useUser();
  const router = useRouter();
  const { showProductCardLoader } = useLoading();
  const [isNavigating, setIsNavigating] = useState(false);
  const {
    slug,
    title,
    price,
    thumbnail,
    rating,
    discount
  } = product;

  const handleLinkClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Start route transition loader immediately for better feedback
    try {
      if (typeof window !== 'undefined' && window.NProgress) {
        window.__navTriggerType = 'product-card';
        window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
        window.__startTimeRef && (window.__startTimeRef.current = Date.now());
        window.NProgress.start();
      }
    } catch {}
    
    // Store the full product object in sessionStorage for instant loading
    sessionStorage.setItem(`product_${slug}`, JSON.stringify(product));
    
    // Prefetch route for faster transition and navigate immediately
    try { router.prefetch(`/products/${slug}`); } catch (_) {}
    router.push(`/products/${slug}`);
  };

  const handleMouseEnter = () => {
    try { router.prefetch(`/products/${slug}`); } catch (_) {}
  };

  return <StyledCard elevation={6}>
      <ImageWrapper>
        {/* DISCOUNT PERCENT CHIP IF AVAILABLE */}
        <DiscountChip discount={discount} />

        {/* HOVER ACTION ICONS */}
        <HoverIconWrapper className="hover-box">
          <Link href={`/products/${slug}/view`} scroll={false}>
            <IconButton color="inherit">
              <RemoveRedEye fontSize="small" color="inherit" />
            </IconButton>
          </Link>

          <FavoriteButton />
        </HoverIconWrapper>

        {/* PRODUCT IMAGE / THUMBNAIL */}
        <div onClick={handleLinkClick} onMouseEnter={handleMouseEnter} style={{ cursor: 'pointer' }}>
          <LazyImage priority alt={title} width={500} height={500} src={thumbnail} className="thumbnail" />
        </div>
      </ImageWrapper>

      <ContentWrapper>
        <div className="content">
          {/* PRODUCT NAME / TITLE */}
          <ProductTitle title={title} slug={slug} />

          {/* PRODUCT RATINGS IF AVAILABLE */}
          {/* {showRating && <Rating size="small" value={rating} color="warn" readOnly />} */}

          {/* PRODUCT SIZE IF AVAILABLE */}
          {showProductSize ? <p className="size">Liter</p> : null}

          {/* PRODUCT PRICE WITH DISCOUNT */}
          <ProductPrice discount={discount} price={price} userLoggedIn={state?.user?.id ? true : false} />
        </div>

        {/* ADD TO CART BUTTON */}
        <AddToCart product={product} /> 
      </ContentWrapper>
    </StyledCard>;
}