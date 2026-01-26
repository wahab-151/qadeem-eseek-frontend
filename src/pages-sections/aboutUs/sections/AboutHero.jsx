"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";

const HERO_IMAGE = "/assets/images/about banner.png";

export default function AboutHero() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: 320, sm: 400, md: 480 },
        overflow: "hidden",
      }}
    >
      <Image
        src={HERO_IMAGE}
        alt="Qadeem Handicraft - Traditional rugs and carpets"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: 42, sm: 56, md: 72 },
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          About
        </Typography>
        <Typography
          component="nav"
          aria-label="Breadcrumb"
          sx={{
            fontSize: { xs: 12, sm: 13, md: 14 },
            fontWeight: 400,
            color: "#ffffff",
            textAlign: "center",
            px: { xs: 2, sm: 0 },
          }}
        >
          <Link
            href="/"
            style={{
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Home
          </Link>
          <Box component="span" sx={{ mx: 0.75, opacity: 0.9 }}>
            &gt;
          </Box>
          <Box component="span" sx={{ color: "#ffffff", fontWeight: 500 }}>
            About
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}
