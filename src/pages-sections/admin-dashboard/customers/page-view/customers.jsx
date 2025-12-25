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
import SearchArea from "../../search-box";
import CustomerRow from "../customer-row";
import PageWrapper from "../../page-wrapper";

// TABLE HEAD COLUMN DATA
import { tableHeading } from "../table-heading";

import { useEffect, useState } from "react";
import { useGetAllCustomersQuery } from "app/store/services";
import { Box, CircularProgress, TableCell, TableRow } from "@mui/material";


// =============================================================================


// =============================================================================

export default function CustomersPageView({
  // customers
}) {

  const [customersData, setCustomersData] = useState([]);
  const [totalPages, setTotalPages] = useState(1)
  // const [currentPage, setCurrentPage]=useState(1)
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



  const { data, isLoading, error, refetch } = useGetAllCustomersQuery({
    search,
    page: page,
    limit: rowsPerPage,
    sortBy: orderBy,
    sortOrder: order
  });



  useEffect(() => {
    if (data?.message?.data?.users) {
      setCustomersData(data?.message?.data?.users || []);
      setTotalPages(data?.message?.data?.totalPages || 1);
    }
    if (error) {
      console.error("Error fetching Customers:", error);
    }
  }, [data?.message?.data?.users, error]);


  const handleSearchChange = (value) => {
    setSearch(value);
    // Reset to first page when search is applied
    handleChangePage(null, 0);
  };



const reshapedCustomers = customersData
  ?.filter(item => item?.role !== 'Admin') // Exclude admins
  .map(item => ({
    ...item, // Spread all fields
    userId: item?._id,
    name: `${item?.firstName || ''} ${item?.lastName || ''}`,
    status: item?.verfied,
    isNew: item?.isNew || false,
    businessType: item?.businessType,
  }));



  return <PageWrapper title="Customers">
    {/* <SearchArea buttonText="Add Customer" url="/admin/customers" searchPlaceholder="Search Customer..." /> */}
    <SearchArea
      buttonText="Add Customers"
      url="/admin/customer"
      searchPlaceholder="Search customer..."
      onSearchChange={handleSearchChange}
      showButton={false}
    />

    <Card>
      {isLoading ? (
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
                  {reshapedCustomers.length > 0 ? (
                    reshapedCustomers.map((customer, index) => <CustomerRow key={index} customer={customer} refetch={refetch} />)
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        {isLoading ? "Loading..." : "No customers found."}
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