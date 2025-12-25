import { memo } from "react";
import Grid from "@mui/material/Grid2";

// GLOBAL CUSTOM COMPONENT
import ProductCard1 from "components/product-cards/product-card-1";
import ProductCard2 from "components/product-cards/product-card-2";
import ProductCard3 from "components/product-cards/product-card-3";
import ProductCard4 from "components/product-cards/product-card-4";

// CUSTOM DATA MODEL


// ==============================================================


// ==============================================================

export default memo(function ProductList({
  products
}) {
  return <Grid container spacing={3} minHeight={500} columns={{ xs: 1, sm: 3, md: 3, lg: 5 }}>
      {products.map(product => <Grid size={{
      lg: 1,
      md: 1,
      sm: 1,
      xs: 1
    }} key={product.id}>
        
          <ProductCard2  product={product} />
          {/* <ProductCard4  product={product} /> */}
        </Grid>)}
    </Grid>;
});