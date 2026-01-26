"use client";

import Box from "@mui/material/Box";
import {
  AboutHero,
  AboutFeatures,
  AboutVideoText,
  AboutTestimonials,
  AboutStats,
  AboutTrustedBy,
} from "../sections";

export default function AboutUsView() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <AboutHero />
      <AboutFeatures />
      <AboutVideoText />
      <AboutTestimonials />
      <AboutStats />
      {/* <AboutTrustedBy /> */}
    </Box>
  );
}
