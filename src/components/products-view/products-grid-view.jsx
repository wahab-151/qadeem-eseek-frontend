import { Typography, Box } from "@mui/material";
import { memo, useMemo } from "react";
import Grid from "@mui/material/Grid2";

// GLOBAL CUSTOM COMPONENTS
import ProductCard16 from "components/product-cards/product-card-16";
import ProductCard2 from "components/product-cards/product-card-2";

// CUSTOM DATA MODEL


// ========================================================


// ========================================================

function ProductsGridViewInternal({
  products
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
  const items = useMemo(() => products, [products]);
  return <Box sx={{
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',           // 1 product per row on phone
      sm: 'repeat(3, 1fr)', // 3 products per row on small (>=600px) & tablets
      md: 'repeat(3, 1fr)', // 3 products per row on medium screens
      lg: 'repeat(5, 1fr)'  // 5 products per row on large screens
    },
    gap: 2,
    width: '100%'
  }}>
      {items.map(product => (
        <Box key={product._id || product.id || product.sku}>
          <ProductCard2 product={product} />
        </Box>
      ))}
    </Box>;
}

const ProductsGridView = memo(ProductsGridViewInternal);
export default ProductsGridView;