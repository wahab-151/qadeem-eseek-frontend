"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function TestimonialsLeftContent({ onPrev, onNext }) {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "40%" },
        maxWidth: "500px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Text Content Wrapper */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* Subtitle - TESTIMONIALS */}
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "14px", md: "16px" },
            fontWeight: 500,
            fontFamily: "sans-serif",
            color: "#271E03",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          TESTIMONIALS
        </Typography>

        {/* Title - Look What Our Customers Say! */}
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "40px", sm: "46px", md: "52px" },
            fontWeight: 400,
            fontFamily: "Inter, sans-serif",
            color: "#271E03",
            lineHeight: "90%",
            letterSpacing: "0px",
            textAlign: "left",
          }}
        >
          Look What Our{" "}
          <Box component="span" sx={{ display: "block" }}>
            Customers Say!
          </Box>
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            lineHeight: "26px",
            color: "#271E03",
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            letterSpacing: "0%",
            textAlign: "left",
          }}
        >
          Fusce venenatis tellus a felis scelerisque, non pulvinar est
          pellentesque.
        </Typography>
      </Box>

      {/* Navigation Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: { xs: 3, md: "50px" },
          mt: { xs: 3, md: "55px" },
        }}
      >
        <IconButton
          onClick={onPrev}
          aria-label="Previous testimonial"
          sx={{
            width: 48,
            height: 48,
            border: "1px solid #2B1F17",
            borderRadius: "50%",
            color: "#2B1F17",
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "#2B1F17",
              color: "#FFFFFF",
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton
          onClick={onNext}
          aria-label="Next testimonial"
          sx={{
            width: 48,
            height: 48,
            border: "1px solid #2B1F17",
            borderRadius: "50%",
            color: "#FFFFFF",
            backgroundColor: "#2B1F17",
            "&:hover": {
              backgroundColor: "#422f24",
              borderColor: "#422f24",
            },
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

