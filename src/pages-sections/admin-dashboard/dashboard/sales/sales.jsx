"use client";

import dynamic from "next/dynamic";
import Grid from "@mui/material/Grid2";
import Skeleton from "@mui/material/Skeleton";
import InlineLoader from "components/progress/InlineLoader";
import useTheme from "@mui/material/styles/useTheme";
import { Box, CircularProgress, Typography } from "@mui/material";

// LOCAL CUSTOM COMPONENT
import Card2 from "./card-2";

// CHART OPTIONS
import * as options from "../chart-options";

// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";

// DASHBOARD DATA HOOKS
import { 
  useGetDashboardStatsQuery,
  useGetRecentOrdersQuery,
  useGetProductSellingRankingQuery 
} from "app/store/services";

const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <InlineLoader size={28} />
});

export default function Sales() {
  const theme = useTheme();
  
  // Fetch dashboard data
  const { data: statsData, isLoading: statsLoading } = useGetDashboardStatsQuery();
  const { data: ordersData, isLoading: ordersLoading } = useGetRecentOrdersQuery({ page: 1, limit: 7 });
  const { data: productsData, isLoading: productsLoading } = useGetProductSellingRankingQuery({ page: 1, limit: 3 });

  if (statsLoading || ordersLoading || productsLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  const stats = statsData?.data || {};
  const orders = ordersData?.data?.orders || [];
  const products = productsData?.data?.products || [];

  // Calculate weekly sales data from recent orders
  const weeklySales = orders.slice(0, 7).map(order => order.amount || 0);
  const totalWeeklySales = weeklySales.reduce((sum, amount) => sum + amount, 0);
  
  // Calculate total orders
  const totalOrders = orders.length;
  
  // Calculate market share data (simplified)
  const marketShareData = products.slice(0, 3).map(product => product.totalRevenue || 0);
  const totalMarketRevenue = marketShareData.reduce((sum, revenue) => sum + revenue, 0);

  // weekly chart series
  const series = [{
    name: "Weekly Sales",
    data: weeklySales.length > 0 ? weeklySales : [0, 0, 0, 0, 0, 0, 0]
  }];

  const totalOrderSeries = [{
    name: "Orders",
    data: [totalOrders, totalOrders * 0.8, totalOrders * 1.2, totalOrders * 0.9, totalOrders * 1.1, totalOrders * 0.7, totalOrders]
  }];

  return (
    <div>
      <Grid container spacing={3}>
        {/* WEEKLY SALE CHART */}
        <Grid size={{ md: 4, xs: 12 }}>
          <Card2 
            title="Weekly Sales" 
            percentage="+12.5%" 
            amount={currency(totalWeeklySales, 0)}
          >
            <ApexChart 
              type="bar" 
              width={150} 
              height={130} 
              series={series} 
              options={options.weeklyChartOptions(theme)} 
            />
          </Card2>
        </Grid>

        {/* PRODUCT SHARE CHART */}
        <Grid size={{  md: 4, xs: 12 }}>
          <Card2 
            title="Product Share" 
            percentage="+8.2%" 
            amount={`${stats.products || 0} Products`}
          >
            <ApexChart 
              width={140} 
              height={200} 
              series={[Math.min((stats.products || 0) / 10, 100)]} 
              type="radialBar" 
              options={options.productShareChartOptions(theme)} 
            />
          </Card2>
        </Grid>

        {/* TOTAL ORDERS CHART */}
        <Grid size={{  md: 4, xs: 12 }}>
          <Card2 
            title="Total Orders" 
            percentage="+15.3%" 
            amount={currency(totalWeeklySales * 1.2, 0)}
          >
            <ApexChart 
              type="area" 
              width={150} 
              height={130} 
              series={totalOrderSeries} 
              options={options.totalOrderChartOptions(theme)} 
            />
          </Card2>
        </Grid>

        {/* MARKET SHARE CHART */}
        {/* <Grid size={{ lg: 3, md: 6, xs: 12 }}>
          <Card2 
            title="Market Share" 
            percentage="+5.7%" 
            amount={currency(totalMarketRevenue, 0)}
          >
            <ApexChart 
              height={300} 
              width={140} 
              type="radialBar" 
              series={marketShareData.length > 0 ? marketShareData.map(revenue => (revenue / totalMarketRevenue) * 100) : [33, 33, 34]} 
              options={options.marketShareChartOptions(theme)} 
            />
          </Card2>
        </Grid> */}
      </Grid>
    </div>
  );
}