'use client';
import { useGetDashboardStatsQuery } from "app/store/services";
import Card1 from "./card-1";
import Grid from "@mui/material/Grid2";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function DashboardStatsCards() {
  const { data: statsData, isLoading, error } = useGetDashboardStatsQuery();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography color="error">Failed to load dashboard stats</Typography>
      </Box>
    );
  }

  const stats = statsData?.data || {};

  const cardList = [
    {
      id: 1,
      title: "Total Users",
      amount1: stats.users || 0,
      amount2: "Active Users",
      percentage: "+12%",
      status: "up",
      color: "info.main"
    },
    {
      id: 2,
      title: "Total Products",
      amount1: stats.products || 0,
      amount2: "Published Products",
      percentage: "+8%",
      status: "up",
      color: "success.main"
    },
    {
      id: 3,
      title: "Categories",
      amount1: stats.categories || 0,
      amount2: "Active Categories",
      percentage: "+5%",
      status: "up",
      color: "warning.main"
    },
    {
      id: 4,
      title: "Recent Orders",
      amount1: stats.recentOrders || 0,
      amount2: "Last 30 Days",
      percentage: "+15%",
      status: "up",
      color: "primary.main"
    },
    {
      id: 5,
      title: "Pending Requests",
      amount1: stats.pendingRequests || 0,
      amount2: "Return/Replace",
      percentage: "-3%",
      status: "down",
      color: "error.main"
    }
  ];

  return (
    <Grid container spacing={3}>
      {cardList.map(item => (
        <Grid size={{ sm: 6, xs: 12, md: 4, lg: 2.4 }} key={item.id}>
          <Card1 
            title={item.title} 
            color={item.color} 
            amount1={item.amount1} 
            amount2={item.amount2} 
            percentage={item.percentage} 
            status={item.status === "down" ? "down" : "up"} 
          />
        </Grid>
      ))}
    </Grid>
  );
}
