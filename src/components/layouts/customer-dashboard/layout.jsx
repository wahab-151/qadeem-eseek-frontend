import Link from "next/link";
// MUI
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// LOCAL CUSTOM COMPONENTS
import Navigation from "./navigation";

export default function CustomerDashboardLayout({ children }) {
  return (
    <Box>
      <Container maxWidth="lg" sx={{ mb: 12 }}>
        {/* 1. HERO SECTION */}
        <Box
          className="container"
          sx={{
            pt: { xs: 3, md: 6 },
            pb: { xs: 3, md: 6 },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: "800",
              color: "#2C2416", 
              fontSize: { xs: "24px", sm: "30px", md: "40px" },
              letterSpacing: "0.5px",
              textTransform: "none",
              fontFamily: "Inter, sans-serif",
            }}
          >
            My Account
          </Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid
            size={{ lg: 3, xs: 12 }}
            sx={{
              display: { xs: "none", lg: "block" },
              width: 262, // Explicitly set width to match Navigation
            }}
          >
            <Navigation />
          </Grid>
          <Grid size={{ lg: 9, xs: 12 }}> {children}</Grid>
        </Grid>
      </Container>
    </Box>
  );
}
