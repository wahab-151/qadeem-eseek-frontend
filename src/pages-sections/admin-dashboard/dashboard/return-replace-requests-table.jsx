'use client';
import { useGetReturnReplaceRequestsQuery } from "app/store/services";
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

export default function ReturnReplaceRequestsTable() {
  const { data: requestsData, isLoading, error } = useGetReturnReplaceRequestsQuery({ page: 1, limit: 10 });

  if (isLoading) {
    return (
      <Card>
        <FlexBetween px={3} py={2.5}>
          <Typography variant="h5">Return/Replace Requests</Typography>
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
          <Typography variant="h5">Return/Replace Requests</Typography>
          <Button size="small" color="info" variant="outlined">View All</Button>
        </FlexBetween>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <Typography color="error">Failed to load requests</Typography>
        </Box>
      </Card>
    );
  }

  const requests = requestsData?.data?.requests || [];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'warning';
      case 'Processing': return 'info';
      case 'Partially_Completed': return 'info';
      case 'Completed': return 'success';
      case 'Rejected': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Card>
      <FlexBetween px={3} py={2.5}>
        <Typography variant="h5">Return/Replace Requests</Typography>
        <Button size="small" color="info" variant="outlined">View All</Button>
      </FlexBetween>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Request ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Order Amount</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request._id}>
                <TableCell>
                  <Typography variant="body2" fontWeight="600">
                    #{request._id.slice(-8)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {request.user?.firstName?.charAt(0) || 'U'}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight="600">
                        {request.user?.firstName} {request.user?.lastName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {request.user?.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="600">
                    {currency(request.order?.amount || 0)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {request.items?.length || 0} items
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {request.items?.map(item => item.requestType).join(', ') || ''}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={request.status} 
                    color={getStatusColor(request.status)} 
                    size="small" 
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={request.priority} 
                    color={getPriorityColor(request.priority)} 
                    size="small" 
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {requests.length === 0 && (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100px">
          <Typography color="text.secondary">No return/replace requests found</Typography>
        </Box>
      )}
    </Card>
  );
}
