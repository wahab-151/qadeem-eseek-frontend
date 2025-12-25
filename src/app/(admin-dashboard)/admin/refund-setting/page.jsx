import { RefundSettingPageView } from "pages-sections/admin-dashboard/refund-setting/page-view";
import { generateMetadata } from "utils/helpers";



export const metadata = generateMetadata("Refund Setting");
export default async function RefundSetting() {
  return <RefundSettingPageView />;
}