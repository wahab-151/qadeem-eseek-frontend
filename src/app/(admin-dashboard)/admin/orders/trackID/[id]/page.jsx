import { notFound } from "next/navigation";
import GenerateTrackingId from "pages-sections/admin-dashboard/orders/create-Tracking-Id";

// API FUNCTIONS

import { generateMetadata } from "utils/helpers";

// CUSTOM DATA MODEL


export const metadata = generateMetadata("Order Details");
export default async function TrackOrderDetails({
  params
}) {
  const {
    id
  } = await params;
  // const order = await api.getOrder(id);
  // if (!order) notFound();
  return <GenerateTrackingId id={id} />;
}                       