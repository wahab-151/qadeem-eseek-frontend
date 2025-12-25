import { notFound } from "next/navigation";
import { AddressDetailsPageView } from "pages-sections/customer-dashboard/address/page-view";

// API FUNCTIONS
import api from "utils/__api__/address";
import { generateMetadata } from "utils/helpers";

// CUSTOM DATA MODEL

// export async function generateMetadata({
//   params
// }) {
//   const {
//     id
//   } = await params;
//   const address = await api.getAddress(id);
//   if (!address) notFound();
//   return {
    
//     title: address.title + " - Bazaar Next.js E-commerce Template",
//     description: "Bazaar is a React Next.js E-commerce template.",
//     authors: [{
//       name: "UI-LIB",
//       url: "https://ui-lib.com"
//     }],
//     keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
//   };
// }

export const metadata = generateMetadata("Dashboard")
export default async function Address({
  params
}) {
  const {
    id
  } = await params;
  const address = await api.getAddress(id);
  if (!address) notFound();
  return <AddressDetailsPageView address={address} />;
}