"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSnackbar } from "notistack";
import axios from "utils/axiosInstance";

// GLOBAL CUSTOM COMPONENTS
import ProductCard2 from "components/product-cards/product-card-2";
import CartSkeleton from "../cart-skeleton";

// MUI
import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import CircularProgress from "@mui/material/CircularProgress";

// MUI Icons
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
// Custom Hooks & Services
import useCart from "hooks/useCart";
import useUser from "hooks/useUser";
import { useGetUserCartQuery, useUpdateCartMutation } from "app/store/services";

// ------------- CONSTANTS & STYLES -------------
// Replace with actual carpet image if available. Using a generic path or the one found.
// If the user provided image is available via URL, we would use that, but for local we use assets.
const BANNER_IMAGE = "/assets/images/cart-hero.png";

// Colors from design/guide
const COLORS = {
  primary: "#FAE7AF", // Gold/Bronze
  text: "#2C2416", // Dark Brown/Black
  border: "#E0E0E0",
  bgLight: "#FEFAF0", // Warm Cream
  secondaryText: "#705D27",
};

export default function CartPageView() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = useCart();
  const { state: userState } = useUser();

  // ----------------- STATE & LOGIC (PRESERVED) -----------------
  const [filteredCart, setFilteredCart] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [authLoading, setAuthLoading] = useState(true);

  // Auth Loading Logic to prevent empty flash
  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth-token") : null;

    // If user is loaded, auth is done
    if (userState?.user?.id) {
      setAuthLoading(false);
    }
    // If no token in storage, definitively guest (auth done)
    else if (!token) {
      setAuthLoading(false);
    }
    // If token exists but user not loaded, keep loading (implied)
  }, [userState?.user?.id]);

  // Fetch Related Products
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const { data } = await axios.get("/api/products/special");
        // Use mostPopular products as related items
        // API response structure: { success: true, data: { products: { mostPopular: [...] } } }
        const products = data?.data?.products?.mostPopular || [];
        setRelatedProducts(products);
      } catch (error) {
        console.error("Failed to fetch related products:", error);
      }
    };
    fetchRelatedProducts();
  }, []);

  // API Hooks
  const {
    isLoading: cartLoading,
    isFetching: cartFetching,
    error: cartError,
  } = useGetUserCartQuery(userState?.user?.id, {
    skip: !userState?.user?.id,
  });

  const [updateCart] = useUpdateCartMutation(userState?.user?.id, {
    skip: !userState?.user?.id,
  });

  // Sync state.cart to filteredCart
  useEffect(() => {
    setFilteredCart(state.cart || []);
  }, [state.cart]);

  // Sync with Backend
  useEffect(() => {
    const updatedCart = Array.isArray(state?.cart) ? state.cart : [];
    const sanitized = updatedCart
      .filter((item) => item && item.id && Number.isFinite(Number(item.qty)))
      .map((item) => ({
        ...item,
        qty: Number(item.qty),
        price: Number(item.price || 0),
      }));

    if (sanitized.length !== updatedCart.length) {
      dispatch({ type: "SET_CART", payload: sanitized });
    }

    if (sanitized.length > 0 && userState?.user?.id) {
      updateCart(sanitized)
        .unwrap()
        .catch((e) => console.warn(e));
    }
  }, [state.cart, dispatch, updateCart, userState?.user?.id]);

  // Handler: Update Quantity
  const handleQuantityChange = (item, newQty) => {
    if (newQty < 1) return; // Minimum 1
    if (item.stock && newQty > item.stock) {
      enqueueSnackbar("Out of stock", { variant: "error" });
      return;
    }
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { ...item, qty: newQty, stock: item?.stock },
    });
  };

  // Handler: Remove Item
  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
    enqueueSnackbar("Item removed", { variant: "info" });
  };

  // Calculations
  const subtotal = state.cart.reduce(
    (acc, item) => acc + Number(item?.price || 0) * Number(item?.qty || 0),
    0,
  );
  const shipping = 180; // Hardcoded from design
  const total = subtotal + shipping;

  // ----------------- RENDER -----------------

  // We show skeleton if:
  // - Auth is still initializing (checking token/user)
  // - Cart is loading/fetching
  const isCartLoading = authLoading || cartLoading || cartFetching;

  return (
    <Box sx={{ bgcolor: "#fff", minHeight: "100vh", pb: 8 }}>
      {/* 1. HERO BANNER (Static) */}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: 200, md: 393 },
          width: "100%",
          backgroundImage: `url(${BANNER_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 8,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark overlay
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            color: "#fff",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              color: "#FEFAF0",
              fontSize: "52px",
              mb: 2,
              letterSpacing: 1,
            }}
          >
            Shopping Cart
          </Typography>
          <Breadcrumbs
            separator={
              <NavigateNextIcon fontSize="16px" sx={{ color: "#FEFAF0" }} />
            }
            aria-label="breadcrumb"
            sx={{
              justifyContent: "center",
              display: "flex",
              color: "#FEFAF0",
              "& .MuiBreadcrumbs-li": { color: "#FEFAF0" },
            }}
          >
            <Link
              href="/"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "1rem",
              }}
            >
              Home
            </Link>
            <Typography color="inherit" fontSize="1rem">
              Cart
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      {/* 2. LOADING STATE */}
      {isCartLoading ? (
        <CartSkeleton />
      ) : cartError ? (
        /* 3. ERROR STATE */
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h5" color="error" sx={{ mb: 2 }}>
            Something went wrong while fetching your cart.
          </Typography>
          <Typography color="text.secondary">
            {cartError?.data?.message ||
              cartError?.error ||
              JSON.stringify(cartError)}
          </Typography>
        </Box>
      ) : filteredCart.length === 0 ? (
        /* 4. EMPTY STATE */
        <Container maxWidth="lg">
          <Box
            py={8}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <ShoppingBagOutlined
              sx={{ fontSize: 60, color: "#E2C572", mb: 2 }}
            />
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "18px",
                color: "#271E03",
                mb: 3,
              }}
            >
              Your cart is currently empty.
            </Typography>
            <Button
              LinkComponent={Link}
              href="/"
              variant="contained"
              sx={{
                bgcolor: "#2B2118",
                color: "#fff",
                px: 4,
                py: 1.5,
                textTransform: "none",
                fontSize: "0.9rem",
                borderRadius: 0,
                "&:hover": {
                  bgcolor: "#1a130e",
                },
              }}
            >
              Return to Shop
            </Button>
          </Box>
        </Container>
      ) : (
        /* 5. MAIN CONTENT (Products + Summary) */
        <Container maxWidth="lg">
          <Grid container spacing={8}>
            {/* LEFT COLUMN: PRODUCTS */}
            <Grid size={{ xs: 12, md: 8 }}>
              {/* Table Header */}
              <Box
                display={{ xs: "none", md: "grid" }}
                gridTemplateColumns="1.5fr 2fr 1fr 1fr 1fr 0.5fr"
                sx={{ borderBottom: `2px solid ${COLORS.text}`, pb: 2, mb: 3 }}
              >
                <Typography
                  fontWeight="bold"
                  color={COLORS.secondaryText}
                  fontSize="0.9rem"
                >
                  Product
                </Typography>
                <Typography
                  fontWeight="bold"
                  color={COLORS.secondaryText}
                  fontSize="0.9rem"
                >
                  Name
                </Typography>
                <Typography
                  fontWeight="bold"
                  color={COLORS.secondaryText}
                  fontSize="0.9rem"
                >
                  Color
                </Typography>
                <Typography
                  fontWeight="bold"
                  color={COLORS.secondaryText}
                  fontSize="0.9rem"
                  textAlign="center"
                >
                  Quantity
                </Typography>
                <Typography
                  fontWeight="bold"
                  color={COLORS.secondaryText}
                  fontSize="0.9rem"
                  textAlign="right"
                >
                  Price
                </Typography>
                <Box />
              </Box>

              {/* Product List */}
              {filteredCart.map((item) => (
                <Box
                  key={item.id}
                  display="grid"
                  gridTemplateColumns={{
                    xs: "1fr",
                    md: "1.5fr 2fr 1fr 1fr 1fr 0.5fr",
                  }}
                  alignItems="center"
                  gap={2}
                  sx={{ py: 3 }}
                >
                  {/* Image */}
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: "#f5f5f5",
                      borderRadius: 1,
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={item.thumbnail || "/no-image.jpg"}
                      alt={item.title}
                      width={80}
                      height={80}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </Box>

                  {/* Name */}
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 400,
                        fontSize: { xs: "16px", md: "24px" },
                        color: "#271E03",
                        lineHeight: "95%",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      Handmade Item
                    </Typography>
                  </Box>

                  {/* Color (Placeholder) */}
                  <Box display="flex" alignItems="center">
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        bgcolor: "#000",
                        border: "1px solid #ddd",
                      }}
                    />
                    <Typography
                      ml={1}
                      color="text.secondary"
                      display={{ xs: "inline", md: "none" }}
                    >
                      Black
                    </Typography>
                  </Box>

                  {/* Quantity */}
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent={{ xs: "flex-start", md: "center" }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => handleQuantityChange(item, item.qty - 1)}
                      sx={{ color: COLORS.text }}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography
                      mx={1}
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 400,
                        fontSize: "32px",
                        color: "#000000",
                        lineHeight: "90%",
                      }}
                    >
                      {item.qty}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleQuantityChange(item, item.qty + 1)}
                      sx={{ color: COLORS.text }}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  {/* Price */}
                  <Typography
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 400,
                      fontSize: "24px",
                      color: "#000000",
                      lineHeight: "90%",
                      textAlign: { xs: "left", md: "right" },
                    }}
                  >
                    Rs {Number(item.price).toFixed(0)}
                  </Typography>

                  {/* Remove */}
                  <Box textAlign="right">
                    <IconButton
                      onClick={() => handleRemove(item.id)}
                      size="small"
                      sx={{ color: "#999" }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Grid>

            {/* RIGHT COLUMN: SUMMARY */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  border: "1px solid #000",
                  p: 4,
                  backgroundColor: "#fff",
                  height: "fit-content",
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={4}
                >
                  <Typography
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: "24px",
                      color: "#271E03",
                      lineHeight: "147.5%",
                    }}
                  >
                    Order Summary
                  </Typography>
                  <Typography fontSize="24px" color="text.secondary">
                    Rs
                  </Typography>
                </Box>

                {/* Subtotal */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  mb={2}
                  pb={2}
                  borderBottom="1px solid #eee"
                >
                  <Typography fontSize="20px" color="text.secondary">
                    Subtotal
                  </Typography>
                  <Typography fontSize="20px" fontWeight="500">
                    {subtotal.toFixed(0)}
                  </Typography>
                </Box>

                {/* Shipping */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  mb={2}
                  pb={2}
                  borderBottom="1px solid #eee"
                >
                  <Typography fontSize="20px" color="text.secondary">
                    Shipping
                  </Typography>
                  <Typography fontSize="20px" fontWeight="500">
                    {shipping}
                  </Typography>
                </Box>

                {/* Total */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  mb={4}
                  mt={3}
                >
                  <Typography fontSize="20px" color="text.secondary">
                    Total
                  </Typography>
                  <Typography fontSize="32px" fontWeight="500">
                    {total.toFixed(0)}
                  </Typography>
                </Box>

                {/* Checkout Button */}
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => router.push("/checkout")}
                  disabled={filteredCart.length === 0}
                  sx={{
                    bgcolor: "#2B2118", // Dark brown/black
                    color: "#fff",
                    py: 1.5,
                    textTransform: "none",
                    fontSize: "0.9rem",
                    borderRadius: 0,
                    "&:hover": {
                      bgcolor: "#1a130e",
                    },
                    "&:disabled": {
                      bgcolor: "#ccc",
                    },
                  }}
                >
                  Check out
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      )}
      {/* RELATED PRODUCTS SECTION */}
      <Container maxWidth="lg">
        <Box mt={12} mb={5}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-end"
            mb={4}
          >
            <Box>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  fontSize: "52px",
                  color: "#271E03",
                  lineHeight: "90%",
                  mb: 1,
                }}
              >
                Related Products
              </Typography>
              <Typography color="text.secondary" fontSize="0.9rem">
                Explore our exquisite collection of authentic gemstones
              </Typography>
            </Box>
            <MuiLink
              component={Link}
              href="/shops"
              underline="none"
              sx={{
                fontSize: "14px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "#271E03",
                pb: "2px",
                borderBottom: `2px solid ${COLORS.primary}`,
                "&:hover": {
                  borderBottomColor: COLORS.text,
                },
              }}
            >
              GO TO SHOP
            </MuiLink>
          </Box>

          {/* Related Products Grid */}
          <Grid container spacing={3}>
            {relatedProducts.length > 0
              ? relatedProducts.slice(0, 4).map((product) => (
                  <Grid
                    size={{ xs: 12, sm: 6, md: 3 }}
                    key={product._id || product.id || product.slug}
                  >
                    <ProductCard2 product={product} />
                  </Grid>
                ))
              : // Loading/Empty State
                [1, 2, 3, 4].map((i) => (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                    <Box
                      sx={{
                        bgcolor: "#f5f5f5",
                        height: 350,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CircularProgress size={20} />
                    </Box>
                  </Grid>
                ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
