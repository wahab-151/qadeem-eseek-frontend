"use client";
import { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Grid,
  ClickAwayListener,
  Skeleton,
  CircularProgress,
  Portal,
} from "@mui/material";
import useGuardedRouter from "hooks/useGuardedRouter";
import { useGetAllProductsQuery } from "app/store/services";
import Image from "next/image";
import { extractCategoriesFromProducts } from "utils/helpers";
import { useSnackbar } from "notistack";
import { EXCLUDED_CATEGORY_ID } from "utils/constants";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productCount, setProductCount] = useState();
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [open, setOpen] = useState(false);
  const { push } = useGuardedRouter();
  const anchorRef = useRef(null);
  const menuRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  // Debounce input (reduce main-thread work)
  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedTerm(searchTerm.trim());
    }, 350);
    return () => window.clearTimeout(handler);
  }, [searchTerm]);

  // RTK Query
  const { data, isLoading, error } = useGetAllProductsQuery(
    { search: debouncedTerm },
    {
      skip: debouncedTerm.length <= 1,
      refetchOnMountOrArgChange: true, // Force refetch when search term changes
    }
  );

  useEffect(() => {
    if (error) {
      enqueueSnackbar("Something Went Wrong!", { variant: "error" });
    } else if (data?.data?.products) {
      // Always set products (even if empty array)
      const incoming = data.data.products;
      setProducts(incoming);
      
      if (incoming.length > 0) {
        // Filter products to only include those with non-deleted categories
        const activeProducts = incoming.filter(product => 
          // product?.category?.isActive === true && // Commented out isActive check
          product?.category?.isDeleted !== true &&
          product?.category?._id !== EXCLUDED_CATEGORY_ID &&
          product?.category?.parentId !== EXCLUDED_CATEGORY_ID
        );
        
        let categoriesData = extractCategoriesFromProducts(activeProducts);
        setCategories(categoriesData);
        
        const productsCount = activeProducts?.length || 0;
        let viewMoreCount = productsCount - 9;
        if (viewMoreCount > 0) setProductCount(viewMoreCount);
        
        // Store products and pagination in sessionStorage for "View More" navigation
        // This allows the allProducts page to use cached data instead of making another API call
        if (debouncedTerm && debouncedTerm.length > 1) {
          const searchCacheKey = `search_results_${debouncedTerm.toLowerCase().trim()}`;
          const cacheData = {
            products: activeProducts,
            pagination: data?.data?.pagination || {
              currentPage: 1,
              totalItems: activeProducts.length,
              totalPages: 1,
            },
            searchTerm: debouncedTerm,
            timestamp: Date.now(),
          };
          sessionStorage.setItem(searchCacheKey, JSON.stringify(cacheData));
        }
      } else {
        // No products found - reset categories and product count
        setCategories([]);
        setProductCount(0);
      }
    }
  }, [data, debouncedTerm]);

  
  // Show modal
  useEffect(() => {
    setOpen(debouncedTerm.length > 1);
  }, [debouncedTerm]);

  // Compute dropdown position
  useEffect(() => {
    if (!open) return;
    const updatePosition = () => {
      const rect = anchorRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMenuPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + rect.width / 2 + window.scrollX,
      });
    };
    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  // Handle click outside to close popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && anchorRef.current && !anchorRef.current.contains(event.target)) {
        // Check if click is outside the popup
        const popup = document.querySelector('[data-search-popup]');
        if (popup && !popup.contains(event.target)) {
          
          setOpen(false);
        }
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [open]);

  // Keep modal open while loading to show skeletons
  useEffect(() => {
    if (debouncedTerm.length > 1 && isLoading) {
      setOpen(true);
    }
  }, [debouncedTerm, isLoading]);

  const handleProductClick = (product, event) => {
    
    event.preventDefault();
    event.stopPropagation();
    
    const productKey = product?.slug || product?._id;
    if (!productKey) {
      
      return;
    }
    
    // Show loader immediately on click
    if (typeof window !== 'undefined' && window.NProgress) {
      window.__navTriggerType = 'search-result';
      window.NProgress.start();
    }
    
    // Store the full product object in sessionStorage for instant loading
    sessionStorage.setItem(`product_${productKey}`, JSON.stringify(product));
    
    
    
    // Small delay to ensure loader is visible before navigation
    setTimeout(async () => {
      await push(`/products/${productKey}?category=${product?.category?._id || product?.category}`);
      
      setOpen(false);
    }, 50);
  };

  const handleCategoryClick = async (category, event) => {
    
    event.preventDefault();
    event.stopPropagation();
    
    if (!category) {
      
      return;
    }
    
    
    // Start instant loader immediately
    if (typeof window !== 'undefined' && window.NProgress) {
      window.__navTriggerType = 'search-category';
      window.NProgress.start();
    }
    // Use guarded router to prevent duplicate navigation calls
    await push(`/allProducts?category=${category}&view=grid`);
    
    setOpen(false);
  };

  const handleViewMoreClick = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (!debouncedTerm || debouncedTerm.length <= 1) {
      return;
    }
    
    // Start instant loader immediately
    if (typeof window !== 'undefined' && window.NProgress) {
      window.__navTriggerType = 'search-view-more';
      window.NProgress.start();
    }
    
    // Navigate to all products page with search term and grid view
    // Use 'q' parameter to match what ProductSearchPageView expects
    // Add useCache flag to indicate we have cached data in sessionStorage
    // Use guarded router to prevent duplicate navigation calls
    await push(`/allProducts?q=${encodeURIComponent(debouncedTerm)}&view=grid&useCache=true`);
    
    setOpen(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: "30rem",
        width: "100%",
        backgroundColor: "transparent",
        border: "none",
      }}
      ref={anchorRef}
    >
      <TextField
        sx={{
          height: 46,
          padding: 0,
          borderRadius: 8,
          backgroundColor: "grey.200",
          "& .MuiOutlinedInput-notchedOutline": {
            border: 0,
          },
        }}
        fullWidth
        placeholder="Search parts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        variant="outlined"
        size="small"
        InputProps={{
          endAdornment: isLoading && !open && (
            <CircularProgress size={20} color="primary" />
          ),
        }}
      />
      {open && (
        <Portal>
          <Paper
            data-search-popup
            elevation={3}
            sx={{
              position: "fixed",
              top: menuPosition.top,
              left: menuPosition.left,
              transform: "translateX(-50%)",
              width: {
                xs: "95vw",
                sm: "90vw",
                md: "80vw",
                lg: "70vw",
              },
              maxWidth: "1200px",
              height: { xs: 400, sm: 450, md: 500 },
              borderRadius: 2,
              boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
              display: "flex",
              zIndex: 2000,
              overflow: "hidden",
              bgcolor: "#fff",
            }}
          >
              <span ref={menuRef} />

            {/* Left: Categories */}
            <Box
              sx={{
                width: { xs: "35%", sm: "30%" },
                borderRight: "1px solid #ddd",
                overflowY: "auto",
                bgcolor: "#F9FAFB",
                p: 2,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                Categories
              </Typography>
              <List dense>
                {isLoading
                  ? Array.from({ length: 6 }).map((_, idx) => (
                      <ListItem key={idx}>
                        <Skeleton width="80%" height={20} />
                      </ListItem>
                    ))
                  : categories.map((cat) => (
                      <ListItem
                        button
                        key={cat.id}
                        onClick={(event) => handleCategoryClick(cat.id, event)}
                        sx={{
                          borderRadius: 1,
                          px: 1,
                          "&:hover": {
                            bgcolor: "secondary.main",
                            color: "#fff",
                          },
                        }}
                      >
                        <ListItemText primary={cat.name} />
                      </ListItem>
                    ))}
              </List>
            </Box>

            {/* Right: Products */}
            <Box
              sx={{
                width: { xs: "65%", sm: "70%" },
                overflowY: "auto",
                p: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  Products
                </Typography>
                {productCount > 0 && (
                  <Typography
                    variant="body2"
                    onClick={handleViewMoreClick}
                    sx={{
                      fontWeight: 500,
                      color: "primary.main",
                      cursor: "pointer",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    View More (+{productCount})
                  </Typography>
                )}
              </Box>

              <Grid container spacing={2}>
                {isLoading ? (
                  Array.from({ length: 9 }).map((_, idx) => (
                    <Grid item xs={12} sm={6} md={4} key={idx}>
                      <Box
                        sx={{
                          border: "1px solid #eee",
                          borderRadius: 2,
                          p: 2,
                          height: 260,
                          bgcolor: "#fff",
                        }}
                      >
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          height={100}
                        />
                        <Skeleton width="80%" height={20} sx={{ mt: 1 }} />
                      </Box>
                    </Grid>
                  ))
                ) : products && products.length > 0 ? (
                  products.slice(0, 9).map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product._id || product.id}>
                      <Box
                        onClick={(event) =>{
                          
                          handleProductClick(product, event)}}
                        sx={{
                          cursor: "pointer",
                          border: "1px solid #eee",
                          borderRadius: 2,
                          p: 2,
                          textAlign: "center",
                          height: 260,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            borderColor: "secondary.main",
                            boxShadow: 3,
                          },
                        }}
                      >
                        <Image
                          width={100}
                          height={100}
                          src={
                            Array.isArray(product?.images) &&
                            product.images[0]?.preview
                              ? product.images[0].preview
                              : "/assets/images/Large-screen-logo.png"
                          }
                          alt={product?.name || "Product Image"}
                          sizes="100px"
                          style={{
                            objectFit: "contain",
                            marginBottom: 8,
                            display: "block",
                          }}
                        />
                        <Typography variant="body2" gutterBottom>
                          {product?.sku}
                        </Typography>
                        <Typography variant="body2">{product?.name}</Typography>
                      </Box>
                    </Grid>
                  ))
                ) : (
                  <Typography m={2} >No Product Found!!</Typography>
                )}
              </Grid>
            </Box>
          </Paper>
        </Portal>
      )}
    </Box>
  );
}