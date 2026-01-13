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
      <Container>
        <Grid container spacing={4} alignItems="center">
          {/* Left side - Text content */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="article"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: 2, md: 3 },
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
                  fontSize: { xs: 14, sm: 16, md: 18 },
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
                  fontSize: { xs: 14, sm: 16, md: 18 },
                  lineHeight: 1.6,
                  color: "#271E03",
                  mt: { xs: 2, md: 3 },
                  maxWidth: "90%",
                }}
              >
                Explore our exquisite collection of authentic gemstones, each rich in cultural heritage and natural beauty. From healing crystals to ornamental stones, our selection offers timeless elegance and spiritual significance.
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
          </Grid>

          {/* Right side - Banner */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="aside"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                minHeight: { xs: 300, md: 400 },
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <Image
                src="/assets/images/qadeem-about-section-banner.png"
                alt="Qadeem Handicraft Shop - Authentic gemstones and handicrafts collection featuring traditional Arabic calligraphy and cultural heritage"
                width={600}
                height={600}
                priority
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  objectFit: "contain",
                }}
                sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 600px"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

