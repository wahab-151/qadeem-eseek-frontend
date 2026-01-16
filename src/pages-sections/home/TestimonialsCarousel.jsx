"use client";
import { useRef, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import { keyframes } from "@mui/material";

// Animation keyframes - vertical version of category carousel
const slideFromTop = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
`;

const slideToBottom = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export default function TestimonialsCarousel({
  testimonial,
  testimonials,
  currentIndex,
  isLoading,
  animationKey,
  onIndicatorClick,
  isTransitioning,
  previousText,
}) {
  const cardRef = useRef(null);
  const [cardHeight, setCardHeight] = useState("auto");
  const TRANSITION_MS = 400;

  useEffect(() => {
    if (cardRef.current) {
      // Use a small delay to ensure content is rendered
      const timer = setTimeout(() => {
        if (cardRef.current) {
          const height = cardRef.current.scrollHeight;
          setCardHeight(`${height}px`);
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, animationKey, testimonial]);

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "fit-content" },
        position: "relative",
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            width: "100%",
            height: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography color="#5D4037">Loading...</Typography>
        </Box>
      ) : (
        <Box
          sx={{
            height: cardHeight,
            transition: "height 0.4s ease-out",
            overflow: "visible",
            width: { xs: "100%", md: "500px" },
            position: "relative",
            minHeight: "auto",
          }}
        >
          <Box
            ref={cardRef}
            key={`card-${currentIndex}-${animationKey}`}
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: 2,
              p: { xs: 3, md: 4 },
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
              position: "relative",
              width: { xs: "100%", md: "500px" },
            }}
          >
          {/* Quotation Marks */}
          <Typography
            sx={{
              fontSize: { xs: "64px", md: "80px" },
              lineHeight: 1,
              color: "#FFC107",
              fontFamily: "serif",
              position: "absolute",
              top: { xs: 16, md: 20 },
              left: { xs: 16, md: 20 },
              zIndex: 1,
              opacity: 0.8,
            }}
          >
            "
          </Typography>

          {/* Testimonial Text Container */}
          <Box
            sx={{
              position: "relative",
              pt: { xs: 4, md: 5 },
              pl: { xs: 2, md: 3 },
              pr: { xs: 2, md: 3 },
              minHeight: "60px",
              overflow: "hidden",
              width: "100%",
            }}
          >
            {/* Exit animation for previous text sliding down */}
            {isTransitioning &&
              previousText &&
              previousText !== testimonial.text && (
                <Typography
                  key={`text-exit-${animationKey}`}
                  variant="body1"
                  sx={{
                    fontSize: "18px",
                    lineHeight: "27px",
                    color: "#2B2B2B",
                    fontFamily: "Inter, sans-serif",
                    fontStyle: "italic",
                    letterSpacing: "0%",
                    position: "absolute",
                    top: { xs: 16, md: 20 },
                    left: { xs: 8, md: 12 },
                    right: { xs: 8, md: 12 },
                    zIndex: 2,
                    animation: `${slideToBottom} ${TRANSITION_MS}ms ease-in-out forwards`,
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "translateZ(0)",
                    opacity: 1,
                  }}
                >
                  {previousText}
                </Typography>
              )}

            {/* Enter animation for new text sliding in from top */}
            <Typography
              key={`text-enter-${currentIndex}-${animationKey}`}
              variant="body1"
              sx={{
                fontSize: "18px",
                lineHeight: "27px",
                color: "#2B2B2B",
                fontFamily: "Inter, sans-serif",
                fontStyle: "italic",
                letterSpacing: "0%",
                position: isTransitioning && previousText !== testimonial.text ? "absolute" : "relative",
                top: isTransitioning && previousText !== testimonial.text ? { xs: 16, md: 20 } : "auto",
                left: isTransitioning && previousText !== testimonial.text ? { xs: 8, md: 12 } : "auto",
                right: isTransitioning && previousText !== testimonial.text ? { xs: 8, md: 12 } : "auto",
                zIndex: isTransitioning && previousText !== testimonial.text ? 1 : 2,
                animation:
                  isTransitioning && previousText !== testimonial.text
                    ? `${slideFromTop} ${TRANSITION_MS}ms ease-in-out forwards`
                    : "none",
                willChange: isTransitioning && previousText !== testimonial.text ? "transform" : "auto",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "translateZ(0)",
                opacity: 1,
              }}
            >
              {testimonial.text}
            </Typography>
          </Box>

          {/* Divider Line */}
          <Box
            sx={{
              width: "100%",
              height: "1px",
              backgroundColor: "#E0E0E0",
              mt: 4,
              mb: 4,
            }}
          />

          {/* Customer Info */}
          <Box
            key={`user-${currentIndex}-${animationKey}`}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              pl: { xs: 2, md: 3 },
              pr: { xs: 2, md: 3 },
              animation: `${fadeIn} 0.4s ease-out forwards`,
              willChange: "opacity",
            }}
          >
            {/* Avatar */}
            <Avatar
              src={testimonial.image}
              alt={testimonial.name}
              sx={{
                width: { xs: 48, md: 56 },
                height: { xs: 48, md: 56 },
              }}
            />

            {/* Name and Email */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                gap: 0.5,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: "19.4px",
                  fontWeight: 500,
                  fontFamily: "Inter, sans-serif",
                  color: "#2B2B2B",
                  lineHeight: "normal",
                  letterSpacing: "0%",
                  textAlign: "left",
                }}
              >
                {testimonial.name}
              </Typography>
              {testimonial.email && (
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "14px",
                    fontWeight: 400,
                    fontFamily: "Inter, sans-serif",
                    color: "#666666",
                    lineHeight: "normal",
                    letterSpacing: "0%",
                    textAlign: "left",
                  }}
                >
                  {testimonial.email}
                </Typography>
              )}
            </Box>

            {/* Rating */}
            <Rating
              value={testimonial.rating}
              readOnly
              size="small"
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "#FFC107",
                },
                "& .MuiRating-iconEmpty": {
                  color: "#E0E0E0",
                },
              }}
            />
          </Box>
          </Box>
        </Box>
      )}

      {/* Scrollbar indicator on the right - outside card */}
      {!isLoading && testimonials && testimonials.length > 1 && (
        <Box
          sx={{
            position: "absolute",
            right: { xs: 8, md: -16 },
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            zIndex: 1,
          }}
        >
          {testimonials.map((_, idx) => (
            <Box
              key={idx}
              onClick={() => onIndicatorClick && onIndicatorClick(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && onIndicatorClick) {
                  onIndicatorClick(idx);
                }
              }}
              sx={{
                width: "4px",
                height: "37.14px",
                backgroundColor: idx === currentIndex ? "#808080" : "#AAAAAA",
                opacity: idx === currentIndex ? 1 : 0.5,
                borderRadius: 2,
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: idx === currentIndex ? "#808080" : "#999999",
                  opacity: 1,
                },
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}

