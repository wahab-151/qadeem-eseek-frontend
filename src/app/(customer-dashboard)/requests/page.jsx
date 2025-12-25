// import { TicketsPageView } from "pages-sections/customer-dashboard/requests/page-view";
// import { generateMetadata } from "utils/helpers";
// // API FUNCTIONS
// import api from "utils/__api__/ticket";
// export const metadata = generateMetadata("Support Tickets");

// // ==============================================================


// // ==============================================================

// export default async function Requests({
//   searchParams
// }) {
//   // const {
//   //   page
//   // } = await searchParams;
//   // const data = await api.getTicketList(+page || 1);
//   // if (!data || data.tickets.length === 0) {
//   //   return <div>Data not found</div>;
//   // }
//   return <TicketsPageView 
//   // tickets={data.tickets} totalPages={data.totalPages} 
//   />;
// }


import { TicketsPageView } from "pages-sections/customer-dashboard/requests/page-view";

import { generateMetadata } from "utils/helpers";
// API FUNCTIONS
// import api from "utils/__api__/ticket";
export const metadata = generateMetadata("Support Tickets");
import { Suspense } from "react";
import FullPageLoader from "components/progress/FullPageLoader";

// ==============================================================


// ==============================================================


export default async function Requests({
  searchParams
}) {

  return <Suspense fallback={<FullPageLoader />}> 
  <TicketsPageView 
  // tickets={data.tickets} totalPages={data.totalPages} 
  />
  </Suspense>;
}