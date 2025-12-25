// PAGE VIEW COMPONENT
import { ProductSearchPageView } from "pages-sections/product-details/page-view";

// Optimized: Use static metadata to avoid blocking server-side rendering
export const metadata = {
  title: "Search - Wholesale & Retail Store with Personalized Pricing",
  description: "Search for products in our wholesale and retail e-commerce platform."
};

// Force dynamic rendering but optimize for client-side rendering
// This page uses search params which are dynamic
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

// Disable static generation for this route
export const fetchCache = 'force-no-store';

// Use edge runtime for faster response (if compatible) or keep nodejs
// Edge runtime is faster but may not support all Node.js APIs
export const runtime = 'nodejs';

// ==============================================================

// Simple wrapper - ProductSearchPageView is already a client component
// No server-side data fetching - all data fetching happens client-side
export default function ProductSearch() {
  return <ProductSearchPageView />;
}