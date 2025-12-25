'use client';
import { useGetSalespersonOrdersByUserQuery } from "app/store/services";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { Box, CircularProgress, Avatar } from "@mui/material";
import { currency } from "lib";

export default function SalespersonOrdersByUserTable() {
  const { data, isLoading, error } = useGetSalespersonOrdersByUserQuery({ page: 1, limit: 10 });

  if (isLoading) {
    return (
      <Card sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Orders by Customer</Typography>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Orders by Customer</Typography>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <Typography color="error">Failed to load orders</Typography>
        </Box>
      </Card>
    );
  }

  const rows = data?.data?.users || [];

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Orders by Customer</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Orders</TableCell>
              <TableCell>Total Items</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Last Order</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row._id}>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {row.user?.firstName?.charAt(0) || 'U'}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight="600">
                        {row.user?.firstName} {row.user?.lastName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {row.user?.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="600">{row.orderCount || 0}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{row.totalItems || 0}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="600">{currency(row.totalAmount || 0)}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{row.lastOrderAt ? new Date(row.lastOrderAt).toLocaleDateString() : '-'}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {rows.length === 0 && (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100px">
          <Typography color="text.secondary">No orders found</Typography>
        </Box>
      )}
    </Card>
  );
}


