import { notFound } from "next/navigation";

// PAGE VIEW COMPONENT
import { ProductDetailsPageView } from "pages-sections/product-details/page-view";

// API FUNCTIONS
import api from "utils/__api__/products";
import { getFrequentlyBought, getRelatedProducts } from "utils/__api__/related-products";
import { generateMetadata } from "utils/helpers";

// CUSTOM DATA MODEL



export const metadata = generateMetadata("SIFRA")

export async function generateStaticParams() {
  const data = await import("__server__/__db__/products/data");
  const list = data.uniqueProducts || [];
  return list.map(item => ({ slug: item?.slug }));
}
export default async function ProductDetails({
  params
}) {
  const {
    slug
  } = await params;
  // const [product, relatedProducts, frequentlyBought] = await Promise.all([api.getProduct(slug), getRelatedProducts(), getFrequentlyBought()]);
  // if (!product) notFound();
  return <ProductDetailsPageView 
  slug={slug}
  // product={product} relatedProducts={relatedProducts} frequentlyBought={frequentlyBought} 
  />;
}