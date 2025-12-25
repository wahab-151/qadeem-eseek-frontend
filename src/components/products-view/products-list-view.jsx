import { Typography } from "@mui/material";
import ProductCard9 from "components/product-cards/product-card-9";
import ProductsTableView from "./products-table-view";

// CUSTOM DATA MODEL


// ==========================================================


// ==========================================================

export default function ProductsListView({
  products,
  onSort
}) {
  //  if (!products || products.length === 0) {
  //   return (
  //     <Typography
  //       variant="h6"
  //       color="text.secondary"
  //       sx={{ textAlign: 'center', mt: 4 }}
  //     >
  //       No products found.
  //     </Typography>
  //   );
  // }
  
  // Use table view for better sorting and stock display
  return <ProductsTableView products={products} onSort={onSort} />;
}