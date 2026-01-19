"use client";

import { Box, CircularProgress, Container, Link as MuiLink } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { Carousel } from "components/carousel";
import { FlexBox } from "components/flex-box";
import Link from "next/link";

// GLOBAL CUSTOM COMPONENTS
import ProductCard1 from "components/product-cards/product-card-1";
import ProductCard2 from "components/product-cards/product-card-2";

// CUSTOM DATA MODEL

// ==============================================================

// ==============================================================

export default function RelatedProducts({ products }) {
  // Loading state: when undefined/null
  if (products == null) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <CircularProgress color="primary" />
        </Box>
      </Container>
    );
  }

  const responsive = [
    { breakpoint: 950, settings: { slidesToShow: 3 } },
    { breakpoint: 650, settings: { slidesToShow: 2 } },
    { breakpoint: 500, settings: { slidesToShow: 1 } },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <FlexBox
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 0 },
          alignItems: { xs: "flex-start", sm: "center" },
        }}
      >
        <Typography
          variant="h3"
          color="text.primary"
          sx={{
            fontSize: { xs: "24px", md: "28px" },
            fontWeight: 600,
          }}
        >
          Related Products - Explore our exquisite collection of authentic gemstones
        </Typography>
        <MuiLink
          component={Link}
          href="/allProducts"
          sx={{
            color: "primary.main",
            textDecoration: "none",
            fontWeight: 600,
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          GO TO SHOP
        </MuiLink>
      </FlexBox>

      {products.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No related products found.
        </Typography>
      ) : (
        <Carousel
          slidesToShow={4}
          responsive={responsive}
          arrowStyles={{
            color: "dark.main",
            backgroundColor: "white",
            top: "40%",
          }}
        >
          {products.map((product) => (
            <ProductCard2 key={product?._id} product={product} />
          ))}
        </Carousel>
      )}
    </Container>
  );
}