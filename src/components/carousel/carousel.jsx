"use client";

import { forwardRef, Suspense, lazy } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, CircularProgress } from "@mui/material";

// Dynamic import for react-slick to reduce initial bundle size
const SlickCarousel = lazy(() => import("react-slick"));
// Eager import variant for critical sections (no Suspense fallback flash)
import SlickCarouselEager from "react-slick";

// Load slick styles only when carousel is used (removed from global layout)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// LOCAL CUSTOM COMPONENTS
import CarouselDots from "./components/carousel-dots";
import CarouselArrows from "./components/carousel-arrows";

// STYLED COMPONENT
import { RootStyle } from "./styles";


// ==============================================================


// ==============================================================

const Carousel = forwardRef((props, ref) => {
  const {
    dotColor,
    children,
    arrowStyles,
    dots = false,
    arrows = true,
    slidesToShow = 4,
    spaceBetween = 10,
    dotStyles = {
      mt: 4
    },
    ...others
  } = props;
  const theme = useTheme();
  // const settings = {
  //   dots,
  //   arrows,
  //   slidesToShow,
  //   rtl: theme.direction === "rtl",
  //   ...CarouselArrows({
  //     sx: arrowStyles
  //   }),
  //   ...CarouselDots({
  //     dotColor,
  //     sx: dotStyles
  //   }),
  //   ...others
  // };
  const settings = {
  dots,
  arrows,
  slidesToShow,
  rtl: theme.direction === "rtl",

  // 👉 Add these lines for autoplay
  autoplay: true,
  autoplaySpeed: 3000, // 3 seconds
  infinite: true,
  pauseOnHover: true,

  ...CarouselArrows({
    sx: arrowStyles
  }),
  ...CarouselDots({
    dotColor,
    sx: dotStyles
  }),
  ...others
};

  return <RootStyle space={spaceBetween}>
      <Suspense fallback={<Box sx={{ width: '100%', height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress color="primary" />
      </Box>}>
        <SlickCarousel sx={{border:'1px solid red', width:'100%'}} ref={ref} {...settings}>
          {children}
        </SlickCarousel>
      </Suspense>
    </RootStyle>;
});

Carousel.displayName = 'Carousel';

// Eager variant with direct import and no Suspense
export const CarouselEager = forwardRef((props, ref) => {
  const {
    dotColor,
    children,
    arrowStyles,
    dots = false,
    arrows = true,
    slidesToShow = 4,
    spaceBetween = 10,
    dotStyles = { mt: 4 },
    ...others
  } = props;
  const theme = useTheme();
  const settings = {
    dots,
    arrows,
    slidesToShow,
    rtl: theme.direction === "rtl",
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    pauseOnHover: true,
    ...CarouselArrows({ sx: arrowStyles }),
    ...CarouselDots({ dotColor, sx: dotStyles }),
    ...others
  };
  return <RootStyle space={spaceBetween}>
    <SlickCarouselEager ref={ref} {...settings}>
      {children}
    </SlickCarouselEager>
  </RootStyle>;
});

CarouselEager.displayName = 'CarouselEager';

export default Carousel;