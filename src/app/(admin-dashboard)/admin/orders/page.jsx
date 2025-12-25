import { OrdersPageView } from "pages-sections/admin-dashboard/orders/page-view";

// API FUNCTIONS
import api from "utils/__api__/dashboard";
import { generateMetadata } from "utils/helpers";





export const metadata = generateMetadata("Orders");

export default async function Orders() {
  // const orders = await api.orders();
  return <OrdersPageView  />;
}