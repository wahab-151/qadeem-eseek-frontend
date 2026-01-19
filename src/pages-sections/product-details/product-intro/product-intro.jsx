"use client";

// MUI
import Grid from "@mui/material/Grid2";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

// LOCAL CUSTOM COMPONENTS
import ProductGallery from "./product-gallery";

// STYLED COMPONENTS
import { StyledRoot } from "./styles";
import ProductPrice from "components/product-cards/product-price";
import { FlexBox } from "components/flex-box";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, useTheme } from "@mui/material";
import useUser from "hooks/useUser";
import OrderQuantity from "pages-sections/mini-cart/components/productQuantity";
import useAddToCart from "hooks/useAddToCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import QadeemButton from "components/QadeemButton";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ShareIcon from "@mui/icons-material/Share";

// CUSTOM DATA MODEL

// ================================================================

// ================================================================

export default function ProductIntro({
  // slug,
  isLoading,
  product,
  // userRole=USERTYPE_FRANCHISE
}) {
  const { state } = useUser();
  const { enqueueSnackbar } = useSnackbar();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("L");
  const [selectedColor, setSelectedColor] = useState("#FFC107");
  const router = useRouter();
  const theme = useTheme();
  const { addToCart } = useAddToCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const dark = theme.palette.dark || {
    main: "#1F2937",
    contrastText: "#e9edf8",
  };

  // Size options
  const sizes = ["L", "XL", "XS"];

  // Color options
  const colors = [
    { name: "Black", value: "#000000" },
    { name: "Gold", value: "#FFC107" },
    { name: "Brown", value: "#8B4513" },
  ];

  // Calculate average rating
  const averageRating =
    product?.reviews?.length > 0
      ? product.reviews.reduce((sum, review) => sum + (review.rating || 0), 0) /
        product.reviews.length
      : 4.5;

  const handleBuyNow = async () => {
    if (!product) return;

    setIsBuyingNow(true);
    try {
      const productData = {
        id: product._id,
        title: product.name,
        price: product.price,
        pricing: product?.pricing,
        thumbnail: product?.images?.[0]?.preview || "/assets/images/logo.jpeg",
        slug: product.name,
        stock: product?.stock,
        category: product?.category,
        sku: product?.sku || "",
      };

      await addToCart(productData, quantity, product?.category?._id);

      // Navigate to checkout
      if (typeof window !== "undefined" && window.NProgress) {
        window.__navTriggerType = "buy-now";
        window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
        window.__startTimeRef && (window.__startTimeRef.current = Date.now());
        window.NProgress.start();
      }
      router.push("/checkout");
    } catch (error) {
      if (error?.message === "LOGIN_REQUIRED" || error?.status === 401) {
        const currentPath = window.location.pathname + window.location.search;
        router.push(
          `/login?id=${product._id}&qty=${quantity}&category=${product?.category?._id}&returnTo=${encodeURIComponent(currentPath)}`
        );
      } else {
        enqueueSnackbar(error?.message || "Failed to add to cart", {
          variant: "error",
        });
      }
    } finally {
      setIsBuyingNow(false);
    }
  };

  const handleAddToCartClick = async () => {
    if (!product) return;

    setIsAddingToCart(true);
    try {
      const productData = {
        id: product._id,
        title: product.name,
        price: product.price,
        pricing: product?.pricing,
        thumbnail: product?.images?.[0]?.preview || "/assets/images/logo.jpeg",
        slug: product.name,
        stock: product?.stock,
        category: product?.category,
        sku: product?.sku || "",
      };

      await addToCart(productData, quantity, product?.category?._id);
      enqueueSnackbar("Product added to cart", { variant: "success" });
    } catch (error) {
      if (error?.message === "LOGIN_REQUIRED" || error?.status === 401) {
        const currentPath = window.location.pathname + window.location.search;
        router.push(
          `/login?id=${product._id}&qty=${quantity}&category=${product?.category?._id}&returnTo=${encodeURIComponent(currentPath)}`
        );
      } else {
        enqueueSnackbar(error?.message || "Failed to add to cart", {
          variant: "error",
        });
      }
    } finally {
      setIsAddingToCart(false);
    }
  };
  return (
    <StyledRoot>
      <Grid container spacing={3} justifyContent="space-around">
        {/* IMAGE GALLERY AREA */}

        {isLoading || !product ? (
          <>
            <Grid size={{ lg: 5, md: 7, xs: 12 }}>
              <Box sx={{ p: 2 }}>
                <Box
                  sx={{ bgcolor: "grey.200", borderRadius: 2, height: 360 }}
                />
              </Box>
            </Grid>
            <Grid size={{ lg: 6, md: 5, xs: 12 }}>
              <Box sx={{ p: 2 }}>
                <Box
                  sx={{
                    bgcolor: "grey.200",
                    height: 34,
                    mb: 2,
                    borderRadius: 1,
                  }}
                />
                <Box
                  sx={{
                    bgcolor: "grey.200",
                    height: 20,
                    mb: 1,
                    width: "60%",
                    borderRadius: 1,
                  }}
                />
                <Box
                  sx={{
                    bgcolor: "grey.200",
                    height: 20,
                    mb: 1,
                    width: "40%",
                    borderRadius: 1,
                  }}
                />
                <Box
                  sx={{
                    bgcolor: "grey.200",
                    height: 48,
                    mt: 3,
                    width: 220,
                    borderRadius: 999,
                  }}
                />
              </Box>
            </Grid>
          </>
        ) : (
          <>
            <Grid
              size={{
                lg: 5,
                md: 7,
                xs: 12,
              }}
            >
              <ProductGallery images={product?.images} />
            </Grid>

            {/* PRODUCT INFO AREA */}
            <Grid
              size={{
                lg: 6,
                md: 5,
                xs: 12,
              }}
            >
              {/* PRODUCT NAME */}
              <Typography
                variant="h1"
                sx={{
                  fontSize: "42px",
                  fontWeight: 400,
                  color: "#000000",
                }}
              >
                {product?.name}
              </Typography>

              {/* PRICE */}
              <FlexBox className="price" alignItems="center" gap={1} mb={2}>
                <ProductPrice
                  price={product?.price}
                  discount={product?.pricing}
                  fontSizeIncrease={true}
                  quantity={quantity}
                  userLoggedIn={state?.user?.id ? true : false}
                />
              </FlexBox>

              {/* RATING */}
              <FlexBox alignItems="center" gap={2} mb={3}>
                <Rating
                  value={averageRating}
                  readOnly
                  precision={0.5}
                  sx={{
                    "& .MuiRating-iconFilled": {
                      color: "#FFC107",
                    },
                    "& .MuiRating-iconEmpty": {
                      color: "#E0E0E0",
                    },
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    color: "#9E9E9E",
                    fontWeight: 400,
                    fontSize: "14px",
                    borderLeft: "1px solid #E0E0E0",
                    paddingLeft: "20px",
                  }}
                >
                  {averageRating.toFixed(1)} Customer <br /> Review
                </Typography>
              </FlexBox>

              {/* DESCRIPTION SNIPPET */}
              <Typography
                variant="body2"
                sx={{
                  mb: 3,
                  color: "text.secondary",
                  lineHeight: 1.6,
                }}
              >
                {product?.description
                  ? typeof product.description === "string"
                    ? product.description.substring(0, 200)
                    : "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique."}
                {product?.description &&
                  typeof product.description === "string" &&
                  product.description.length > 200 &&
                  "..."}
              </Typography>

              {/* SIZE OPTIONS */}
              <Box mb={3}>
                <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 500 }}>
                  Size:
                </Typography>
                <FlexBox gap={1.5} flexWrap="wrap">
                  {sizes.map((size) => (
                    <QadeemButton
                      key={size}
                      variant={selectedSize === size ? "contained" : "outlined"}
                      onClick={() => setSelectedSize(size)}
                      sx={{
                        minWidth: "30px",
                        width: "30px",
                        height: "30px",
                        borderRadius: "5px",
                        borderColor:
                          selectedSize === size ? "#FAE7AF" : "#FEFAF0",
                        backgroundColor:
                          selectedSize === size ? "#FAE7AF" : "#FEFAF0",
                        color: "#271E03",
                        fontWeight: 400,
                        fontSize: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        padding: 0,
                        boxShadow: "none",
                        "&:hover": {
                          borderColor:
                            selectedSize === size ? "#FAE7AF" : "#FEFAF0",
                          backgroundColor:
                            selectedSize === size ? "#FAE7AF" : "#FEFAF0",
                          boxShadow: "none",
                        },
                      }}
                    >
                      {size}
                    </QadeemButton>
                  ))}
                </FlexBox>
              </Box>

              {/* COLOR OPTIONS */}
              <Box mb={3}>
                <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 500 }}>
                  Color:
                </Typography>
                <FlexBox gap={1.5} flexWrap="wrap">
                  {colors.map((color) => (
                    <Box
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      sx={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: color.value,
                        // border:
                        //   selectedColor === color.value
                        //     ? `2px solid ${color.value === "#000000" || color.value === "#000" ? "#FAE7AF" : "#000000"}`
                        //     : "2px solid #E0E0E0",
                        border: `2px solid ${selectedColor === color.value ? `${color.value === "#000000" || color.value === "#000" ? "#FAE7AF" : "#271E03"}` : "#9b9b9b"}`,
                        cursor: "pointer",
                        transition: "all 0.2s",
                        "&:hover": {
                          transform: "scale(1.1)",
                        },
                      }}
                    />
                  ))}
                </FlexBox>
              </Box>

              <FlexBox
                sx={{
                  gap: 2,
                  mb: 3,
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                    md: "column",
                    lg: "column",
                    xl: "row",
                  },
                }}
              >
                <OrderQuantity
                  quantity={quantity}
                  onChange={setQuantity}
                  max={product?.stock || 99}
                />

                <QadeemButton
                  variant="contained"
                  color="primary"
                  onClick={handleBuyNow}
                  loading={isBuyingNow}
                  disabled={product?.stock === 0}
                  sx={{
                    minWidth: "150px",
                    height: "48px",
                  }}
                >
                  Buy Now
                </QadeemButton>
                <QadeemButton
                  variant="outlined"
                  color="primary"
                  onClick={handleAddToCartClick}
                  loading={isAddingToCart}
                  disabled={product?.stock === 0}
                  startIcon={<ShoppingCartIcon />}
                  sx={{
                    minWidth: "150px",
                    height: "48px",
                  }}
                >
                  Add to Cart
                </QadeemButton>
              </FlexBox>

              {/* STORE INFORMATION */}
              <Box
                sx={{
                  mt: 4,
                }}
              >
                <Typography
                  component="button"
                  variant="h6"
                  onClick={() => {
                    // Handle click if needed
                  }}
                  sx={{
                    mb: 2,
                    fontWeight: 700,
                    color: "#271E03",
                    textDecoration: "underline",
                    textUnderlineOffset: "4px",
                    cursor: "pointer",
                    border: "none",
                    background: "none",
                    padding: 0,
                    font: "inherit",
                    "&:hover": {
                      opacity: 0.8,
                    },
                  }}
                >
                  View Store Information
                </Typography>

                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                >
                  {/* Estimated Delivery */}
                  <FlexBox alignItems="center" gap={1}>
                    <AccessTimeIcon
                      sx={{ color: "#705D27", fontSize: "20px" }}
                    />
                    <Typography variant="body2" sx={{ color: "#705D27" }}>
                      Estimated Delivery:{" "}
                      <Box component="span" sx={{ fontWeight: 700 }}>
                        12-26 days
                      </Box>{" "}
                      (International),{" "}
                      <Box component="span" sx={{ fontWeight: 700 }}>
                        3-6 days
                      </Box>{" "}
                      (Pakistan)
                    </Typography>
                  </FlexBox>

                  {/* Return Policy */}
                  <FlexBox alignItems="center" gap={1}>
                    <AssignmentReturnIcon
                      sx={{ color: "#705D27", fontSize: "20px" }}
                    />
                    <Typography variant="body2" sx={{ color: "#705D27" }}>
                      Return within{" "}
                      <Box component="span" sx={{ fontWeight: 700 }}>
                        45 days
                      </Box>{" "}
                      of purchase. Duties & taxes are non-refundable
                    </Typography>
                  </FlexBox>

                  {/* Action Links - Horizontal Layout */}
                  <FlexBox
                    alignItems="center"
                    gap={3}
                    sx={{
                      mt: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    <FlexBox alignItems="center" gap={1}>
                      <LocalShippingIcon
                        sx={{ color: "#705D27", fontSize: "20px" }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#705D27",
                          cursor: "pointer",
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        Delivery & Return
                      </Typography>
                    </FlexBox>

                    <FlexBox alignItems="center" gap={1}>
                      <HelpOutlineIcon
                        sx={{ color: "#705D27", fontSize: "20px" }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#705D27",
                          cursor: "pointer",
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        Ask A Question
                      </Typography>
                    </FlexBox>

                    <FlexBox alignItems="center" gap={1}>
                      <ShareIcon sx={{ color: "#705D27", fontSize: "20px" }} />
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#705D27",
                          cursor: "pointer",
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        Share
                      </Typography>
                    </FlexBox>
                  </FlexBox>
                </Box>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </StyledRoot>
  );
}
