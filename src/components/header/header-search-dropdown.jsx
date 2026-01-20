"use client";

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
  Slide,
  Container,
} from "@mui/material";
import useGuardedRouter from "hooks/useGuardedRouter";
import { useGetAllProductsQuery } from "app/store/services";
import { extractCategoriesFromProducts } from "utils/helpers";
import { useSnackbar } from "notistack";
import Clear from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { EXCLUDED_CATEGORY_ID } from "utils/constants";
import QadeemButton from "components/QadeemButton";
import { useTheme } from "@mui/material/styles";

export default function HeaderSearchDropdown({ open, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef(null);
  const theme = useTheme();

  const { push } = useGuardedRouter() || {};
  const { enqueueSnackbar } = useSnackbar();

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Focus input when opened
  useEffect(() => {
    if (open && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  // Reset search when closed
  useEffect(() => {
    if (!open) {
      setSearchTerm("");
      setDebouncedTerm("");
      setProducts([]);
      setCategories([]);
      setProductCount(0);
    }
  }, [open]);

  // RTK Query
  const { data, isLoading, error } = useGetAllProductsQuery(
    { search: debouncedTerm },
    {
      skip: debouncedTerm.length <= 1,
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (error) {
      enqueueSnackbar("Something Went Wrong!", { variant: "error" });
      setProducts([]);
      setCategories([]);
      setProductCount(0);
    } else if (data?.data?.products) {
      const activeProducts = data.data.products.filter(
        (product) =>
          product?.category?.isDeleted !== true &&
          product?.category?._id !== EXCLUDED_CATEGORY_ID &&
          product?.category?.parentId !== EXCLUDED_CATEGORY_ID
      );

      setProducts(activeProducts);

      if (activeProducts.length > 0) {
        let categoriesData = extractCategoriesFromProducts(activeProducts);
        setCategories(categoriesData);

        const productsCount = activeProducts?.length || 0;
        let viewMoreCount = productsCount - 12;
        if (viewMoreCount > 0) {
          setProductCount(viewMoreCount);
        } else {
          setProductCount(0);
        }
      } else {
        setCategories([]);
        setProductCount(0);
      }
    } else if (data && !data?.data?.products) {
      setProducts([]);
      setCategories([]);
      setProductCount(0);
    }
  }, [data, error, enqueueSnackbar]);

  const handleClose = useCallback(() => {
    if (typeof onClose === "function") onClose();
  }, [onClose]);

  const handleSubmitSearch = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const term = (searchTerm || "").trim();
    if (!term) return;

    setIsSubmitting(true);
    try {
      if (!push) {
        console.error("Router push method is not available");
        return;
      }
      await push(`/products/search?q=${encodeURIComponent(term)}`);
      setSearchTerm("");
      handleClose();
    } catch (error) {
      console.error("Search navigation error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProductClick = (product, event) => {
    event.preventDefault();
    event.stopPropagation();

    const productKey = product?.slug || product?._id;
    if (!productKey) {
      return;
    }

    if (typeof window !== "undefined" && window.NProgress) {
      window.__navTriggerType = "search-result";
      window.NProgress.start();
    }

    sessionStorage.setItem(`product_${productKey}`, JSON.stringify(product));

    setTimeout(async () => {
      if (push) {
        await push(
          `/products/${productKey}?category=${product?.category?._id || product?.category}`
        );
        handleClose();
      }
    }, 50);
  };

  const handleCategoryClick = async (category, event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!category) {
      return;
    }

    if (typeof window !== "undefined" && window.NProgress) {
      window.__navTriggerType = "search-category";
      window.NProgress.start();
    }

    if (push) {
      await push(`/allProducts?category=${category}&view=grid`);
      handleClose();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      handleClose();
    } else if (event.key === "Enter" || event.keyCode === 13) {
      event.preventDefault();
      event.stopPropagation();
      const term = (searchTerm || "").trim();
      if (term) {
        handleSubmitSearch(event);
      }
    }
  };

  // Handle click outside to close
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      // Don't close if clicking on the search button
      const searchButton = event.target.closest('button[aria-label="Search"]');
      if (searchButton) return;

      // Close if clicking outside the search dropdown
      const searchDropdown = document.querySelector('[data-header-search-dropdown]');
      if (searchDropdown && !searchDropdown.contains(event.target)) {
        handleClose();
      }
    };

    // Add a small delay to avoid immediate closure
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [open, handleClose]);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1299,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
          onClick={handleClose}
        />
      )}
      <Slide direction="down" in={open} mountOnEnter unmountOnExit>
        <Box
          data-header-search-dropdown
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1300,
            backgroundColor: "#FEFAF0",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
          }}
        >
        <Container maxWidth="xl" sx={{ py: 3, position: "relative" }}>
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "#424242",
              zIndex: 1,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.05)",
              },
            }}
            aria-label="Close search"
          >
            <CloseIcon />
          </IconButton>
          
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "stretch",
                maxWidth: "600px",
                width: "100%",
                border: isFocused 
                  ? `1px solid ${theme.palette.primary.main}` 
                  : "1px solid transparent",
                borderRadius: 0,
                transition: "border-color 0.2s ease",
                "&:hover": {
                  border: `1px solid ${theme.palette.primary.main}`,
                },
              }}
            >
              <TextField
                inputRef={searchInputRef}
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                variant="outlined"
                size="medium"
                sx={{
                  flex: 1,
                  backgroundColor: "#FFFFFF",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 0,
                    borderRight: "none",
                    "& fieldset": {
                      border: "none",
                      outline: "none",
                    },
                    "&:hover fieldset": {
                      border: "none",
                      outline: "none",
                    },
                    "&.Mui-focused fieldset": {
                      border: "none",
                      outline: "none",
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                      <SearchIcon sx={{ color: "#424242", fontSize: 24 }} />
                    </Box>
                  ),
                  endAdornment: searchTerm && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {isLoading && (
                        <CircularProgress size={20} sx={{ color: "#424242" }} />
                      )}
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          setSearchTerm("");
                        }}
                        size="small"
                        sx={{
                          color: "#424242",
                          "&:hover": {
                            backgroundColor: "rgba(0,0,0,0.05)",
                          },
                        }}
                      >
                        <Clear />
                      </IconButton>
                    </Box>
                  ),
                }}
              />
              <QadeemButton
                onClick={handleSubmitSearch}
                disabled={isSubmitting || !searchTerm?.trim()}
                loading={isSubmitting}
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: 0,
                  px: 3,
                  py: 1.5,
                  minWidth: "auto",
                  whiteSpace: "nowrap",
                }}
              >
                Search
              </QadeemButton>
            </Box>
          </Box>

          {/* Search Results */}
          {debouncedTerm.length > 1 && (
            <Paper
              elevation={2}
              sx={{
                maxHeight: "60vh",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#FFFFFF",
                borderRadius: 2,
              }}
            >
              {/* Categories Section */}
              {categories.length > 0 && (
                <Box sx={{ p: 2, borderBottom: "1px solid #E0E0E0" }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mb: 1.5, color: "#424242" }}
                  >
                    Categories
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {isLoading
                      ? Array.from({ length: 4 }).map((_, idx) => (
                          <Skeleton key={idx} width={100} height={36} />
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
                              border: "1px solid #E0E0E0",
                              fontSize: "0.875rem",
                              color: "#424242",
                              transition: "all 0.2s ease",
                              "&:hover": {
                                bgcolor: "#424242",
                                color: "#FFFFFF",
                                borderColor: "#424242",
                              },
                            }}
                          >
                            {cat.name}
                          </Box>
                        ))}
                  </Box>
                </Box>
              )}

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
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, color: "#424242" }}
                  >
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
                        color: "#424242",
                        cursor: "pointer",
                        textDecoration: "underline",
                        "&:hover": {
                          color: "#616161",
                        },
                      }}
                    >
                      View More (+{productCount})
                    </Typography>
                  )}
                </Box>

                <Grid container spacing={2}>
                  {isLoading ? (
                    Array.from({ length: 12 }).map((_, idx) => (
                      <Grid item xs={6} sm={4} md={3} key={idx}>
                        <Box
                          sx={{
                            border: "1px solid #E0E0E0",
                            borderRadius: 2,
                            p: 2,
                            height: 220,
                            bgcolor: "#FFFFFF",
                          }}
                        >
                          <Skeleton variant="rectangular" width="100%" height={100} />
                          <Skeleton width="80%" height={16} sx={{ mt: 1 }} />
                          <Skeleton width="60%" height={16} sx={{ mt: 0.5 }} />
                        </Box>
                      </Grid>
                    ))
                  ) : products && products.length > 0 ? (
                    products.slice(0, 12).map((product) => (
                      <Grid item xs={6} sm={4} md={3} key={product.id}>
                        <Box
                          onClick={(event) => handleProductClick(product, event)}
                          sx={{
                            cursor: "pointer",
                            border: "1px solid #E0E0E0",
                            borderRadius: 2,
                            p: 2,
                            textAlign: "center",
                            height: 220,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            transition: "all 0.2s ease",
                            bgcolor: "#FFFFFF",
                            "&:hover": {
                              borderColor: "#424242",
                              boxShadow: 2,
                              transform: "translateY(-2px)",
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
                              height: 100,
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
                          <Typography
                            variant="body2"
                            gutterBottom
                            sx={{ fontSize: "0.75rem", color: "#757575" }}
                          >
                            {product?.sku}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "0.875rem",
                              lineHeight: 1.2,
                              color: "#424242",
                              fontWeight: 500,
                            }}
                          >
                            {product?.name}
                          </Typography>
                        </Box>
                      </Grid>
                    ))
                  ) : debouncedTerm.length > 1 && !isLoading ? (
                    <Box sx={{ p: 4, textAlign: "center", width: "100%" }}>
                      <Typography sx={{ color: "#757575" }}>
                        No products found
                      </Typography>
                    </Box>
                  ) : null}
                </Grid>
              </Box>
            </Paper>
          )}
        </Container>
      </Box>
    </Slide>
    </>
  );
}

