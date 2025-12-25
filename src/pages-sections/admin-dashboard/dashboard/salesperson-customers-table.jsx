'use client';
import { useGetSalespersonCustomersQuery } from "app/store/services";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { Box, CircularProgress, Avatar } from "@mui/material";

export default function SalespersonCustomersTable() {
  const { data, isLoading, error } = useGetSalespersonCustomersQuery({ page: 1, limit: 10 });

  if (isLoading) {
    return (
      <Card sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>My Customers</Typography>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>My Customers</Typography>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <Typography color="error">Failed to load customers</Typography>
        </Box>
      </Card>
    );
  }

  const customers = data?.data?.customers || [];

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>My Customers</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Joined</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((user) => (
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
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{user.email}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{user.phone || '-'}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{user.companyName || '-'}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{user.role}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{new Date(user.createdAt).toLocaleDateString()}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {customers.length === 0 && (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100px">
          <Typography color="text.secondary">No customers assigned</Typography>
        </Box>
      )}
    </Card>
  );
}


