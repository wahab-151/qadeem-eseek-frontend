"use client";

import Grid from "@mui/material/Grid2";

// LOCAL CUSTOM COMPONENTS
import CheckoutForm from "../checkout-form";
import CheckoutSummary from "../checkout-summery";
import { Box, Typography } from "@mui/material";
import CheckoutShipTo from "../checkout-summery/checkoutShipTo";
import CheckoutShippingMethod from "../checkout-summery/checkoutShippingMethod";
import { useEffect, useState } from "react";



export default function CheckoutPageView() {

  const [selectedShippingMethod, setSelectedShippingMethod] = useState('ground');

const [checkoutData, setCheckoutData] = useState({});
  useEffect(() => {
    // Check for auth token in localStorage; redirect to '/' if missing
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth-token");
      if (!token) {
        window.location.replace("/home");
      }
    }
  }, []);

// console.log("CheckoutPageView", selectedShippingMethod)
  return <Grid container flexWrap="wrap-reverse" spacing={3}>
    <Grid size={{
      md: 8,
      xs: 12
    }}>
       <CheckoutForm  setSelectedShippingMethod={setSelectedShippingMethod} selectedShippingMethod={selectedShippingMethod}   checkoutData={checkoutData}  onFormChange={setCheckoutData} />
      {/* <CheckoutForm  setSelectedShippingMethod={setSelectedShippingMethod} selectedShippingMethod={selectedShippingMethod}     onFormChange={setCheckoutData} /> */}
    </Grid>

    <Grid size={{
      md: 4,
      xs: 12
    }}>
      <Box>
        <Typography

          variant="h6"
          mb={2}
          sx={{
            px: 2,
            py: 1,

            bgcolor: "#F3F5F9",
            color: "text.primary",
            borderRadius: 8,
            fontSize: "1.20rem",
            fontWeight: "bold"
          }}
        >Order Summary</Typography>
        <CheckoutSummary url={"/checkout"} shipping={selectedShippingMethod} />

      </Box>

      <Box mt={3}>
        <Typography

          variant="h6"
          mb={2}
          sx={{
            px: 2,
            py: 1,

            bgcolor: "#F3F5F9",
            color: "text.primary",
            borderRadius: 8,
            fontSize: "1.20rem",
            fontWeight: "bold"
          }}
        >Ship To</Typography>
        <CheckoutShipTo checkoutData={checkoutData} />

      </Box>

      <Box mt={3}>

        <Typography
          variant="h6"
          mb={2}
          sx={{
            px: 2,
            py: 1,
            bgcolor: "#F3F5F9",
            color: "text.primary",
            borderRadius: 8,
            fontSize: "1.20rem",
            fontWeight: "bold"
          }}
        >
          Shipping Method
        </Typography>
        <CheckoutShippingMethod selectedShippingMethod={selectedShippingMethod} setSelectedShippingMethod={setSelectedShippingMethod} />

      </Box>

    </Grid>
  </Grid>;
}