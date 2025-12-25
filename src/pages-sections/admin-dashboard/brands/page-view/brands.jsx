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
import BrandRow from "../brand-row";
import SearchArea from "../../search-box";
import PageWrapper from "../../page-wrapper";

// CUSTOM DATA MODEL


// TABLE HEAD COLUMN DATA
// TABLE HEAD COLUMN DATA
import { tableHeading } from "../table-heading";
import { useGetAllBrandsQuery } from "app/store/services";
import { useEffect, useState } from "react";
import { Box, CircularProgress, TableCell, TableRow } from "@mui/material";

// =============================================================================


// =============================================================================

export default function BrandsPageView({
  brands
}) {
    const [brandsData, setBrandsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading, error } = useGetAllBrandsQuery(searchTerm);
  console.log("gggg", data?.data?.brands)
  useEffect(() => {
    if (data?.data?.brands) {
      setBrandsData(data?.data?.brands);
    }
    if (error) {
      console.error("Error fetching Brands:", error);
    }
  }, [data, error]);
  // Debounce & 3-character trigger
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchInput.length >= 3 || searchInput.length === 0) {
        setSearchTerm(searchInput);
      }
    }, 300); // 300ms debounce
    return () => clearTimeout(delayDebounce);
  }, [searchInput]);
  // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
  const filteredBrands = brandsData.map(item => ({
    id: item._id,
    slug: item.slug,
    name: item.name,
    logo: item.image,
    featured: item.isFeatured
  }));
  const {
    order,
    orderBy,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort
  } = useMuiTable({
    listData: filteredBrands,
    defaultSort: "name"
  });

// // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
//   const filteredBrands = brands.map(item => ({
//     id: item.id,
//     slug: item.slug,
//     name: item.name,
//     logo: item.image,
//     featured: item.featured
//   }));
//   const {
//     order,
//     orderBy,
//     rowsPerPage,
//     filteredList,
//     handleChangePage,
//     handleRequestSort
//   } = useMuiTable({
//     listData: filteredBrands,
//     defaultSort: "name"
//   });
  return <PageWrapper title="Product Brands">
      {/* <SearchArea buttonText="Add Brand" url="/admin/brands/create" searchPlaceholder="Search Brand..." /> */}
   <SearchArea
      buttonText="Add Brand"
      url="/admin/brands/create"
      searchPlaceholder="Search Brand..."
      onSearch={setSearchInput}
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
              minWidth: 600
            }}>
              <Table>
                <TableHeader order={order} orderBy={orderBy} heading={tableHeading} onRequestSort={handleRequestSort} />
                <TableBody>
                  {filteredList.length > 0 ? (
                    filteredList.map(brand => <BrandRow key={brand.id} brand={brand} />)
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        {isLoading ? "Loading..." : "No brands found."}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </OverlayScrollbar>
          <Stack alignItems="center" my={4}>
            <TablePagination onChange={handleChangePage} count={Math.ceil(filteredList.length / rowsPerPage)} />
          </Stack>
        </>
      )}
    </Card>
  </PageWrapper>;
}
        {/* <OverlayScrollbar>
          <TableContainer sx={{
          minWidth: 600
        }}>
            <Table>
              <TableHeader order={order} orderBy={orderBy} heading={tableHeading} onRequestSort={handleRequestSort} />

              <TableBody>
                {filteredList.map(brand => <BrandRow key={brand.id} brand={brand} />)}
              </TableBody>
            </Table>
          </TableContainer>
        </OverlayScrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination onChange={handleChangePage} count={Math.ceil(filteredList.length / rowsPerPage)} />
        </Stack>
      </Card>
    </PageWrapper>;
} */}