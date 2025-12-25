"use client";
import { Box, CircularProgress, Skeleton, Grid } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useGetAllProductsQuery } from "app/store/services";

// GLOBAL CUSTOM COMPONENTS
import { CarouselEager as Carousel } from "components/carousel";
import ProductCard2 from "components/product-cards/product-card-2";
import useProducts from "hooks/useProducts";
import { useSnackbar } from "notistack";
import { useMemo } from "react";

// Move responsive config outside component to prevent recreation
const responsive = [
  { breakpoint: 950, settings: { slidesToShow: 3 } },
  { breakpoint: 650, settings: { slidesToShow: 1 } },
  { breakpoint: 500, settings: { slidesToShow: 1 } },
];

// API FUNCTIONS
// import api from "utils/__api__/home";
export default function Section4() {
  const { state } = useProducts();

  // Use useMemo to sort products immediately during render instead of useEffect
  // This prevents the 10-15 second delay after data arrives
  const products = useMemo(() => {
    if (!state?.mostPopular?.length) return [];
    
    // Sort products by displayOrder
    return [...state.mostPopular].sort((a, b) => {
      const ao = typeof a?.displayOrder === "number" ? a.displayOrder : Number.POSITIVE_INFINITY;
      const bo = typeof b?.displayOrder === "number" ? b.displayOrder : Number.POSITIVE_INFINITY;
      return ao - bo;
    });
  }, [state?.mostPopular]);

  return (
    <div className="mt-4 mb-4">
      <Container>
      <Typography
  variant="h2"
  sx={{
    mb: "2rem",
    lineHeight: 1,
    color: (theme) => theme.palette.secondary.main,
    textShadow: "3px 3px 8px rgba(0,0,0,0.2)",
  }}
>
 Most Popular
</Typography>
        {products?.length === 0  ? (
        <Box sx={{ py: 2 }}>
          <Grid container spacing={2}>
            {Array.from({ length: 5 }).map((_, idx) => (
              <Grid item xs={12} sm={6} md={3} lg={2.4} key={idx}>
                <Box sx={{ p: 1 }}>
                  <Skeleton variant="rectangular" height={220} sx={{ borderRadius: 2 }} />
                  <Skeleton height={18} width="80%" sx={{ mt: 1 }} />
                  <Skeleton height={18} width="60%" sx={{ mt: 0.5 }} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        )  : (
          <Carousel
            slidesToShow={5}
            responsive={responsive}
            arrowStyles={{
              color: "dark.main",
              backgroundColor: "white",
              top: "40%",
            }}
          >
            
            {products?.map((product) => (
              <ProductCard2 key={product?._id} product={product} />
            ))}
          </Carousel>
        )}
      </Container>
    </div>
  );
}