
import { CategoriesPageView } from "pages-sections/admin-dashboard/categories/page-view";
import { generateMetadata } from "utils/helpers";
// API FUNCTIONS
import api from "utils/__api__/dashboard";



export const metadata = generateMetadata("Gadget Shop");


export default async function Categories() {
  // const categories = await api.category();








  return <CategoriesPageView 
  // categories={categories}
  />;
}