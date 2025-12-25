import { ProductsPageView } from "pages-sections/admin-dashboard/products/page-view";





// API FUNCTIONS
import api from "utils/__api__/dashboard";
import { generateMetadata } from "utils/helpers";



export const metadata = generateMetadata("Products");
export default async function Products() {
  // const products = await api.products();
  return <ProductsPageView 
  // products={products} 
  />;
}