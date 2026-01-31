import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Container from "@mui/material/Container";

export default function CartSkeleton() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={8}>
        {/* Left Column: Product List */}
        <Grid size={{ xs: 12, md: 8 }}>
          {/* Table Header Skeleton */}
          <Skeleton variant="rectangular" height={40} sx={{ mb: 3 }} />

          {/* Product Items Skeletons */}
          {[1, 2, 3].map((item) => (
            <Box
              key={item}
              display="grid"
              gridTemplateColumns={{
                xs: "1fr",
                md: "1.5fr 2fr 1fr 1fr 1fr 0.5fr",
              }}
              gap={2}
              sx={{ py: 3, borderBottom: "1px solid #eee" }}
            >
              {/* Image */}
              <Skeleton variant="rectangular" width={80} height={80} />

              {/* Name */}
              <Box>
                <Skeleton width="80%" height={30} sx={{ mb: 1 }} />
                <Skeleton width="40%" height={20} />
              </Box>

              {/* Color */}
              <Box display={{ xs: "none", md: "flex" }} alignItems="center">
                <Skeleton variant="circular" width={24} height={24} />
              </Box>

              {/* Quantity */}
              <Box display="flex" justifyContent="center">
                <Skeleton width={60} height={30} />
              </Box>

              {/* Price */}
              <Box display="flex" justifyContent="flex-end">
                <Skeleton width={80} height={30} />
              </Box>

              {/* Remove Icon */}
              <Box display="flex" justifyContent="flex-end">
                <Skeleton variant="circular" width={24} height={24} />
              </Box>
            </Box>
          ))}
        </Grid>

        {/* Right Column: Order Summary */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ border: "1px solid #eee", p: 4 }}>
            <Skeleton width="60%" height={40} sx={{ mb: 4 }} />

            <Box display="flex" justifyContent="space-between" mb={2}>
              <Skeleton width="30%" />
              <Skeleton width="20%" />
            </Box>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Skeleton width="30%" />
              <Skeleton width="20%" />
            </Box>

            <Skeleton width="100%" height={2} sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between" mb={4}>
              <Skeleton width="40%" height={30} />
              <Skeleton width="30%" height={30} />
            </Box>

            <Skeleton variant="rectangular" width="100%" height={50} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
