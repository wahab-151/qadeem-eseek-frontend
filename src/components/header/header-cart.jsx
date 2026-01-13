"use client";

import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useEffect, useState } from "react";
import useCart from "hooks/useCart";
import QadeemButton from "components/QadeemButton";

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
      sx={{
        position: "relative",
        display: "inline-flex",
      }}
    >
      <QadeemButton
        iconOnly
        startIcon={<ShoppingBagOutlinedIcon sx={{ fontSize: 24 }} />}
        onClick={handleClick}
        loading={isLoading}
        disabled={isLoading}
        sx={{
          color: "#424242",
          padding: "8px",
          "&:hover": {
            color: theme.palette.primary.main,
            backgroundColor: "transparent",
          },
        }}
      />
      {/* Cart Count Badge */}
      <Box
        position="absolute"
        top={-1}
        right={-1}
        minWidth={18}
        height={18}
        bgcolor="#424242"
        color="white"
        fontSize={12}
        fontWeight="bold"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="50%"
        px={itemCount > 9 ? 0.5 : 0}
        sx={{
          pointerEvents: "none",
        }}
      >
        {itemCount}
      </Box>
    </Box>
  );
}
