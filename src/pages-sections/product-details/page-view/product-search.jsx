

// "use client";

// import { Box, CircularProgress, Container, Grid, Typography, useTheme, TextField, MenuItem, IconButton } from "@mui/material";
// import { Apps, ViewList, FilterList } from "@mui/icons-material";
// import { useSearchParams, usePathname, useRouter } from "next/navigation";
// import { useEffect, useMemo, useState } from "react";
// import { useGetAllProductsQuery } from "app/store/services";
// import { useSnackbar } from "notistack";
// import useInfiniteScroll from "hooks/useInfiniteScroll";
// import { useNavigation } from "contexts/NavigationContext";
// import useProducts from "hooks/useProducts";
// import useCategoriesMegaMenu from "hooks/useCategoriesMegaMenu";
//   // import productDatabase from "@/data/products"; // adjust import based on your path

//  import ProductsGridView from "components/products-view/products-grid-view";
//  import ProductsListView from "components/products-view/products-list-view";
//  import ProductFilters from "components/products-view/filters";
//  import { FlexBetween, FlexBox } from "components/flex-box";
//  import SideNav from "components/side-nav";
//  import useUser from "hooks/useUser";
//  import { NotFoundPageView } from "pages-sections/not-found";

//  import { findCategoryById } from "utils/helpers";

//  const SORT_OPTIONS = [
//    { label: "Display Order", value: "displayOrder", order: "asc" },
//    { label: "Price Low to High", value: "price", order: "asc" },
//    { label: "Price High to Low", value: "price", order: "desc" },
//     { label: "Stock High to Low", value: "stock", order: "desc" },
//    { label: "Name A-Z", value: "name", order: "asc" },
//    { label: "Newest First", value: "createdAt", order: "desc" },
//    { label: "Most Popular", value: "mostPopular", order: "desc" },
//    { label: "Most Sold", value: "mostSold", order: "desc" },
//  ];

//  const STATIC_OTHERS = [
//    { label: "In Stock", value: "inStock" },
//    { label: "Featured", value: "featured" },
//    { label: "Most Selling", value: "mostSold" },
//    { label: "Most Popular", value: "mostPopular" },
//  ];

// export default function ProductSearchPageView() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const { isNavigating } = useNavigation(); // Use NavigationContext
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [pageCount, setPageCount] = useState(1);
//   const [firstIndex, setFirstIndex] = useState(0);
//   const [lastIndex, setLastIndex] = useState(0);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);
//   const [activeFilters, setActiveFilters] = useState({});
//   const [isAppending, setIsAppending] = useState(false);
//   const [clientPage, setClientPage] = useState(parseInt(searchParams.get("page") || "1"));
//   const { enqueueSnackbar } = useSnackbar();
//   const { state } = useProducts();
//   const { state: megaMenuState } = useCategoriesMegaMenu();

//   const categoryFilter = searchParams.get("category");
//   const query = searchParams.get("q");
//   const page = parseInt(searchParams.get("page") || "1");
//   const view = searchParams.get("view") || "grid";
//   const sort = searchParams.get("sort") || "displayOrder";
//   const tag = searchParams.get("tag");

 


//    useEffect(() => {
//      console.log("state", state)
//      setProducts(state?.products);
//    if (state?.pagination?.products && state?.products?.length > 0) {
//      const currentPage = state.pagination.products.currentPage;
//      const totalItems = state.pagination.products.totalItems;
//      const pageSize = 16 // fallback if page size isn't fixed

//      const first = (currentPage - 1) * pageSize + 1;
//      const last = Math.min(currentPage * pageSize, totalItems);

//      setFirstIndex(first);
//      setLastIndex(last);
//      setTotalProducts(totalItems);
//      setTotalPages(state.pagination.products.totalPages || 1);
//    }
//    }, []);

//     console.log("active filterrrr", activeFilters);
//     // ⛳️ Compose query args when filters/search/sort/page changes
//    const queryArgs = useMemo(
//      () => {
//         // Find the selected sort option to get the correct order
//        const selectedSortOption = SORT_OPTIONS.find(option => option.value === sort);
//        const order = selectedSortOption?.order || "asc";
      
//        return {
//          search: query,
//          sort,
//          order,
//           // use internal page so infinite scroll does not refresh the whole route
//          page: clientPage,
//          brands: activeFilters.brands,
//          price: activeFilters.price,
//          others: activeFilters.sales,
//          category: categoryFilter,
//          featured: activeFilters.sales?.includes("featured") || false,
//          mostSold: activeFilters.sales?.includes("mostSold") || false,
//          mostPopular: activeFilters.sales?.includes("mostPopular") || false,
//          tag:tag
//           // ⬅ from STATIC_OTHERS values
//           // colors: activeFilters.colors,
//         //  rating: activeFilters.rating,
//        };
//      },
//      [query, sort, clientPage, activeFilters,tag]
//    );

//    const { data, isLoading: isApiLoading, error, refetch, isFetching } = useGetAllProductsQuery(queryArgs, {
//      refetchOnMountOrArgChange: true, // Force refetch when search query changes
//      refetchOnFocus: false,
//      refetchOnReconnect: false,
//       //pollingInterval: 0,
//    });
 
 

//  useEffect(() => {
//    if (error) {
//      enqueueSnackbar("Something went wrong!", { variant: "error" });
//      setIsAppending(false);
//      return;
//    }

//    const paginated = data?.data?.products;
//    const pagination = data?.data?.pagination;
//    if (paginated && pagination) {
//      const currentPage = pagination.currentPage;
//     const totalItems = pagination.totalItems;
//      const totalPagesFromApi = pagination.totalPages;
//      const pageSize = 16;

//      const first = (currentPage - 1) * pageSize + 1;
//      const last = Math.min(currentPage * pageSize, totalItems);

//      setFirstIndex(first);
//      setLastIndex(last);
//     setTotalProducts(totalItems);
//      setTotalPages(totalPagesFromApi);

//      // Introduce a minimum loader display time (e.g., 500ms)
//      const timeout = setTimeout(() => {
//        setProducts(prev => {
//          if (currentPage === 1) {
//           const next = paginated;
//            console.log("[INF_SCROLL] set page=1, products:", next.length);
//            return next;
//          }
//         const next = [...prev, ...paginated];
//          console.log(`[INF_SCROLL] appended page=${currentPage}, total products:`, next.length);
//          return next;
//        });
//        setIsAppending(false);
//      }, 500); // Minimum loader display time

//      return () => clearTimeout(timeout); // Cleanup timeout
//    } else {
//      if (!isFetching) setIsAppending(false);
//    }
//  }, [data, error]);

//   const handleChangeSearchParams = async (key, value) => {
//     if (!key || !value) return;
//     const params = new URLSearchParams(searchParams);
//     params.set(key, value);
//     await router.push(`${pathname}?${params.toString()}`);
//   };


//   const handleTableSort = (field, direction) => {
//     // Map table sort fields to API sort values
//     const sortMapping = {
//       name: "name",
//       price: direction === "asc" ? "asc" : "desc",
//       stock: "stock",
//       displayOrder: "displayOrder",
//       createdAt: "createdAt",
//       mostPopular: "mostPopular",
//       mostSold: "mostSold"
//     };

//     const sortValue = sortMapping[field] || field;
//     handleChangeSearchParams("sort", sortValue);
//  };

//    // Reset to first page on key query changes
//   useEffect(() => {
//     // Reset internal page on key query changes
//     setClientPage(1);
//     // Keep URL page at 1 to avoid server rerendering on scroll
//     const params = new URLSearchParams(searchParams.toString());
//     if (params.get("page") !== "1") {
//       params.set("page", "1");
//       router.replace(`${pathname}?${params.toString()}`);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [query, sort, categoryFilter, JSON.stringify(activeFilters), tag]);

//   const hasMore = useMemo(() => {
//     return Number.isFinite(totalPages) && clientPage < totalPages;
//   }, [clientPage, totalPages]);

//   const onLoadMore = () => {
//     if (isFetching || isAppending || !hasMore) return;
//     setIsAppending(true);
//     // Increment internal page only; do not modify URL to avoid full page rerender
//     setClientPage((p) => p + 1);
//   };

//   const { setSentinel } = useInfiniteScroll({
//     loading: isFetching || isAppending,
//     hasMore,
//     onLoadMore,
//   });

//   useEffect(() => {
//     if (!searchParams.get("view")) {
//       // clone current params
//       const params = new URLSearchParams(searchParams.toString());
//       params.set("view", "grid");

//       // replace URL with new params without refreshing page
//       router.replace(`${window.location.pathname}?${params.toString()}`);
//     }
//   }, []);

//   useEffect(() => {
//     if (!selectedCategory && categoryFilter) {
//       if (megaMenuState?.megaMenuList.length
//          > 0) {
//         const category = findCategoryById(
//           megaMenuState?.megaMenuList,
//           categoryFilter
//         );
//         setSelectedCategory(category);
      
//       // console.log("selected categoty", category, megaMenuState, categoryFilter);
//       }
//     }
//   }, [megaMenuState,categoryFilter]);

 

//  // 🧠 Memoized filters
//  const filters = useMemo(() => {
//    return {
//      brands: Array.from(
//        new Set(products?.map((p) => p.brand).filter(Boolean))
//      ).map((brand) => ({
//        label: brand,
//        value: brand.toLowerCase(),
//      })),

//      categories: Array.from(
//        new Set(products.map((p) => p.category).filter(Boolean))
//      ).map((title) => ({ title })),

//      colors: Array.from(new Set(products?.flatMap((p) => p.colors || []))),

//      others: STATIC_OTHERS,
//    };
//  }, [products]);

//  const theme = useTheme();

//   return (
//     <div className="bg-white pt-2 pb-4" style={{ position: "relative" }}>
//       {/* <BreadcrumbNav
//         breadcrumb=
//       /> */}
//       {isNavigating && (
//         <Box
//           sx={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: "rgba(255, 255, 255, 0.8)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 9999,
//           }}
//         >
//           <CircularProgress size={60} color="primary" />
//         </Box>
//       )}
    
       
//       <Container>
//         {categoryFilter && (
//           <Box
//             sx={{
//               width: "100%",
//               margin: "0px auto", // centers horizontally
//               marginBottom:1,
//               borderRadius: "22px",
//               backgroundColor: "#F3F5F9",
//               border: "1px solid #F3F5F9",
//               height: "43px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "start",
//               padding: "14px",
//               position: "relative",
//               overflow: "unset",
//               [theme.breakpoints.down(1150)]: {
//                 display: "none",
//               },
//             }}
//           >
//             <Box
//               component="img"
//               src="/assets/images/title_list.svg"
//               alt="Heading Icon"
//               sx={{ width: 40, height: 40, ml: "1rem" }}
//             />
//             <Typography
//               fontWeight={600}
//               color="text.primary"
//               sx={{ fontSize: "24px", ml: "8px" }}
//             >
//               {selectedCategory?.title}
//               {/* {categoryFilter
//                 .replace(/[-+]/g, " ") replace hyphen or plus with space
//                 .replace(/\b\w/g, (char) => char.toUpperCase())}{" "} */}
//               {/* capitalize each word */}
//             </Typography>
//           </Box>
//         )}
//         {/* FILTER ACTION AREA */}
//         <FlexBetween flexWrap="wrap" gap={2} mb={2}>
//           {query ? (
//             <div>
//               <Typography variant="h5" sx={{ mb: 0.5 }}>
//                 Searching for &quot;{query}&quot;
//               </Typography>
//               <Typography variant="body1" sx={{ color: "grey.600" }}>
//                 {products?.length} results found
//               </Typography>
//             </div>
//           ) : (
//             <div />
//           )}

//           <FlexBox alignItems="center" columnGap={4} flexWrap="wrap">
//             <FlexBox alignItems="center" gap={1} flex="1 1 0">
//               <Typography
//                 variant="body1"
//                 sx={{ color: "grey.600", whiteSpace: "pre" }}
//               >
//                 Sort by:
//               </Typography>

//               <TextField
//                 select
//                 fullWidth
//                 size="small"
//                 value={sort}
//                 variant="outlined"
//                 placeholder="Sort by"
//                 onChange={(e) => {
//                   handleChangeSearchParams("sort", e.target.value);
//                 }}
//                 sx={{ flex: "1 1 0", minWidth: "150px" }}
//               >
//                 {/* <MenuItem value=""  disabled>
//                   Select one
//                 </MenuItem> */}
//                 {SORT_OPTIONS?.map((item) => (
//                   <MenuItem value={item?.value} key={item?.value}>
//                     {item.label}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </FlexBox>

//             <FlexBox alignItems="center" my="0.25rem">
//               <Typography variant="body1" sx={{ color: "grey.600", mr: 1 }}>
//                 View:
//               </Typography>

//               <IconButton
//                 onClick={() => handleChangeSearchParams("view", "grid")}
//               >
//                 <Apps
//                   fontSize="small"
//                   color={view === "grid" ? "primary" : "inherit"}
//                 />
//               </IconButton>

//               <IconButton
//                 onClick={() => handleChangeSearchParams("view", "list")}
//               >
//                 <ViewList
//                   fontSize="small"
//                   color={view === "list" ? "primary" : "inherit"}
//                 />
//               </IconButton>

//               <Box display={{ md: "none", xs: "block" }}>
//                 <SideNav
//                   handler={(close) => (
//                     <IconButton onClick={close}>
//                       <FilterList fontSize="small" />
//                     </IconButton>
//                   )}
//                 >
//                   <Box px={3} py={2}>
//                     <ProductFilters
//                       filters={filters}
//                       activeFilters={activeFilters}
//                       onFilterChange={setActiveFilters}
//                     />
//                   </Box>
//                 </SideNav>
//               </Box>
//             </FlexBox>
//           </FlexBox>
//         </FlexBetween>
//         <Grid item xs={12}>
//           {(isLoading || isFetching || products.length === 0) && page === 1 ? (
//             <Box display="flex" justifyContent="center" alignItems="center" p={4}>
//               <CircularProgress />
//             </Box>
//           ) : view === "grid" ? (
//             <ProductsGridView products={products} />
//           ) : (
//             <ProductsListView products={products} onSort={handleTableSort} />
//           )}
//           {!isLoading && !isFetching && data?.data && products?.length === 0 ? (
//             "No products found"
//           ) : (
//             <Box mt={6}>
//               <Typography variant="body1" sx={{ color: "grey.600", mb: 2 }}>
//                 Showing {firstIndex}-{lastIndex} of {totalProducts} Products
//               </Typography>
//               <Box ref={setSentinel} sx={{ height: 20, width: "100%" }} />
//               {(isFetching || isAppending) && (
//                 <Box display="flex" justifyContent="center" alignItems="center" p={2}>
//                   <CircularProgress size={24} />
//                 </Box>
//               )}
//               {error && !isFetching && !isAppending && (
//                 <Box textAlign="center" p={2}>
//                   <Typography color="error">Failed to load more products.</Typography>
//                   <Typography onClick={() => refetch()} sx={{ mt: 1, cursor: 'pointer', color: 'primary.main' }}>
//                     Retry
//                   </Typography>
//                 </Box>
//               )}
//               {!isFetching && !isAppending && !hasMore && products?.length > 0 && (
//                 <Typography align="center" color="text.secondary" sx={{ py: 2 }}>
//                   You have reached the end.
//                 </Typography>
//               )}
//             </Box>
//           )}
//         </Grid>
//       </Container>
//     </div>
    
//   );
// }


"use client";

import { Box, CircularProgress, Container, Grid, Typography, useTheme, TextField, MenuItem, IconButton, Skeleton } from "@mui/material";
import { Apps, ViewList, FilterList } from "@mui/icons-material";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useGetAllProductsQuery } from "app/store/services";
import { useSnackbar } from "notistack";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import { useNavigation } from "contexts/NavigationContext";
import useProducts from "hooks/useProducts";
import useCategoriesMegaMenu from "hooks/useCategoriesMegaMenu";
// import UnifiedLoader from "components/progress/UnifiedLoader";
import InlineLoader from "components/progress/InlineLoader";
  // import productDatabase from "@/data/products"; // adjust import based on your path

 import ProductsGridView from "components/products-view/products-grid-view";
 import ProductsListView from "components/products-view/products-list-view";
 import ProductFilters from "components/products-view/filters";
 import { FlexBetween, FlexBox } from "components/flex-box";
 import SideNav from "components/side-nav";
import useUser from "hooks/useUser";
import { NotFoundPageView } from "pages-sections/not-found";

import { findCategoryById } from "utils/helpers";
import performanceMonitor from "utils/performanceMonitor";

 const SORT_OPTIONS = [
   { label: "Display Order", value: "displayOrder", order: "asc" },
   { label: "Price Low to High", value: "price", order: "asc" },
   { label: "Price High to Low", value: "price", order: "desc" },
    { label: "Stock High to Low", value: "stock", order: "desc" },
   { label: "Name A-Z", value: "name", order: "asc" },
   { label: "Newest First", value: "createdAt", order: "desc" },
   { label: "Most Popular", value: "mostPopular", order: "desc" },
   { label: "Most Sold", value: "mostSold", order: "desc" },
 ];

 const STATIC_OTHERS = [
   { label: "In Stock", value: "inStock" },
   { label: "Featured", value: "featured" },
   { label: "Most Selling", value: "mostSold" },
   { label: "Most Popular", value: "mostPopular" },
 ];

export default function ProductSearchPageView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isLoading: isNavigating, loadingMessage } = useNavigation(); // Use simplified NavigationContext
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [activeFilters, setActiveFilters] = useState({});
  const [isAppending, setIsAppending] = useState(false);
  const [clientPage, setClientPage] = useState(parseInt(searchParams.get("page") || "1"));
  const { enqueueSnackbar } = useSnackbar();
  const { state } = useProducts();
  const { state: megaMenuState } = useCategoriesMegaMenu();

  const categoryFilter = searchParams.get("category");
  const query = searchParams.get("q");
  const page = parseInt(searchParams.get("page") || "1");
  const view = searchParams.get("view") || "grid";
  const sort = searchParams.get("sort") || "displayOrder";
  const tag = searchParams.get("tag");
  const useCache = searchParams.get("useCache") === "true";
  const [hasUsedCache, setHasUsedCache] = useState(false);

  // Reset cache flag when query changes
  useEffect(() => {
    setHasUsedCache(false);
  }, [query]);

  // Check sessionStorage for cached search results when useCache flag is present
  useEffect(() => {
    if (useCache && query && query.length > 1 && !hasUsedCache && clientPage === 1) {
      const searchCacheKey = `search_results_${query.toLowerCase().trim()}`;
      const cachedData = sessionStorage.getItem(searchCacheKey);
      
      if (cachedData) {
        try {
          const parsed = JSON.parse(cachedData);
          // Check if cache is recent (within 5 minutes)
          const cacheAge = Date.now() - (parsed.timestamp || 0);
          const maxAge = 5 * 60 * 1000; // 5 minutes
          
          if (cacheAge < maxAge && parsed.products && Array.isArray(parsed.products)) {
            // Use cached products
            setProducts(parsed.products);
            
            if (parsed.pagination) {
              const pagination = parsed.pagination;
              const pageSize = 16;
              const first = (pagination.currentPage - 1) * pageSize + 1;
              const last = Math.min(pagination.currentPage * pageSize, pagination.totalItems);
              
              setFirstIndex(first);
              setLastIndex(last);
              setTotalProducts(pagination.totalItems);
              setTotalPages(pagination.totalPages || 1);
            }
            
            setHasUsedCache(true);
            // Remove useCache from URL to prevent reusing cache on refresh
            const params = new URLSearchParams(searchParams.toString());
            params.delete("useCache");
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
            return;
          } else {
            // Cache expired, remove it
            sessionStorage.removeItem(searchCacheKey);
          }
        } catch (error) {
          console.error("Error parsing cached search data:", error);
          sessionStorage.removeItem(searchCacheKey);
        }
      }
    }
  }, [useCache, query, hasUsedCache, clientPage, searchParams, pathname, router]);

   // Track route changes to show loading state immediately
   // Use refs to detect changes synchronously during render, not in useEffect
   const [isRouteChanging, setIsRouteChanging] = useState(false);
   const prevCategoryRef = useRef(categoryFilter);
   const prevQueryRef = useRef(query);
   const prevTagRef = useRef(tag);
   const productsRenderedRef = useRef(false);

   // Detect route changes IMMEDIATELY during render (not in useEffect)
   // This ensures loaders appear instantly when route params change
   const categoryChanged = prevCategoryRef.current !== categoryFilter;
   const queryChanged = prevQueryRef.current !== query;
   const tagChanged = prevTagRef.current !== tag;
   const routeChanged = categoryChanged || queryChanged || tagChanged;

   // Update refs immediately
   if (categoryChanged) prevCategoryRef.current = categoryFilter;
   if (queryChanged) prevQueryRef.current = query;
   if (tagChanged) prevTagRef.current = tag;

   // Set route changing state immediately if route changed
   if (routeChanged && !isRouteChanging) {
     setIsRouteChanging(true);
     productsRenderedRef.current = false; // Reset rendered flag on route change
   }

   // Clear stale products when category/query changes (don't rely on context after login)
   useEffect(() => {

     // Only use context products if there's no category filter and we're on initial mount
     // After login and navigation, always clear and rely on API response
     if (!categoryFilter && !query && state?.products?.length > 0) {
       setProducts(state?.products);
       if (state?.pagination?.products && state?.products?.length > 0) {
         const currentPage = state.pagination.products.currentPage;
         const totalItems = state.pagination.products.totalItems;
         const pageSize = 16 // fallback if page size isn't fixed

         const first = (currentPage - 1) * pageSize + 1;
         const last = Math.min(currentPage * pageSize, totalItems);

         setFirstIndex(first);
         setLastIndex(last);
         setTotalProducts(totalItems);
         setTotalPages(state.pagination.products.totalPages || 1);
       }
     } else if (!useCache || !hasUsedCache) {
       // Clear products when navigating to a specific category/query (unless we're using cache)
       setProducts([]);
     }
   }, [categoryFilter, query, useCache, hasUsedCache, tag, state]); // Re-run when category/query changes

    // console.log("active filterrrr", activeFilters);
    // ⛳️ Stabilize activeFilters to prevent unnecessary query changes
    // Serialize filters to detect actual value changes, not reference changes
    const activeFiltersKey = useMemo(() => {
      return JSON.stringify({
        brands: activeFilters.brands || [],
        sales: activeFilters.sales || []
      });
    }, [activeFilters.brands, activeFilters.sales]);

    // ⛳️ Compose query args when filters/search/sort/page changes
    // Use serialized filter key to prevent unnecessary recalculations
   const queryArgs = useMemo(
     () => {
        // Find the selected sort option to get the correct order
       const selectedSortOption = SORT_OPTIONS.find(option => option.value === sort);
       const order = selectedSortOption?.order || "asc";
      
       return {
         search: query || undefined,
         sort,
         order,
          // use internal page so infinite scroll does not refresh the whole route
         page: clientPage,
         brands: activeFilters.brands,
         // price filter removed - not needed
         others: activeFilters.sales,
         category: categoryFilter || undefined,
         featured: activeFilters.sales?.includes("featured") || false,
         mostSold: activeFilters.sales?.includes("mostSold") || false,
         mostPopular: activeFilters.sales?.includes("mostPopular") || false,
         tag: tag || undefined
          // ⬅ from STATIC_OTHERS values
          // colors: activeFilters.colors,
        //  rating: activeFilters.rating,
       };
     },
     [query, sort, clientPage, activeFiltersKey, tag, categoryFilter]
   );

   // Skip API call if we're using cached data and it's the first page
   const shouldSkipQuery = hasUsedCache && useCache && clientPage === 1;
   
   // Use refetchOnMountOrArgChange: true only for arg changes, not mount
   // RTK Query will deduplicate identical requests automatically
   const { data, isLoading: isApiLoading, error, refetch, isFetching } = useGetAllProductsQuery(queryArgs, {
     skip: shouldSkipQuery, // Skip API call when using cached data
     // Only refetch when args actually change, not on every mount
     // RTK Query handles deduplication, so identical requests won't fire multiple times
     refetchOnMountOrArgChange: true, // Changed: true allows RTK Query to properly deduplicate
     refetchOnFocus: false,
     refetchOnReconnect: false,
      //pollingInterval: 0,
   });
 
 

 useEffect(() => {
   // Skip processing API response if we're using cached data on page 1
   if (hasUsedCache && useCache && clientPage === 1 && !isFetching) {
     // Products are already set from cache, mark as ready to render
     productsRenderedRef.current = false; // Will be set when products render
     return;
   }
   
   if (error) {
     enqueueSnackbar("Something went wrong!", { variant: "error" });
     setIsAppending(false);
     setIsRouteChanging(false); // Clear route changing flag on error
     productsRenderedRef.current = true;
     // Clear products on error to show proper empty state
     if (clientPage === 1 && !hasUsedCache) {
       setProducts([]);
     }
     return;
   }

   // Handle case where API call is complete but no data yet
   if (!data && !isFetching && !isApiLoading) {
     // API call completed but no data - might be empty response
     setIsRouteChanging(false); // Clear route changing flag
     productsRenderedRef.current = true;
     if (clientPage === 1 && !hasUsedCache) {
       setProducts([]);
     }
     setIsAppending(false);
     return;
   }

   const paginated = data?.data?.products;
   const pagination = data?.data?.pagination;
   
   // Handle successful response
   if (paginated !== undefined && pagination) {
     const currentPage = pagination.currentPage;
    const totalItems = pagination.totalItems;
     const totalPagesFromApi = pagination.totalPages;
     const pageSize = 16;

     setFirstIndex((currentPage - 1) * pageSize + 1);
     setLastIndex(Math.min(currentPage * pageSize, totalItems));
    setTotalProducts(totalItems);
     setTotalPages(totalPagesFromApi);

     // Only apply timeout for infinite scroll (page > 1), not for initial page load
     if (currentPage === 1) {
       // For first page, update products immediately (even if empty array)
       // But skip if we're using cached data
       if (!hasUsedCache || !useCache) {
         setProducts(paginated || []);
         
         // Mark products displayed milestone for category navigation performance tracking
         // Check if this is a category navigation by looking for active category navigation timers
         if (categoryFilter && typeof window !== 'undefined') {
           // Find any active category navigation timers
           const activeTimers = window.__performanceActiveTimers || performanceMonitor.activeTimers || new Map();
           for (const [eventId, timer] of activeTimers.entries()) {
             if (timer.eventType === 'category-navigation' && 
                 timer.metadata?.categoryId === categoryFilter) {
               performanceMonitor.markMilestone(eventId, 'products-displayed', {
                 productCount: paginated?.length || 0,
                 totalProducts: totalItems,
                 apiResponseTime: performance.now() - (timer.startTime || performance.now()),
               });
               
               // End the performance tracking after products are displayed
               setTimeout(() => {
                 performanceMonitor.end(eventId, 'success', {
                   totalFlowTime: performance.now() - timer.startTime,
                 });
               }, 100);
               break;
             }
           }
         }
         
         // Mark products as set - we'll clear route changing after they're rendered
         productsRenderedRef.current = false; // Reset flag, will be set when products render
       }
       setIsAppending(false);
     } else {
      // For infinite scroll, apply minimum loader display time
      const timeout = setTimeout(() => {
        setProducts(prev => {
          const next = [...prev, ...(paginated || [])];
          return next;
        });
        setIsAppending(false);
      }, 150); // Reduced from 300ms to 150ms for faster rendering
       
       return () => clearTimeout(timeout); // Cleanup timeout
     }
   } else if (data?.data && !isFetching && !isApiLoading) {
     // API returned data but missing pagination or products - handle gracefully
     const paginated = data?.data?.products;
     if (paginated !== undefined) {
       // We have products array (even if empty), update it
       if (clientPage === 1 && (!hasUsedCache || !useCache)) {
         setProducts(paginated || []);
         // Mark products as set - will clear route changing after render
         productsRenderedRef.current = false;
       }
     } else if (clientPage === 1 && (!hasUsedCache || !useCache)) {
       // No products in response, clear products
       setProducts([]);
       // Clear route changing flag immediately for empty state
       setIsRouteChanging(false);
       productsRenderedRef.current = true;
     }
     setIsAppending(false);
   } else if (!isFetching && !isApiLoading && clientPage === 1 && (!hasUsedCache || !useCache)) {
     // Loading finished but no valid data - ensure products are cleared
     setProducts([]);
     setIsAppending(false);
     // Clear route changing flag immediately for no data state
     setIsRouteChanging(false);
     productsRenderedRef.current = true;
   }
 }, [data, error, isFetching, isApiLoading, clientPage, hasUsedCache, useCache, categoryFilter]);

  // Clear route changing flag when products are actually rendered
  useEffect(() => {
    if (isRouteChanging && products.length > 0 && !isApiLoading && !isFetching) {
      // Products are set and API is done - wait a frame to ensure React has rendered them
      const timeout = setTimeout(() => {
        setIsRouteChanging(false);
        productsRenderedRef.current = true;
      }, 50); // Small delay to ensure products are rendered
      return () => clearTimeout(timeout);
    }
  }, [isRouteChanging, products.length, isApiLoading, isFetching]);

  const handleChangeSearchParams = useCallback(async (key, value) => {
    if (!key || !value) return;
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    await router.push(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, router]);

  const handleTableSort = useCallback((field, direction) => {
    // Map table sort fields to API sort values
    const sortMapping = {
      name: "name",
      price: direction === "asc" ? "asc" : "desc",
      stock: "stock",
      displayOrder: "displayOrder",
      createdAt: "createdAt",
      mostPopular: "mostPopular",
      mostSold: "mostSold"
    };

    const sortValue = sortMapping[field] || field;
    handleChangeSearchParams("sort", sortValue);
  }, [handleChangeSearchParams]);

   // Reset to first page on key query changes
  useEffect(() => {
    // Reset internal page on key query changes
    setClientPage(1);
    // Keep URL page at 1 to avoid server rerendering on scroll
    const params = new URLSearchParams(searchParams.toString());
    if (params.get("page") !== "1") {
      params.set("page", "1");
      router.replace(`${pathname}?${params.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, sort, categoryFilter, JSON.stringify(activeFilters), tag]);

  const hasMore = useMemo(() => {
    return Number.isFinite(totalPages) && clientPage < totalPages;
  }, [clientPage, totalPages]);

  const onLoadMore = useCallback(() => {
    if (isFetching || isAppending || !hasMore) return;
    setIsAppending(true);
    // Increment internal page only; do not modify URL to avoid full page rerender
    setClientPage((p) => p + 1);
  }, [isFetching, isAppending, hasMore]);

  const { setSentinel } = useInfiniteScroll({
    loading: isFetching || isAppending,
    hasMore,
    onLoadMore,
  });

  useEffect(() => {
    if (!searchParams.get("view")) {
      // clone current params
      const params = new URLSearchParams(searchParams.toString());
      params.set("view", "grid");

      // replace URL with new params without refreshing page
      router.replace(`${window.location.pathname}?${params.toString()}`);
    }
  }, []);

  useEffect(() => {
    if (categoryFilter && megaMenuState?.megaMenuList.length > 0) {
      const category = findCategoryById(
        megaMenuState?.megaMenuList,
        categoryFilter
      );
      setSelectedCategory(category);
      
      // console.log("Category Debug:", {
      //   categoryFilter,
      //   foundCategory: category,
      //   megaMenuList: megaMenuState?.megaMenuList,
      //   selectedCategoryTitle: category?.title
      // });
    } else if (!categoryFilter) {
      // Clear selected category when no category filter is present
      setSelectedCategory(null);
    }
  }, [megaMenuState, categoryFilter]);

 

 // 🧠 Memoized filters - optimized to only compute when products change significantly
 const filters = useMemo(() => {
   if (!products || products.length === 0) {
     return {
       brands: [],
       categories: [],
       colors: [],
       others: STATIC_OTHERS,
     };
   }

   // Use Set for O(1) lookups instead of repeated array operations
   const brandSet = new Set();
   const categorySet = new Set();
   const colorSet = new Set();

   // Single pass through products
   for (const product of products) {
     if (product.brand) {
       brandSet.add(product.brand);
     }
     if (product.category) {
       categorySet.add(product.category);
     }
     if (product.colors && Array.isArray(product.colors)) {
       product.colors.forEach(color => colorSet.add(color));
     }
   }

   return {
     brands: Array.from(brandSet).map((brand) => ({
       label: brand,
       value: brand.toLowerCase(),
     })),
     categories: Array.from(categorySet).map((title) => ({ title })),
     colors: Array.from(colorSet),
     others: STATIC_OTHERS,
   };
 }, [products]);

 const theme = useTheme();

  return (
    <div className="bg-white pt-2 pb-4" style={{ position: "relative" }}>
      {/* Unified Loader handles all loading states */}
      {/* <UnifiedLoader /> */}
    
       
      <Container>
        {categoryFilter && (
          <Box
            sx={{
              width: "100%",
              margin: "0px auto",
              marginBottom: 3,
              borderRadius: 0,
              backgroundColor: "#FEFAF0",
              border: "2px solid #E2C572",
              height: "auto",
              minHeight: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              padding: "16px 24px",
              position: "relative",
              overflow: "unset",
              [theme.breakpoints.down(1150)]: {
                display: "none",
              },
            }}
          >
            <Box
              component="img"
              src="/assets/images/title_list.png"
              alt="Category Icon"
              sx={{ 
                width: 50, 
                height: 40, 
                mr: 2,
                filter: "brightness(0.7) sepia(1) saturate(2) hue-rotate(20deg)",
              }}
            />
            <Typography
              fontWeight={600}
              sx={{ 
                fontSize: "28px",
                color: "#271E03",
                letterSpacing: "0.5px",
              }}
            >
              {selectedCategory?.title || "Loading..."}
            </Typography>
          </Box>
        )}
        {/* FILTER ACTION AREA */}
        <FlexBetween flexWrap="wrap" gap={2} mb={2}>
          {query ? (
            <div>
              <Typography variant="h5" sx={{ mb: 0.5 }}>
                Searching for &quot;{query}&quot;
              </Typography>
              <Typography variant="body1" sx={{ color: "grey.600" }}>
                {products?.length} results found
              </Typography>
            </div>
          ) : (
            <div />
          )}

          <FlexBox alignItems="center" columnGap={4} flexWrap="wrap">
            <FlexBox alignItems="center" gap={1} flex="1 1 0">
              <Typography
                variant="body1"
                sx={{ color: "grey.600", whiteSpace: "pre" }}
              >
                Sort by:
              </Typography>

              <TextField
                select
                fullWidth
                size="small"
                value={sort}
                variant="outlined"
                placeholder="Sort by"
                onChange={(e) => {
                  handleChangeSearchParams("sort", e.target.value);
                }}
                sx={{ flex: "1 1 0", minWidth: "150px" }}
              >
                {/* <MenuItem value=""  disabled>
                  Select one
                </MenuItem> */}
                {SORT_OPTIONS?.map((item) => (
                  <MenuItem value={item?.value} key={item?.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </FlexBox>

            <FlexBox alignItems="center" my="0.25rem">
              <Typography variant="body1" sx={{ color: "grey.600", mr: 1 }}>
                View:
              </Typography>

              <IconButton
                onClick={() => handleChangeSearchParams("view", "grid")}
              >
                <Apps
                  fontSize="small"
                  color={view === "grid" ? "primary" : "inherit"}
                />
              </IconButton>

              <IconButton
                onClick={() => handleChangeSearchParams("view", "list")}
              >
                <ViewList
                  fontSize="small"
                  color={view === "list" ? "primary" : "inherit"}
                />
              </IconButton>

              <Box display={{ md: "none", xs: "block" }}>
                <SideNav
                  handler={(close) => (
                    <IconButton onClick={close}>
                      <FilterList fontSize="small" />
                    </IconButton>
                  )}
                >
                  <Box px={3} py={2}>
                    <ProductFilters
                      filters={filters}
                      activeFilters={activeFilters}
                      onFilterChange={setActiveFilters}
                    />
                  </Box>
                </SideNav>
              </Box>
            </FlexBox>
          </FlexBox>
        </FlexBetween>
        <Grid item xs={12}>
          {/* Show skeleton loaders when: route is changing, API is loading, or fetching, and we're on page 1 with no products */}
          {/* Skeleton loaders match the product grid layout for better UX */}
          {((isRouteChanging || isApiLoading || isFetching) && products.length === 0) && clientPage === 1 ? (
            <Box sx={{ 
              width: "100%",
            }}>
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(3, 1fr)',
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(5, 1fr)'
                },
                gap: 2,
                width: '100%'
              }}>
                {Array.from({ length: 10 }).map((_, idx) => (
                  <Box key={`skeleton-${idx}`} sx={{ p: 1 }}>
                    <Skeleton variant="rectangular" height={280} sx={{ borderRadius: 2 }} />
                    <Skeleton height={20} width="80%" sx={{ mt: 1.5 }} />
                    <Skeleton height={18} width="60%" sx={{ mt: 0.5 }} />
                    <Skeleton height={24} width="50%" sx={{ mt: 1 }} />
                  </Box>
                ))}
              </Box>
            </Box>
          ) : !isRouteChanging && !isApiLoading && !isFetching && !error && data?.data && products?.length === 0 && !isAppending && clientPage === 1 ? (
            <Box sx={{ 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center",
              width: "100%",
              minHeight: "300px",
            }}>
              <Typography variant="h6" color="text.secondary">
                No products found
              </Typography>
            </Box>
          ) : view === "grid" ? (
            <ProductsGridView products={products} />
          ) : (
            <ProductsListView products={products} onSort={handleTableSort} />
          )}
          {!isApiLoading && !isFetching && data?.data && products?.length > 0 && (
            <Box mt={6}>
              <Typography variant="body1" sx={{ color: "grey.600", mb: 2 }}>
                Showing {firstIndex}-{lastIndex} of {totalProducts} Products
              </Typography>
              <Box ref={setSentinel} sx={{ height: 20, width: "100%" }} />
              {(isFetching || isAppending) && (
                <Box display="flex" justifyContent="center" alignItems="center" p={2}>
                  <InlineLoader size={32} />
                </Box>
              )}
              {error && !isFetching && !isAppending && (
                <Box textAlign="center" p={2}>
                  <Typography color="error">Failed to load more products.</Typography>
                  <Typography onClick={() => refetch()} sx={{ mt: 1, cursor: 'pointer', color: 'primary.main' }}>
                    Retry
                  </Typography>
                </Box>
              )}
              {!isFetching && !isAppending && !hasMore && products?.length > 0 && (
                <Typography align="center" color="text.secondary" sx={{ py: 2 }}>
                  You have reached the end.
                </Typography>
              )}
            </Box>
          )}
        </Grid>
      </Container>
    </div>
    
  );
}