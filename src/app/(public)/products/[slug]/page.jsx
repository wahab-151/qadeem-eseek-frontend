// API FUNCTIONS
import { ProductDetailsPageView } from "pages-sections/product-details/page-view";

const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL || 'http://localhost:5000';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sifrausa.com';

// Helper function to fetch product for metadata (server-side)
async function getProductForMetadata(slug) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products/${slug}`, {
      next: { revalidate: 60 }, // Cache metadata fetch for 60 seconds
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data || null;
  } catch (error) {
    console.error('Error fetching product for metadata:', error.message);
    return null;
  }
}

// Dynamic metadata generation for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductForMetadata(slug);

  // Default metadata if product not found
  if (!product) {
    return {
      title: 'Product Not Found - SIFRA',
      description: 'The requested product could not be found.',
    };
  }

  const title = product.metaTitle || `${product.name} - SIFRA`;
  const description = product.metaDescription || 
    product.description?.slice(0, 160) || 
    `Buy ${product.name} at SIFRA. Quality products with personalized pricing.`;
  
  const imageUrl = product.images?.[0]?.preview || 
    product.images?.[0]?.url || 
    `${SITE_URL}/assets/images/logo.jpeg`;

  return {
    title,
    description,
    keywords: [
      product.name,
      product.brand?.name,
      product.category?.name,
      ...(product.tags || []),
      'wholesale',
      'retail',
      'SIFRA'
    ].filter(Boolean),
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${SITE_URL}/products/${slug}`,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      siteName: 'SIFRA',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${SITE_URL}/products/${slug}`,
    },
    robots: {
      index: product.published !== false,
      follow: true,
    },
  };
}

// Force dynamic rendering for product pages (products change frequently)
// This prevents Next.js from attempting static generation which causes delays
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default async function ProductDetails({ params }) {
  const { slug } = await params;

  return (
    <ProductDetailsPageView
      slug={slug}
    />
  );
}
