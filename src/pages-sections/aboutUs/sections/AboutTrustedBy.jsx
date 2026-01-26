"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const LOGO_COLOR = "#4B566B";
const companies = [
  "Google",
  "facebook",
  "YouTube",
  "Pinterest",
  "twitch",
  "webflow",
];

export default function AboutTrustedBy() {
  return (
    <Box sx={{ backgroundColor: "#F5F0E8", py: { xs: 5, md: 7 } }}>
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1240,
          mx: "auto",
          px: { xs: 2, sm: 3 },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 14, sm: 15 },
            fontWeight: 400,
            color: "#8B7548",
            fontFamily: "Inter, sans-serif",
            textAlign: "center",
            mb: { xs: 4, md: 5 },
          }}
        >
          Trusted by 10,000+ companies around the world
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: { xs: 2.5, sm: 3.5, md: 6 },
            px: { xs: 1, sm: 0 },
          }}
        >
          {companies.map((name) => (
            <Typography
              key={name}
              sx={{
                fontSize: { xs: 14, sm: 16, md: 18 },
                fontWeight: 600,
                color: LOGO_COLOR,
                fontFamily: "Inter, sans-serif",
                textTransform: "capitalize",
                textAlign: "center",
                minWidth: 0,
                wordBreak: "break-word",
              }}
            >
              {name}
            </Typography>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
