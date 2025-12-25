'use client';
import { useGetRecentOrdersQuery } from "app/store/services";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { Box, CircularProgress, Avatar, Button } from "@mui/material";
import { FlexBetween } from "components/flex-box";
import { currency } from "lib";

export default function RecentOrdersTable() {
  const { data: ordersData, isLoading, error } = useGetRecentOrdersQuery({ page: 1, limit: 10 });

  if (isLoading) {
    return (
      <Card>
        <FlexBetween px={3} py={2.5}>
          <Typography variant="h5">Recent Orders</Typography>
          <Button size="small" color="info" variant="outlined">View All</Button>
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
          <Typography variant="h5">Recent Orders</Typography>
          <Button size="small" color="info" variant="outlined">View All</Button>
        </FlexBetween>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <Typography color="error">Failed to load recent orders</Typography>
        </Box>
      </Card>
    );
  }

  const orders = ordersData?.data?.orders || [];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'warning';
      case 'Processing': return 'info';
      case 'Delivered': return 'success';
      case 'Cancelled': return 'error';
      default: return 'default';
    }
  };

  const getPaidColor = (paid) => {
    switch (paid) {
      case 'Paid': return 'success';
      case 'Unpaid': return 'warning';
      case 'Rejected': return 'error';
      default: return 'default';
    }
  };

  return (
    <Card>
      <FlexBetween px={3} py={2.5}>
        <Typography variant="h5">Recent Orders</Typography>
        <Button size="small" color="info" variant="outlined">View All</Button>
      </FlexBetween>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>
                  <Typography variant="body2" fontWeight="600">
                    #{order._id.slice(-8)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {order.user?.firstName?.charAt(0) || 'U'}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight="600">
                        {order.user?.firstName} {order.user?.lastName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {order.user?.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {order.items?.length || 0} items
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="600">
                    {currency(order.amount || 0)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={order.status} 
                    color={getStatusColor(order.status)} 
                    size="small" 
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={order.paid} 
                    color={getPaidColor(order.paid)} 
                    size="small" 
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {orders.length === 0 && (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100px">
          <Typography color="text.secondary">No recent orders found</Typography>
        </Box>
      )}
    </Card>
  );
}
