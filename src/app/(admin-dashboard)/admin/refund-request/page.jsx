import { RefundRequestPageView } from "pages-sections/admin-dashboard/refund-request/page-view";
import { generateMetadata } from "utils/helpers";


// API FUNCTIONS
import api from "utils/__api__/dashboard";



export const metadata = generateMetadata("Refund Request");
export default async function RefundRequest() {
  // const requests = await api.refundRequests();
  return <RefundRequestPageView />;
}