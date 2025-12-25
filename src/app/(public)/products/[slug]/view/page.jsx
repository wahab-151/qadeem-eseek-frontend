import { redirect } from "next/navigation";

// CUSTOM DATA MODEL

export async function generateStaticParams() {
  const data = await import("__server__/__db__/products/data");
  const list = data.uniqueProducts || [];
  return list.map(item => ({ slug: item?.slug }));
}

export default async function ProductQuickView({
  params
}) {
  const {
    slug
  } = await params;
  redirect(`/products/${slug}`);
}