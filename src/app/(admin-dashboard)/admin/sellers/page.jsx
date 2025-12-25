import { SellersPageView } from "pages-sections/admin-dashboard/sellers/page-view";
import { generateMetadata } from "utils/helpers";
// API FUNCTIONS
import api from "utils/__api__/dashboard";



export const metadata = generateMetadata("Sellers");

export default async function Sellers() {
  const sellers = await api.sellers();
  return <SellersPageView sellers={sellers} />;
}