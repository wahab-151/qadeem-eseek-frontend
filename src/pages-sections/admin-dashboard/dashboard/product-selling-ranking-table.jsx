'use client';
import { useGetProductSellingRankingQuery } from "app/store/services";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import { Box, CircularProgress, Avatar, LinearProgress, Button } from "@mui/material";
import { FlexBetween } from "components/flex-box";
import { currency } from "lib";
import Image from "next/image";

export default function ProductSellingRankingTable() {
  const { data: productsData, isLoading, error } = useGetProductSellingRankingQuery({ page: 1, limit: 10 });

  if (isLoading) {
    return (
      <Card>
        <FlexBetween px={3} py={2.5}>
          <Typography variant="h5">Product Selling Ranking</Typography>
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
          <Typography variant="h5">Product Selling Ranking</Typography>
          <Button size="small" color="info" variant="outlined">View All</Button>
        </FlexBetween>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <Typography color="error">Failed to load product ranking</Typography>
        </Box>
      </Card>
    );
  }

  const products = productsData?.data?.products || [];

  const getRankingColor = (index) => {
    switch (index) {
      case 0: return '#FFD700'; // Gold
      case 1: return '#C0C0C0'; // Silver
      case 2: return '#CD7F32'; // Bronze
      default: return 'default';
    }
  };

  const getRankingLabel = (index) => {
    switch (index) {
      case 0: return '1st';
      case 1: return '2nd';
      case 2: return '3rd';
      default: return `${index + 1}th`;
    }
  };

  // Calculate max units sold for progress bar
  const maxUnitsSold = Math.max(...products.map(p => p.totalUnitsSold || 0), 1);

  return (
    <Card>
      <FlexBetween px={3} py={2.5}>
        <Typography variant="h5">Product Selling Ranking</Typography>
        <Button size="small" color="info" variant="outlined">View All</Button>
      </FlexBetween>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Units Sold</TableCell>
              <TableCell>Orders</TableCell>
              <TableCell>Revenue</TableCell>
              <TableCell>Progress</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={product._id}>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Chip 
                      label={getRankingLabel(index)} 
                      sx={{ 
                        backgroundColor: getRankingColor(index),
                        color: index < 3 ? 'white' : 'inherit',
                        fontWeight: 'bold'
                      }}
                      size="small" 
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar sx={{ width: 40, height: 40 }}>
                      {product.productImages?.[0]?.preview ? (
                        <Image 
                          src={product.productImages[0].preview} 
                          alt={product.productName}
                          width={40}
                          height={40}
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        product.productName?.charAt(0) || 'P'
                      )}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight="600">
                        {product.productName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: {product._id.slice(-8)}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="600" color="primary">
                    {product.totalUnitsSold || 0}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {product.orderCount || 0}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="600">
                    {currency(product.totalRevenue || 0)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ width: 100 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={(product.totalUnitsSold / maxUnitsSold) * 100}
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        backgroundColor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: getRankingColor(index),
                          borderRadius: 4
                        }
                      }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                      {Math.round((product.totalUnitsSold / maxUnitsSold) * 100)}%
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {products.length === 0 && (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100px">
          <Typography color="text.secondary">No product sales data found</Typography>
        </Box>
      )}
    </Card>
  );
}
