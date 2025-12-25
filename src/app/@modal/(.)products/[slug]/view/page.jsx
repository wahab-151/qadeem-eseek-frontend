import { notFound } from "next/navigation";

// PAGE VIEW COMPONENT
import ProductQuickView from "./quick-view";

// DATA SOURCE (build-time)
import { generateMetadata } from "utils/helpers";

// CUSTOM DATA MODEL

export async function generateStaticParams() {
  const data = await import("__server__/__db__/products/data");
  const list = data.uniqueProducts || [];
  return list.map(item => ({ slug: item?.slug }));
}

// export async function generateMetadata({
//   params
// }) {
//   const {
//     slug
//   } = await params;
//   const product = await api.getProduct(slug);
//   if (!product) notFound();
//   return {
//     title: product.title + " - Bazaar Next.js E-commerce Template",
//     description: "Bazaar is a React Next.js E-commerce template.",
//     authors: [{
//       name: "UI-LIB",
//       url: "https://ui-lib.com"
//     }],
//     keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
//   };
// }
export const metadata = generateMetadata("Product View")
export default async function QuickViewPage({
  params
}) {
  const {
    slug
  } = await params;
  const data = await import("__server__/__db__/products/data");
  const product = (data.uniqueProducts || []).find(item => item?.slug === slug);
  if (!product) notFound();
  return<>test
   <ProductQuickView product={product} />
   </>
}