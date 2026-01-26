"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import Link from "next/link";
import QadeemButton from "components/QadeemButton";

const VIDEO_IMAGE = "/assets/images/Video.png";

export default function AboutVideoText() {
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
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  maxWidth: { xs: "100%", md: 604 },
                  borderRadius: 0,
                  overflow: "hidden",
                  aspectRatio: { xs: "16/9", md: "604/580" },
                }}
              >
                <Image
                  src={VIDEO_IMAGE}
                  alt="The Ancient Art of Our Handicrafts"
                  width={604}
                  height={580}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
                <Box
                  component="button"
                  type="button"
                  aria-label="Play video"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: 56, sm: 64, md: 72 },
                    height: { xs: 56, sm: 64, md: 72 },
                    minWidth: { xs: 56, sm: 64, md: 72 },
                    minHeight: { xs: 56, sm: 64, md: 72 },
                    borderRadius: "50%",
                    backgroundColor: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    border: "none",
                    p: 0,
                    "&:hover": { backgroundColor: "#cccccc" },
                    "&:focus": { outline: "2px solid #040404", outlineOffset: 2 },
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 0,
                      height: 0,
                      borderLeft: { xs: "10px solid #040404", sm: "12px solid #040404", md: "14px solid #040404" },
                      borderTop: { xs: "7px solid transparent", sm: "9px solid transparent", md: "10px solid transparent" },
                      borderBottom: { xs: "7px solid transparent", sm: "9px solid transparent", md: "10px solid transparent" },
                      ml: { xs: 0.25, sm: 0.375, md: 0.5 },
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: 18, sm: 28, md: 30 },
                fontWeight: 700,
                color: "#271E03",
                lineHeight: 1.2,
                mb: 3,
              }}
            >
              The Ancient Art of Our Handicrafts
            </Typography>
            <Typography
              sx={{
                textAlign: "justify",
                fontSize: { xs: 14, sm: 15, md: 16 },
                lineHeight: 1.7,
                color: "#3A3A3A",
                mb: 2,
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
              <br />
              <br />
              Essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Typography>
            <QadeemButton
              component={Link}
              href="/allProducts"
              variant="contained"
              sx={{
                px: { xs: 3, sm: 3.5, md: 4 },
                py: { xs: 1.25, sm: 1.375, md: 1.5 },
                fontSize: { xs: 13, sm: 13.5, md: 14 },
                minHeight: { xs: 44, sm: 44, md: "auto" },
              }}
            >
              Shop Our Store
            </QadeemButton>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
