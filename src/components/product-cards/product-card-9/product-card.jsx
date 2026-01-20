'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";

// LOCAL CUSTOM COMPONENTS
import DiscountChip from "../discount-chip";
import ProductPrice from "../product-price";
import ProductTags from "./components/tags";
import AddToCartButton from "./components/add-to-cart";
import FavoriteButton from "./components/favorite-button";
import AddToCart from "../../../pages-sections/product-details/product-intro/add-to-cart";
// CUSTOM DATA MODEL


// STYLED COMPONENT
import { ContentWrapper, Wrapper } from "./styles";
import { useState } from "react";
import useUser from "hooks/useUser";
import { useLoading } from "contexts/LoadingContext";


// ===========================================================
// all products list view card

// ===========================================================

export default function ProductCard9({
  product
}) {
  let {
    slug,
    _id,
    name,
    price,
    images:rawImages,
    rating,
    pricing
  } = product;
 const [quantity, setQuantity] = useState(1);
 const { state } = useUser()
 const router = useRouter();
 const { showProductCardLoader } = useLoading();
 const images= Array.isArray(rawImages) && rawImages.length > 0
  ? rawImages
  : [{ preview: "/assets/images/logo.jpeg" }]

  const handleLinkClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Show loader immediately on card click
    showProductCardLoader();
    
    // Use slug for SEO-friendly URLs, fallback to _id
    const productKey = slug || _id;
    
    // Store the full product object in sessionStorage for instant loading
    sessionStorage.setItem(`product_${productKey}`, JSON.stringify(product));
    
    // Navigate after small delay to let loader render
    setTimeout(() => {
      router.push(`/products/${productKey}`);
    }, 50);
  };

  return <Wrapper>
      {/* PRODUCT FAVORITE BUTTON */}
      {/* <FavoriteButton /> */}

      <ContentWrapper>
        <div className="img-wrapper" sx={{height:"100%"}}>
          {/* DISCOUNT PERCENT CHIP IF AVAILABLE */}
        {state?.user?.id &&  <DiscountChip price={price} discount={pricing} />}

          {/* PRODUCT IMAGE / THUMBNAIL */}
          <LazyImage src={images[0]?.preview ||"/assets/images/logo.jpeg"} alt={name} width={500} height={500} />
        </div>

        <div className="content">
          <div>
            {/* PRODUCT TAG LIST */}
            {/* <ProductTags tags={["Bike", "Motor", "Ducati"]} /> */}

            {/* PRODUCT TITLE / NAME */}
            <div  style={{ cursor: 'pointer' }}>
              <Typography variant="h4" sx={{
              mt: 1,
              mb: 2
            }}>
                {name}
              </Typography>
            </div>

            {/* PRODUCT RATING / REVIEW  */}
            {/* <Rating size="small" value={rating} color="warn" readOnly /> */}

            {/* PRODUCT PRICE */}
            <ProductPrice 
              price={price} 
              discount={pricing}  
              quantity={quantity} 
              userLoggedIn={state?.user?.id ? true : false} 
            />
          </div>

          {/* PRODUCT ADD TO CART BUTTON */}
             <AddToCart product={product} buttonStack="column" quantity={quantity}
                setQuantity={setQuantity} />
          {/* <AddToCartButton product={product} /> */}
        </div>
      </ContentWrapper>
    </Wrapper>;
}