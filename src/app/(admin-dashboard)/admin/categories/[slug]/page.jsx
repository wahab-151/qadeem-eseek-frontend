import { EditCategoryPageView } from "pages-sections/admin-dashboard/categories/page-view";
import { generateMetadata } from "utils/helpers";

export const metadata = generateMetadata("Edit Category");
export default function EditCategory() {
  return <EditCategoryPageView />;
}