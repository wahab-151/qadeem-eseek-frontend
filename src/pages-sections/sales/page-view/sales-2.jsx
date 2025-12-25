"use client";

import Container from "@mui/material/Container";

// LOCAL CUSTOM COMPONENTS
import ProductList from "../product-list";
import ProductPagination from "../product-pagination";

// CUSTOM DATA MODEL


// ==============================================================


// ==============================================================

export default function SalesTwoPageView({
  products,
  page
}) {
  return <Container className="mt-2">
    <p>salesTWO PAGEVIEW</p>
      {/* PRODUCT LIST AREA */}
      <ProductList products={products} />

      {/* PAGINATION AREA */}
      <ProductPagination page={page} perPage={20} totalProducts={100} />
    </Container>;
}