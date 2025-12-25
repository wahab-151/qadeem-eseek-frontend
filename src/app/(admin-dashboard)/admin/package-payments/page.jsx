import { PackagePaymentPageView } from "pages-sections/admin-dashboard/package-payments/page-view";

// API FUNCTIONS
import api from "utils/__api__/dashboard";
import { generateMetadata } from "utils/helpers";




export const metadata = generateMetadata("Package payments");
export default async function PackagePayments() {
  const payments = await api.packagePayments();
  return <PackagePaymentPageView payments={payments} />;
}