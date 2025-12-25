import { AddressPageView } from "pages-sections/customer-dashboard/address/page-view";
import { generateMetadata } from "utils/helpers";
// API FUNCTIONS
import api from "utils/__api__/address";



export const metadata = generateMetadata("Address");


// ==============================================================


// ==============================================================

export default async function Address({
  searchParams
}) {
  const {
    page
  } = await searchParams;
  const data = await api.getAddressList(+page || 1);
  if (!data || data.addressList.length === 0) {
    return <div>Data not found</div>;
  }
  return <AddressPageView addressList={data.addressList} totalPages={data.totalPages} />;
}