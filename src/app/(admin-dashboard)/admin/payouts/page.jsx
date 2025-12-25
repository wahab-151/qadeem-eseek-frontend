import { PayoutsPageView } from "pages-sections/admin-dashboard/payouts/page-view";





// API FUNCTIONS
import api from "utils/__api__/dashboard";
import { generateMetadata } from "utils/helpers";


export const metadata = generateMetadata("Payouts");
export default async function Payouts() {
  const payouts = await api.payouts();
  return <PayoutsPageView payouts={payouts} />;
}