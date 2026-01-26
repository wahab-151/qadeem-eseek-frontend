"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";

const ICONS_BASE = "/assets/icons";

const features = [
  {
    icon: `${ICONS_BASE}/trophy%201.svg`,
    title: "High Quality",
    subtitle: "Crafted from top materials",
  },
  {
    icon: `${ICONS_BASE}/shipping.svg`,
    title: "Fast Delivery",
    subtitle: "Working Hours 3 to 5 days",
  },
  {
    icon: `${ICONS_BASE}/guarantee.svg`,
    title: "Warranty Protection",
    subtitle: "Over 1 year",
  },
];

export default function AboutFeatures() {
  return (
    <Box sx={{ backgroundColor: "#FFFFFF", py: { xs: 5, md: 7 } }}>
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1240,
          mx: "auto",
          px: { xs: 2, sm: 3 },
        }}
      >
        <Grid container spacing={{ xs: 4, sm: 5, lg: 6 }} justifyContent="center">
          {features.map(({ icon, title, subtitle }) => (
            <Grid item xs={12} sm={6} md={4} key={title}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: { xs: 1.5, sm: 1.75, md: 2 },
                  maxWidth: { xs: "100%", sm: 360 },
                  mx: "auto",
                }}
              >
                <Box
                  component="img"
                  src={icon}
                  alt=""
                  sx={{
                    width: { xs: 40, sm: 44, md: 60 },
                    height: { xs: 40, sm: 44, md: 60 },
                    flexShrink: 0,
                    objectFit: "contain",
                  }}
                />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: 16, sm: 20, md: 25 },
                      fontWeight: 600,
                      lineHeight: "150%",
                      letterSpacing: 0,
                      color: "#271E03",
                      mb: 0.5,
                    }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: 12, sm: 15, md: 20 },
                      fontWeight: 500,
                      lineHeight: "150%",
                      letterSpacing: 0,
                      color: "#898989",
                    }}
                  >
                    {subtitle}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
