'use client'
import { useState, useEffect, useRef, useCallback } from "react";
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
  IconButton,
  Portal,
} from "@mui/material";
import useGuardedRouter from "hooks/useGuardedRouter";
import { useGetAllProductsQuery } from "app/store/services";
import { extractCategoriesFromProducts } from "utils/helpers";
import { useSnackbar } from "notistack";
import Clear from "@mui/icons-material/Clear";
import { EXCLUDED_CATEGORY_ID } from "utils/constants";

export default function MobileSearchInput({ onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productCount, setProductCount] = useState();
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { push } = useGuardedRouter() || {};
  const anchorRef = useRef(null);
  const menuRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 0 });

  // On mobile, do not auto-trigger API while typing; only submit on button

  const handleClose = useCallback(() => {
    setOpen(false);
    setSearchTerm("");
    setHasRequested(false);
    if (typeof onClose === 'function') onClose();
  }, [onClose]);

  // Handle click outside to close popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open) {
        // Check if click is outside both the input and the popup
        const popup = document.querySelector('[data-mobile-search-popup]');
        const isClickOutsideInput = anchorRef.current && !anchorRef.current.contains(event.target);
        const isClickOutsidePopup = popup && !popup.contains(event.target);
        
        // Don't close if clicking on the search button
        const isSearchButton = event.target.closest('button[type="button"]');
        
        if (isClickOutsideInput && isClickOutsidePopup && !isSearchButton) {
          handleClose();
        }
      }
    };

    if (open) {
      // Use a small delay to avoid immediate closure on button click
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
      }, 100);
      
      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('touchstart', handleClickOutside);
      };
    }
  }, [open, handleClose]);

  // RTK Query
  const { data, isLoading, error } = useGetAllProductsQuery(
    { search: debouncedTerm },
    {
      skip: debouncedTerm.length <= 1,
      refetchOnMountOrArgChange: true, // Force refetch when search term changes
    }
  );

  // Track when a request was initiated so we can auto-close on first response
  useEffect(() => {
    if (debouncedTerm.length > 2) {
      setHasRequested(true);
    } else {
      setHasRequested(false);
    }
  }, [debouncedTerm]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar("Something Went Wrong!", { variant: "error" });
      // Reset state on error
      setProducts([]);
      setCategories([]);
      setProductCount(0);
    } else if (data?.data?.products) {
      // Filter products to only include those with non-deleted categories
      const activeProducts = data.data.products.filter(product => 
        product?.category?.isDeleted !== true &&
        product?.category?._id !== EXCLUDED_CATEGORY_ID &&
        product?.category?.parentId !== EXCLUDED_CATEGORY_ID
      );
      
      // Set filtered products (only active ones)
      setProducts(activeProducts);
      
      if (activeProducts.length > 0) {
        let categoriesData = extractCategoriesFromProducts(activeProducts);
        setCategories(categoriesData);
        
        const productsCount = activeProducts?.length || 0;
        let viewMoreCount = productsCount - 6; // Show fewer products on mobile
        if (viewMoreCount > 0) {
          setProductCount(viewMoreCount);
        } else {
          setProductCount(0);
        }
      } else {
        // No active products found - reset categories and product count
        setCategories([]);
        setProductCount(0);
      }
    } else if (data && !data?.data?.products) {
      // API returned but no products array - reset state
      setProducts([]);
      setCategories([]);
      setProductCount(0);
    }
  }, [data, error, enqueueSnackbar]);

  // Show modal when debounced term is set (from button click)
  useEffect(() => {
    if (debouncedTerm.length > 1) {
      setOpen(true);
    }
  }, [debouncedTerm]);

  // Keep modal open while loading to show skeletons
  useEffect(() => {
    if (debouncedTerm.length > 1 && isLoading) {
      setOpen(true);
    }
  }, [debouncedTerm, isLoading]);

  // Keep modal open when data is available to show results
  useEffect(() => {
    if (debouncedTerm.length > 1 && data && !isLoading) {
      setOpen(true);
    }
  }, [debouncedTerm, data, isLoading]);

  // Manual search submission handler (button click)
  const handleSubmitSearch = async (e) => {
    // Prevent event bubbling to avoid triggering click outside handler
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    const term = (searchTerm || "").trim();
    if (!term) return;
    
    setIsSubmitting(true);
    setOpen(false);
    try {
      // Close the modal/drawer first
      // if (typeof onClose === 'function') {
      //   onClose();
      // }
      
      // Navigate to search results page
      if (!push) {
        console.error("Router push method is not available");
        return;
      }
      await push(`/products/search?q=${encodeURIComponent(term)}`);
      
      // Clear search term
      setSearchTerm("");
      setOpen(false);
    } catch (error) {
      console.error("Search navigation error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Compute dropdown position
  useEffect(() => {
    if (!open) return;
    const updatePosition = () => {
      const rect = anchorRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      // Calculate position with better mobile handling
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const popupHeight = Math.min(viewportHeight * 0.7, 500); // Max 70vh or 500px
      
      let top = rect.bottom + window.scrollY + 8;
      let left = rect.left + window.scrollX;
      let width = Math.min(rect.width, viewportWidth - 16); // Ensure some margin
      
      // Adjust if popup would go off screen
      if (top + popupHeight > viewportHeight + window.scrollY) {
        top = rect.top + window.scrollY - popupHeight - 8;
      }
      
      // Ensure popup stays within viewport horizontally
      if (left + width > viewportWidth) {
        left = viewportWidth - width - 8;
      }
      if (left < 8) {
        left = 8;
      }
      
      setMenuPosition({
        top: Math.max(top, 8),
        left: left,
        width: width,
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

  // Note: ClickAwayListener handles closing the popup

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
      if (push) {
        await push(`/products/${productKey}?category=${product?.category?._id || product?.category}`);
        setOpen(false);
        if (typeof onClose === 'function') onClose();
      }
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
    if (push) {
      await push(`/allProducts?category=${category}&view=grid`);
      setOpen(false);
      if (typeof onClose === 'function') onClose();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      handleClose();
    } else if (event.key === 'Enter' || event.keyCode === 13) {
      // Submit search on Enter key
      event.preventDefault();
      event.stopPropagation();
      const term = (searchTerm || "").trim();
      if (term) {
        handleSubmitSearch(event);
      }
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        backgroundColor: "transparent",
        border: "none",
      }}
      ref={anchorRef}
    >
      <TextField
        sx={{
          height: 44,
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
        onKeyDown={handleKeyDown}
        variant="outlined"
        size="small"
        InputProps={{
          endAdornment: (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pr: 1 }}>
              {isLoading && <CircularProgress size={18} color="primary" />}
              <button
                type="button"
                onClick={(e) => handleSubmitSearch(e)}
                disabled={isSubmitting || !searchTerm?.trim()}
                style={{
                  height: 30,
                  padding: '0 12px',
                  borderRadius: 6,
                  border: 'none',
                  background: '#1976d2',
                  color: '#fff',
                  fontWeight: 600,
                  opacity: (isSubmitting || !searchTerm?.trim()) ? 0.6 : 1,
                  cursor: (isSubmitting || !searchTerm?.trim()) ? 'not-allowed' : 'pointer',
                }}
              >
                {isSubmitting ? 'Searching…' : 'Search'}
              </button>
            </Box>
          ),
        }}
      />
      
      {open && (
        <Portal>
          <Paper
            data-mobile-search-popup
            elevation={3}
            sx={{
              position: "fixed",
              top: menuPosition.top,
              left: menuPosition.left,
              width: menuPosition.width,
              maxHeight: "70vh",
              borderRadius: 2,
              boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              zIndex: 2000,
              overflow: "hidden",
              bgcolor: "#fff",
            }}
          >
              <span ref={menuRef} />
            {/* Header with close button */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                borderBottom: "1px solid #eee",
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Search Results
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {isLoading && <CircularProgress size={18} color="primary" />}
                <IconButton onClick={handleClose} size="small">
                  <Clear />
                </IconButton>
              </Box>
            </Box>


            {/* Content */}
            <Box sx={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
              {/* Categories Section */}
              <Box sx={{ p: 2, borderBottom: "1px solid #eee" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                  Categories
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {isLoading
                    ? Array.from({ length: 4 }).map((_, idx) => (
                        <Skeleton key={idx} width={80} height={32} />
                      ))
                    : categories.map((cat) => (
                        <Box
                          key={cat.id}
                          onClick={(event) => handleCategoryClick(cat.id, event)}
                          sx={{
                            cursor: "pointer",
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            border: "1px solid #ddd",
                            fontSize: "0.875rem",
                            "&:hover": {
                              bgcolor: "secondary.main",
                              color: "#fff",
                              borderColor: "secondary.main",
                            },
                          }}
                        >
                          {cat.name}
                        </Box>
                      ))}
                </Box>
              </Box>

              {/* Products Section */}
              <Box sx={{ p: 2, flex: 1, overflowY: "auto" }}>
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
                      onClick={() => {
                        const term = (searchTerm || debouncedTerm || "").trim();
                        if (term && push) {
                          push(`/products/search?q=${encodeURIComponent(term)}`);
                          handleClose();
                        }
                      }}
                      sx={{
                        fontWeight: 500,
                        color: "primary.main",
                        cursor: "pointer",
                      }}
                    >
                      View More (+{productCount})
                    </Typography>
                  )}
                </Box>

                <Grid container spacing={2}>
                  {isLoading ? (
                    Array.from({ length: 6 }).map((_, idx) => (
                      <Grid item xs={6} key={idx}>
                        <Box
                          sx={{
                            border: "1px solid #eee",
                            borderRadius: 2,
                            p: 2,
                            height: 200,
                            bgcolor: "#fff",
                          }}
                        >
                          <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={80}
                          />
                          <Skeleton width="80%" height={16} sx={{ mt: 1 }} />
                          <Skeleton width="60%" height={16} sx={{ mt: 0.5 }} />
                        </Box>
                      </Grid>
                    ))
                  ) : products && products.length > 0 ? (
                    products.slice(0, 6).map((product) => (
                      <Grid item xs={6} key={product.id}>
                        <Box
                          onClick={(event) => handleProductClick(product, event)}
                          sx={{
                            cursor: "pointer",
                            border: "1px solid #eee",
                            borderRadius: 2,
                            p: 2,
                            textAlign: "center",
                            height: 200,
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
                          <img
                            src={
                              Array.isArray(product?.images) &&
                              product.images[0]?.preview
                                ? product.images[0].preview
                                : "/assets/images/logo3.jpeg"
                            }
                            alt={product?.name || "Product Image"}
                            style={{
                              height: 80,
                              maxWidth: "100%",
                              width: "auto",
                              objectFit: "contain",
                              marginBottom: 8,
                              display: "block",
                            }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/assets/images/logo3.jpeg";
                            }}
                          />
                          <Typography variant="body2" gutterBottom sx={{ fontSize: "0.75rem" }}>
                            {product?.sku}
                          </Typography>
                          <Typography variant="body2" sx={{ fontSize: "0.875rem", lineHeight: 1.2 }}>
                            {product?.name}
                          </Typography>
                        </Box>
                      </Grid>
                    ))
                  ) : (
                    <Box sx={{ p: 2, textAlign: "center", width: "100%" }}>
                      <Typography>No Product Found!!</Typography>
                    </Box>
                  )}
                </Grid>
              </Box>
            </Box>
          </Paper>
        </Portal>
      )}
    </Box>
  );
}
