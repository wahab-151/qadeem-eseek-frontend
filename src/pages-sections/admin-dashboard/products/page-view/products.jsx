

// // "use client";

// // import Card from "@mui/material/Card";
// // import Stack from "@mui/material/Stack";
// // import Table from "@mui/material/Table";
// // import TableBody from "@mui/material/TableBody";
// // import TableContainer from "@mui/material/TableContainer";

// // // GLOBAL CUSTOM COMPONENTS
// // import OverlayScrollbar from "components/overlay-scrollbar";
// // import { TableHeader, TablePagination } from "components/data-table";

// // // GLOBAL CUSTOM HOOK
// // import useMuiTable from "hooks/useMuiTable";

// // //  LOCAL CUSTOM COMPONENT
// // import ProductRow from "../product-row";
// // import SearchArea from "../../search-box";
// // import PageWrapper from "../../page-wrapper";
// // import { useEffect, useState } from "react";
// // import { Box, CircularProgress, TableCell, TableRow, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, List, ListItem, ListItemText, MenuItem, TextField } from "@mui/material";
// // import UploadFileIcon from "@mui/icons-material/UploadFile";
// // import { useRef } from "react";
// // import { useBulkUploadProductsMutation, useExportProductsCsvMutation } from "app/store/services";
// // import { useGetAllProductsAdminQuery } from "app/store/services";
// // import { useGetAdminCategoriesQuery, useGetAllTagsQuery } from "app/store/services";
// // import { useSnackbar } from "notistack";

// // // CUSTOM DATA MODEL


// // // TABLE HEADING DATA LIST
// // const tableHeading = [
// //   // {
// //   //   id: "id",
// //   //   label: "",
// //   //   align: "left"
// //   // },
// //   {
// //     id: "name",
// //     label: "Name",
// //     align: "left"
// //   }, {
// //     id: "category",
// //     label: "Category",
// //     align: "left"
// //   }, {
// //     id: "stock",
// //     label: "Stock",
// //     align: "left"
// //   }, {
// //     id: "price",
// //     label: "Price",
// //     align: "left"
// //   }, {
// //     id: "displayOrder",
// //     label: "Display Order",
// //     align: "left"
// //   },{
// //     id: "published",
// //     label: "Published",
// //     align: "left"
// //   }, {
// //     id: "mostSold",
// //     label: "Most Sold",
// //     align: "left"
// //   }, {
// //     id: "mostPopular",
// //     label: "Most Popular",
// //     align: "left"
// //   },   {
// //     id: "featured",
// //     label: "Featured",
// //     align: "left"
// //   }, {
// //     id: "action",
// //     label: "Action",
// //     align: "center"
// //   }];


// // // =============================================================================

// // // const proooduct = [{
// // //   "_id": "64a3b2c5e8d7f01234567890",
// // //   "slug": "mens-running-shoes",
// // //   "title": "Men's Running Shoes",
// // //   "brand": "Nike",
// // //   "price": 129.99,
// // //   // "thumbnail": "",
// // //   "published": true,
// // //   "category": "Footwear"
// // // }]
// // // =============================================================================

// // export default function ProductsPageView({
// //   // products
// // }) {


// //   const [productsData, setProductsData] = useState([]);
// //   const fileInputRef = useRef(null);
// //   const [bulkUpload, { isLoading: isUploading }] = useBulkUploadProductsMutation();
// //   const [exportProductsCsv] = useExportProductsCsvMutation();
// //   const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
// //   const [uploadResult, setUploadResult] = useState(null);
// //   const [totalPages, setTotalPages] = useState(1)
// //   // const [currentPage, setCurrentPage]=useState(1)
// //   const [search, setSearch] = useState("");
// //   // const [isLoading, setIsLoading] = useState(true);
// //   const [selectedCategory, setSelectedCategory] = useState("");
// //   const [selectedTag, setSelectedTag] = useState("");
// //   const [downloading, setDownloading] = useState(false);
// //   const { enqueueSnackbar } = useSnackbar();




// //   const {
// //     page,
// //     order,
// //     orderBy,
// //     rowsPerPage,
// //     // filteredList,
// //     handleChangePage,
// //     handleRequestSort
// //   } = useMuiTable({
// //     listData: [],
// //     defaultSort: "displayOrder",
// //     defaultOrder: "asc"
// //   });

// //   const { data, isLoading, error, refetch } = useGetAllProductsAdminQuery({
// //     search,
// //     page: page, // assuming API expects 1-indexed pages
// //     limit: rowsPerPage,
// //     sortBy: orderBy,
// //     sortOrder: order
// //   });

// //   // Debug logging for sorting
// //   if (process.env.NODE_ENV === 'development') {
// //     console.log("Admin Products Sorting:", { orderBy, order, search, page });
// //   }

// //   const { data: categoriesData } = useGetAdminCategoriesQuery();
// //   const { data: tagsData } = useGetAllTagsQuery();

// //   const categories = Array.isArray(categoriesData?.data) ? categoriesData.data : [];
// //   const tags = Array.isArray(tagsData?.data) ? tagsData.data : [];



// //   useEffect(() => {
// //     if (data?.data?.products) {
// //       setProductsData(data?.data?.products || []);
// //       setTotalPages(data?.data?.totalPages || 1);
// //     }
// //     if (error) {
// //       console.error("Error fetching Products:", error);
// //     }
// //   }, [data, error]);

// //   const handleBulkUploadClick = () => fileInputRef.current?.click();

// //   const handleBulkFileChange = async (e) => {
// //     const file = e.target.files?.[0];
// //     if (!file) return;
// //     try {
// //       let uploadFile = file;
// //       const lowerName = file.name.toLowerCase();

// //       // Convert Excel to CSV on the client if needed
// //       if (lowerName.endsWith('.xlsx') || lowerName.endsWith('.xls')) {
// //         const XLSX = (await import('xlsx')).default || (await import('xlsx'));
// //         const arrayBuffer = await file.arrayBuffer();
// //         const workbook = XLSX.read(arrayBuffer, { type: 'array' });
// //         const firstSheetName = workbook.SheetNames[0];
// //         const firstSheet = workbook.Sheets[firstSheetName];
// //         const csvString = XLSX.utils.sheet_to_csv(firstSheet, { FS: ',', RS: '\n' });
// //         const csvBlob = new Blob([csvString], { type: 'text/csv' });
// //         const csvName = lowerName.replace(/\.(xlsx|xls)$/i, '.csv');
// //         uploadFile = new File([csvBlob], csvName, { type: 'text/csv' });
// //       }

// //       const form = new FormData();
// //       form.append("file", uploadFile);
// //       const result = await bulkUpload(form).unwrap();
// //       setUploadResult(result);
// //       setUploadDialogOpen(true);
// //       console.log("Bulk upload result", result);
// //       refetch();
// //     } catch (err) {
// //       console.error(err);
// //       const message = err?.data?.message || err?.message || "Bulk upload failed";
// //       setUploadResult({ error: message });
// //       setUploadDialogOpen(true);
// //       const lower = String(message).toLowerCase();
// //       if (lower.includes("duplicate sku")) {
// //         enqueueSnackbar("Bulk upload: duplicate SKU detected in file. Please fix rows with repeated SKUs.", { variant: "warning" });
// //       } else if (lower.includes("sku")) {
// //         enqueueSnackbar("Bulk upload contains SKU errors. Check the failure list for details.", { variant: "warning" });
// //       } else {
// //         enqueueSnackbar(message, { variant: "error" });
// //       }
// //     } finally {
// //       e.target.value = "";
// //     }
// //   };




// //   // Debounce & 3-character trigger
// //   // useEffect(() => {
// //   //   const delayDebounce = setTimeout(() => {
// //   //     if (searchInput.length >= 3 || searchInput.length === 0) {
// //   //       setSearch(searchInput);
// //   //     }
// //   //   }, 300); // 300ms debounce
// //   //   return () => clearTimeout(delayDebounce);
// //   // }, [search]);
// //   const handleSearchChange = (value) => {
// //     setSearch(value);
// //     // Reset to first page when search is applied
// //     handleChangePage(null, 0);
// //   };

// //   const handleDownload = async () => {
// //     try {
// //       setDownloading(true);
// //       enqueueSnackbar("Preparing download...", { variant: "info" });
// //       const blob = await exportProductsCsv({ categoryId: selectedCategory || undefined, tag: selectedTag || undefined }).unwrap();
// //       // Convert CSV blob to XLSX and download
// //       const csvText = await blob.text();
// //       const XLSX = (await import('xlsx')).default || (await import('xlsx'));
// //       const wb = XLSX.read(csvText, { type: 'string' });
// //       const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
// //       const xBlob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
// //       const url = window.URL.createObjectURL(xBlob);
// //       const a = document.createElement('a');
// //       a.href = url;
// //       const dateStr = new Date().toISOString().slice(0, 10);
// //       let fname = "products-all-" + dateStr + ".xlsx";
// //       if (selectedCategory) {
// //         const catName = categories.find(c => c._id === selectedCategory)?.name || selectedCategory;
// //         fname = `products-category-${catName}-${dateStr}.xlsx`;
// //       } else if (selectedTag) {
// //         fname = `products-tag-${selectedTag}-${dateStr}.xlsx`;
// //       }
// //       a.download = fname.replace(/\s+/g, '_');
// //       document.body.appendChild(a);
// //       a.click();
// //       a.remove();
// //       window.URL.revokeObjectURL(url);
// //       enqueueSnackbar("Download started", { variant: "success" });
// //     } catch (err) {
// //       console.error("Download failed", err);
// //       enqueueSnackbar("Download failed", { variant: "error" });
// //     } finally {
// //       setDownloading(false);
// //     }
// //   };



// //   // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
// //   const reshapedProducts = productsData?.map(item => ({
// //     id: item._id,
// //     slug: item.slug,
// //     name: item.name,
// //     // brand: item.brand,
// //     price: item.price,
// //     // discount:item?.pricing?.other,
// //     image: item.images,
// //     published: item.published,
// //     category: item.category,
// //     mostPopular: item?.mostPopular,
// //     mostSold: item?.mostSold,
// //     sku: item?.sku,
// //     stock: item?.stock,
// //     pricing: item?.pricing,
// //     brand: item?.brand,
// //     tags: item?.tags,
// //     description: item?.description,
// //     subCategory: item?.subCategory,
// //     costPrice: item?.costPrice,
// //     models: item?.models,
// //     featured: item?.featured,
// //     displayOrder: item?.displayOrder
// //   }));
// //   //  console.log("GET p/roduct map tabel====>", reshapedProducts);
// //   return <PageWrapper title="Product List">
// //     {/* <SearchArea buttonText="Add Product" url="/admin/products/create" searchPlaceholder="Search Product..." /> */}
// //     <>
// //       <SearchArea
// //         buttonText="Add Product"
// //         url="/admin/products/create"
// //         searchPlaceholder="Search Product..."
// //         onSearchChange={handleSearchChange}
// //         rightSlot={<>

// //           <input ref={fileInputRef} type="file" accept=".csv,.xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" style={{ display: "none" }} onChange={handleBulkFileChange} />
// //           <Button onClick={handleBulkUploadClick} variant="outlined" color="secondary" startIcon={<UploadFileIcon />} disabled={isUploading} sx={{ minHeight: 44 }}>
// //             {isUploading ? "Uploading..." : "Bulk Upload"}
// //           </Button>
// //         </>}
// //       />
// // {/* // make this div flx and flex end */}
// //       <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 1,  p: 1, mt: 1 }}>
// //         <TextField select size="small" label="Category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} sx={{ width: 220 }} disabled={!!selectedTag}>
// //           <MenuItem value="">All Categories</MenuItem>
// //           {categories?.map((c) => (
// //             <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
// //           ))}
// //         </TextField>

// //         <TextField select size="small" label="Tag" value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)} sx={{ width: 220 }} disabled={!!selectedCategory}>
// //           <MenuItem value="">All Tags</MenuItem>
// //           {tags?.map((t) => (
// //             <MenuItem key={t} value={t}>{t}</MenuItem>
// //           ))}
// //         </TextField>

// //         <Button onClick={() => { setSelectedCategory(""); setSelectedTag(""); }} variant="outlined" color="inherit" sx={{ minHeight: 44 }} disabled={downloading}>
// //           Clear Selection
// //         </Button>

// //         <Button onClick={handleDownload} variant="contained" color="primary" sx={{ minHeight: 44 }} disabled={downloading}>
// //           {downloading ? 'Downloading...' : 'Download'}
// //         </Button>
// //       </Box>
// //     </>

// //     <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)} maxWidth="md" fullWidth>
// //       <DialogTitle>Bulk Upload Result</DialogTitle>
// //       <DialogContent dividers>
// //         {uploadResult?.error ? (
// //           <Typography color="error">{uploadResult.error}</Typography>
// //         ) : (
// //           <>
// //             <Typography variant="body1" gutterBottom>
// //               Uploaded: {uploadResult?.successCount || 0} | Failed: {uploadResult?.failCount || 0}
// //             </Typography>
// //             {Array.isArray(uploadResult?.failures) && uploadResult.failures.length > 0 && (
// //               <>
// //                 <Typography variant="subtitle1" gutterBottom>Failures</Typography>
// //                 <List dense sx={{ maxHeight: 360, overflowY: "auto" }}>
// //                   {uploadResult.failures.map((f, idx) => (
// //                     <ListItem key={idx} alignItems="flex-start">
// //                       <ListItemText
// //                         primary={`Row ${f.row}${f.name ? ` – ${f.name}` : ""}`}
// //                         secondary={f.reason}
// //                       />
// //                     </ListItem>
// //                   ))}
// //                 </List>
// //               </>
// //             )}
// //           </>
// //         )}
// //       </DialogContent>
// //       <DialogActions>
// //         <Button onClick={() => setUploadDialogOpen(false)} variant="contained">Close</Button>
// //       </DialogActions>
// //     </Dialog>
// //     <Card>
// //       <OverlayScrollbar>
// //         <TableContainer sx={{
// //           minWidth: 900
// //         }}>
// //           <Table>
// //             <TableHeader order={order} orderBy={orderBy} heading={tableHeading} onRequestSort={handleRequestSort} />

// //             <TableBody>
// //               {/* {filteredList.map((product, index) => <ProductRow key={index} product={product} />)} */}
// //               {isLoading ? (
// //                 <TableRow>
// //                   <TableCell colSpan={10} align="center">
// //                     <Box display="flex" justifyContent="center" alignItems="center" py={3}>
// //                       <CircularProgress size={24} />
// //                     </Box>
// //                   </TableCell>
// //                 </TableRow>
// //               ) : reshapedProducts.length > 0 ? (
// //                 reshapedProducts.map((product, index) => <ProductRow key={index} product={product} refetch={refetch} />)
// //               ) : (
// //                 <TableRow>
// //                   <TableCell colSpan={10} align="center">
// //                     No Product found.
// //                   </TableCell>
// //                 </TableRow>
// //               )}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //       </OverlayScrollbar>

// //       <Stack alignItems="center" my={4}>
// //         <TablePagination onChange={handleChangePage}
// //           page={page}
// //           count={totalPages}
// //         // count={Math.ceil(reshapedProducts.length / rowsPerPage)} 
// //         />
// //       </Stack>
// //     </Card>
// //   </PageWrapper>;
// // }

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
// import ProductRow from "../product-row";
// import SearchArea from "../../search-box";
// import PageWrapper from "../../page-wrapper";
// import { useEffect, useState } from "react";
// import { Box, CircularProgress, TableCell, TableRow, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, List, ListItem, ListItemText, MenuItem, TextField } from "@mui/material";
// import UploadFileIcon from "@mui/icons-material/UploadFile";
// import { useRef } from "react";
// import { useBulkUploadProductsMutation, useExportProductsCsvMutation } from "app/store/services";
// import { useGetAllProductsAdminQuery } from "app/store/services";
// import { useGetAdminCategoriesQuery, useGetAllTagsQuery } from "app/store/services";
// import { useSnackbar } from "notistack";

// // TABLE HEADING DATA LIST
// const tableHeading = [
//   {
//     id: "name",
//     label: "Name",
//     align: "left"
//   }, {
//     id: "category",
//     label: "Category",
//     align: "left"
//   }, {
//     id: "stock",
//     label: "Stock",
//     align: "left"
//   }, {
//     id: "price",
//     label: "Price",
//     align: "left"
//   }, {
//     id: "displayOrder",
//     label: "Display Order",
//     align: "left"
//   },{
//     id: "createdAt",
//     label: "Published Date",
//     align: "left"
//   }, {
//     id: "published",
//     label: "Published",
//     align: "left"
//   }, {
//     id: "mostSold",
//     label: "Most Sold",
//     align: "left"
//   }, {
//     id: "mostPopular",
//     label: "Most Popular",
//     align: "left"
//   },   {
//     id: "featured",
//     label: "Featured",
//     align: "left"
//   }, {
//     id: "action",
//     label: "Action",
//     align: "center"
//   }];

// export default function ProductsPageView() {
//   const fileInputRef = useRef(null);
//   const [bulkUpload, { isLoading: isUploading }] = useBulkUploadProductsMutation();
//   const [exportProductsCsv] = useExportProductsCsvMutation();
//   const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
//   const [uploadResult, setUploadResult] = useState(null);
//   const [totalPages, setTotalPages] = useState(1);
//   const [search, setSearch] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedTag, setSelectedTag] = useState("");
//   const [downloading, setDownloading] = useState(false);
//   const [sortOption, setSortOption] = useState("createdAt-desc");
//   const { enqueueSnackbar } = useSnackbar();

//   // State to hold the current API parameters
//   const [apiParams, setApiParams] = useState({
//     search: "",
//     page: 0, // 0-indexed for MUI, will be converted to 1-indexed for API
//     limit: 10,
//     sortBy: "createdAt",
//     sortOrder: "desc"
//   });

//   // Use the hook with current API data
//   const {
//     page,
//     order,
//     orderBy,
//     rowsPerPage,
//     handleChangePage,
//     handleRequestSort
//   } = useMuiTable({
//     listData: [], // We'll handle data separately
//     defaultSort: "createdAt",
//     defaultOrder: "desc"
//   });

//   // Fetch data with current API parameters
//   const { data, isLoading, error, refetch } = useGetAllProductsAdminQuery({
//     search: apiParams.search,
//     page: apiParams.page + 1, // Convert to 1-indexed for API
//     limit: apiParams.limit,
//     sortBy: apiParams.sortBy,
//     sortOrder: apiParams.sortOrder
//   });

//   const { data: categoriesData } = useGetAdminCategoriesQuery();
//   const { data: tagsData } = useGetAllTagsQuery();

//   // Update API parameters when table state changes
//   useEffect(() => {
//     console.log("Updating API params:", { page, orderBy, order });
//     setApiParams(prev => ({
//       ...prev,
//       page: page,
//       sortBy: orderBy,
//       sortOrder: order
//     }));
//   }, [page, orderBy, order]);

//   // Update API parameters when search changes
//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       setApiParams(prev => ({
//         ...prev,
//         search: search,
//         page: 0 // Reset to first page when search changes
//       }));
//     }, 300);

//     return () => clearTimeout(delayDebounce);
//   }, [search]);

//   // Sync sort option with table's current sorting
//   useEffect(() => {
//     const currentSortOption = `${orderBy}-${order}`;
//     if (currentSortOption !== sortOption) {
//       setSortOption(currentSortOption);
//     }
//   }, [orderBy, order]);

//   // Handle data response
//   useEffect(() => {
//     if (data?.data?.products) {
//       setTotalPages(data?.data?.totalPages || 1);
//     }
//     if (error) {
//       console.error("Error fetching Products:", error);
//     }
//   }, [data, error]);

//   const categories = Array.isArray(categoriesData?.data) ? categoriesData.data : [];
//   const tags = Array.isArray(tagsData?.data) ? tagsData.data : [];

//   const handleBulkUploadClick = () => fileInputRef.current?.click();

//   const handleBulkFileChange = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     try {
//       let uploadFile = file;
//       const lowerName = file.name.toLowerCase();

//       if (lowerName.endsWith('.xlsx') || lowerName.endsWith('.xls')) {
//         const XLSX = (await import('xlsx')).default || (await import('xlsx'));
//         const arrayBuffer = await file.arrayBuffer();
//         const workbook = XLSX.read(arrayBuffer, { type: 'array' });
//         const firstSheetName = workbook.SheetNames[0];
//         const firstSheet = workbook.Sheets[firstSheetName];
//         const csvString = XLSX.utils.sheet_to_csv(firstSheet, { FS: ',', RS: '\n' });
//         const csvBlob = new Blob([csvString], { type: 'text/csv' });
//         const csvName = lowerName.replace(/\.(xlsx|xls)$/i, '.csv');
//         uploadFile = new File([csvBlob], csvName, { type: 'text/csv' });
//       }

//       const form = new FormData();
//       form.append("file", uploadFile);
//       const result = await bulkUpload(form).unwrap();
//       setUploadResult(result);
//       setUploadDialogOpen(true);
//       refetch();
//     } catch (err) {
//       console.error(err);
//       const message = err?.data?.message || err?.message || "Bulk upload failed";
//       setUploadResult({ error: message });
//       setUploadDialogOpen(true);
//       const lower = String(message).toLowerCase();
//       if (lower.includes("duplicate sku")) {
//         enqueueSnackbar("Bulk upload: duplicate SKU detected in file. Please fix rows with repeated SKUs.", { variant: "warning" });
//       } else if (lower.includes("sku")) {
//         enqueueSnackbar("Bulk upload contains SKU errors. Check the failure list for details.", { variant: "warning" });
//       } else {
//         enqueueSnackbar(message, { variant: "error" });
//       }
//     } finally {
//       e.target.value = "";
//     }
//   };

//   const handleSearchChange = (value) => {
//     setSearch(value);
//   };

//   const handleSortChange = (value) => {
//     setSortOption(value);
//     const [sortBy, sortOrder] = value.split('-');
//     // Update table sorting which will trigger API parameter update
//     handleRequestSort(null, sortBy, sortOrder);
//     // Reset to first page when sort changes
//     handleChangePage(null, 0);
//   };

//   const handleDownload = async () => {
//     try {
//       setDownloading(true);
//       enqueueSnackbar("Preparing download...", { variant: "info" });
//       const blob = await exportProductsCsv({ categoryId: selectedCategory || undefined, tag: selectedTag || undefined }).unwrap();
//       const csvText = await blob.text();
//       const XLSX = (await import('xlsx')).default || (await import('xlsx'));
//       const wb = XLSX.read(csvText, { type: 'string' });
//       const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
//       const xBlob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//       const url = window.URL.createObjectURL(xBlob);
//       const a = document.createElement('a');
//       a.href = url;
//       const dateStr = new Date().toISOString().slice(0, 10);
//       let fname = "products-all-" + dateStr + ".xlsx";
//       if (selectedCategory) {
//         const catName = categories.find(c => c._id === selectedCategory)?.name || selectedCategory;
//         fname = `products-category-${catName}-${dateStr}.xlsx`;
//       } else if (selectedTag) {
//         fname = `products-tag-${selectedTag}-${dateStr}.xlsx`;
//       }
//       a.download = fname.replace(/\s+/g, '_');
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       window.URL.revokeObjectURL(url);
//       enqueueSnackbar("Download started", { variant: "success" });
//     } catch (err) {
//       console.error("Download failed", err);
//       enqueueSnackbar("Download failed", { variant: "error" });
//     } finally {
//       setDownloading(false);
//     }
//   };

//   // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
//   const reshapedProducts = data?.data?.products?.map(item => ({
//     id: item._id,
//     slug: item.slug,
//     name: item.name,
//     price: item.price,
//     image: item.images,
//     published: item.published,
//     category: item.category,
//     mostPopular: item?.mostPopular,
//     mostSold: item?.mostSold,
//     sku: item?.sku,
//     stock: item?.stock,
//     pricing: item?.pricing,
//     brand: item?.brand,
//     tags: item?.tags,
//     description: item?.description,
//     subCategory: item?.subCategory,
//     costPrice: item?.costPrice,
//     models: item?.models,
//     featured: item?.featured,
//     displayOrder: item?.displayOrder,
//     createdAt: item?.createdAt
//   })) || [];

//   return (
//     <PageWrapper title="Product List">
//       <SearchArea
//         buttonText="Add Product"
//         url="/admin/products/create"
//         searchPlaceholder="Search Product..."
//         onSearchChange={handleSearchChange}
//         rightSlot={<>
//           <input ref={fileInputRef} type="file" accept=".csv,.xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" style={{ display: "none" }} onChange={handleBulkFileChange} />
//           <Button onClick={handleBulkUploadClick} variant="outlined" color="secondary" startIcon={<UploadFileIcon />} disabled={isUploading} sx={{ minHeight: 44 }}>
//             {isUploading ? "Uploading..." : "Bulk Upload"}
//           </Button>
//         </>}
//       />

//       <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 1, p: 1, mt: 1 }}>
//         <TextField select size="small" label="Category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} sx={{ width: 220 }} disabled={!!selectedTag}>
//           <MenuItem value="">All Categories</MenuItem>
//           {categories?.map((c) => (
//             <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
//           ))}
//         </TextField>

//         <TextField select size="small" label="Tag" value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)} sx={{ width: 220 }} disabled={!!selectedCategory}>
//           <MenuItem value="">All Tags</MenuItem>
//           {tags?.map((t) => (
//             <MenuItem key={t} value={t}>{t}</MenuItem>
//           ))}
//         </TextField>

//         <TextField select size="small" label="Sort By" value={sortOption} onChange={(e) => handleSortChange(e.target.value)} sx={{ width: 200 }}>
//           <MenuItem value="createdAt-desc">Latest First</MenuItem>
//           <MenuItem value="createdAt-asc">Latest Last</MenuItem>
//           <MenuItem value="displayOrder-asc">Display Order</MenuItem>
//           <MenuItem value="name-asc">Name A-Z</MenuItem>
//           <MenuItem value="name-desc">Name Z-A</MenuItem>
//           <MenuItem value="price-asc">Price Low-High</MenuItem>
//           <MenuItem value="price-desc">Price High-Low</MenuItem>
//         </TextField>

//         <Button onClick={() => { setSelectedCategory(""); setSelectedTag(""); }} variant="outlined" color="inherit" sx={{ minHeight: 44 }} disabled={downloading}>
//           Clear Selection
//         </Button>

//         <Button onClick={handleDownload} variant="contained" color="primary" sx={{ minHeight: 44 }} disabled={downloading}>
//           {downloading ? 'Downloading...' : 'Download'}
//         </Button>
//       </Box>

//       <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)} maxWidth="md" fullWidth>
//         <DialogTitle>Bulk Upload Result</DialogTitle>
//         <DialogContent dividers>
//           {uploadResult?.error ? (
//             <Typography color="error">{uploadResult.error}</Typography>
//           ) : (
//             <>
//               <Typography variant="body1" gutterBottom>
//                 Uploaded: {uploadResult?.successCount || 0} | Failed: {uploadResult?.failCount || 0}
//               </Typography>
//               {Array.isArray(uploadResult?.failures) && uploadResult.failures.length > 0 && (
//                 <>
//                   <Typography variant="subtitle1" gutterBottom>Failures</Typography>
//                   <List dense sx={{ maxHeight: 360, overflowY: "auto" }}>
//                     {uploadResult.failures.map((f, idx) => (
//                       <ListItem key={idx} alignItems="flex-start">
//                         <ListItemText
//                           primary={`Row ${f.row}${f.name ? ` – ${f.name}` : ""}`}
//                           secondary={f.reason}
//                         />
//                       </ListItem>
//                     ))}
//                   </List>
//                 </>
//               )}
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setUploadDialogOpen(false)} variant="contained">Close</Button>
//         </DialogActions>
//       </Dialog>

//       <Card>
//         <OverlayScrollbar>
//           <TableContainer sx={{ minWidth: 900 }}>
//             <Table>
//               <TableHeader 
//                 order={order} 
//                 orderBy={orderBy} 
//                 heading={tableHeading} 
//                 onRequestSort={handleRequestSort} 
//               />

//               <TableBody>
//                 {isLoading ? (
//                   <TableRow>
//                     <TableCell colSpan={11} align="center">
//                       <Box display="flex" justifyContent="center" alignItems="center" py={3}>
//                         <CircularProgress size={24} />
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ) : reshapedProducts.length > 0 ? (
//                   reshapedProducts.map((product, index) => (
//                     <ProductRow key={product.id} product={product} refetch={refetch} />
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={11} align="center">
//                       No Product found.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </OverlayScrollbar>

//         <Stack alignItems="center" my={4}>
//           <TablePagination 
//             onChange={handleChangePage}
//             page={page}
//             count={totalPages}
//           />
//         </Stack>
//       </Card>
//     </PageWrapper>
//   );
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
import ProductRow from "../product-row";
import SearchArea from "../../search-box";
import PageWrapper from "../../page-wrapper";
import { useEffect, useState, useRef } from "react";
import { Box, CircularProgress, TableCell, TableRow, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, List, ListItem, ListItemText, MenuItem, TextField, Skeleton } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useBulkUploadProductsMutation, useExportProductsCsvMutation } from "app/store/services";
import { useGetAllProductsAdminQuery } from "app/store/services";
import { useGetAdminCategoriesQuery, useGetAllTagsQuery } from "app/store/services";
import { useSnackbar } from "notistack";

// TABLE HEADING DATA LIST
const tableHeading = [
  {
    id: "image",
    label: "Image",
    align: "left"
  }, {
    id: "name",
    label: "Name",
    align: "left"
  }, {
    id: "category",
    label: "Category",
    align: "left"
  }, {
    id: "stock",
    label: "Stock",
    align: "left"
  }, {
    id: "price",
    label: "Price",
    align: "left"
  }, {
    id: "displayOrder",
    label: "Display Order",
    align: "left"
  },{
    id: "createdAt",
    label: "Published Date",
    align: "left"
  }, {
    id: "published",
    label: "Published",
    align: "left"
  }, {
    id: "mostSold",
    label: "Most Sold",
    align: "left"
  }, {
    id: "mostPopular",
    label: "Most Popular",
    align: "left"
  },   {
    id: "featured",
    label: "Featured",
    align: "left"
  }, {
    id: "action",
    label: "Action",
    align: "center"
  }];

export default function ProductsPageView() {
  const [productsData, setProductsData] = useState([]);
  const fileInputRef = useRef(null);
  const previousSearchRef = useRef(""); // Track previous search value
  const [bulkUpload, { isLoading: isUploading }] = useBulkUploadProductsMutation();
  const [exportProductsCsv] = useExportProductsCsvMutation();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [sortOption, setSortOption] = useState("createdAt-desc");
  const { enqueueSnackbar } = useSnackbar();

  // State to manage API parameters
  const [apiParams, setApiParams] = useState({
    search: "",
    page: 1, // API pages are 1-indexed
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc"
  });

  const {
    page: muiPage, // 1-indexed from useMuiTable (matches MUI Pagination)
    order,
    orderBy,
    rowsPerPage,
    handleChangePage,
    handleRequestSort
  } = useMuiTable({
    listData: [],
    defaultSort: "createdAt",
    defaultOrder: "desc"
  });

  // Fetch data with API parameters
  const { data, isLoading, error, refetch, isFetching } = useGetAllProductsAdminQuery({
    search: apiParams.search,
    page: apiParams.page,
    limit: apiParams.limit,
    sortBy: apiParams.sortBy,
    sortOrder: apiParams.sortOrder,
    category: selectedCategory || undefined,
    tag: selectedTag || undefined
  }, {
    // Force refetch when parameters change to avoid stale cache
    refetchOnMountOrArgChange: true,
  });

  // Debug logging
  console.log("Loading states:", { isLoading, isFetching, apiParams, muiPage });

  const { data: categoriesData } = useGetAdminCategoriesQuery();
  const { data: tagsData } = useGetAllTagsQuery();

  // Update API parameters when table state changes (only for page and header sorting)
  useEffect(() => {
    // muiPage is already 1-indexed (matches API expectation), no conversion needed
    console.log("Page changed - muiPage:", muiPage);
    
    setApiParams(prev => {
      // Only update if page actually changed to avoid unnecessary updates
      if (prev.page !== muiPage || prev.sortBy !== orderBy || prev.sortOrder !== order) {
        return {
          ...prev,
          page: muiPage, // Direct assignment, no +1 needed
          // Only update sortBy and sortOrder if they're different from current API params
          // This prevents overriding dropdown sorting
          ...(prev.sortBy !== orderBy || prev.sortOrder !== order ? {
            sortBy: orderBy,
            sortOrder: order
          } : {})
        };
      }
      return prev;
    });
  }, [orderBy, order, muiPage]);

  // Update API parameters when search changes
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      // Check if search actually changed
      const searchChanged = previousSearchRef.current !== search;
      
      if (searchChanged) {
        console.log("Search changed from", previousSearchRef.current, "to", search);
        previousSearchRef.current = search; // Update ref
        
        setApiParams(prev => ({
          ...prev,
          search: search,
          page: 1 // Reset to page 1 only when search changes
        }));
        
        // Reset MUI pagination to first page (1-indexed)
        handleChangePage(null, 1);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // Sync sort option with API parameters (for dropdown sorting)
  useEffect(() => {
    const currentSortOption = `${apiParams.sortBy}-${apiParams.sortOrder}`;
    if (currentSortOption !== sortOption) {
      setSortOption(currentSortOption);
    }
  }, [apiParams.sortBy, apiParams.sortOrder]);

  // Handle data response - simplified to always update when data is received
  useEffect(() => {
    if (data?.data) {
      // Always update products data when we receive a response
      const products = data?.data?.products || [];
      const pages = data?.data?.totalPages || 1;
      
      setProductsData(products);
      setTotalPages(pages);
      
      console.log("Products updated:", { count: products.length, totalPages: pages, page: apiParams.page });
    }
    if (error) {
      console.error("Error fetching Products:", error);
      setProductsData([]);
      setTotalPages(1);
    }
  }, [data, error]);

  const categories = Array.isArray(categoriesData?.data) ? categoriesData.data : [];
  const tags = Array.isArray(tagsData?.data) ? tagsData.data : [];

  const handleBulkUploadClick = () => fileInputRef.current?.click();

  const handleBulkFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      let uploadFile = file;
      const lowerName = file.name.toLowerCase();

      // Convert Excel to CSV on the client if needed
      if (lowerName.endsWith('.xlsx') || lowerName.endsWith('.xls')) {
        const XLSX = (await import('xlsx')).default || (await import('xlsx'));
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const firstSheet = workbook.Sheets[firstSheetName];
        const csvString = XLSX.utils.sheet_to_csv(firstSheet, { FS: ',', RS: '\n' });
        const csvBlob = new Blob([csvString], { type: 'text/csv' });
        const csvName = lowerName.replace(/\.(xlsx|xls)$/i, '.csv');
        uploadFile = new File([csvBlob], csvName, { type: 'text/csv' });
      }

      const form = new FormData();
      form.append("file", uploadFile);
      const result = await bulkUpload(form).unwrap();
      setUploadResult(result);
      setUploadDialogOpen(true);
      console.log("Bulk upload result", result);
      refetch();
    } catch (err) {
      console.error(err);
      const message = err?.data?.message || err?.message || "Bulk upload failed";
      setUploadResult({ error: message });
      setUploadDialogOpen(true);
      const lower = String(message).toLowerCase();
      if (lower.includes("duplicate sku")) {
        enqueueSnackbar("Bulk upload: duplicate SKU detected in file. Please fix rows with repeated SKUs.", { variant: "warning" });
      } else if (lower.includes("sku")) {
        enqueueSnackbar("Bulk upload contains SKU errors. Check the failure list for details.", { variant: "warning" });
      } else {
        enqueueSnackbar(message, { variant: "error" });
      }
    } finally {
      e.target.value = "";
    }
  };

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    if (value) {
      setSelectedTag(""); // Clear tag when category is selected
    }
    setApiParams(prev => ({
      ...prev,
      page: 1 // Reset to first page when filter changes
    }));
    handleChangePage(null, 1); // Reset table to first page (1-indexed)
  };

  const handleTagChange = (value) => {
    setSelectedTag(value);
    if (value) {
      setSelectedCategory(""); // Clear category when tag is selected
    }
    setApiParams(prev => ({
      ...prev,
      page: 1 // Reset to first page when filter changes
    }));
    handleChangePage(null, 1); // Reset table to first page (1-indexed)
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    const [sortBy, sortOrder] = value.split('-');
    
    // Directly update the API parameters for dropdown sorting
    setApiParams(prev => ({
      ...prev,
      sortBy: sortBy,
      sortOrder: sortOrder,
      page: 1 // Reset to first page when sort changes
    }));
    
    // Reset to first page in the table (1-indexed)
    handleChangePage(null, 1);
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      enqueueSnackbar("Preparing download...", { variant: "info" });
      const blob = await exportProductsCsv({ 
        categoryId: selectedCategory || undefined, 
        tag: selectedTag || undefined,
        search: search || undefined 
      }).unwrap();
      // Convert CSV blob to XLSX and download
      const csvText = await blob.text();
      const XLSX = (await import('xlsx')).default || (await import('xlsx'));
      const wb = XLSX.read(csvText, { type: 'string' });
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const xBlob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(xBlob);
      const a = document.createElement('a');
      a.href = url;
      const dateStr = new Date().toISOString().slice(0, 10);
      let fname = "products-all-" + dateStr + ".xlsx";
      if (selectedCategory) {
        const catName = categories.find(c => c._id === selectedCategory)?.name || selectedCategory;
        fname = `products-category-${catName}-${dateStr}.xlsx`;
      } else if (selectedTag) {
        fname = `products-tag-${selectedTag}-${dateStr}.xlsx`;
      } else if (search) {
        fname = `products-search-${search}-${dateStr}.xlsx`;
      }
      a.download = fname.replace(/\s+/g, '_');
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      enqueueSnackbar("Download started", { variant: "success" });
    } catch (err) {
      console.error("Download failed", err);
      enqueueSnackbar("Download failed", { variant: "error" });
    } finally {
      setDownloading(false);
    }
  };

  // Custom handleRequestSort to ensure API call
  const customHandleRequestSort = (property) => {
    console.log("Sort requested:", property);
    handleRequestSort(property);
    // Reset to first page when sorting changes (1-indexed)
    handleChangePage(null, 1);
  };

  // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
  const reshapedProducts = productsData?.map(item => ({
    id: item._id,
    slug: item.slug,
    name: item.name,
    price: item.price,
    image: item.images,
    published: item.published,
    category: item.category,
    mostPopular: item?.mostPopular,
    mostSold: item?.mostSold,
    sku: item?.sku,
    stock: item?.stock,
    pricing: item?.pricing,
    brand: item?.brand,
    tags: item?.tags,
    description: item?.description,
    subCategory: item?.subCategory,
    costPrice: item?.costPrice,
    models: item?.models,
    featured: item?.featured,
    displayOrder: item?.displayOrder,
    createdAt: item?.createdAt
  }));

  return (
    <PageWrapper title="Product List">
      {(isLoading && productsData.length === 0) && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(255,255,255,0.6)",
            zIndex: 9999
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      )}
      <SearchArea
        buttonText="Add Product"
        url="/admin/products/create"
        searchPlaceholder="Search Product..."
        onSearchChange={handleSearchChange}
        rightSlot={<>
          <input 
            ref={fileInputRef} 
            type="file" 
            accept=".csv,.xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" 
            style={{ display: "none" }} 
            onChange={handleBulkFileChange} 
          />
          <Button 
            onClick={handleBulkUploadClick} 
            variant="outlined" 
            color="secondary" 
            startIcon={<UploadFileIcon />} 
            disabled={isUploading} 
            sx={{ minHeight: 44 }}
          >
            {isUploading ? "Uploading..." : "Bulk Upload"}
          </Button>
        </>}
      />

      {/* Active filters indicator */}
      {(search || selectedCategory || selectedTag) && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 1, mt: 1, mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Active filters:
          </Typography>
          {search && (
            <Box sx={{ 
              bgcolor: "primary.light", 
              color: "primary.contrastText", 
              px: 1, 
              py: 0.5, 
              borderRadius: 1,
              fontSize: "0.75rem"
            }}>
              Search: "{search}"
            </Box>
          )}
          {selectedCategory && (
            <Box sx={{ 
              bgcolor: "secondary.light", 
              color: "secondary.contrastText", 
              px: 1, 
              py: 0.5, 
              borderRadius: 1,
              fontSize: "0.75rem"
            }}>
              Category: {categories.find(c => c._id === selectedCategory)?.name || selectedCategory}
            </Box>
          )}
          {selectedTag && (
            <Box sx={{ 
              bgcolor: "info.light", 
              color: "info.contrastText", 
              px: 1, 
              py: 0.5, 
              borderRadius: 1,
              fontSize: "0.75rem"
            }}>
              Tag: {selectedTag}
            </Box>
          )}
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 1, p: 1, mt: 1 }}>
        <TextField 
          select 
          size="small" 
          label="Category" 
          value={selectedCategory} 
          onChange={(e) => handleCategoryChange(e.target.value)} 
          sx={{ width: 220 }} 
          disabled={!!selectedTag}
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories?.map((c) => (
            <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
          ))}
        </TextField>

        <TextField 
          select 
          size="small" 
          label="Tag" 
          value={selectedTag} 
          onChange={(e) => handleTagChange(e.target.value)} 
          sx={{ width: 220 }} 
          disabled={!!selectedCategory}
        >
          <MenuItem value="">All Tags</MenuItem>
          {tags?.map((t) => (
            <MenuItem key={t} value={t}>{t}</MenuItem>
          ))}
        </TextField>

        {/* Search specific to export/download (mirrors top search) */}
        <TextField 
          size="small" 
          label="Search (for download)" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          placeholder="Name, SKU, description, tags" 
          sx={{ width: 280 }}
        />

        <TextField 
          select 
          size="small" 
          label="Sort By" 
          value={sortOption} 
          onChange={(e) => handleSortChange(e.target.value)} 
          sx={{ width: 200 }}
        >
          <MenuItem value="createdAt-desc">Latest First</MenuItem>
          <MenuItem value="createdAt-asc">Latest Last</MenuItem>
          <MenuItem value="displayOrder-asc">Display Order</MenuItem>
          <MenuItem value="name-asc">Name A-Z</MenuItem>
          <MenuItem value="name-desc">Name Z-A</MenuItem>
          <MenuItem value="price-asc">Price Low-High</MenuItem>
          <MenuItem value="price-desc">Price High-Low</MenuItem>
        </TextField>

        <Button 
          onClick={() => { 
            setSelectedCategory(""); 
            setSelectedTag(""); 
            setSearch(""); 
            setApiParams(prev => ({
              ...prev,
              page: 1
            }));
            handleChangePage(null, 1); // Reset to first page (1-indexed)
          }} 
          variant="outlined" 
          color="inherit" 
          sx={{ minHeight: 44 }} 
          disabled={downloading}
        >
          Clear Selection
        </Button>

        <Button 
          onClick={handleDownload} 
          variant="contained" 
          color="primary" 
          sx={{ minHeight: 44 }} 
          disabled={downloading}
        >
          {downloading ? 'Downloading...' : 
           (search || selectedCategory || selectedTag) ? 'Download Filtered' : 'Download All'}
        </Button>
      </Box>

      <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Bulk Upload Result</DialogTitle>
        <DialogContent dividers>
          {uploadResult?.error ? (
            <Typography color="error">{uploadResult.error}</Typography>
          ) : (
            <>
              <Typography variant="body1" gutterBottom>
                Uploaded: {uploadResult?.successCount || 0} | Failed: {uploadResult?.failCount || 0}
              </Typography>
              {Array.isArray(uploadResult?.failures) && uploadResult.failures.length > 0 && (
                <>
                  <Typography variant="subtitle1" gutterBottom>Failures</Typography>
                  <List dense sx={{ maxHeight: 360, overflowY: "auto" }}>
                    {uploadResult.failures.map((f, idx) => (
                      <ListItem key={idx} alignItems="flex-start">
                        <ListItemText
                          primary={`Row ${f.row}${f.name ? ` – ${f.name}` : ""}`}
                          secondary={f.reason}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)} variant="contained">Close</Button>
        </DialogActions>
      </Dialog>

      <Card>
        <OverlayScrollbar>
          <TableContainer sx={{ minWidth: 900 }}>
            <Table>
              <TableHeader 
                order={order} 
                orderBy={orderBy} 
                heading={tableHeading} 
                onRequestSort={customHandleRequestSort}
                isSorting={isFetching}
              />

              <TableBody>
                {isLoading || isFetching ? (
                  Array.from({ length: 10 }).map((_, i) => (
                    <TableRow key={`skeleton-${i}`}>
                      <TableCell><Skeleton variant="rectangular" width={60} height={40} /></TableCell>
                      <TableCell><Skeleton width={220} /></TableCell>
                      <TableCell><Skeleton width={140} /></TableCell>
                      <TableCell><Skeleton width={80} /></TableCell>
                      <TableCell><Skeleton width={80} /></TableCell>
                      <TableCell><Skeleton width={120} /></TableCell>
                      <TableCell><Skeleton width={120} /></TableCell>
                      <TableCell><Skeleton width={120} /></TableCell>
                      <TableCell><Skeleton width={90} /></TableCell>
                      <TableCell><Skeleton width={90} /></TableCell>
                      <TableCell><Skeleton width={160} /></TableCell>
                    </TableRow>
                  ))
                ) : reshapedProducts?.length > 0 ? (
                  reshapedProducts.map((product) => (
                    <ProductRow key={product.id} product={product} refetch={refetch} />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={12} align="center">
                      No Product found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </OverlayScrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination 
            onChange={handleChangePage}
            page={muiPage}
            count={totalPages}
          />
        </Stack>
      </Card>
    </PageWrapper>
  );
}