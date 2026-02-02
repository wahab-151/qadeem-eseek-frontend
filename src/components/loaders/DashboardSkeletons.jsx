import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

export const ProfileSkeleton = () => (
  <Card
    sx={{
      p: { xs: 3, md: 4, lg: 5 },
      borderRadius: "0px",
      boxShadow: "none",
      border: "1px solid",
      borderColor: "primary.main",
      bgcolor: "#fff",
      position: "relative",
    }}
  >
    <Box
      sx={{
        position: { sm: "absolute" },
        top: { sm: 24, md: 32 },
        right: { sm: 24, md: 32 },
        mb: { xs: 3, sm: 0 },
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Skeleton variant="rectangular" width={110} height={40} />
    </Box>

    <Grid container spacing={4} rowSpacing={5}>
      {[1, 2, 3, 4].map((item) => (
        <Grid size={{ xs: 12, sm: 6, md: 6 }} key={item}>
          <Box display="flex" alignItems="center" gap={1} mb={0.5}>
            <Skeleton variant="circular" width={16} height={16} />
            <Skeleton width={100} height={20} />
          </Box>
          <Skeleton width="60%" height={24} sx={{ ml: 3.25 }} />
        </Grid>
      ))}
      <Grid size={{ xs: 12, sm: 6, md: 12 }}>
        <Box display="flex" alignItems="center" gap={1} mb={0.5}>
          <Skeleton variant="circular" width={16} height={16} />
          <Skeleton width={100} height={20} />
        </Box>
        <Box sx={{ ml: 3.25 }}>
          <Skeleton width="40%" height={24} />
          <Skeleton width="30%" height={24} sx={{ mt: 0.5 }} />
        </Box>
      </Grid>
    </Grid>
  </Card>
);

export const AddressSkeleton = () => (
  <Box>
    <Skeleton width={150} height={40} sx={{ mb: 3 }} />
    <Grid container spacing={3}>
      {[1, 2, 3].map((item) => (
        <Grid size={{ md: 6, xs: 12 }} key={item}>
          <Card
            sx={{
              p: "1.5rem",
              borderRadius: "0px",
              border: "1px solid #2B2118",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            <Box display="flex" justifyContent="space-between" mb={1.5}>
              <Skeleton width={120} height={24} />
              <Box display="flex" gap={1}>
                <Skeleton variant="circular" width={24} height={24} />
                <Skeleton variant="circular" width={24} height={24} />
              </Box>
            </Box>
            <Skeleton width="60%" height={20} />
            <Skeleton width="40%" height={20} />
            <Skeleton width="80%" height={20} sx={{ mt: 0.5 }} />
          </Card>
        </Grid>
      ))}
      <Grid size={{ md: 6, xs: 12 }}>
        <Skeleton
          variant="rectangular"
          height={170}
          sx={{
            border: "1px dashed #2B2118",
            bgcolor: "rgba(43, 33, 24, 0.02)",
          }}
        />
      </Grid>
    </Grid>
  </Box>
);

export const OrdersSkeleton = () => (
  <Box>
    <Skeleton width={200} height={40} sx={{ mb: 5 }} />
    <Card
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: "0px",
        boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.09)",
        border: "none",
        bgcolor: "#fff",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1.2fr 1fr 1fr",
          pb: 2,
          borderBottom: "1px solid #E0D6C1",
          mb: 1,
        }}
      >
        {[1, 2, 3, 4].map((item) => (
          <Skeleton key={item} width="60%" height={20} />
        ))}
      </Box>

      {[1, 2, 3, 4, 5].map((item) => (
        <Box
          key={item}
          sx={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1.2fr 1fr 1fr",
            alignItems: "center",
            py: 3,
            borderBottom: "1px solid #F0E9D9",
          }}
        >
          <Skeleton width="70%" height={20} />
          <Skeleton width="80%" height={20} />
          <Skeleton width="40%" height={20} />
          <Skeleton width="50%" height={20} />
        </Box>
      ))}
    </Card>
  </Box>
);
