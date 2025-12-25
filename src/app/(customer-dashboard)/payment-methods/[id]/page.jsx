import { notFound } from "next/navigation";
import { PaymentDetailsPageView } from "pages-sections/customer-dashboard/payment-methods/page-view";
import { generateMetadata } from "utils/helpers";
// API FUNCTIONS
import api from "utils/__api__/payments";

// TYPES

export const metadata = generateMetadata("Payment Methods");
export default async function PaymentMethodDetails({
  params
}) {
  const {
    id
  } = await params;
  const payment = await api.getPayment(id);
  if (!payment) notFound();
  return <PaymentDetailsPageView payment={payment} />;
}