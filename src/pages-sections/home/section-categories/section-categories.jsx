"use client";
import { Box, Skeleton, Grid, useTheme, useMediaQuery } from "@mui/material";
import Container from "@mui/material/Container";
import HomeSectionHeader from "components/section-header/home-section-header";
import { CarouselEager as Carousel } from "components/carousel";
import CategoryCard from "components/category-cards";
import { useState, useEffect, useMemo } from "react";
import api from "utils/__api__/home";

// Responsive carousel config
const responsive = [
  { breakpoint: 1536, settings: { slidesToShow: 3 } },
  { breakpoint: 900, settings: { slidesToShow: 2 } },
  { breakpoint: 600, settings: { slidesToShow: 1 } },
];

export default function SectionCategories() {
  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Responsive spacing
  const spaceBetween = useMemo(() => {
    if (isXl) return 30;
    if (isMd) return 24;
    if (isSm) return 16;
    return 12;
  }, [isXl, isMd, isSm]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.getFeaturedCategories();
        console.log("[SectionCategories] API Response:", response);
        
        // API returns { success, message, data: categories[] }
        const data = response?.data?.data || response?.data || response;
        console.log("[SectionCategories] Parsed data:", data);
        
        if (data && Array.isArray(data) && data.length > 0) {
          // Filter to only show parent categories (level 1)
          // Removed the image filter since API doesn't return images
          const parentCategories = data.filter(cat => cat.level === 1);
          console.log("[SectionCategories] Parent categories:", parentCategories);
          
          // Sort by displayOrder
          const sorted = [...parentCategories].sort((a, b) => {
            const ao = typeof a?.displayOrder === "number" ? a.displayOrder : Number.POSITIVE_INFINITY;
            const bo = typeof b?.displayOrder === "number" ? b.displayOrder : Number.POSITIVE_INFINITY;
            return ao - bo;
          });
          
          console.log("[SectionCategories] Sorted categories:", sorted);
          setCategories(sorted);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

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
          title="Categories"
          description="Explore our wide range of product categories"
          actionLabel="VIEW ALL"
          actionHref="/allProducts"
          mb={3}
        />

        {isLoading || categories.length === 0 ? (
          <Box sx={{ py: 2 }}>
            <Grid container spacing={2}>
              {Array.from({ length: 4 }).map((_, idx) => (
                <Grid item xs={12} sm={6} md={3} key={idx}>
                  <Box sx={{ p: 1 }}>
                    <Skeleton variant="rectangular" height={340} sx={{ borderRadius: 0 }} />
                    <Skeleton height={24} width="60%" sx={{ mt: 2, mx: "auto" }} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Box sx={{ width: "100%", overflow: "hidden" }}>
            <Carousel
              slidesToShow={4}
              responsive={responsive}
              spaceBetween={spaceBetween}
              dots={false} // Dots removed
              arrows={false}
              autoplay={categories.length > 4}
              infinite={categories.length > 4}
              swipe={categories.length > 4}
              draggable={categories.length > 4}
            >
              {categories.map((category) => (
                <CategoryCard key={category._id} category={category} />
              ))}
            </Carousel>
          </Box>
        )}
      </Container>
    </div>
  );
}
