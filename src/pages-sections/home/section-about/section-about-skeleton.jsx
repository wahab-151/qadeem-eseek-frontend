"use client";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Skeleton from "@mui/material/Skeleton";

export default function SectionAboutSkeleton() {
  return (
    <section 
      className="mt-4 mb-4"
      aria-label="Loading Qadeem Handicraft Shop Introduction"
    >
      <Container>
        <Grid container spacing={4} alignItems="center">
          {/* Left side - Text content skeleton */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: 2, md: 3 },
              }}
            >
              {/* Main Title skeleton */}
              <Skeleton
                variant="text"
                sx={{
                  fontSize: { xs: 48, sm: 64, md: 96 },
                  height: { xs: 48, sm: 64, md: 96 },
                  width: { xs: "60%", md: "70%" },
                }}
              />

              {/* Subtitle skeleton */}
              <Skeleton
                variant="text"
                sx={{
                  fontSize: { xs: 14, sm: 16, md: 18 },
                  height: { xs: 14, sm: 16, md: 18 },
                  width: { xs: "40%", md: "50%" },
                  mt: { xs: -1, md: -2 },
                }}
              />

              {/* Description Paragraph skeleton */}
              <Box sx={{ mt: { xs: 2, md: 3 } }}>
                <Skeleton variant="text" width="90%" height={24} />
                <Skeleton variant="text" width="85%" height={24} sx={{ mt: 1 }} />
                <Skeleton variant="text" width="80%" height={24} sx={{ mt: 1 }} />
              </Box>

              {/* Button skeleton */}
              <Box sx={{ mt: { xs: 2, md: 3 } }}>
                <Skeleton
                  variant="rectangular"
                  width={140}
                  height={48}
                  sx={{ borderRadius: "8px" }}
                />
              </Box>
            </Box>
          </Grid>

          {/* Right side - Banner skeleton */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton
              variant="rectangular"
              sx={{
                minHeight: { xs: 300, md: 400 },
                borderRadius: "8px",
                width: "100%",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}




