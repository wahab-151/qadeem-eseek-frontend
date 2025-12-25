import dynamicImport from "next/dynamic";
import InlineLoader from "components/progress/InlineLoader";

const DashboardPageView = dynamicImport(
  () => import("pages-sections/admin-dashboard/dashboard/page-view").then(m => m.DashboardPageView),
  { ssr: true, loading: () => <InlineLoader size={40} /> }
);

export const dynamic = 'force-dynamic';

export default function VendorDashboard() {
  return <DashboardPageView />;
}