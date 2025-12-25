import { notFound } from "next/navigation";
import { OrderDetailsPageView } from "pages-sections/admin-dashboard/orders/page-view";

// API FUNCTIONS
import api from "utils/__api__/dashboard";
import { generateMetadata } from "utils/helpers";

// CUSTOM DATA MODEL


export const metadata = generateMetadata("Order Details");
export default async function OrderDetails({
  params
}) {
  const {
    id
  } = await params;

  // const order = await api.getOrder(id);
  // if (!order) notFound();
  return <OrderDetailsPageView id={id} />;
}                       