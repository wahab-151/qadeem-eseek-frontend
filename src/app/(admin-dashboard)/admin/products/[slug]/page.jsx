import { EditProductPageView } from "pages-sections/admin-dashboard/products/page-view";
import { generateMetadata } from "utils/helpers";



export const metadata = generateMetadata("Product");
export default function ProductEdit() {
  return <EditProductPageView />;
}