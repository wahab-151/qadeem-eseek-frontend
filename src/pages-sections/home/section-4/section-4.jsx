"use client";
import { Box, CircularProgress, Skeleton, Grid, Link as MuiLink } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useGetAllProductsQuery } from "app/store/services";
import Link from "next/link";
import FlexBox from "components/flex-box/flex-box";

// GLOBAL CUSTOM COMPONENTS
import { CarouselEager as Carousel } from "components/carousel";
import ProductCard2 from "components/product-cards/product-card-2";
import useProducts from "hooks/useProducts";
import { useSnackbar } from "notistack";
import { useMemo } from "react";

// Move responsive config outside component to prevent recreation
const responsive = [
  { breakpoint: 1200, settings: { slidesToShow: 4 } },
  { breakpoint: 950, settings: { slidesToShow: 3 } },
  { breakpoint: 650, settings: { slidesToShow: 2 } },
  { breakpoint: 500, settings: { slidesToShow: 1 } },
];

// API FUNCTIONS
// import api from "utils/__api__/home";
export default function Section4() {
  const { state } = useProducts();
  const theme = useTheme();

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
        {/* Header Section */}
        <FlexBox 
          justifyContent="space-between" 
          alignItems="flex-start" 
          mb={3}
          sx={{ 
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 2, md: 0 }
          }}
        >
          <Box>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "32px", md: "48px" },
                fontWeight: 400,
                fontFamily: "serif",
                lineHeight: 1.2,
                color: "#5D4037", // Dark brown
                mb: 1,
              }}
            >
              New Arrival
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "16px",
                color: "#424242",
                fontWeight: 400,
                lineHeight: 1.5,
              }}
            >
              Explore our exquisite collection of authentic gemstones
            </Typography>
          </Box>
          <Link href="/allProducts" passHref legacyBehavior>
            <MuiLink
              sx={{
                fontSize: "16px",
                color: "#424242",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                cursor: "pointer",
                "&:hover": {
                  color: "#5D4037",
                },
                mt: { xs: 0, md: 2 },
              }}
            >
              GO TO SHOP
            </MuiLink>
          </Link>
        </FlexBox>

        {products?.length === 0  ? (
        <Box sx={{ py: 2 }}>
          <Grid container spacing={2}>
            {Array.from({ length: 4 }).map((_, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
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
            slidesToShow={4}
            responsive={responsive}
            dots={products?.length > 4} // Only show dots if there are more than 4 products
            arrows={false}
            autoplay={products?.length > 4} // Only autoplay if there are more than 4 products
            infinite={products?.length > 4} // Only infinite scroll if there are more than 4 products
            swipe={products?.length > 4} // Only allow swiping if there are more than 4 products
            draggable={products?.length > 4} // Only allow dragging if there are more than 4 products
            dotColor={theme.palette.primary.main} // Primary color for inactive dots
            activeDotColor={theme.palette.primary.main} // Primary color for active dot
            dotStyles={{
              mt: 4,
              mb: 2,
              position: "relative",
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