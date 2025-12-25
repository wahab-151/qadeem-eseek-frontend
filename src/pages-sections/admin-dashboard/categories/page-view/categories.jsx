
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
import CategoryRow from "../category-row";
import SearchArea from "../../search-box";
import PageWrapper from "../../page-wrapper";
// CUSTOM DATA MODEL
// TABLE HEAD COLUMN DATA
import { tableHeading } from "../table-heading";
import { useGetAdminCategoriesQuery } from "app/store/services";
import { useEffect, useState, useMemo } from "react";
import { Box, CircularProgress } from "@mui/material";
import { transformCategoriesForAdminTable, convertToCategoryListByDisplayOrder } from "utils/helpers";

const CategoriesPageView = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Get all categories using the admin query (includes deleted categories)
  const { data, isLoading, error, refetch } = useGetAdminCategoriesQuery(undefined, {
    skip: false,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  // Get table controls from the mui hook
  const {
    order,
    orderBy,
    handleRequestSort
  } = useMuiTable({
    listData: [] // We're doing client-side pagination now
  });

  // Handle search input
  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1); // Reset to first page when search is applied
  };

  // Use the unified helper function for consistent structure
  const hierarchicalCategories = useMemo(() => {
    if (!data?.data || data.data.length === 0) return [];
    
    // Use transformCategoriesForAdminTable to get consistent structure
    return transformCategoriesForAdminTable(data.data);
  }, [data]);

  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    if (!search.trim()) return hierarchicalCategories;
    
    return hierarchicalCategories.filter(category => {
      const matchesSearch = 
        category.name?.toLowerCase().includes(search.toLowerCase()) ||
        category.title?.toLowerCase().includes(search.toLowerCase()) ||
        category.description?.toLowerCase().includes(search.toLowerCase());
      
      // Also check children
      const childrenMatch = category.childCategories?.some(child =>
        child.name?.toLowerCase().includes(search.toLowerCase()) ||
        child.title?.toLowerCase().includes(search.toLowerCase()) ||
        child.description?.toLowerCase().includes(search.toLowerCase())
      );
      
      return matchesSearch || childrenMatch;
    });
  }, [hierarchicalCategories, search]);

  // Paginate the filtered results
  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredCategories.slice(startIndex, endIndex);
  }, [filteredCategories, currentPage, rowsPerPage]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredCategories.length / rowsPerPage);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage + 1); // MUI uses 0-based indexing
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to first page
  };

  return (
    <PageWrapper title="Categories">
      <SearchArea 
        buttonText="Add Category" 
        url="/admin/categories/create" 
        searchPlaceholder="Search Category..." 
        onSearchChange={handleSearchChange}
      />
      <Card>
        {isLoading === true ? (
          <Box display="flex" justifyContent="center" alignItems="center" p={4}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <OverlayScrollbar>
              <TableContainer sx={{ minWidth: 900 }}>
                <Table>
                  <TableHeader 
                    order={order} 
                    orderBy={orderBy} 
                    heading={tableHeading} 
                    onRequestSort={handleRequestSort} 
                  />
                  <TableBody>
                    {paginatedCategories?.map(category => (
                      <CategoryRow 
                        key={category._id} 
                        category={category} 
                        refetchCategories={refetch}
                        childCategories={category.childCategories}
                        isParent={category.hasChildren}
                        level={0}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </OverlayScrollbar>
            {/* <Stack alignItems="center" my={4}>
              <TablePagination 
                component="div"
                count={filteredCategories.length}
                page={currentPage - 1} // MUI uses 0-based indexing
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50]}
                showFirstButton
                showLastButton
              />
            </Stack> */}
          </>
        )}
      </Card>
    </PageWrapper>
  );
};

export default CategoriesPageView;