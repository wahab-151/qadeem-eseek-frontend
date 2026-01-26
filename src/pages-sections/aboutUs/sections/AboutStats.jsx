"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";

const ACCENT = "#705D27";

const stats = [
  { value: "99", suffix: "%", label: "Customer satisfaction" },
  { value: "32", suffix: "M", label: "Active users" },
  { value: "125", suffix: "+", label: "Team members" },
  { value: "240", suffix: "%", label: "Company growth" },
];

export default function AboutStats() {
  return (
    <Box sx={{ backgroundColor: "#FFFFFF", py: { xs: 5, md: 8 } }}>
      <Container
        maxWidth={false}
        sx={{
          maxWidth: 1240,
          mx: "auto",
          px: { xs: 2, sm: 3 },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: 18, sm: 28, md: 30 },
            fontWeight: 700,
            color: "#271E03",
            textAlign: "center",
            mb: { xs: 4, md: 6 },
          }}
        >
          Our results in numbers
        </Typography>
        <Grid container spacing={{ xs: 3, sm: 3.5, md: 4 }} justifyContent="center">
          {stats.map(({ value, suffix, label }) => (
            <Grid key={label} size={{ xs: 6, sm: 3 }}>
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    fontSize: { sm: 28, md: 32, lg: 44 },
                    fontWeight: 700,
                    lineHeight: 1.1,
                    mb: 1,
                  }}
                >
                  {value}
                  <Typography
                    component="span"
                    sx={{
                      fontSize: { sm: 28, md: 32, lg: 44 },
                      fontWeight: 700,
                      color: ACCENT
                    }}
                  >
                    {suffix}
                  </Typography>
                </Typography>
                <Typography
                  sx={{
                    fontSize: { sm: 14, md: 16, lg: 24 },
                    fontWeight: "bold",
                    lineHeight: 1.4,
                  }}
                >
                  {label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
