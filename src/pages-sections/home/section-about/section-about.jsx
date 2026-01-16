"use client";
import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import Link from "next/link";
import QadeemButton from "components/QadeemButton";
import SectionAboutSkeleton from "./section-about-skeleton";

export default function SectionAbout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show skeleton while image loads
    const img = new window.Image();
    img.src = "/assets/images/qadeem-about-section-banner.png";
    img.onload = () => {
      setIsLoading(false);
    };
    img.onerror = () => {
      setIsLoading(false);
    };

    // Fallback timeout in case image doesn't load
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return <SectionAboutSkeleton />;
  }
  return (
    <section
      className="mt-4 mb-4"
      aria-label="Qadeem Handicraft Shop Introduction"
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1240,
          mx: "auto",
          px: { xs: 2, sm: 3 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 6 },
          }}
        >
          {/* Left side - Text content */}
          <Box
            component="article"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 2, md: 3 },
              maxWidth: "500px",
              width: "100%",
            }}
          >
            {/* Main Title - QADEEM */}
            <Typography
              component="h1"
              variant="h1"
              sx={{
                fontFamily: "'Alice', serif",
                fontSize: { xs: 48, sm: 64, md: 96 },
                fontWeight: 400,
                lineHeight: "127%",
                letterSpacing: "0px",
                color: "#271E03",
                textAlign: "left",
                mb: 0,
              }}
            >
              QADEEM
            </Typography>

            {/* Subtitle - HANDICRAFT SHOP */}
            <Typography
              component="h2"
              variant="h6"
              sx={{
                fontFamily: "sans-serif",
                fontSize: { xs: 14, sm: 16, md: 24 },
                fontWeight: 400,
                color: "#271E03",
                textTransform: "uppercase",
                letterSpacing: "1px",
                mt: { xs: -1, md: -2 },
              }}
            >
              HANDICRAFT SHOP
            </Typography>

            {/* Description Paragraph */}
            <Typography
              component="p"
              variant="body1"
              sx={{
                fontSize: { xs: 12, sm: 14, md: 16 },
                lineHeight: 1.6,
                color: "#271E03",
                mt: { xs: 2, md: 3 },
                maxWidth: "90%",
              }}
            >
              Explore our exquisite collection of authentic gemstones, each rich
              in cultural heritage and natural beauty. From healing crystals to
              ornamental stones, our selection offers timeless elegance and
              spiritual significance.
            </Typography>

            {/* Learn More Button */}
            <Box sx={{ mt: { xs: 2, md: 3 } }}>
              <QadeemButton
                component={Link}
                href="/aboutUs"
                variant="contained"
                aria-label="Learn more about Qadeem Handicraft Shop"
                sx={{
                  px: { xs: 4, md: 6 },
                  py: { xs: 1.5, md: 2 },
                  fontSize: { xs: 14, md: 16 },
                  fontWeight: 500,
                }}
              >
                Learn More
              </QadeemButton>
            </Box>
          </Box>

          {/* Right side - Banner */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              // Figma: W 518px x H 391px (desktop)
              width: { xs: "100%", md: 518 },
              maxWidth: { xs: 520, md: 518 },
              height: { xs: "auto", md: 391 },
              minWidth: { xs: "auto", md: 518 },
              minHeight: { xs: 220, sm: 280, md: 391 },
              borderRadius: 0,
              flexShrink: 0,
            }}
          >
            <Image
              src="/assets/images/qadeem-about-section-banner.png"
              alt="Qadeem Handicraft Shop - Authentic gemstones and handicrafts collection featuring traditional Arabic calligraphy and cultural heritage"
              width={518}
              height={391}
              priority
              sizes="(max-width: 900px) 100vw, 518px"
              style={{
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>
      </Container>
    </section>
  );
}
