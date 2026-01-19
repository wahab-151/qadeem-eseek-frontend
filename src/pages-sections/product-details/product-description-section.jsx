"use client";

import { Box, Typography, Container } from "@mui/material";

export default function ProductDescriptionSection({ product }) {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        sx={{
          mb: 3,
          fontSize: "24px",
          fontWeight: 500,
          lineHeight: 1.27,
          letterSpacing: "0px",
          color: "#271E03",
        }}
      >
        Description
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mb: 3,
          color: "text.secondary",
          lineHeight: 1.8,
          whiteSpace: "pre-line",
        }}
      >
        {product?.description
          ? typeof product.description === "string"
            ? product.description
            : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
      </Typography>

      {/* Additional Material Information */}
      <Box sx={{ mt: 4 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          Additional material information:
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          <Typography component="li" variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
            55% LivaEco™ viscose
          </Typography>
          <Typography component="li" variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
            Viscose 55%
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            lineHeight: 1.8,
            mb: 2,
          }}
        >
          The total weight of the product is calculated excluding minor components. LinenLinen, LivaEco™ viscose, and ViscoseViscose are natural or regenerated cellulosic fibers.
        </Typography>
      </Box>
    </Container>
  );
}

