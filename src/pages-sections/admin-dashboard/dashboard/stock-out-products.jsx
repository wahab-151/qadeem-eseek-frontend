"use client";

import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, CircularProgress } from "@mui/material";

// GLOBAL CUSTOM COMPONENTS
import { FlexBetween } from "components/flex-box";

// LOCAL CUSTOM COMPONENT
import DataListTable from "./table";

// DASHBOARD DATA HOOKS
import { useGetLowStockProductsQuery } from "app/store/services";

// table column list
const tableHeading = [{
  id: "product",
  label: "Product",
  alignRight: false
}, {
  id: "stock",
  label: "Stock",
  alignRight: false
}, {
  id: "amount",
  label: "Amount",
  alignCenter: true
}];

export default function StockOutProducts() {
  const { data: productsData, isLoading, error } = useGetLowStockProductsQuery({ page: 1, limit: 10, threshold: 10 });

  if (isLoading) {
    return (
      <Card>
        <FlexBetween px={3} py={2.5}>
          <Typography variant="h5">Stock Out Products</Typography>
          <Button size="small" color="info" variant="outlined">
            All Products
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
          <Typography variant="h5">Stock Out Products</Typography>
          <Button size="small" color="info" variant="outlined">
            All Products
          </Button>
        </FlexBetween>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <Typography color="error">Failed to load stock out products</Typography>
        </Box>
      </Card>
    );
  }

  const products = productsData?.data?.products || [];

  // Transform products data to match the table format
  const stockOutProducts = products.map(product => ({
    product: product.name || 'Unknown Product',
    stock: product.stock || 0,
    amount: product.price || 0
  }));

  return (
    <Card>
      <FlexBetween px={3} py={2.5}>
        <Typography variant="h5">Stock Out Products</Typography>
        <Button size="small" color="info" variant="outlined">
          All Products
        </Button>
      </FlexBetween>

      <DataListTable dataList={stockOutProducts} tableHeading={tableHeading} type="STOCK_OUT" />
    </Card>
  );
}