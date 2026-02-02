import { AddressDetailsPageView } from "pages-sections/customer-dashboard/address/page-view";
import { generateMetadata } from "utils/helpers";

export const metadata = generateMetadata("Add Address");

export default function AddAddress() {
  return <AddressDetailsPageView address={{}} />;
}
