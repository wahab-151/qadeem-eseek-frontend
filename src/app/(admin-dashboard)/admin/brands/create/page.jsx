import { CreateBrandPageView } from "pages-sections/admin-dashboard/brands/page-view";
import { generateMetadata } from "utils/helpers";
import { Suspense } from "react";

export const metadata = generateMetadata("Brand Create");
export default function BrandCreate() {
  return (
    <Suspense fallback={null}>
      <CreateBrandPageView />
    </Suspense>
  );
}