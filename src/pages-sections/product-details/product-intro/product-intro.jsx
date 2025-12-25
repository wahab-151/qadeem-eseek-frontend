"use client";
import Link from "next/link";

// MUI
import Grid from "@mui/material/Grid2";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

// LOCAL CUSTOM COMPONENTS
import AddToCart from "./add-to-cart";
import ProductGallery from "./product-gallery";
import ProductVariantSelector from "./product-variant-selector";

// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";

// STYLED COMPONENTS
import { StyledRoot } from "./styles";
import ProductPrice from "components/product-cards/product-price";
import { FlexBox } from "components/flex-box";
import { USERTYPE_FRANCHISE } from "utils/constants";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { useGetProductByIdQuery } from "app/store/services";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ProductTabs from "../product-tabs";
import ProductDescription from "../product-description";
import useUser from "hooks/useUser";

// CUSTOM DATA MODEL

// ================================================================

// ================================================================

export default function ProductIntro({
  // slug,
  isLoading,
  product,
  // userRole=USERTYPE_FRANCHISE
}) {
  const{state}=useUser()
  // const { enqueueSnackbar } = useSnackbar(
  const [quantity, setQuantity] = useState(1);
  const router=useRouter()
  const theme = useTheme();
  const dark = theme.palette.dark || {
    main: "#1F2937",
    contrastText: "#e9edf8",
  };
  // console.log("produccttttttt",product , isLoading)
  return (
    <StyledRoot>
      <Grid container spacing={3} justifyContent="space-around">
        {/* IMAGE GALLERY AREA */}

        {isLoading || !product ? (
          <>
            <Grid
              size={{ lg: 5, md: 7, xs: 12 }}
            >
              <Box sx={{ p: 2 }}>
                <Box sx={{ bgcolor: "grey.200", borderRadius: 2, height: 360 }} />
              </Box>
            </Grid>
            <Grid
              size={{ lg: 6, md: 5, xs: 12 }}
            >
              <Box sx={{ p: 2 }}>
                <Box sx={{ bgcolor: "grey.200", height: 34, mb: 2, borderRadius: 1 }} />
                <Box sx={{ bgcolor: "grey.200", height: 20, mb: 1, width: "60%", borderRadius: 1 }} />
                <Box sx={{ bgcolor: "grey.200", height: 20, mb: 1, width: "40%", borderRadius: 1 }} />
                <Box sx={{ bgcolor: "grey.200", height: 48, mt: 3, width: 220, borderRadius: 999 }} />
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
                  mb: 1,
                }}
              >
                {product?.name}
              </Typography>

              <Box
                display="flex"
                gap={2}
                flexWrap="wrap"
                alignItems="start"
                flexDirection={"column"}
                mb={2}
              >
                {/* STOCK CHIP */}
                <Chip
                  label={product?.stock > 0 ? "In stock" : "Out of stock"}
                  color={product?.stock > 0 ? "success" : "error"}
                  variant="soft"
                  sx={{ mb: 2, fontSize: "14px", fontWeight: "bold" }}
                />
                {/* SKU Block */}
                <Box
                  display="flex"
                  alignItems="center"
                  bgcolor="grey.300"
                  px={2}
                  py={1}
                  borderRadius={6}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight={"700"}
                    mr={1}
                  >
                    SKU
                  </Typography>
                  <Typography
                    variant="body2"
                    color="primary.main"
                    fontWeight={500}
                    mr={1}
                  >
                    {product?.sku || "N/A"}
                  </Typography>
                  <Tooltip title="Copy SKU">
                    <IconButton
                      size="small"
                      onClick={() =>
                        navigator.clipboard.writeText(product?.sku || "")
                      }
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>

                {/* Bin Number Block */}
                {product?.bin && (
                  <Box
                    display="flex"
                    alignItems="center"
                    bgcolor="grey.100"
                    px={2}
                    py={1}
                    borderRadius={2}
                  >
                    <Typography variant="body2" color="text.secondary" mr={1}>
                      New Bin Number
                    </Typography>
                    <Typography
                      variant="body2"
                      color="primary.main"
                      fontWeight={500}
                    >
                      {product?.bin}
                    </Typography>
                  </Box>
                )}
              </Box>
              {/* PRODUCT BRAND */}
              {product?.brand && (
                <p className="brand">
                  Brand: <strong>{product.brand}</strong>
                </p>
              )}

              {/* PRODUCT RATING */}
              {/* <div className="rating">
            <span>Rated:</span>
            <Rating readOnly color="warn" size="small" value={product.rating} />
            <Typography variant="h6">({product.reviews?.length || 0})</Typography>
          </div> */}

              {/* PRODUCT VARIANTS */}
              {/* <ProductVariantSelector /> */}

              {/* PRICE & STOCK */}

              <FlexBox className="price" alignItems="center" gap={1} mt={0.5}>
                {/* <Typography variant="h2" sx={{
            color: "primary.main",
            mb: 0.5,
            lineHeight: 1
          }}>
              {currency(product?.pricing?.other?.price)}
            </Typography>  */}
                <ProductPrice
                  price={product?.price}
                  discount={product?.pricing}
                  fontSizeIncrease={true}
                  quantity={quantity}
                  userLoggedIn={state?.user?.id ? true : false}
                />
              </FlexBox>

              {/* ADD TO CART BUTTON */}
              <AddToCart
                product={product}
                quantity={quantity}
                setQuantity={setQuantity}
              />

              {/* SHOP NAME*/}
              {/*  {product.shop && <p className="shop">
              Sold By:
              <Link href={`/shops/${product.shop.slug}`}>
                <strong>{product.shop.name}</strong>
              </Link>
            </p>} */}

              {/* PRODUCT TAGS */}
              {product?.tags?.length > 0 && (
                <Box
                  mt={3}
                  display="flex"
                  alignItems="center"
                  gap={1}
                  sx={{ overflowX: "auto", whiteSpace: "nowrap" }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    color="text.secondary"
                  >
                    Search By Tags:
                  </Typography>

                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {product?.tags?.map((tag, index) => (
                      <Button
                        key={index}
                        onClick={() => router.push(`/allProducts?tag=${tag}&view=grid`)}
                        variant="contained"
                        disableElevation
                        sx={{
                          borderRadius: "999px",
                          px: 2,
                          py: 0.5,
                          fontSize: "0.75rem",
                          textTransform: "none",
                          backgroundColor: dark.main,
                          color: dark.contrastText,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.getContrastText(
                              theme.palette.primary.main
                            ),
                          },
                        }}
                      >
                        {tag}
                      </Button>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Delivery info bar removed per request */}
            </Grid>
          </>
        )}
      </Grid>
      <ProductTabs
        description={<ProductDescription models={product?.models} data={product?.description} />}
        // reviews={<ProductReviews />}
      />
    </StyledRoot>
  );
}
