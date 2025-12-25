import { PayoutRequestsPageView } from "pages-sections/admin-dashboard/payout-requests/page-view";

// API FUNCTIONS
import api from "utils/__api__/dashboard";
import { generateMetadata } from "utils/helpers";



export const metadata = generateMetadata("Payment Requests");


export default async function PayoutRequests() {
  const requests = await api.payoutRequests();
  return <PayoutRequestsPageView requests={requests} />;
}