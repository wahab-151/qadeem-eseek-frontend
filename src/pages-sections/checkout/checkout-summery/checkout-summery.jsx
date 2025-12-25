"use client";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMemo } from "react";

// LOCAL CUSTOM COMPONENT
import ListItem from "./list-item";

// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";

// GLOBAL CUSTOM HOOK
import useCart from "hooks/useCart";
import { usePathname } from "next/navigation";
import { getShippingCost } from "utils/helpers";




export default function CheckoutSummary({ url, shipping }) {
  const pathname = usePathname();
  const { state } = useCart();
  
  // Memoize subtotal calculation to prevent recalculation on every render
  const subTotal = useMemo(() => {
    return state?.cart?.reduce((acc, item) => acc + (item?.price || 0) * (item?.qty || 0), 0) || 0;
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
    <Card sx={{ p: 3, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)" }}>
      <ListItem mb={1} title="Subtotal" value={subTotal.toFixed(2)} />
      <ListItem mb={1} title="Shipping" value={shippingLabel.toFixed(2)} />
      <ListItem
        title="Grand Total"
        value={total.toFixed(2)}
        titleSx={{
          color: "green",
          fontWeight: "bold",
          fontSize: "1.2rem",
        }}
        valueSx={{
          color: "red",
          fontWeight: "bold",
          fontSize: "1.2rem",
        }}
      />
    </Card>
  );
}