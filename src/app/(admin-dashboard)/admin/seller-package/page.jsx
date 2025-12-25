import { SellerPackagePageView } from "pages-sections/admin-dashboard/seller-package/page-view";
import { generateMetadata } from "utils/helpers";



export const metadata = generateMetadata("Seller Package");
export default async function SellerPackage() {
  return <SellerPackagePageView />;
}