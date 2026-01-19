"use client";

import { Box, Typography, Container, LinearProgress } from "@mui/material";
import Rating from "@mui/material/Rating";
import { FlexBox } from "components/flex-box";

export default function ProductReviewsSection({ product }) {
  // Calculate rating distribution
  const reviews = product?.reviews || [];
  const totalReviews = reviews.length;
  
  // Calculate average rating
  const averageRating = totalReviews > 0
    ? reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / totalReviews
    : 4.8;

  // Calculate distribution
  const distribution = {
    5: reviews.filter((r) => Math.round(r.rating || 0) === 5).length,
    4: reviews.filter((r) => Math.round(r.rating || 0) === 4).length,
    3: reviews.filter((r) => Math.round(r.rating || 0) === 3).length,
    2: reviews.filter((r) => Math.round(r.rating || 0) === 2).length,
    1: reviews.filter((r) => Math.round(r.rating || 0) === 1).length,
  };

  const getPercentage = (count) => {
    return totalReviews > 0 ? (count / totalReviews) * 100 : 0;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box>
        <Typography
          variant="h3"
          sx={{
            mb: 4,
            fontSize: "24px",
            fontWeight: 500,
            lineHeight: 1.27,
            letterSpacing: "0px",
            color: "#271E03",
          }}
        >
          Customer Reviews
        </Typography>

        <Box sx={{ maxWidth: "672px", display: "flex", gap: 4, flexDirection: { xs: "column", md: "row" } }}>
        {/* Left side - Overall Rating */}
        <Box sx={{ minWidth: { xs: "100%", md: "200px" } }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "48px", md: "64px" },
              fontWeight: 700,
              mb: 1,
            }}
          >
            {averageRating.toFixed(1)}
          </Typography>
          <Rating
            value={averageRating}
            readOnly
            precision={0.1}
            sx={{
              mb: 1,
              "& .MuiRating-iconFilled": {
                color: "#FFC107",
              },
            }}
          />
          <Typography variant="body2" sx={{ color: "text.primary" }}>
            Product Rating
          </Typography>
        </Box>

        {/* Right side - Rating Distribution */}
        <Box sx={{ flex: 1 }}>
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = distribution[stars];
            const percentage = getPercentage(count);
            return (
              <Box key={stars} sx={{ mb: 2 }}>
                <FlexBox alignItems="center" gap={2} mb={0.5}>
                  <Typography variant="body2" sx={{ minWidth: "60px" }}>
                    {stars} stars
                  </Typography>
                  <Box sx={{ flex: 1, position: "relative" }}>
                    <LinearProgress
                      variant="determinate"
                      value={percentage}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "#E0E0E0",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#FFC107",
                          borderRadius: 4,
                        },
                      }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ minWidth: "50px", textAlign: "right", color: "text.green" }}>
                    {Math.round(percentage)}%
                  </Typography>
                </FlexBox>
              </Box>
            );
          })}
        </Box>
        </Box>
      </Box>
    </Container>
  );
}

