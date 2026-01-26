// PAGE VIEW COMPONENT
import { ProductSearchPageView } from "pages-sections/product-details/page-view";

// API FUNCTIONS
import { getFilters, getProducts } from "utils/__api__/product-search";
import { Suspense } from "react";
import InlineLoader from "components/progress/InlineLoader";

const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL || 'http://localhost:5000';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sifrausa.com';

// Helper to fetch category by ID for metadata
async function getCategoryById(categoryId) {
  if (!categoryId) return null;
  try {
    const res = await fetch(`${API_BASE_URL}/api/categories/${categoryId}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data || data || null;
  } catch {
    return null;
  }
}

// Dynamic metadata for product search/category pages
export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const { q, category, brand, tag } = params;
  
  let title = 'Product Search - QADEEM';
  let description = 'Search and browse products at QADEEM. Find tools, parts, and supplies with personalized wholesale and retail pricing.';
  let canonicalUrl = `${SITE_URL}/products/search`;
  
  // If filtering by category, get category info
  if (category) {
    const categoryData = await getCategoryById(category);
    if (categoryData) {
      title = `${categoryData.name || categoryData.title} Products - QADEEM`;
      description = categoryData.description || 
        `Browse ${categoryData.name} products at QADEEM. Quality tools, parts, and supplies with personalized pricing.`;
      canonicalUrl = `${SITE_URL}/products/search?category=${category}`;
    }
  }
  
  // If search query is present
  if (q) {
    title = `Search: "${q}" - QADEEM`;
    description = `Search results for "${q}" at QADEEM. Find quality tools, parts, and supplies.`;
  }
  
  // If filtering by tag
  if (tag) {
    title = `${tag} Products - QADEEM`;
    description = `Browse ${tag} products at QADEEM. Quality tools, parts, and supplies with personalized pricing.`;
  }

  return {
    title,
    description,
    keywords: [
      q,
      tag,
      'product search',
      'wholesale',
      'retail',
      'tools',
      'parts',
      'QADEEM',
    ].filter(Boolean),
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonicalUrl,
      siteName: 'QADEEM',
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

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