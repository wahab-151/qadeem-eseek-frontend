// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import LoadingButton from "@mui/lab/LoadingButton";
// import Add from "@mui/icons-material/Add";
// import { enqueueSnackbar } from "notistack";

// // GLOBAL CUSTOM HOOKS
// import useAddToCart from "hooks/useAddToCart";

// // CUSTOM DATA MODEL

// // ==============================================================

// // ==============================================================

// export default function AddToCart({
//   product
// }) {
//   const {
//     id,
//     slug,
//     title,
//     price,
//     thumbnail
//   } = product;
  
//   const { addToCart, isLoading } = useAddToCart();
//   const router = useRouter();

//   const handleAddToCart = async () => {
//     // Prepare product data for the unified hook
//     const productData = {
//       id,
//       title,
//       price,
//       pricing: product?.pricing,
//       thumbnail,
//       slug,
//       stock: product?.stock,
//       category: product?.category,
//       sku: product?.sku || "",
//     };

//     await addToCart(productData, 1, product?.category?._id);
    
//     // Navigate to mini cart after adding, preserving origin for return on close
//     const from = typeof window !== 'undefined' 
//       ? `${window.location.pathname}${window.location.search}` 
//       : '/';
//     router.push(`/mini-cart?from=${encodeURIComponent(from)}`, {
//       scroll: false
//     });
//   };

//   return (
//     <LoadingButton 
//       color="primary" 
//       variant="outlined" 
//       disabled={isLoading} 
//       onClick={handleAddToCart} 
//       sx={{
//         padding: "3px",
//         alignSelf: "self-end"
//       }}
//     >
//       <Add fontSize="small" />
//     </LoadingButton>
//   );
// }

"use client";

import LoadingButton from "@mui/lab/LoadingButton";
import Add from "@mui/icons-material/Add";
import useAddToCart from "hooks/useAddToCart";

export default function AddToCart({ product }) {
  const { id, slug, title, price, thumbnail, category, stock, sku } = product;
  const { addToCart, isLoading } = useAddToCart();

  const handleAddToCart = async () => {
    // Prepare product data
    const productData = { id, title, price, thumbnail, slug, stock, category, sku };

    // useAddToCart hook handles:
    // - Login check and redirect if needed
    // - Adding to cart
    // - Success/error notifications
    await addToCart(productData, 1, category?._id);
  };

  return (
    <LoadingButton
      color="primary"
      variant="outlined"
      disabled={isLoading}
      onClick={handleAddToCart}
      sx={{ padding: "3px", alignSelf: "self-end" }}
    >
      <Add fontSize="small" />
    </LoadingButton>
  );
}
