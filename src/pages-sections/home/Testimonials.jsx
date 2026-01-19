"use client";
import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TestimonialsLeftContent from "./TestimonialsLeftContent";
import TestimonialsCarousel from "./TestimonialsCarousel";
import api from "utils/__api__/home";

// Default testimonials data
const defaultTestimonials = [
  {
    id: 1,
    text: "\"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspetristique. Duis n eros elecuenindisse varius enim in eros elementum Suspendisse varius enim in tristique. Duis cuenim in tristique. Drsus, mi quis viverra ornare.\"",
    name: "Cristal weark",
    email: "cristal.weark@example.com",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 4,
  },
  {
    id: 2,
    text: "Fusce venenatis tellus a felis scelerisque, non pulvinar est pellentesque. The quality of products exceeded my expectations. Highly recommended!",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 5,
  },
  {
    id: 3,
    text: "Amazing service and beautiful craftsmanship. The attention to detail is remarkable. I will definitely shop here again.",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
  },
];

export default function Testimonials({ backgroundColor = "#FFFFFF" }) {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousText, setPreviousText] = useState("");

  useEffect(() => {
    // Try to fetch testimonials from API
    const fetchTestimonials = async () => {
      try {
        const data = await api.getTestimonials();
        if (data && data.length > 0) {
          // Transform API data to match our structure
          const transformed = data.map((testimonial, index) => ({
            id: testimonial.id || index + 1,
            text: testimonial.text || testimonial.comment || testimonial.review || "",
            name: testimonial.name || testimonial.customer || "Customer",
            email: testimonial.email || testimonial.emailAddress || "",
            image: testimonial.image || testimonial.imgUrl || testimonial.avatar || defaultTestimonials[index % defaultTestimonials.length].image,
            rating: testimonial.rating || 5,
          }));
          setTestimonials(transformed);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        // Keep default testimonials on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const currentTestimonial = testimonials[currentIndex];
    setPreviousText(currentTestimonial?.text || "");
    setIsTransitioning(true);
    setAnimationKey((prev) => prev + 1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => {
      setIsTransitioning(false);
      setPreviousText("");
      setIsAnimating(false);
    }, 400);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const currentTestimonial = testimonials[currentIndex];
    setPreviousText(currentTestimonial?.text || "");
    setIsTransitioning(true);
    setAnimationKey((prev) => prev + 1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => {
      setIsTransitioning(false);
      setPreviousText("");
      setIsAnimating(false);
    }, 400);
  };

  const handleIndicatorClick = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    const currentTestimonial = testimonials[currentIndex];
    setPreviousText(currentTestimonial?.text || "");
    setIsTransitioning(true);
    setAnimationKey((prev) => prev + 1);
    setCurrentIndex(index);
    setTimeout(() => {
      setIsTransitioning(false);
      setPreviousText("");
      setIsAnimating(false);
    }, 400);
  };

  const currentTestimonial = testimonials[currentIndex] || testimonials[0];

  return (
    <section
      className="mt-4 mb-4"
      style={{ backgroundColor: backgroundColor, overflow: "visible" }}
    >
      <Container
        maxWidth={false}
        sx={{
          py: { xs: 4, md: 8 },
          px: { xs: 2, sm: 3 },
          overflow: "visible",
          maxWidth: 1240,
          mx: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 0 },
            justifyContent: { xs: "flex-start", md: "space-between" },
            alignItems: { xs: "center", md: "flex-start" },
          }}
        >
          {/* Left side - Text content and navigation */}
          <TestimonialsLeftContent onPrev={handlePrev} onNext={handleNext} />

          {/* Right side - Testimonial Card */}
          <TestimonialsCarousel
            testimonial={currentTestimonial}
            testimonials={testimonials}
            currentIndex={currentIndex}
            isLoading={isLoading}
            animationKey={animationKey}
            onIndicatorClick={handleIndicatorClick}
            isTransitioning={isTransitioning}
            previousText={previousText}
          />
        </Box>
      </Container>
    </section>
  );
}

