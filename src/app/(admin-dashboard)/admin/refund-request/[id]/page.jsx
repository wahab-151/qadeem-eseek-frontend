import { notFound } from "next/navigation";
// import RefundPageView from "pages-sections/admin-dashboard/refund-request/page-view/refund";
// import { OrderDetailsPageView } from "pages-sections/admin-dashboard/orders/page-view";
import { RefundDetailsPageView } from "pages-sections/admin-dashboard/refund-request/page-view";
// API FUNCTIONS
import api from "utils/__api__/dashboard";
import { generateMetadata } from "utils/helpers";

// CUSTOM DATA MODEL


export const metadata = generateMetadata("Request Details");
export default async function RefundRequestDetails({
  params
}) {
  const {
    id
  } = await params;
  // const order = await api.getOrder(id);
  // if (!order) notFound();
  return <RefundDetailsPageView id={id} />;
}