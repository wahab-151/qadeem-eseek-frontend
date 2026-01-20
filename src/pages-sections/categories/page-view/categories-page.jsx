"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  InputAdornment,
  Pagination,
  Skeleton,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useGetCategoriesPaginatedQuery } from "app/store/services";
import CategoryCard from "components/category-cards";
import HomeSectionHeader from "components/section-header/home-section-header";
import { useSearchParams, useRouter } from "next/navigation";

export default function CategoriesPageView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); // Reset to first page on new search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Update URL when page or search changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", page.toString());
    if (debouncedSearch) params.set("search", debouncedSearch);
    
    const queryString = params.toString();
    router.replace(`/categories${queryString ? `?${queryString}` : ""}`, { scroll: false });
  }, [page, debouncedSearch, router]);

  const { data, isLoading, isFetching } = useGetCategoriesPaginatedQuery({
    page,
    limit: 12,
    search: debouncedSearch,
    level: 1, // Only parent categories
    sortBy: "displayOrder",
    sortOrder: "asc",
  });

  const categories = useMemo(() => data?.data?.categories || [], [data]);
  const pagination = useMemo(() => data?.data?.pagination || {}, [data]);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  return (
    <Box sx={{ minHeight: "80vh", py: 4 }}>
      <Container maxWidth={false} sx={{ maxWidth: 1240, mx: "auto", px: { xs: 2, sm: 3 } }}>
        {/* Header */}
        <HomeSectionHeader
          title="All Categories"
          description="Browse through our wide range of product categories"
          mb={4}
        />

        {/* Search Box */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search categories..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.secondary" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              maxWidth: 500,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor: "background.paper",
              },
            }}
          />
        </Box>

        {/* Categories Grid */}
        {isLoading ? (
          <Grid container spacing={3}>
            {Array.from({ length: 8 }).map((_, idx) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                <Box sx={{ p: 1 }}>
                  <Skeleton variant="rectangular" height={340} sx={{ borderRadius: 0 }} />
                  <Skeleton height={24} width="60%" sx={{ mt: 2, mx: "auto" }} />
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : categories.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 10,
            }}
          >
            <Typography variant="h6" color="text.secondary">
              {debouncedSearch
                ? `No categories found for "${debouncedSearch}"`
                : "No categories available"}
            </Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {categories.map((category) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={category._id}>
                  <CategoryCard category={category} />
                </Grid>
              ))}
            </Grid>

            {/* Loading overlay for refetching */}
            {isFetching && !isLoading && (
              <Box
                sx={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bgcolor: "rgba(255,255,255,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1000,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: (theme) => `4px solid ${theme.palette.grey[300]}`,
                    borderTopColor: (theme) => theme.palette.primary.main,
                    animation: "spin 0.8s linear infinite",
                    "@keyframes spin": {
                      from: { transform: "rotate(0deg)" },
                      to: { transform: "rotate(360deg)" },
                    },
                  }}
                />
              </Box>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 2 }}>
                <Pagination
                  count={pagination.totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                  sx={{
                    "& .MuiPaginationItem-root": {
                      fontWeight: 600,
                    },
                  }}
                />
              </Box>
            )}

            {/* Results info */}
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Showing {categories.length} of {pagination.totalCategories} categories
                {debouncedSearch && ` for "${debouncedSearch}"`}
              </Typography>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}
