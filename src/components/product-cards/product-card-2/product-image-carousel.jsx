"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Box, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function ProductImageCarousel({ images = [], alt = "Product", height = "418px", onIndexChange }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter out any null/undefined images
  const validImages = images?.filter(img => img?.preview) || [];
  
  // If no images, use default
  const displayImages = validImages.length > 0 
    ? validImages 
    : [{ preview: "/assets/images/small-screen-logo.png" }];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? displayImages.length - 1 : prevIndex - 1;
      if (onIndexChange) onIndexChange(newIndex, displayImages.length);
      return newIndex;
    });
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === displayImages.length - 1 ? 0 : prevIndex + 1;
      if (onIndexChange) onIndexChange(newIndex, displayImages.length);
      return newIndex;
    });
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    if (onIndexChange) onIndexChange(index, displayImages.length);
  };

  // Notify parent of initial state and changes
  useEffect(() => {
    if (onIndexChange) {
      onIndexChange(currentIndex, displayImages.length);
    }
  }, [currentIndex, displayImages.length]);

  // Don't show carousel controls if only one image
  const showControls = displayImages.length > 1;

  return (
    <Box
      className="product-carousel-container"
      sx={{
        position: "relative",
        width: "100%",
        height: height,
        overflow: "hidden",
      }}
    >
      {/* Image Container */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: `${displayImages.length * 100}%`,
            height: "100%",
            transform: `translateX(-${currentIndex * (100 / displayImages.length)}%)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {displayImages.map((image, index) => (
            <Box
              key={index}
              sx={{
                width: `${100 / displayImages.length}%`,
                height: "100%",
                position: "relative",
                flexShrink: 0,
              }}
            >
              <Image
                width={270}
                height={300}
                alt={`${alt} - Image ${index + 1}`}
                src={image.preview}
                sizes="(max-width: 600px) 50vw, (max-width: 1200px) 33vw, 20vw"
                loading={index === 0 ? "eager" : "lazy"}
                quality={85}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 0,
                  display: "block",
                  transition: "transform 0.3s ease",
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Navigation Arrows */}
      {showControls && (
        <>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            sx={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              bgcolor: "transparent",
              border: "2px solid white",
              color: "white",
              width: 36,
              height: 36,
              borderRadius: "50%",
              opacity: 0,
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: (theme) => theme.palette.primary.main,
                borderColor: (theme) => theme.palette.primary.main,
                color: "white",
                boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                transform: "translateY(-50%) scale(1.1)",
              },
            }}
            className="carousel-arrow carousel-arrow-left"
          >
            <ChevronLeftIcon sx={{ fontSize: 20, fontWeight: "bold" }} />
          </IconButton>

          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            sx={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              bgcolor: "transparent",
              border: "2px solid white",
              color: "white",
              width: 36,
              height: 36,
              borderRadius: "50%",
              opacity: 0,
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: (theme) => theme.palette.primary.main,
                borderColor: (theme) => theme.palette.primary.main,
                color: "white",
                boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                transform: "translateY(-50%) scale(1.1)",
              },
            }}
            className="carousel-arrow carousel-arrow-right"
          >
            <ChevronRightIcon sx={{ fontSize: 20, fontWeight: "bold" }} />
          </IconButton>
        </>
      )}

      {/* Dots Indicator */}
      {showControls && displayImages.length > 1 && (
        <Box
          sx={{
            position: "absolute",
            bottom: 12,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            display: "flex",
            gap: 0.5,
            opacity: 1,
            transition: "opacity 0.3s ease, bottom 0.3s ease",
          }}
          className="carousel-dots"
        >
          {displayImages.map((_, index) => (
            <Box
              key={index}
              className={currentIndex === index ? "carousel-dot-active" : "carousel-dot-inactive"}
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(index);
              }}
              sx={{
                width: currentIndex === index ? 24 : 8,
                height: 8,
                borderRadius: 4,
                bgcolor: currentIndex === index ? "white" : "rgba(255, 255, 255, 0.5)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </Box>
      )}

    </Box>
  );
}

