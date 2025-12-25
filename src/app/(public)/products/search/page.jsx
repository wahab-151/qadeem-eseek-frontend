// PAGE VIEW COMPONENT
import { ProductSearchPageView } from "pages-sections/product-details/page-view";

// API FUNCTIONS
import { getFilters, getProducts } from "utils/__api__/product-search";
import { Suspense } from "react";
import InlineLoader from "components/progress/InlineLoader";

export const metadata = {
  title: "Product Search - Bazaar Next.js E-commerce Template",
  description: "Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store",
  authors: [{
    name: "UI-LIB",
    url: "https://ui-lib.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

// ==============================================================

// Separate component for async data fetching to allow Suspense boundary
async function ProductSearchContent({ searchParams }) {
  const {
    q,
    page,
    sort,
    sale,
    prices,
    colors,
    brands,
    rating,
    category,
    tag
  } = await searchParams;
  
  const [filters, data] = await Promise.all([getFilters(), getProducts({
    q,
    page,
    sort,
    sale,
    prices,
    colors,
    brands,
    rating,
    category
  })]);
  
  return <ProductSearchPageView 
    filters={filters} 
    products={data.products} 
    pageCount={data.pageCount} 
    totalProducts={data.totalProducts} 
    lastIndex={data.lastIndex} 
    firstIndex={data.firstIndex} 
  />;
}

export default async function ProductSearch({ searchParams }) {
  return (
    <Suspense fallback={<InlineLoader size={40} />}>
      <ProductSearchContent searchParams={searchParams} />
    </Suspense>
  );
}