'use client';
import { useGetUsersProductOrdersQuery } from "app/store/services";
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

export default function UsersProductOrdersTable() {
  const { data: usersData, isLoading, error } = useGetUsersProductOrdersQuery({ page: 1, limit: 10 });

  if (isLoading) {
    return (
      <Card>
        <FlexBetween px={3} py={2.5}>
          <Typography variant="h5">Users & Products Ordered</Typography>
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
          <Typography variant="h5">Users & Products Ordered</Typography>
          <Button size="small" color="info" variant="outlined">View All</Button>
        </FlexBetween>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <Typography color="error">Failed to load users data</Typography>
        </Box>
      </Card>
    );
  }

  const users = usersData?.data?.users || [];

  const getRoleColor = (role) => {
    switch (role) {
      case 'Retailer': return 'primary';
      case 'Wholesale': return 'success';
      case 'ChainStore': return 'warning';
      case 'Franchise': return 'info';
      default: return 'default';
    }
  };

  return (
    <Card>
      <FlexBetween px={3} py={2.5}>
        <Typography variant="h5">Users & Products Ordered</Typography>
        <Button size="small" color="info" variant="outlined">View All</Button>
      </FlexBetween>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Total Orders</TableCell>
              <TableCell>Products Ordered</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Join Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {user.firstName?.charAt(0) || 'U'}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight="600">
                        {user.firstName} {user.lastName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={user.role} 
                    color={getRoleColor(user.role)} 
                    size="small" 
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="600">
                    {user.orderCount || 0}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="600">
                    {user.totalProductsOrdered || 0}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="600">
                    {currency(user.totalAmount || 0)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {users.length === 0 && (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100px">
          <Typography color="text.secondary">No users found</Typography>
        </Box>
      )}
    </Card>
  );
}
