import { Box, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { Carousel } from "components/carousel";

// GLOBAL CUSTOM COMPONENTS
import ProductCard1 from "components/product-cards/product-card-1";
import ProductCard2 from "components/product-cards/product-card-2";

// CUSTOM DATA MODEL


// ==============================================================


// ==============================================================

export default function RelatedProducts({
  products
}) {
  // console.log("related products", products)
  // Loading state: when undefined/null
  if (products == null) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }
   const responsive = [
    { breakpoint: 950, settings: { slidesToShow: 3 } },
    { breakpoint: 650, settings: { slidesToShow: 2 } },
    { breakpoint: 500, settings: { slidesToShow: 1 } },
  ];
  return <div className="mb-4">
      <Typography variant="h3" color="text.primary" sx={{
      mb: 3
    }}>
        Related Products
      </Typography>
{/* 
      <Grid container spacing={3}>
        {products?.map(product => <Grid size={{
        lg: 3,
        md: 4,
        sm: 6,
        xs: 12
      }} key={product.id}>
       
            <ProductCard2 product={product} />
          </Grid>)}
      </Grid> */}


       {products.length === 0  ? (
              <Typography variant="body1" color="text.secondary">No related products found.</Typography>
              ) : (
                <Carousel
                  slidesToShow={4}
                  responsive={responsive}
                  arrowStyles={{
                    color: "dark.main",
                    backgroundColor: "white",
                    top: "40%",
                  }}
                >
                  {products.map((product) => (
                    <ProductCard2 key={product?._id} product={product} />
                  ))}
                </Carousel>
              )}
    </div>;
}