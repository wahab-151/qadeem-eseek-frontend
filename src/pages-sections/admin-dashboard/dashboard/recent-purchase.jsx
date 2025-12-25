"use client";

import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, CircularProgress } from "@mui/material";

// GLOBAL CUSTOM COMPONENTS
import FlexBetween from "components/flex-box/flex-between";

// LOCAL CUSTOM COMPONENT
import DataListTable from "./table";

// DASHBOARD DATA HOOKS
import { useGetRecentOrdersQuery } from "app/store/services";

// table column list
const tableHeading = [{
  id: "orderId",
  label: "Order ID",
  alignRight: false
}, {
  id: "product",
  label: "Product",
  alignRight: false
}, {
  id: "payment",
  label: "Payment",
  alignRight: false
}, {
  id: "amount",
  label: "Amount",
  alignCenter: true
}];

export default function RecentPurchase() {
  const { data: ordersData, isLoading, error } = useGetRecentOrdersQuery({ page: 1, limit: 10 });

  if (isLoading) {
    return (
      <Card>
        <FlexBetween px={3} py={2.5}>
          <Typography variant="h5">Recent Purchases</Typography>
          <Button size="small" color="info" variant="outlined">
            All Orders
          </Button>
        </FlexBetween>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <FlexBetween px={3} py={2.5}>
          <Typography variant="h5">Recent Purchases</Typography>
          <Button size="small" color="info" variant="outlined">
            All Orders
          </Button>
        </FlexBetween>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <Typography color="error">Failed to load recent purchases</Typography>
        </Box>
      </Card>
    );
  }

  const orders = ordersData?.data?.orders || [];

  // Transform orders data to match the table format
  const recentPurchase = orders.map(order => ({
    id: `#${order._id.slice(-8)}`,
    product: order.items?.length > 0 ? order.items[0].product?.name || 'Product' : 'No items',
    payment: order.paid || 'Pending',
    amount: order.amount || 0
  }));

  return (
    <Card>
      <FlexBetween px={3} py={2.5}>
        <Typography variant="h5">Recent Purchases</Typography>
        <Button size="small" color="info" variant="outlined">
          All Orders
        </Button>
      </FlexBetween>

      <DataListTable dataList={recentPurchase} tableHeading={tableHeading} type="RECENT_PURCHASE" />
    </Card>
  );
}