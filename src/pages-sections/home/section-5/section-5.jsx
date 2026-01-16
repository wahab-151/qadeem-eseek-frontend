'use client'
import { Box, Skeleton, Grid, useTheme, useMediaQuery } from "@mui/material";
import Container from "@mui/material/Container";
import HomeSectionHeader from "components/section-header/home-section-header";

// GLOBAL CUSTOM COMPONENTS
import { CarouselEager as Carousel } from "components/carousel";
import ProductCard2 from "components/product-cards/product-card-2";
import useProducts from "hooks/useProducts";
import { useMemo } from "react";

// Move responsive config outside component to prevent recreation
// xl (>=1536px): 4 cards (default)
// below xl (<1536px): 3 cards
// below md (<900px): 2 cards
// below sm (<600px): 1 card
const responsive = [
  { breakpoint: 1536, settings: { slidesToShow: 3 } },
  { breakpoint: 900, settings: { slidesToShow: 2 } },
  { breakpoint: 600, settings: { slidesToShow: 1 } },
];

// API FUNCTIONS
// import api from "utils/__api__/home";
export default function Section5() {
  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  
  // Responsive spacing: larger on desktop, smaller on mobile
  const spaceBetween = useMemo(() => {
    if (isXl) return 30; // xl and above: 30px
    if (isMd) return 24; // md to lg: 24px
    if (isSm) return 16; // sm: 16px
    return 12; // xs: 12px
  }, [isXl, isMd, isSm]);
  
  const { state } = useProducts();

  // Use useMemo to sort products immediately during render instead of useEffect
  // This prevents the 10-15 second delay after data arrives
  const products = useMemo(() => {
    if (!state?.featured?.length) return [];
    
    // Sort products by displayOrder
    return [...state.featured].sort((a, b) => {
      const ao = typeof a?.displayOrder === "number" ? a.displayOrder : Number.POSITIVE_INFINITY;
      const bo = typeof b?.displayOrder === "number" ? b.displayOrder : Number.POSITIVE_INFINITY;
      return ao - bo;
    });
  }, [state?.featured]);

  return (
    <div className="mt-4 mb-4">
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1240,
          mx: "auto",
          px: { xs: 2, sm: 3 },
        }}
      >
        <HomeSectionHeader
          title="Featured Products"
          description="Explore our exquisite collection of authentic gemstones"
          actionLabel="GO TO SHOP"
          actionHref="/allProducts"
          mb={3}
        />

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
          <Box sx={{ width: "100%", overflow: "hidden" }}>
            <Carousel
              slidesToShow={4}
              responsive={responsive}
              spaceBetween={spaceBetween}
              dots={products?.length > 4} // Only show dots if there are more than 4 products
              arrows={false}
              autoplay={products?.length > 4} // Only autoplay if there are more than 4 products
              infinite={products?.length > 4} // Only infinite scroll if there are more than 4 products
              swipe={products?.length > 4} // Only allow swiping if there are more than 4 products
              draggable={products?.length > 4} // Only allow dragging if there are more than 4 products
              dotColor="#FAE7AF" // Normal color for inactive dots
              activeDotColor="#271E03" // Active color for active dot
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
          </Box>
        )}
      </Container>
    </div>
  );
}