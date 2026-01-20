"use client";
import { useState, useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { keyframes } from "@mui/material";
import { CarouselEager as Carousel } from "components/carousel";
import QadeemButton from "components/QadeemButton";
import LazyImage from "components/LazyImage";
import Link from "next/link";
import LaunchIcon from "@mui/icons-material/Launch";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import api from "utils/__api__/home";

// Define keyframe animation for image entering from right
const slideFromRight = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

// Define keyframe animation for image exiting to left
const slideToLeft = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

// Sample category data - replace with actual API call if needed
const defaultCategories = [
  {
    id: 1,
    name: "Hardware",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
  },
  {
    id: 2,
    name: "Gemstones",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
  },
  {
    id: 3,
    name: "Handicrafts",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    id: 4,
    name: "Traditional Items",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  {
    id: 5,
    name: "Artisan Products",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
  },
];

// Category Card Component
const CategoryCard = ({
  category,
  index,
  animationKey,
  isTransitioning,
  previousFirstId,
  previousFirstImage,
  previousFirstName,
  previousSecondId,
  previousSecondImage,
  debug,
  transitionMs,
}) => {
  // First image should be bigger, others smaller
  const isFirst = index === 0;
  const isSecond = index === 1;
  const isFirstEntering =
    isFirst && isTransitioning && previousFirstId !== category.id;
  const isSecondEntering =
    isSecond && isTransitioning && previousSecondId !== category.id;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        // Increased height for first item, decreased for others
        height: isFirst
          ? { xs: 400, sm: 500, md: 600 }
          : { xs: 300, sm: 350, md: 450 },
        borderRadius: 0,
        overflow: "hidden",
        cursor: "pointer",
        transition: "height 0.3s ease", // Smooth transition if height changes dynamically
        // Prevent flickering during transitions
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "translateZ(0)", // Force hardware acceleration
      }}
    >
      {debug && (isFirst || isSecond) && (
        <Box
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            zIndex: 20,
            bgcolor: "rgba(0,0,0,0.7)",
            color: "#fff",
            px: 1,
            py: 0.5,
            fontSize: 11,
            lineHeight: 1.2,
            fontFamily: "monospace",
            maxWidth: "95%",
            borderRadius: 1,
          }}
        >
          <div>{`pos=${index} ${isFirst ? "FIRST" : "SECOND"}`}</div>
          <div>{`id=${category?.id} prev1=${previousFirstId} prev2=${previousSecondId}`}</div>
          <div style={{ opacity: 0.85 }}>
            {`img=${String(category?.image || "").slice(0, 38)}`}
          </div>
          {isTransitioning && (
            <div style={{ opacity: 0.85 }}>
              {`prev2img=${String(previousSecondImage || "").slice(0, 30)}`}
            </div>
          )}
        </Box>
      )}

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden", // Ensure the sliding image doesn't overflow
          backgroundColor: "#000", // Prevent background from showing through
        }}
      >
        {/* Exit animation for previous first image sliding out to left */}
        {isFirst &&
          isTransitioning &&
          previousFirstId &&
          previousFirstId !== category.id &&
          previousFirstImage && (
            <Box
              key={`exit-first-${previousFirstId}-${animationKey}`}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 2,
                animation: `${slideToLeft} ${transitionMs}ms ease-in-out forwards`,
                willChange: "transform",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "translateZ(0)", // Force hardware acceleration
                opacity: 1, // Ensure full opacity
              }}
            >
              <LazyImage
                src={previousFirstImage}
                alt="Previous category"
                fill
                style={{
                  objectFit: "cover",
                }}
                priority
                loading="eager"
              />
            </Box>
          )}

        {/* Exit animation for previous second image sliding out to left */}
        {/* This is the image that was in second position, now moving to first */}
        {isSecond &&
          isTransitioning &&
          previousSecondId &&
          previousSecondId !== category.id &&
          previousSecondImage && (
            <Box
              key={`exit-second-${previousSecondId}-${animationKey}`}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 2,
                animation: `${slideToLeft} ${transitionMs}ms ease-in-out forwards`,
                willChange: "transform",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "translateZ(0)", // Force hardware acceleration
                opacity: 1, // Ensure full opacity
              }}
            >
              <LazyImage
                src={previousSecondImage}
                alt="Previous second category"
                fill
                style={{
                  objectFit: "cover",
                }}
                priority
                loading="eager"
              />
            </Box>
          )}
        
        {/* Enter animation for new first or second image sliding in from right */}
        {/* Base card handles entering animation; no extra overlays to avoid double slides */}
        {
          <Box
            key={
              isFirst
                ? `big-${category.id}-${isTransitioning ? animationKey : category.id}`
                : isSecond
                  ? `small-${category.id}-${isTransitioning ? animationKey : category.id}`
                  : `small-${category.id}`
            }
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex:
                isFirstEntering || isSecondEntering
                  ? 1
                  : isTransitioning && (isFirst || isSecond)
                    ? 0
                    : "auto",
              animation:
                (isFirstEntering || isSecondEntering) && isTransitioning
                  ? `${slideFromRight} ${transitionMs}ms ease-in-out forwards`
                  : "none",
              willChange:
                isFirstEntering || isSecondEntering || isFirst || isSecond
                  ? "transform"
                  : "auto",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "translateZ(0)", // Force hardware acceleration
              opacity: 1, // Ensure full opacity at all times
              // Ensure image is always rendered and ready
              visibility: "visible",
            }}
          >
            <LazyImage
              src={category.image}
              alt={category.name}
              fill
              style={{
                objectFit: "cover",
              }}
              priority={isFirst || isSecond}
              loading={isFirst || isSecond ? "eager" : "lazy"}
            />
          </Box>
        }
      </Box>

      {/* White box at bottom left - Only show on first image */}
      {isFirst && (
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            display: "flex",
            alignItems: "stretch", // Ensure equal height for text box and arrow button
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            width: "100%",
            minHeight: 60,
            zIndex: 10, // Keep above images during transitions
          }}
        >
          <Box
            sx={{
              px: 3,
              py: 2,
              display: "flex",
              alignItems: "center",
              position: "relative",
              flex: 1, // Make it take full width
              backgroundColor: "rgba(255, 255, 255, 0.5)", // White with 0.5 opacity
            }}
          >
            {/* Previous label - fade out (overlaps with new label for seamless transition) */}
            {isTransitioning &&
              previousFirstId &&
              previousFirstId !== category.id &&
              previousFirstName && (
                <Typography
                  key={`prev-label-${previousFirstId}-${animationKey}`}
                  sx={{
                    position: "absolute",
                    fontFamily: "serif",
                    fontSize: { xs: "18px", md: "24px" },
                    fontWeight: 600,
                    color: "#2B2B2B",
                    textAlign: "center",
                    width: "100%",
                    lineHeight: 1.2,
                    opacity: 1,
                    animation: "fadeOutLabel 0.4s ease-in-out forwards",
                    "@keyframes fadeOutLabel": {
                      "0%": { opacity: 1 },
                      "50%": { opacity: 0.5 },
                      "100%": { opacity: 0 },
                    },
                  }}
                >
                  {previousFirstName}
                </Typography>
              )}

            {/* Current label - fade in (overlaps with old label for seamless transition) */}
            <Typography
              key={`current-label-${category.id}-${animationKey}`}
              sx={{
                fontFamily: "serif",
                fontSize: { xs: "18px", md: "24px" },
                fontWeight: 600,
                color: "#2B2B2B",
                textAlign: "center",
                width: "100%",
                lineHeight: 1.2,
                opacity:
                  isTransitioning && previousFirstId !== category.id ? 0 : 1,
                animation:
                  isTransitioning && previousFirstId !== category.id
                    ? "fadeInLabel 0.4s ease-in-out 0.1s forwards"
                    : "none",
                "@keyframes fadeInLabel": {
                  "0%": { opacity: 0 },
                  "50%": { opacity: 0.5 },
                  "100%": { opacity: 1 },
                },
                transition: isTransitioning
                  ? "none"
                  : "opacity 0.2s ease-in-out",
              }}
            >
              {category.name}
            </Typography>
          </Box>

          {/* Arrow Button Part */}
          <Box
            sx={{
              width: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#2B1F17", // Dark brown background for arrow
              color: "white",
              cursor: "pointer",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#422f24",
              },
            }}
          >
            <LaunchIcon
              fontSize="small"
              sx={{
                fontSize: "20px",
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

// Responsive config for carousel
const responsive = [
  { breakpoint: 1200, settings: { slidesToShow: 2 } },
  { breakpoint: 960, settings: { slidesToShow: 1 } },
  { breakpoint: 600, settings: { slidesToShow: 1 } },
];

export default function Categoriescarousel() {
  const DEBUG_CAROUSEL = false;
  const RIGHT_PEEK_PX = 140; // how much of the next card should be visible on the right
  const BASE_TRANSITION_MS = 700;
  const FAST_TRANSITION_MS = 220;
  const [categories, setCategories] = useState(defaultCategories);
  const [isLoading, setIsLoading] = useState(true);
  const carouselRef = useRef(null);

  useEffect(() => {
    // Try to fetch categories from API
    const fetchCategories = async () => {
      try {
        const response = await api.getFeaturedCategories();
        // API returns { success, message, data: categories[] }
        const data = response?.data?.data || response?.data || response;
        if (data && Array.isArray(data) && data.length > 0) {
          // Filter to only show parent categories (level 1) that have images
          const parentCategories = data.filter(cat => cat.level === 1 && cat.image);
          // Transform API data to match our structure
          const transformed = parentCategories.map((cat, index) => ({
            id: cat._id || cat.id || index,
            name: cat.name || "Category",
            image:
              cat.image ||
              defaultCategories[index % defaultCategories.length].image,
          }));
          if (transformed.length > 0) {
            setCategories(transformed);
          }
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Keep default categories on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const [rotatedCategories, setRotatedCategories] = useState(categories);
  const rotationLockRef = useRef(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousFirstId, setPreviousFirstId] = useState(null);
  const [previousFirstImage, setPreviousFirstImage] = useState(null);
  const [previousFirstName, setPreviousFirstName] = useState(null);
  const [previousSecondId, setPreviousSecondId] = useState(null);
  const [previousSecondImage, setPreviousSecondImage] = useState(null);
  const [transitionMs, setTransitionMs] = useState(BASE_TRANSITION_MS);
  const autoplayTimerRef = useRef(null);
  const rotatedCategoriesRef = useRef([]);
  const dotNavTokenRef = useRef(0);
  const isDotNavigatingRef = useRef(false);
  const transitionMsRef = useRef(BASE_TRANSITION_MS);

  // Sync rotated categories when categories change
  useEffect(() => {
    setRotatedCategories(categories);
  }, [categories]);

  // Keep a ref to the latest rotatedCategories to avoid stale closures (autoplay + rapid clicks)
  useEffect(() => {
    rotatedCategoriesRef.current = rotatedCategories;
  }, [rotatedCategories]);

  useEffect(() => {
    transitionMsRef.current = transitionMs;
  }, [transitionMs]);

  // Ensure carousel starts at slide 0 (only on initial load, not during transitions)
  useEffect(() => {
    if (
      !isLoading &&
      !isTransitioning &&
      carouselRef.current &&
      carouselRef.current.slickGoTo
    ) {
      carouselRef.current.slickGoTo(0, false);
    }
  }, [isLoading]);

  const startAutoplayTimer = () => {
    if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    autoplayTimerRef.current = setInterval(() => {
      if (rotationLockRef.current) return;
      if (isDotNavigatingRef.current) return;

      rotationLockRef.current = true;
      const current = rotatedCategoriesRef.current || [];
      const currentFirst = current[0];
      const currentSecond = current[1];
      setPreviousFirstId(currentFirst?.id);
      setPreviousFirstImage(currentFirst?.image);
      setPreviousFirstName(currentFirst?.name);
      setPreviousSecondId(currentSecond?.id);
      setPreviousSecondImage(currentSecond?.image);
      setIsTransitioning(true);

      setAnimationKey((prev) => prev + 1);
      setRotatedCategories((prev) => rotateCategoriesForward(prev));

      setTimeout(() => {
        setIsTransitioning(false);
        setPreviousFirstId(null);
        setPreviousFirstImage(null);
        setPreviousFirstName(null);
        setPreviousSecondId(null);
        setPreviousSecondImage(null);
        rotationLockRef.current = false;
      }, transitionMsRef.current + 20);
    }, 3000);
  };

  // Custom autoplay that rotates array without sliding
  useEffect(() => {
    if (isLoading) return;

    startAutoplayTimer();

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isLoading]);

  // Rotate categories array: move first item to end, making second item first
  const rotateCategoriesForward = (categoriesArray) => {
    if (categoriesArray.length === 0) return categoriesArray;
    const rotated = [...categoriesArray];
    const firstItem = rotated.shift(); // Remove first item
    rotated.push(firstItem); // Add it to the end
    return rotated;
  };

  // Rotate categories array: move last item to beginning
  const rotateCategoriesBackward = (categoriesArray) => {
    if (categoriesArray.length === 0) return categoriesArray;
    const rotated = [...categoriesArray];
    const lastItem = rotated.pop(); // Remove last item
    rotated.unshift(lastItem); // Add it to the beginning
    return rotated;
  };

  // Custom next handler - rotate array and reset instantly without sliding
  const handleNext = () => {
    if (rotationLockRef.current) return;

    rotationLockRef.current = true;
    const current = rotatedCategoriesRef.current || rotatedCategories || [];
    const currentFirst = current[0];
    const currentSecond = current[1];
    setPreviousFirstId(currentFirst?.id);
    setPreviousFirstImage(currentFirst?.image);
    setPreviousFirstName(currentFirst?.name);
    setPreviousSecondId(currentSecond?.id);
    setPreviousSecondImage(currentSecond?.image);
    setIsTransitioning(true);

    // Trigger animation and rotation immediately
    setAnimationKey((prev) => prev + 1);
    setRotatedCategories((prev) => rotateCategoriesForward(prev));

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
      setPreviousFirstId(null);
      setPreviousFirstImage(null);
      setPreviousFirstName(null);
      setPreviousSecondId(null);
      setPreviousSecondImage(null);
      rotationLockRef.current = false;
    }, transitionMsRef.current + 20);
  };

  // Custom prev handler - rotate array backward and reset instantly
  const handlePrev = () => {
    if (rotationLockRef.current) return;

    rotationLockRef.current = true;
    const current = rotatedCategoriesRef.current || rotatedCategories || [];
    const currentFirst = current[0];
    const currentSecond = current[1];
    setPreviousFirstId(currentFirst?.id);
    setPreviousFirstImage(currentFirst?.image);
    setPreviousFirstName(currentFirst?.name);
    setPreviousSecondId(currentSecond?.id);
    setPreviousSecondImage(currentSecond?.image);
    setIsTransitioning(true);

    // Trigger animation and rotation immediately
    setAnimationKey((prev) => prev + 1);
    setRotatedCategories((prev) => rotateCategoriesBackward(prev));

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
      setPreviousFirstId(null);
      setPreviousFirstImage(null);
      setPreviousFirstName(null);
      setPreviousSecondId(null);
      setPreviousSecondImage(null);
      rotationLockRef.current = false;
    }, transitionMsRef.current + 20);
  };

  const activeDotIndex =
    categories?.length && rotatedCategories?.[0]?.id != null
      ? Math.max(0, categories.findIndex((c) => c.id === rotatedCategories[0].id))
      : 0;

  const handleDotClick = (targetIndex) => {
    if (!categories?.length) return;
    if (targetIndex === activeDotIndex) return;

    // Cancel any in-flight animations
    dotNavTokenRef.current += 1;
    isDotNavigatingRef.current = true;
    rotationLockRef.current = true;

    // Find the target category
    const targetCategory = categories[targetIndex];
    if (!targetCategory) return;

    // Rotate array to put target at position 0 (no animations, instant)
    setRotatedCategories((prev) => {
      const targetCurrentIndex = prev.findIndex((c) => c.id === targetCategory.id);
      if (targetCurrentIndex < 0) return prev; // Category not found
      // IMPORTANT: do a true circular rotation so autoplay continues from the clicked dot
      // Example: [2,3,4,5,6,7,8,1] click 7 => [7,8,1,2,3,4,5,6]
      const rotated = [
        ...prev.slice(targetCurrentIndex),
        ...prev.slice(0, targetCurrentIndex),
      ];
      // Update ref immediately so autoplay uses the new state
      rotatedCategoriesRef.current = rotated;
      return rotated;
    });

    // Reset all transition states (no animations)
    setIsTransitioning(false);
    setPreviousFirstId(null);
    setPreviousFirstImage(null);
    setPreviousFirstName(null);
    setPreviousSecondId(null);
    setPreviousSecondImage(null);
    rotationLockRef.current = false;
    isDotNavigatingRef.current = false;

    // Ensure carousel stays at slide 0
    if (carouselRef.current && carouselRef.current.slickGoTo) {
      carouselRef.current.slickGoTo(0, false);
    }

    // Resume autoplay from the *new* position (reset timer so it won't "jump back")
    setTimeout(() => {
      rotationLockRef.current = false;
      isDotNavigatingRef.current = false;
      startAutoplayTimer();
    }, 0);
  };

  // Custom arrow components that intercept clicks
  const CustomNextArrow = ({ onClick, className, sx }) => {
    const handleClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleNext();
    };

    return (
      <IconButton
        onClick={handleClick}
        className={className}
        aria-label="Next"
        sx={{
          ...sx,
          backgroundColor: "white",
          color: "black",
          borderRadius: "50%",
          width: 48,
          height: 48,
          opacity: 1,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          right: -24,
          zIndex: 10,
          cursor: "pointer",
          // Grid centering avoids SVG baseline/line-height quirks
          display: "grid",
          placeItems: "center",
          lineHeight: 0,
          p: 0,
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          // hide react-slick default arrow glyph
          "&:before": { display: "none" },
          "& svg": {
            display: "block",
          },
          "&:hover": {
            backgroundColor: "white",
            color: "black",
            opacity: 1,
          },
        }}
      >
        <ChevronRightIcon
          sx={{
            fontSize: 24,
            // chevron SVGs are sometimes slightly left-heavy; nudge to visual center
            transform: "translateX(1px)",
          }}
        />
      </IconButton>
    );
  };

  const CustomPrevArrow = ({ onClick, className, sx }) => {
    const handleClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      handlePrev();
    };

    return (
      <IconButton
        onClick={handleClick}
        className={className}
        aria-label="Previous"
        sx={{
          ...sx,
          backgroundColor: "white",
          color: "black",
          borderRadius: "50%",
          width: 48,
          height: 48,
          opacity: 1,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          left: -24,
          zIndex: 10,
          cursor: "pointer",
          display: "grid",
          placeItems: "center",
          lineHeight: 0,
          p: 0,
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          "&:before": { display: "none" },
          "& svg": {
            display: "block",
          },
          "&:hover": {
            backgroundColor: "white",
            color: "black",
            opacity: 1,
          },
        }}
      >
        <ChevronLeftIcon
          sx={{
            fontSize: 24,
            transform: "translateX(-1px)",
          }}
        />
      </IconButton>
    );
  };

  // Handle slide change - only for autoplay (fallback, but we use custom autoplay now)
  const handleBeforeChange = (currentSlideIndex, nextSlideIndex) => {
    // Skip if we're in the middle of a rotation
    if (rotationLockRef.current) {
      return;
    }

    // Only handle autoplay - manual navigation is handled by custom arrows
    const totalSlides = rotatedCategories.length;
    const isForward =
      nextSlideIndex > currentSlideIndex ||
      (currentSlideIndex === totalSlides - 1 && nextSlideIndex === 0);

    // Only rotate if we're moving forward from slide 0
    if (isForward && currentSlideIndex === 0 && nextSlideIndex === 1) {
      rotationLockRef.current = true;
      const currentFirst = rotatedCategories[0];
      const currentSecond = rotatedCategories[1];
      setPreviousFirstId(currentFirst?.id);
      setPreviousFirstImage(currentFirst?.image);
      setPreviousFirstName(currentFirst?.name);
      setPreviousSecondId(currentSecond?.id);
      setPreviousSecondImage(currentSecond?.image);
      setIsTransitioning(true);
      setAnimationKey((prev) => prev + 1); // Trigger animation

      // Immediately prevent the slide by resetting to 0 before rotation completes
      if (carouselRef.current && carouselRef.current.slickGoTo) {
        carouselRef.current.slickGoTo(0, false);
      }

      setRotatedCategories((prev) => {
        const rotated = rotateCategoriesForward(prev);
        // Ensure we stay at slide 0 after rotation
        setTimeout(() => {
          if (carouselRef.current && carouselRef.current.slickGoTo) {
            carouselRef.current.slickGoTo(0, false);
          }
          // Reset transition state after animation completes
          setTimeout(() => {
            setIsTransitioning(false);
            setPreviousFirstId(null);
            setPreviousFirstImage(null);
            setPreviousFirstName(null);
            setPreviousSecondId(null);
            setPreviousSecondImage(null);
            rotationLockRef.current = false;
          }, 700); // Match animation duration
        }, 0);
        return rotated;
      });
    }
  };

  return (
    <section
      className="mt-4 mb-4"
      style={{ backgroundColor: "#FFFCF0", overflowX: 'hidden' }}
    >
      {" "}
      {/* Light cream bg */}
      <Container
        maxWidth={false}
        sx={{
          py: { xs: 4, md: 8 },
          px: { xs: 2, sm: 3 },
          overflow: "visible",
          maxWidth: 1240,
          mx: "auto",
          // let the carousel reach the end of the section on desktop
          pr: { md: 0 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 8 },
            alignItems: "center",
          }}
        >
          {/* Left side - Text content */}
          <Box
            sx={{
              width: { xs: "100%", md: "35%" },
              maxWidth: "422px",
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {/* Title - Categories */}
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "40px", sm: "46px", md: "52px" },
                fontWeight: 400,
                fontFamily: "Inter, sans-serif",
                color: "#271E03",
                lineHeight: "90%",
                letterSpacing: "0px",
                textAlign: "left",
              }}
            >
              Categories
            </Typography>

            {/* Description */}
            <Typography
              variant="body1"
              sx={{
                fontSize: "16px",
                lineHeight: "26px",
                color: "#271E03",
                fontFamily: "Inter, sans-serif",
                fontWeight: 400,
                letterSpacing: "0%",
              }}
            >
              Explore our exquisite collection of authentic gemstones, each rich
              in cultural heritage and natural beauty. From healing crystals to
              ornamental stones, our selection offers timeless elegance and
              spiritual significance.
            </Typography>

            {/* Explore More Button */}
            <Box sx={{ mt: 2 }}>
              <QadeemButton
                variant="outlined"
                component={Link}
                href="/categories"
                sx={{
                  borderColor: "#2B1F17",
                  color: "#2B1F17",
                  px: 4,
                  py: 1.5,
                  fontSize: "16px",
                  fontWeight: 500,
                  borderRadius: 0,
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "#2B1F17",
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                }}
              >
                Explore More
              </QadeemButton>
            </Box>
          </Box>

          {/* Right side - Carousel */}
          <Box
            sx={{
              width: { xs: "100%", md: "65%" },
              position: "relative",
              overflow: { xs: "hidden", md: "visible" },
              pb: 6, // space for custom dots below
              // pull the carousel to the very right edge (cancel container padding)
              mr: { md: -3 },
              // Prevent flickering during transitions
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "translateZ(0)", // Force hardware acceleration
              // Allow next/prev slides to be visible (peek effect)
              "& .slick-list": {
                overflow: { xs: "hidden !important", md: "visible !important" },
                // Hide slides that appear before the first (left side), but allow peek on the right
                clipPath: {
                  xs: "none",
                  md: `inset(0px -${RIGHT_PEEK_PX}px 0px 0px)`,
                },
                WebkitClipPath: {
                  xs: "none",
                  md: `inset(0px -${RIGHT_PEEK_PX}px 0px 0px)`,
                },
              },
              "& .slick-track": {
                overflow: "visible",
              },
            }}
          >
            {DEBUG_CAROUSEL && (
              <Box
                sx={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  zIndex: 50,
                  bgcolor: "rgba(0,0,0,0.75)",
                  color: "#fff",
                  p: 1,
                  borderRadius: 1,
                  fontFamily: "monospace",
                  fontSize: 11,
                  lineHeight: 1.25,
                  maxWidth: 360,
                }}
              >
                <div>{`transition=${isTransitioning} animKey=${animationKey}`}</div>
                <div>{`curr1=${rotatedCategories?.[0]?.id} curr2=${rotatedCategories?.[1]?.id}`}</div>
                <div>{`prev1=${previousFirstId} prev2=${previousSecondId}`}</div>
              </Box>
            )}
            {isLoading ? (
              <Box
                sx={{
                  width: "100%",
                  height: 500,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography color="#5D4037">Loading...</Typography>
              </Box>
            ) : (
              <Carousel
                ref={carouselRef}
                slidesToShow={2}
                responsive={responsive}
                spaceBetween={20}
                dots={false}
                arrows={true}
                infinite={true}
                autoplay={false}
                swipe={false}
                draggable={false}
                nextArrow={<CustomNextArrow />}
                prevArrow={<CustomPrevArrow />}
              >
                {rotatedCategories.map((category, index) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    index={index}
                    animationKey={animationKey}
                    isTransitioning={isTransitioning}
                    previousFirstId={previousFirstId}
                    previousFirstImage={previousFirstImage}
                    previousFirstName={previousFirstName}
                    previousSecondId={previousSecondId}
                    previousSecondImage={previousSecondImage}
                    debug={DEBUG_CAROUSEL}
                    transitionMs={transitionMs}
                  />
                ))}
              </Carousel>
            )}

            {/* Custom dots - positioned like the red line (bottom-right) */}
            {!isLoading && categories?.length > 1 && (
              <Box
                sx={{
                  position: "absolute",
                  right: 0,
                  bottom: 6,
                  display: "flex",
                  gap: 1.25,
                  alignItems: "center",
                  justifyContent: "flex-end",
                  pr: 1,
                  zIndex: 20,
                }}
              >
                {categories.map((cat, idx) => {
                  const isActive = idx === activeDotIndex;
                  return (
                    <Box
                      key={cat.id ?? idx}
                      onClick={() => handleDotClick(idx)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") handleDotClick(idx);
                      }}
                      sx={{
                        width: isActive ? 27 : 11,
                        height: isActive ? 27 : 11,
                        borderRadius: "50%",
                        cursor: "pointer",
                        bgcolor: isActive ? "transparent" : "#FAE7AF",
                        border: isActive ? "1px solid #271E03" : "1px solid transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        "&:hover": {
                          bgcolor: isActive ? "transparent" : "#EEDB95",
                        },
                        outline: "none",
                      }}
                    >
                      {isActive && (
                        <Box
                          sx={{
                            width: 11,
                            height: 11,
                            borderRadius: "50%",
                            bgcolor: "#271E03",
                          }}
                        />
                      )}
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </section>
  );
}
