// "use client";

// import Card from "@mui/material/Card";
// import Stack from "@mui/material/Stack";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableContainer from "@mui/material/TableContainer";

// // GLOBAL CUSTOM COMPONENTS
// import OverlayScrollbar from "components/overlay-scrollbar";
// import { TableHeader, TablePagination } from "components/data-table";

// // GLOBAL CUSTOM HOOK
// import useMuiTable from "hooks/useMuiTable";

// // LOCAL CUSTOM COMPONENT
// import OrderRow from "../order-row";
// import SearchArea from "../../search-box";
// import PageWrapper from "../../page-wrapper";

// // CUSTOM DATA MODEL


// // TABLE HEAD COLUMN DATA
// import { tableHeading } from "../table-heading";
// import { useGetAllOrdersQuery } from "app/store/services";
// import { Box, CircularProgress, TableCell, TableRow } from "@mui/material";
// import { useEffect, useState } from "react";


// // =============================================================================


// // =============================================================================

// export default function OrdersPageView({
//   // orders
// }) {




//   const [ordersData, setOrdersData] = useState([]);
//   const [totalPages, setTotalPages] = useState(1)
//   const [search, setSearch] = useState("");





//   const {
//     page,
//     order,
//     orderBy,
//     rowsPerPage,
//     // filteredList,
//     handleChangePage,
//     handleRequestSort
//   } = useMuiTable({
//     listData: []
//   });

//   // const { data, isLoading, error, refetch } = useGetAllOrdersQuery({
//   //   search: search,
//   //   page: page,
//   //   limit: rowsPerPage,
//   //   sortBy: "createdAt",
//   //   sortOrder: order,
//   // });

//   const { data, isLoading, error, refetch } = useGetAllOrdersQuery(search);

//   // console.log("orderGETdata==>", data?.data?.orders)


//   useEffect(() => {
//     if (data?.data?.orders) {
//       setOrdersData(data?.data?.orders || []);
//       setTotalPages(data?.data?.totalPages || 1);
//     }
//     if (error) {
//       console.error("Error fetching Products:", error);
//     }
//   }, [data?.data?.orders, error]);



//   const handleSearchChange = (value) => {
//     setSearch(value);
//     // Reset to first page when search is applied
//     handleChangePage(null, 0);
//   };



//   // Ensure we safely access the nested data
//   const reshapedOrders = ordersData?.map(order => {
//     const items = order.items || [];

//     const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);
//     const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

//     return {
//       id: order._id,
//       status: order.status,
//       qty: totalQty,
//       items: order?.items,
//       amount: order?.amount,
//       purchaseDate: order.createdAt,
//       billingAddress: order.shippingAddress
//     };
//   }) || [];


//   // RESHAPE THE ORDER LIST BASED TABLE HEAD CELL ID
//   // const reshapedOrders = ordersData.map(item => ({
//   //   id: item?._id,
//   //   status: item?.status,
//   //   qty: item?.items[0]?.quantity,
//   //   amount: item?.items[0]?.price,
//   //   purchaseDate: item?.createdAt,
//   //   billingAddress: item?.shippingAddress
//   // }));





//   return <PageWrapper title="Orders">
//     {/* <SearchArea url="/admin/orders" buttonText="Create Order" searchPlaceholder="Search Order..." /> */}
//     <SearchArea
//       buttonText="Add orders"
//       url="/orders"
//       searchPlaceholder="Search order..."
//       onSearchChange={handleSearchChange}
//     />
//     <Card>
//       {isLoading || !ordersData ? (
//         <Box display="flex" justifyContent="center" alignItems="center" p={4}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <>
//           <OverlayScrollbar>
//             <TableContainer sx={{
//               minWidth: 900
//             }}>
//               <Table>
//                 <TableHeader order={order} orderBy={orderBy} heading={tableHeading} onRequestSort={handleRequestSort} />

//                 <TableBody>

//                   {reshapedOrders.length > 0 ? (
//                     reshapedOrders.map((order, index) => <OrderRow key={index} order={order} refetch={refetch} />)
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={6} align="center">
//                         {isLoading ? "Loading..." : "No Product found."}
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </OverlayScrollbar>

//           <Stack alignItems="center" my={4}>

//             <TablePagination onChange={handleChangePage}
//               page={page}
//               count={totalPages}
//             // count={Math.ceil(reshapedProducts.length / rowsPerPage)} 
//             />
//             {/* <TablePagination onChange={handleChangePage} count={Math.ceil(filteredList.length / rowsPerPage)} /> */}
//           </Stack>
//         </>
//       )}
//     </Card>
//   </PageWrapper>;
// }



"use client";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
// GLOBAL CUSTOM COMPONENTS
import OverlayScrollbar from "components/overlay-scrollbar";
import { TableHeader, TablePagination } from "components/data-table";
// GLOBAL CUSTOM HOOK
import useMuiTable from "hooks/useMuiTable";
// LOCAL CUSTOM COMPONENT
import OrderRow from "../order-row";
import SearchArea from "../../search-box";
import PageWrapper from "../../page-wrapper";
// CUSTOM DATA MODEL
// TABLE HEAD COLUMN DATA
import { tableHeading } from "../table-heading";
import { useGetAllOrdersQuery } from "app/store/services";
import { Box, CircularProgress, TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
// =============================================================================
// =============================================================================
export default function OrdersPageView({
  // orders
}) {
  const [ordersData, setOrdersData] = useState([]);
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState("");
  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    // filteredList,
    handleChangePage,
    handleRequestSort
  } = useMuiTable({
    listData: []
  });
  const { data, isLoading, error, refetch } = useGetAllOrdersQuery(search);
  // console.log("orderGETdata==>", data?.data?.orders)
  useEffect(() => {
    if (data?.data?.orders) {
      setOrdersData(data?.data?.orders || []);
      setTotalPages(data?.data?.totalPages || 1);
    }
    if (error) {
      console.error("Error fetching Products:", error);
    }
  }, [data?.data?.orders, error]);
  const handleSearchChange = (value) => {
    setSearch(value);
    // Reset to first page when search is applied
    handleChangePage(null, 0);
  };
  // Ensure we safely access the nested data
  const reshapedOrders = ordersData?.map(order => {
    const items = order.items || [];
    const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    return {
      id: order._id,
      status: order.status,
      qty: totalQty,
      items: order?.items,
      amount: order?.amount,
      purchaseDate: order.createdAt,
      billingAddress: order.shippingAddress,
      user: order.user
    };
  }) || [];
  return <PageWrapper title="Orders">
    {/* <SearchArea url="/admin/orders" buttonText="Create Order" searchPlaceholder="Search Order..." /> */}
    <SearchArea
      buttonText="Add orders"
      url="/orders"
      searchPlaceholder="Search order..."
      onSearchChange={handleSearchChange}
    />
    <Card>
      {isLoading || !ordersData ? (
        <Box display="flex" justifyContent="center" alignItems="center" p={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <OverlayScrollbar>
            <TableContainer sx={{
              minWidth: 900
            }}>
              <Table>
                <TableHeader order={order} orderBy={orderBy} heading={tableHeading} onRequestSort={handleRequestSort} />
                <TableBody>
                  {reshapedOrders.length > 0 ? (
                    reshapedOrders.map((order, index) => <OrderRow key={index} order={order} refetch={refetch} />)
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        {isLoading ? "Loading..." : "No Product found."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </OverlayScrollbar>
          <Stack alignItems="center" my={4}>
            <TablePagination onChange={handleChangePage}
              page={page}
              count={totalPages}
            // count={Math.ceil(reshapedProducts.length / rowsPerPage)}
            />
            {/* <TablePagination onChange={handleChangePage} count={Math.ceil(filteredList.length / rowsPerPage)} /> */}
          </Stack>
        </>
      )}
    </Card>
  </PageWrapper>;
}




