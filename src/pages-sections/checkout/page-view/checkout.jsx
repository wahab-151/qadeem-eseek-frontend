"use client";

import Grid from "@mui/material/Grid2";
import Link from "next/link";
import { Box, Typography, Container, Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useEffect, useState } from "react";

// LOCAL CUSTOM COMPONENTS
import CheckoutForm from "../checkout-form";
import CheckoutSummary from "../checkout-summery";

// CONSTANTS
const BANNER_IMAGE = "/assets/images/cart-hero.png";

export default function CheckoutPageView() {
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState("ground");
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

  return (
    <Box sx={{ bgcolor: "#fff", minHeight: "100vh", pb: 8 }}>
      {/* 1. HERO BANNER */}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: 200, md: 280, lg: 400 },
          width: "100%",
          backgroundImage: `url(${BANNER_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 6,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
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
              fontWeight: 600,
              color: "#FEFAF0",
              fontSize: { xs: "36px", md: "48px" },
              mb: 2,
              letterSpacing: 1,
            }}
          >
            Check Out
          </Typography>
          <Breadcrumbs
            separator={
              <NavigateNextIcon fontSize="small" sx={{ color: "#FEFAF0" }} />
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
              Check Out
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      {/* 2. MAIN CONTENT */}
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* LEFT COLUMN: FORM */}
          <Grid size={{ xs: 12, md: 7 }}>
            <CheckoutForm
              setSelectedShippingMethod={setSelectedShippingMethod}
              selectedShippingMethod={selectedShippingMethod}
              checkoutData={checkoutData}
              onFormChange={setCheckoutData}
            />
          </Grid>

          {/* RIGHT COLUMN: SUMMARY */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ position: { md: "sticky" }, top: { md: 100 } }}>
              <CheckoutSummary
                url={"/checkout"}
                shipping={selectedShippingMethod}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
