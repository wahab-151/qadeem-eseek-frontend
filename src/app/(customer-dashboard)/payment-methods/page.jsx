import { PaymentMethodsPageView } from "pages-sections/customer-dashboard/payment-methods/page-view";
import { generateMetadata } from "utils/helpers";
// API FUNCTIONS
import api from "utils/__api__/payments";



export const metadata = generateMetadata("PAyment Methods");

// ==============================================================


// ==============================================================

export default async function PaymentMethods({
  searchParams
}) {
  const {
    page
  } = await searchParams;
  const data = await api.getPayments(+page || 1);
  if (!data || data.payments.length === 0) {
    return <div>Data not found</div>;
  }
  return <PaymentMethodsPageView payments={data.payments} totalPages={data.totalPages} />;
}