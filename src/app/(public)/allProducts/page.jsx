// PAGE VIEW COMPONENT
import { ProductSearchPageView } from "pages-sections/product-details/page-view";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sifrausa.com';

// Optimized: Use static metadata with proper SEO
export const metadata = {
  title: "All Products - SIFRA | Wholesale & Retail Store",
  description: "Browse all products at SIFRA. Quality tools, parts, and supplies with personalized wholesale and retail pricing. Fast delivery available.",
  keywords: [
    'all products',
    'wholesale products',
    'retail products',
    'tools',
    'parts',
    'supplies',
    'SIFRA',
  ],
  openGraph: {
    title: 'All Products - SIFRA',
    description: 'Browse all products at SIFRA. Quality tools, parts, and supplies with personalized pricing.',
    type: 'website',
    url: `${SITE_URL}/allProducts`,
    siteName: 'SIFRA',
  },
  alternates: {
    canonical: `${SITE_URL}/allProducts`,
  },
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