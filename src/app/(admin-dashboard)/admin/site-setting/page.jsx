
import { SiteSettingsPageView } from "pages-sections/admin-dashboard/site-settings/page-view";
import { generateMetadata } from "utils/helpers";



export const metadata = generateMetadata("Gadget Shop");


export default async function SiteSetting() {


  return <SiteSettingsPageView />;
}