import { EarningHistoryPageView } from "pages-sections/admin-dashboard/earning-history/page-view";
import { generateMetadata } from "utils/helpers";
// API FUNCTIONS
import api from "utils/__api__/dashboard";



export const metadata = generateMetadata("Earning History");


export default async function EarningHistory() {
  const earnings = await api.earningHistory();
  return <EarningHistoryPageView earnings={earnings} />;
}