
"use client";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useContext } from "react";
// LOCAL CUSTOM COMPONENTS
import Card from "./card";
import CardTwo from "./card-2";
import { useGetAllProductsQuery } from "app/store/services";
import { useEffect, useState } from "react";
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
  // Use dynamic banners from context, sorted by displayOrder, fallback to static data
  const carouselData = isLoading || !settings.homepageBanners?.length
    ? mainCarouselData
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
      <div className="bg-white">
        <Container>
          <Box
            sx={{
              width: "100%",
              height: { xs: 300, sm: 300, md: 500 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: '25px',
              backgroundColor: '#f5f5f5'
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <Container>
        <Box
          sx={{
            width: "100%",
            position: "relative",
            "& > div": {
              // Target RootStyle wrapper - override padding and margin for banner carousel
              padding: "0 !important",
              margin: "0 !important",
              height: { xs: 300, sm: 300, md: 500 },
              overflow: "hidden",
              boxShadow: "none !important",
            },
            "& .slick-list": {
              height: { xs: 300, sm: 300, md: 500 },
              overflow: "hidden",
            },
            "& .slick-track": {
              height: { xs: 300, sm: 300, md: 500 },
              display: "flex",
              alignItems: "center",
            },
            "& .slick-slide": {
              height: { xs: 300, sm: 300, md: 500 },
              "& > div": {
                height: "100%",
              },
            },
          }}
        >
          <CarouselNoSSR
            slidesToShow={1}
            arrows={false}
            dots={hasMultiple}
            autoplay={hasMultiple}
            infinite={hasMultiple}
            spaceBetween={10}
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
        </Box>
      </Container>
    </div>
  );
} 
