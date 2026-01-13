"use client";
import { useState, useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { keyframes } from "@mui/material";
import { CarouselEager as Carousel } from "components/carousel";
import QadeemButton from "components/QadeemButton";
import LazyImage from "components/LazyImage";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardDoubleArrowLeft from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRight from "@mui/icons-material/KeyboardDoubleArrowRight";
import api from "utils/__api__/home";

// Define keyframe animation for image entering from right
const slideFromRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Define keyframe animation for image exiting to left
const slideToLeft = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
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
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
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
const CategoryCard = ({ category, index, animationKey, isTransitioning, previousFirstId, previousFirstImage, previousFirstName, previousSecondId, previousSecondImage }) => {
  // First image should be bigger, others smaller
  const isFirst = index === 0;
  const isSecond = index === 1;
  const isFirstEntering = isFirst && isTransitioning && previousFirstId !== category.id;
  const isSecondEntering = isSecond && isTransitioning && previousSecondId !== category.id;

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
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden", // Ensure the sliding image doesn't overflow
        }}
      >
        {/* Exit animation for previous first image sliding out to left */}
        {isFirst && isTransitioning && previousFirstId && previousFirstId !== category.id && previousFirstImage && (
          <Box
            key={`exit-first-${previousFirstId}-${animationKey}`}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 2,
              animation: `${slideToLeft} 0.7s ease-in-out forwards`,
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <LazyImage
              src={previousFirstImage}
              alt="Previous category"
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </Box>
        )}
        
        {/* Exit animation for previous second image sliding out to left */}
        {isSecond && isTransitioning && previousSecondId && previousSecondId !== category.id && previousSecondImage && (
          <Box
            key={`exit-second-${previousSecondId}-${animationKey}`}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 2,
              animation: `${slideToLeft} 0.7s ease-in-out forwards`,
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <LazyImage
              src={previousSecondImage}
              alt="Previous second category"
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </Box>
        )}
        
        {/* Enter animation for new first or second image sliding in from right */}
        <Box
          key={isFirst ? `big-${category.id}-${animationKey}` : isSecond ? `small-${category.id}-${animationKey}` : `small-${category.id}`}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: (isFirstEntering || isSecondEntering) ? 1 : "auto",
            animation: isFirstEntering || isSecondEntering 
              ? `${slideFromRight} 0.7s ease-in-out` 
              : ((isFirst || isSecond) && !isTransitioning ? `${slideFromRight} 0.7s ease-in-out` : "none"),
            willChange: (isFirstEntering || isSecondEntering || isFirst || isSecond) ? "transform, opacity" : "auto",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <LazyImage
            src={category.image}
            alt={category.name}
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>

      {/* White box at bottom left - Only show on first image */}
      {isFirst && (
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "stretch", // Ensure equal height for text box and arrow button
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            maxWidth: "85%",
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
              minWidth: 120, // Prevent layout shift
            }}
          >
            {/* Previous label - fade out (overlaps with new label for seamless transition) */}
            {isTransitioning && previousFirstId && previousFirstId !== category.id && previousFirstName && (
              <Typography
                key={`prev-label-${previousFirstId}-${animationKey}`}
                sx={{
                  position: "absolute",
                  fontFamily: "serif",
                  fontSize: { xs: "18px", md: "24px" },
                  fontWeight: 600,
                  color: "#2B2B2B",
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
                lineHeight: 1.2,
                opacity: isTransitioning && previousFirstId !== category.id ? 0 : 1,
                animation: isTransitioning && previousFirstId !== category.id 
                  ? "fadeInLabel 0.4s ease-in-out 0.1s forwards"
                  : "none",
                "@keyframes fadeInLabel": {
                  "0%": { opacity: 0 },
                  "50%": { opacity: 0.5 },
                  "100%": { opacity: 1 },
                },
                transition: isTransitioning ? "none" : "opacity 0.2s ease-in-out",
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
            <ArrowForwardIcon
              fontSize="small"
              sx={{
                transform: "rotate(0deg)",
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
  const [categories, setCategories] = useState(defaultCategories);
  const [isLoading, setIsLoading] = useState(true);
  const carouselRef = useRef(null);

  useEffect(() => {
    // Try to fetch categories from API
    const fetchCategories = async () => {
      try {
        const data = await api.getFeaturedCategories();
        if (data && data.length > 0) {
          // Transform API data to match our structure
          const transformed = data.map((cat, index) => ({
            id: cat.id || index,
            name: cat.name || "Category",
            image:
              cat.image ||
              defaultCategories[index % defaultCategories.length].image,
          }));
          setCategories(transformed);
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
  const autoplayTimerRef = useRef(null);

  // Sync rotated categories when categories change
  useEffect(() => {
    setRotatedCategories(categories);
  }, [categories]);

  // Ensure carousel starts at slide 0
  useEffect(() => {
    if (!isLoading && carouselRef.current && carouselRef.current.slickGoTo) {
      carouselRef.current.slickGoTo(0, false);
    }
  }, [isLoading]);

  // Custom autoplay that rotates array without sliding
  useEffect(() => {
    if (isLoading) return;

    // Clear any existing timer
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }

    // Set up custom autoplay that rotates the array
    autoplayTimerRef.current = setInterval(() => {
      if (rotationLockRef.current) return;
      
      rotationLockRef.current = true;
      const currentFirst = rotatedCategories[0];
      const currentSecond = rotatedCategories[1];
      setPreviousFirstId(currentFirst?.id);
      setPreviousFirstImage(currentFirst?.image);
      setPreviousFirstName(currentFirst?.name);
      setPreviousSecondId(currentSecond?.id);
      setPreviousSecondImage(currentSecond?.image);
      setIsTransitioning(true);
      
      // Ensure carousel is at slide 0 before starting transition
      if (carouselRef.current && carouselRef.current.slickGoTo) {
        carouselRef.current.slickGoTo(0, false);
      }
      
      // Small delay to ensure carousel is positioned correctly
      requestAnimationFrame(() => {
        setAnimationKey((prev) => prev + 1);
        
        setRotatedCategories((prev) => {
          const rotated = rotateCategoriesForward(prev);
          // Keep carousel at slide 0 during transition
          requestAnimationFrame(() => {
            if (carouselRef.current && carouselRef.current.slickGoTo) {
              carouselRef.current.slickGoTo(0, false);
            }
          });
          
          // Reset transition state after animation completes
          setTimeout(() => {
            if (carouselRef.current && carouselRef.current.slickGoTo) {
              carouselRef.current.slickGoTo(0, false);
            }
            setIsTransitioning(false);
            setPreviousFirstId(null);
            setPreviousFirstImage(null);
            setPreviousFirstName(null);
            setPreviousSecondId(null);
            setPreviousSecondImage(null);
            rotationLockRef.current = false;
          }, 700); // Match animation duration
          return rotated;
        });
      });
    }, 3000); // 3 seconds

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
    const currentFirst = rotatedCategories[0];
    const currentSecond = rotatedCategories[1];
    setPreviousFirstId(currentFirst?.id);
    setPreviousFirstImage(currentFirst?.image);
    setPreviousFirstName(currentFirst?.name);
    setPreviousSecondId(currentSecond?.id);
    setPreviousSecondImage(currentSecond?.image);
    setIsTransitioning(true);
    
    // Ensure carousel is at slide 0 before starting transition
    if (carouselRef.current && carouselRef.current.slickGoTo) {
      carouselRef.current.slickGoTo(0, false);
    }
    
    // Small delay to ensure carousel is positioned correctly
    requestAnimationFrame(() => {
      setAnimationKey((prev) => prev + 1); // Trigger animation
      
      setRotatedCategories((prev) => {
        const rotated = rotateCategoriesForward(prev);
        // Keep carousel at slide 0 during transition
        requestAnimationFrame(() => {
          if (carouselRef.current && carouselRef.current.slickGoTo) {
            carouselRef.current.slickGoTo(0, false);
          }
        });
        
        // Reset transition state after animation completes
        setTimeout(() => {
          if (carouselRef.current && carouselRef.current.slickGoTo) {
            carouselRef.current.slickGoTo(0, false);
          }
          setIsTransitioning(false);
          setPreviousFirstId(null);
          setPreviousFirstImage(null);
          setPreviousSecondId(null);
          setPreviousSecondImage(null);
          rotationLockRef.current = false;
        }, 700); // Match animation duration
        return rotated;
      });
    });
  };

  // Custom prev handler - rotate array backward and reset instantly
  const handlePrev = () => {
    if (rotationLockRef.current) return;
    
    rotationLockRef.current = true;
    const currentFirst = rotatedCategories[0];
    const currentSecond = rotatedCategories[1];
    setPreviousFirstId(currentFirst?.id);
    setPreviousFirstImage(currentFirst?.image);
    setPreviousFirstName(currentFirst?.name);
    setPreviousSecondId(currentSecond?.id);
    setPreviousSecondImage(currentSecond?.image);
    setIsTransitioning(true);
    
    // Ensure carousel is at slide 0 before starting transition
    if (carouselRef.current && carouselRef.current.slickGoTo) {
      carouselRef.current.slickGoTo(0, false);
    }
    
    // Small delay to ensure carousel is positioned correctly
    requestAnimationFrame(() => {
      setAnimationKey((prev) => prev + 1); // Trigger animation
      
      setRotatedCategories((prev) => {
        const rotated = rotateCategoriesBackward(prev);
        // Keep carousel at slide 0 during transition
        requestAnimationFrame(() => {
          if (carouselRef.current && carouselRef.current.slickGoTo) {
            carouselRef.current.slickGoTo(0, false);
          }
        });
        
        // Reset transition state after animation completes
        setTimeout(() => {
          if (carouselRef.current && carouselRef.current.slickGoTo) {
            carouselRef.current.slickGoTo(0, false);
          }
          setIsTransitioning(false);
          setPreviousFirstId(null);
          setPreviousFirstImage(null);
          setPreviousSecondId(null);
          setPreviousSecondImage(null);
          rotationLockRef.current = false;
        }, 700); // Match animation duration
        return rotated;
      });
    });
  };

  // Custom arrow components that intercept clicks
  const CustomNextArrow = ({ onClick, className, sx }) => {
    const handleClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleNext();
    };
    
    return (
      <Box
        onClick={handleClick}
        className={className}
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          "&:hover": {
            backgroundColor: "white",
            color: "black",
            opacity: 1,
          },
        }}
      >
        <KeyboardDoubleArrowRight fontSize="small" />
      </Box>
    );
  };

  const CustomPrevArrow = ({ onClick, className, sx }) => {
    const handleClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      handlePrev();
    };
    
    return (
      <Box
        onClick={handleClick}
        className={className}
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          "&:hover": {
            backgroundColor: "white",
            color: "black",
            opacity: 1,
          },
        }}
      >
        <KeyboardDoubleArrowLeft fontSize="small" />
      </Box>
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
    const isForward = nextSlideIndex > currentSlideIndex || 
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
    <section className="mt-4 mb-4" style={{ backgroundColor: "#FFFCF0" }}>
      {" "}
      {/* Light cream bg */}
      <Container sx={{ py: 8 }}>
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
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {/* Title - Categories */}
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "40px", md: "56px" },
                fontWeight: 400,
                fontFamily: "serif",
                color: "#281D13", // Dark brown
                lineHeight: 1.1,
              }}
            >
              Categories
            </Typography>

            {/* Description */}
            <Typography
              variant="body1"
              sx={{
                fontSize: "16px",
                lineHeight: 1.6,
                color: "#4A4A4A",
                fontFamily: "sans-serif",
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
                    backgroundColor: "rgba(43, 31, 23, 0.05)",
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
              // Prevent flickering during transitions
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "translateZ(0)", // Force hardware acceleration
            }}
          >
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
                dots={true}
                arrows={true}
                infinite={true}
                autoplay={false}
                beforeChange={handleBeforeChange}
                nextArrow={<CustomNextArrow />}
                prevArrow={<CustomPrevArrow />}
                dotColor="#E0E0E0" // Light grey for inactive dots
                activeDotColor="#2B1F17" // Dark brown for active dot
                dotStyles={{
                  mt: 4,
                }}
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
                  />
                ))}
              </Carousel>
            )}
          </Box>
        </Box>
      </Container>
    </section>
  );
}
