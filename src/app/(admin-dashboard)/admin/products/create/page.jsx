import { ProductCreatePageView } from "pages-sections/admin-dashboard/products/page-view";
import { generateMetadata } from "utils/helpers";
import { Suspense } from "react";

export const metadata = generateMetadata("Product Create");

export default function ProductCreate() {
  return (
    <Suspense fallback={null}>
      <ProductCreatePageView />
    </Suspense>
  );
}