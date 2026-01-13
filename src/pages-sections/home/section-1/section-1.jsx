
"use client";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
// LOCAL CUSTOM COMPONENTS
import Card from "./card";
import CardTwo from "./card-2";
import { useGetAllProductsQuery } from "app/store/services";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { useSnackbar } from "notistack";
// GLOBAL CUSTOM COMPONENTS
// Disable SSR for the carousel to avoid hydration mismatches from react-slick DOM mutations
// Import the named export `Carousel` from the barrel file
const CarouselNoSSR = dynamic(() => import("components/carousel").then(m => m.Carousel), { ssr: false });
import CarouselCard1 from "components/carousel-cards/carousel-card-1";
import api from "utils/__api__/market-1";
import { mainCarouselData, logoUrl } from "utils/constants";
import { SettingsContext } from "contexts/SettingContext";



export default function Section1() {
  const { settings, isLoading } = useContext(SettingsContext);
  const theme = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  
  // Default rug images
  const defaultRugImages = [
    "https://static.vecteezy.com/system/resources/thumbnails/070/869/194/small/pile-of-decorative-rugs-and-carpets-with-intricate-patterns-free-photo.jpg",
    "https://plus.unsplash.com/premium_photo-1725295198378-d286934e2735?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aXJhbmlhbiUyMGNhcnBldHxlbnwwfHwwfHx8MA%3D%3D",
    "https://static-01.daraz.pk/p/6e88c7e266408ff5dbb25e158f6035fa.jpg"
  ];
  
  // Use dynamic banners from context, sorted by displayOrder, fallback to default rug images
  const carouselData = isLoading || !settings.homepageBanners?.length
    ? defaultRugImages
    : [...(settings?.homepageBanners || [])]
        .sort((a, b) => {
          const ao = typeof a?.displayOrder === "number" ? a.displayOrder : Number.POSITIVE_INFINITY;
          const bo = typeof b?.displayOrder === "number" ? b.displayOrder : Number.POSITIVE_INFINITY;
          return ao - bo;
        })
        .map(banner => banner.imageUrl);
  
  const displayData = carouselData;
  const hasMultiple = displayData.length > 1;

  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <div className="bg-white" style={{ overflowX: 'hidden' }}>
        <Box
          sx={{
            width: "100%",
            height: { xs: 500, sm: 600, md: 717 },
            position: "relative",
            borderRadius: 0,
            backgroundColor: '#000000',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Container
            maxWidth="lg"
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <CircularProgress sx={{ color: '#ffffff' }} />
          </Container>
        </Box>
      </div>
    );
  }

  return (
    <div className="bg-white" style={{ overflowX: 'hidden' }}>
      <Box
        sx={{
          width: "100%",
          position: "relative",
            "& > div": {
              // Target RootStyle wrapper - override padding and margin for banner carousel
              padding: "0 !important",
              margin: "0 !important",
              height: { xs: 500, sm: 600, md: 717 },
              overflow: "hidden",
              boxShadow: "none !important",
              borderRadius: "0px !important",
            },
            "& .slick-list": {
              height: { xs: 500, sm: 600, md: 717 },
              overflow: "hidden",
            },
            "& .slick-track": {
              height: { xs: 500, sm: 600, md: 717 },
              display: "flex",
              alignItems: "center",
            },
            "& .slick-slide": {
              height: { xs: 500, sm: 600, md: 717 },
              "& > div": {
                height: "100%",
              },
            },
          }}
        >
          <CarouselNoSSR
            ref={carouselRef}
            slidesToShow={1}
            arrows={false}
            dots={false}
            autoplay={hasMultiple}
            infinite={hasMultiple}
            spaceBetween={10}
            beforeChange={(current, next) => setCurrentSlide(next)}
            responsive={[
              {
                breakpoint: 1200,
                settings: {
                  slidesToShow: 1,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                },
              },
            ]}
          >
            {displayData.map((item, ind) => (
              <CarouselCard1
                key={item || ind}
                src={item}
                index={ind}
              />
            ))}
          </CarouselNoSSR>
          {/* Custom Dots Indicator - Vertical on the right */}
          {hasMultiple && (
            <Box
              sx={{
                position: "absolute",
                right: { xs: "12px", sm: "20px", md: "30px" },
                top: 0,
                bottom: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                zIndex: 10,
              }}
            >
              {displayData.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => {
                    if (carouselRef.current) {
                      carouselRef.current.slickGoTo(index);
                    }
                  }}
                  sx={{
                    width: 12,
                    height: currentSlide === index ? 36 : 12,
                    borderRadius: 6,
                    bgcolor: currentSlide === index ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: currentSlide === index ? "#ffffff" : "rgba(255, 255, 255, 0.7)",
                    },
                  }}
                />
              ))}
            </Box>
          )}
        </Box>
    </div>
  );
} 
