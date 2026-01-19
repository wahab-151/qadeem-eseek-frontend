"use client";

import { Box, Typography, Container } from "@mui/material";

export default function ProductMaterialSection({ product }) {
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
        Material
      </Typography>

      <Box>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          Materials Care:
        </Typography>
        <Box component="ul" sx={{ pl: 3 }}>
          <Typography component="li" variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
            Content: 100% LENZING™ ECOVERO™ Viscose
          </Typography>
          <Typography component="li" variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
            Care: Hand wash
          </Typography>
          <Typography component="li" variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
            Imported
          </Typography>
          <Typography component="li" variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
            Machine wash max. 30°C. Short spin.
          </Typography>
          <Typography component="li" variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
            Iron maximum 110°C.
          </Typography>
          <Typography component="li" variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
            Do not bleach/bleach.
          </Typography>
          <Typography component="li" variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
            Do not dry clean.
          </Typography>
          <Typography component="li" variant="body2" sx={{ mb: 1, color: "text.secondary" }}>
            Tumble dry, medium heat.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

