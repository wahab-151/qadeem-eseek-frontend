"use client";

import { useTheme } from "@mui/material/styles";
import { Box, Typography, CircularProgress } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useEffect, useState } from "react";
import useCart from "hooks/useCart";

export default function HeaderCart({ onCartClick, isLoading = false }) {
  const [mounted, setMounted] = useState(false);
  const { state } = useCart();
  const theme = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Always show the cart button, even when not mounted (for SSR)
  const itemCount = mounted ? (state?.cart?.reduce((total, item) => total + (item.qty || 0), 0) || 0) : 0;
  const totalPrice = mounted ? (state?.cart?.reduce((total, item) => total + item.qty * item.price, 0) || 0) : 0;

  useEffect(() => {
    if (!mounted) return;
    // console.log("[HeaderCart] counts", {
    //   items: Array.isArray(state?.cart) ? state.cart.length : 0,
    //   itemCount,
    //   totalPrice,
    // });
  }, [mounted, state?.cart, itemCount, totalPrice]);

  const handleClick = (e) => {
    e.preventDefault();
    if (onCartClick) {
      onCartClick();
    }
  };

  return (
    <Box
      component="button"
      onClick={handleClick}
      display="flex"
      gap="4px"
      alignItems="center"
      sx={{
        px: { xs: 1, sm: 1, md: 1.5 },
        py: 0.5,
        borderRadius: "24px",
        height: 47,
        border: `1px solid ${theme.palette.grey[300]}`,
        backgroundColor: "transparent",
        cursor: "pointer",
        transition: "all 0.3s ease",
        position: "relative",
        opacity: isLoading ? 0.7 : 1,
        pointerEvents: isLoading ? "none" : "auto",
        "&:hover": {
          backgroundColor: `${theme.palette.secondary.main}`,
          "& .hover-white": { color: "#fff" },
          "& .hover-border-white": { border: `1px solid ${theme.palette.common.white}` },
          "& .cart-text, & .cart-icon": { color: "#fff" },
          "& .price-badge": {
            backgroundColor: "#fff",
            color: theme.palette.error.main,
          },
        },
      }}
    >
      {isLoading && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={2}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: "24px",
          }}
        >
          <CircularProgress size={18} sx={{ color: theme.palette.secondary.main }} />
        </Box>
      )}
      {/* Cart Icon with Count Badge */}
      <Box position="relative">
        <ShoppingCartOutlinedIcon
          className="cart-icon"
          sx={{ color: "grey.700", fontSize: 24 }}
        />
        {itemCount > 0 && (
          <Box
            position="absolute"
            top={-6}
            right={-6}
            width={18}
            height={18}
            bgcolor="error.main"
            color="white"
            fontSize={12}
            fontWeight="bold"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="50%"
          >
            {itemCount}
          </Box>
        )}
      </Box>

      <Typography
        className="cart-text"
        variant="body2"
        sx={{
          ml: 1,
          color: "grey.800",
          fontWeight: 500,
          display: {
            xs: "none",
            sm: "none",
            md: "none",
            lg: "inline",
          },
        }}
      >
        My cart
      </Typography>

      <Box
        className="price-badge"
        ml={1}
        px={1.5}
        py={0.5}
        bgcolor="error.main"
        color="white"
        borderRadius="999px"
        fontSize="14px"
        fontWeight="bold"
        sx={{
          display: {
            xs: "none",
            sm: "none",
            md: "none",
            lg: "flex",
          },
          transition: "all 0.3s ease",
        }}
      >
        ${totalPrice.toFixed(2)}
      </Box>
    </Box>
  );
}
