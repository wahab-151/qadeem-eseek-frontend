// 'use client';
// import { Fragment, useEffect, useState } from "react";
// import ShoppingBag from "@mui/icons-material/ShoppingBag";

// // LOCAL CUSTOM COMPONENTS
// import OrderRow from "../order-row";
// import Pagination from "../../pagination";
// import DashboardHeader from "../../dashboard-header";
// import { useGetAllOrdersQuery } from "app/store/services";
// import { Box, CircularProgress, Typography } from "@mui/material";
// import useUser from "hooks/useUser";

// export default function OrdersPageView() {
//   const [orders, setOrdersData] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);

//   const { state: userState } = useUser();

//   const {
//     data,
//     isLoading,
//     error,
//   } = useGetAllOrdersQuery(userState?.user?.id, {
//     skip: !userState?.user?.id,
//   });

//   useEffect(() => {
//     if (data?.data?.orders) {
//       setOrdersData(data.data.orders || []);
//       setTotalPages(data.data.totalPages || 1);
//     }
//     if (error) {
//       console.error("Error fetching orders:", error);
//     }
//   }, [data, error]);
// // console.log("data", data);
//   return (
//     <Fragment>
//       {/* <DashboardHeader Icon={ShoppingBag} title="My Orders" /> */}
// {/* hellooooo */}
//       {isLoading ? (
//         <Box display="flex" justifyContent="center" alignItems="center" p={4}>
//           <CircularProgress />
//         </Box>
//       ) : error ? (
//         <Box p={4}>
//           <Typography color="error">Failed to load orders.</Typography>
//         </Box>
//       ) : (
//         <Box>
//           {orders?.length > 0 ? (
//             <>
//               {orders.map((order) => (
//                 <OrderRow order={order} key={order._id} />
//               ))}
//               <Pagination count={totalPages} />
//             </>
//           ) : (
//             <Box p={4}>
//               <Typography>No orders found.</Typography>
//             </Box>
//           )}
//         </Box> 
//        )} 
//     </Fragment>
//   );
// }


'use client';
import { Fragment, useEffect, useState } from "react";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import { useSearchParams } from "next/navigation";

// LOCAL CUSTOM COMPONENTS
import OrderRow from "../order-row";
import Pagination from "../../pagination";
import DashboardHeader from "../../dashboard-header";
import { useGetAllOrdersQuery } from "app/store/services";
import { Box, CircularProgress, Typography } from "@mui/material";
import useUser from "hooks/useUser";

export default function OrdersPageView() {
  const [orders, setOrdersData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const searchParams = useSearchParams();
  const { state: userState } = useUser();

  // Get current page from URL
  useEffect(() => {
    const page = searchParams.get("page");
    setCurrentPage(page ? parseInt(page, 10) : 1);
  }, [searchParams]);

  const {
    data,
    isLoading,
    error,
  } = useGetAllOrdersQuery(
    {
      page: currentPage,
      limit: 10,
    },
    {
      skip: !userState?.user?.id,
    }
  );

  useEffect(() => {
    if (data?.data?.orders) {
      setOrdersData(data.data.orders || []);
      setTotalPages(data.data.totalPages || 1);
    }
    if (error) {
      console.error("Error fetching orders:", error);
    }
  }, [data, error]);
// console.log("data", data);
  return (
    <Fragment>
      {/* <DashboardHeader Icon={ShoppingBag} title="My Orders" /> */}
{/* hellooooo */}
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box p={4} sx={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography color="error">Failed to load orders.</Typography>
        </Box>
      ) : (
        <Box>
          {orders?.length > 0 ? (
            <>
              {orders.map((order) => (
                <OrderRow order={order} key={order._id} />
              ))}
              <Pagination count={totalPages} page={currentPage} />
            </>
          ) : (
            <Box p={4}>
              <Typography>No orders found.</Typography>
            </Box>
          )}
        </Box> 
       )} 
    </Fragment>
  );
}