// API FUNCTIONS
// import api from "utils/__api__/products";
// import { getFrequentlyBought, getRelatedProducts } from "utils/__api__/related-products";
import { ProductDetailsPageView } from "pages-sections/product-details/page-view";
import { generateMetadata } from "utils/helpers";

// CUSTOM DATA MODEL
export const metadata = generateMetadata("Product");

// Force dynamic rendering for product pages (products change frequently)
// This prevents Next.js from attempting static generation which causes delays
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0; // Disable caching for product pages

export async function generateStaticParams() {
  // This is still called at build time for static optimization
  // But runtime requests will use dynamic rendering
  try {
    const data = await import("__server__/__db__/products/data");
    const list = data.uniqueProducts || [];
    return list.map(item => ({ slug: item?.slug }));
  } catch {
    return []; // Fallback if data not available
  }
}

export default async function ProductDetails({ params }) {
  const { slug } = await params;

  // console.log("paramssss", slug);
  // const [product, relatedProducts, frequentlyBought] = await Promise.all([api.getProduct(slug), getRelatedProducts(), getFrequentlyBought()]);
  // if (!product) notFound();
  return (
    <ProductDetailsPageView
    slug={slug}
      // product={product}
      // relatedProducts={relatedProducts}
      // frequentlyBought={frequentlyBought}
    />
  );
}
