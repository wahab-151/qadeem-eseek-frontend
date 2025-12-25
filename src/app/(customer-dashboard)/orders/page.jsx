import { OrdersPageView } from "pages-sections/customer-dashboard/orders/page-view";
import { generateMetadata } from "utils/helpers";
// API FUNCTIONS
import api from "utils/__api__/orders";



export const metadata = generateMetadata("Orders");


// ==============================================================


// ==============================================================

export default async function Orders({
  // searchParams
}) {
  // const {
  //   page
  // } = await searchParams;
  // const data = await api.getOrders(+page || 1);
  // if (!data || data.orders.length === 0) {
  //   return <div>Failed to load</div>;
  // }
  // return <OrdersPageView orders={data.orders} totalPages={data.totalPages} />;

  return <OrdersPageView />;
}