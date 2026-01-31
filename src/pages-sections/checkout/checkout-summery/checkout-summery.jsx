"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useMemo } from "react";
import useCart from "hooks/useCart";
import { getShippingCost } from "utils/helpers";

export default function CheckoutSummary({ shipping }) {
  const { state } = useCart();

  // Memoize subtotal calculation
  const subTotal = useMemo(() => {
    return (
      state?.cart?.reduce(
        (acc, item) => acc + (item?.price || 0) * (item?.qty || 0),
        0,
      ) || 0
    );
  }, [state?.cart]);

  // Memoize shipping cost calculation
  const shippingLabel = useMemo(() => {
    return getShippingCost(shipping, subTotal);
  }, [shipping, subTotal]);

  // Memoize total calculation
  const total = useMemo(() => {
    return subTotal + shippingLabel;
  }, [subTotal, shippingLabel]);

  return (
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
          {subTotal.toFixed(0)}
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
          {shippingLabel.toFixed(0)}
        </Typography>
      </Box>

      {/* Total */}
      <Box display="flex" justifyContent="space-between" mb={4} mt={3}>
        <Typography fontSize="20px" color="text.secondary">
          Total
        </Typography>
        <Typography fontSize="32px" fontWeight="500">
          {total.toFixed(0)}
        </Typography>
      </Box>

      {/* Place Order Button */}
      {/* Linked to the form in checkout-form via id="checkout-form" */}
      <Button
        type="submit"
        form="checkout-form"
        fullWidth
        variant="contained"
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
        }}
      >
        Place Order
      </Button>
    </Box>
  );
}
