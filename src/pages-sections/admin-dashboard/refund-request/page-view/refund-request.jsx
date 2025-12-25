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
import PageWrapper from "../../page-wrapper";
import RefundRequestRow from "../refund-request-row";

// TABLE HEAD COLUMN DATA
import { tableHeading } from "../table-heading";
import { useEffect, useState } from "react";
import { Box, CircularProgress, TableCell, TableRow } from "@mui/material";
import { useGetAllRequestsAdminQuery } from "app/store/services";


// DATA TYPES


// =============================================================================


// =============================================================================

export default function RefundRequestPageView({

}) {




  const [refundData, setRefundData] = useState([]);
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





  const { data, isLoading, error, refetch } = useGetAllRequestsAdminQuery(search);


  // console.log("useGetAllRequestsAdminQuery==>", data?.data?.requests , data)








  useEffect(() => {
    if (data?.data?.requests) {
      setRefundData(data.data.requests || []);
      setTotalPages(data.data.totalPages || 1);
    }
    if (error) {
      console.error("Error fetching refunds:", error);
    }
  }, [data?.data?.requests, error]);




  // console.log("refundData===>", refundData);


  // RESHAPE THE ORDER LIST BASED TABLE HEAD CELL ID
  const reshapedRefundRequests = refundData?.map((refund) => ({
    orderNo: refund?.orderNo,
    user: refund?.user,
    requestType: refund?.requestTypes,
    requestQty: refund?.requestQty,
    requestedDate: new Date(refund?.requestedDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }),
    status: refund?.status,
    requestId: refund?.requestId

  }));









  return <PageWrapper title="Refund / Replace Request">
    <Card>
      {isLoading || !refundData ? (
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

                  {reshapedRefundRequests.length > 0 ? (
                    reshapedRefundRequests.map((request, index) => <RefundRequestRow key={index} request={request} refetch={refetch} />)
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
            {/* <TablePagination onChange={handleChangePage} count={Math.ceil(requests.length / rowsPerPage)} /> */}
          </Stack>
        </>
      )}
    </Card>
  </PageWrapper>;
}