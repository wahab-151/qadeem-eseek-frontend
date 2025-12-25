// 'use client'
// import { Fragment, useEffect, useMemo, useState } from "react";
// // CUSTOM ICON COMPONENT
// import CustomerService from "icons/CustomerService";
// // LOCAL CUSTOM COMPONENTS
// import TicketCard from "../ticket-card";
// import Pagination from "../../pagination";
// import DashboardHeader from "../../dashboard-header";
// import { useGetAllRequestsAdminQuery, useGetUserRequestsMutation, useGetUserRequestsQuery,
//  } from "app/store/services";
// import useUser from "hooks/useUser";
// // CUSTOM DATA MODEL
// // =============================================

// // =============================================
// export default function TicketsPageView({
//   page,
//   // totalPages=100
// }) {
//     const [ticketsData, setTicketsData] = useState([]);
//     const [totalPages, setTotalPages]=useState(1)  
   
//   //  const { data, isLoading, error, refetch } = useGetUserRequestsQuery();
//   const { state } = useUser();
// const userId = state?.user?.id;



// const queryParams = useMemo(() => {
//   if (!userId) return undefined;

//   return {
//     userId,
//     page,
//     limit: 10,
//     sortBy: "createdAt",
//     sortOrder: "desc",
//   };
// }, [userId, page]);


//   const {
//     data,
//     isLoading,
//     error,
//     refetch,
//   } = useGetUserRequestsQuery(queryParams, {
// skip: !userId,});


//   useEffect(() => {
//     console.log("useeffecr called")
//     if (data?.data?.requests) {
//       console.log("useeffecr called inside if")

//       setTicketsData(data.data.requests || []);
//       setTotalPages(data.data.totalPages || 1);
//     }
//     if (error) {
//       console.error("Error fetching requests:", error);
//     }
//   }, [data, error]);

//   // ✅ Flatten request items
// const reshapedTickets = Array.isArray(ticketsData)
//   && ticketsData?.flatMap((request) =>
//       request?.items?.map((item) => ({
//         id: item._id,
//         slug: request.order,
//         date: request.createdAt,
//         type: item.requestType,
//         status: item.status,
//         title: item.product?.name,
//         // category: item.requestType,
//         productImage: item.product?.images?.[0]?.preview || "",
//         quantity: item.quantity,
//         reason: item.reason,
//         processedAt: item.processedAt,
//         price: item.price,
//       }))
//     )
//  if (!userId) return <div>Loading user...</div>;
// console.log("dataaa", data?.data?.requests,reshapedTickets)
//   return (
//     <Fragment>
//     <DashboardHeader title="Requests" Icon={CustomerService} />
// {reshapedTickets.length>0 && reshapedTickets?.map((item) => (
//     <TicketCard ticket={item} key={item.id} />
//   ))}
//       {/* {isLoading ? (
//   <div>Loading...</div>
// ) : Array.isArray(reshapedTickets) && reshapedTickets.length === 0 ? (
//   <p>No requests found.</p>
// ) : (
//   reshapedTickets?.map((item) => (
//     <TicketCard ticket={item} key={item.id} />
//   ))
// )}
// */}
//       <Pagination count={totalPages} /> 
//     </Fragment>
//   );
// }


'use client'
import { Fragment, useEffect, useMemo, useState } from "react";
import { CircularProgress } from "@mui/material";
// CUSTOM ICON COMPONENT
import CustomerService from "icons/CustomerService";
// LOCAL CUSTOM COMPONENTS
import TicketCard from "../ticket-card";
import Pagination from "../../pagination";
import DashboardHeader from "../../dashboard-header";
import { useGetAllRequestsAdminQuery, useGetUserRequestsMutation, useGetUserRequestsQuery,
 } from "app/store/services";
import useUser from "hooks/useUser";
// CUSTOM DATA MODEL
// =============================================

// =============================================
export default function TicketsPageView({
  page,
  // totalPages=100
}) {
    const [ticketsData, setTicketsData] = useState([]);
    const [totalPages, setTotalPages]=useState(1)  
   
  //  const { data, isLoading, error, refetch } = useGetUserRequestsQuery();
  const { state } = useUser();
const userId = state?.user?.id;



const queryParams = useMemo(() => {
  if (!userId) return undefined;

  return {
    userId,
    page,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  };
}, [userId, page]);


  const {
    data,
    isLoading,
    error,
    refetch,
  } = useGetUserRequestsQuery(queryParams, {
skip: !userId,});


  useEffect(() => {
    console.log("useeffecr called")
    if (data?.data?.requests) {
      console.log("useeffecr called inside if")

      setTicketsData(data.data.requests || []);
      setTotalPages(data.data.totalPages || 1);
    }
    if (error) {
      console.error("Error fetching requests:", error);
    }
  }, [data, error]);

  // ✅ Flatten request items
const reshapedTickets = Array.isArray(ticketsData)
  && ticketsData?.flatMap((request) =>
      request?.items?.map((item) => ({
        id: item._id,
        slug: request.order,
        date: request.createdAt,
        type: item.requestType,
        status: item.status,
        title: item.product?.name,
        // category: item.requestType,
        productImage: item.product?.images?.[0]?.preview || "",
        quantity: item.quantity,
        reason: item.reason,
        processedAt: item.processedAt,
        price: item.price,
      }))
    )
 if (!userId) return (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
    <CircularProgress />
  </div>
 );
console.log("dataaa", data?.data?.requests,reshapedTickets)
  return (
    <Fragment>
    <DashboardHeader title="Requests" Icon={CustomerService} />
  {isLoading ? (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
      <CircularProgress />
    </div>
  ) : Array.isArray(reshapedTickets) && reshapedTickets.length === 0 ? (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', fontWeight: 600 }}>
      No requests found
    </div>
  ) : (
    reshapedTickets?.map((item) => (
      <TicketCard ticket={item} key={item.id} />
    ))
  )}
      {/* {isLoading ? (
  <div>Loading...</div>
) : Array.isArray(reshapedTickets) && reshapedTickets.length === 0 ? (
  <p>No requests found.</p>
) : (
  reshapedTickets?.map((item) => (
    <TicketCard ticket={item} key={item.id} />
  ))
)}
*/}
      <Pagination count={totalPages} /> 
    </Fragment>
  );
}