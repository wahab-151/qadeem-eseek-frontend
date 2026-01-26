"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton,
  TableSortLabel,
  Chip,
  Avatar,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import Link from "next/link";
import LazyImage from "components/LazyImage";
import ProductPrice from "components/product-cards/product-price";
import AddToCart from "pages-sections/product-details/product-intro/add-to-cart";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import InlineLoader from "components/progress/InlineLoader";
import useUser from "hooks/useUser";

// Virtualized list for mobile rendering (loaded only on client)
const ReactWindowList = dynamic(() => import("react-window").then(m => m.FixedSizeList), { ssr: false, loading: () => <InlineLoader size={32} /> });

// Lightweight JSON stringify worker (created lazily on first use)
let jsonWorker = null;
const getJsonWorker = () => {
  if (typeof window === 'undefined') return null;
  if (jsonWorker) return jsonWorker;
  try {
    jsonWorker = new Worker(new URL("../../utils/workers/jsonWorker.js", import.meta.url));
    return jsonWorker;
  } catch (e) {
    return null;
  }
};

const ProductsTableView = memo(({ products, onSort }) => {
  const [sortField, setSortField] = useState("displayOrder");
  const [sortDirection, setSortDirection] = useState("asc");
  const { state } = useUser();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSort = useCallback((field) => {
    let direction = "asc";
    if (sortField === field && sortDirection === "asc") {
      direction = "desc";
    }
    setSortField(field);
    setSortDirection(direction);
    
    // Call the parent's sort handler
    if (onSort) {
      onSort(field, direction);
    }
  }, [onSort, sortField, sortDirection]);

  const getSortIcon = useCallback((field) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? <ArrowUpward /> : <ArrowDownward />;
  }, [sortField, sortDirection]);

  const getStockStatus = useCallback((stock) => {
    // Handle undefined, null, or non-numeric values
    const stockValue = stock ?? 0;
    const numericStock = typeof stockValue === 'number' ? stockValue : parseInt(stockValue) || 0;
    
    if (numericStock === 0) {
      return <Chip label="Out of Stock" color="error" size="small" />;
    } else if (numericStock < 10) {
      return <Chip label={`Low Stock (${numericStock})`} color="warning" size="small" />;
    } else {
      return <Chip label={`In Stock (${numericStock})`} color="success" size="small" />;
    }
  }, []);

  // Mobile Card View Component
  const MobileProductCard = ({ product }) => {
    const {
      _id,
      slug,
      name,
      price,
      images: rawImages,
      stock,
      pricing,
    } = product;

    const images = Array.isArray(rawImages) && rawImages.length > 0
      ? rawImages
      : [{ preview: "/assets/images/small-screen-logo.png" }];

    const productKey = slug || _id;
    const handleProductClick = () => {
      if (typeof window !== 'undefined' && window.NProgress) {
        window.NProgress.start();
      }
      const worker = getJsonWorker();
      if (worker) {
        worker.onmessage = (e) => {
          try { sessionStorage.setItem(`product_${productKey}`, e.data); } catch {}
        };
        worker.postMessage(product);
      } else {
        // Fallback if worker not available
        try { sessionStorage.setItem(`product_${productKey}`, JSON.stringify(product)); } catch {}
      }
    };

    return (
      <Card sx={{ mb: 2, boxShadow: 1 }}>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Avatar
              variant="rounded"
              sx={{ width: 80, height: 80, flexShrink: 0 }}
              src={images[0]?.preview || "/assets/images/small-screen-logo.png"}
              alt={name}
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Link 
                href={`/products/${slug || _id}`} 
                onClick={(e) => { handleProductClick(e); }}
                onMouseEnter={() => { try { router.prefetch(`/products/${slug || _id}`); } catch (_) {} }}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 500,
                    color: "text.primary",
                    mb: 1,
                    "&:hover": { textDecoration: "underline" },
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {name}
                </Typography>
              </Link>
              <Box sx={{ mb: 1 }}>
                <ProductPrice 
                  price={price} 
                  discount={pricing} 
                  quantity={1} 
                  userLoggedIn={state?.user?.id ? true : false} 
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                {stock !== undefined ? getStockStatus(stock) : <Chip label="N/A" color="default" size="small" />}
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: "100%" }}>
            <AddToCart 
              product={product} 
              buttonStack="row" 
              quantity={1}
              setQuantity={() => {}} 
            />
          </Box>
        </CardContent>
      </Card>
    );
  };

  // Render mobile card view for small screens
  if (isMobile) {
    const itemSize = 220; // px height per card
    const height = Math.min(600, Math.max(220, itemSize * Math.min(4, products?.length || 0)));
    const Row = ({ index, style }) => (
      <div style={style}>
        <MobileProductCard product={products[index]} />
      </div>
    );
    return (
      <Box>
        {Array.isArray(products) && products.length > 40 ? (
          <ReactWindowList
            height={height}
            itemCount={products.length}
            itemSize={itemSize}
            width={"100%"}
          >
            {Row}
          </ReactWindowList>
        ) : (
          products?.map((product) => (
            <MobileProductCard key={product._id} product={product} />
          ))
        )}
      </Box>
    );
  }

  // Render desktop table view
  return (
    <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
      <Table sx={{ minWidth: 650 }} aria-label="products table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell>
              <Typography variant="subtitle2" fontWeight={600}>
                Product
              </Typography>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortField === "name"}
                direction={sortField === "name" ? sortDirection : "asc"}
                onClick={() => handleSort("name")}
                IconComponent={() => getSortIcon("name")}
              >
                <Typography variant="subtitle2" fontWeight={600}>
                  Name
                </Typography>
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">
              <TableSortLabel
                active={sortField === "price"}
                direction={sortField === "price" ? sortDirection : "asc"}
                onClick={() => handleSort("price")}
                IconComponent={() => getSortIcon("price")}
              >
                <Typography variant="subtitle2" fontWeight={600}>
                  Price
                </Typography>
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">
              <TableSortLabel
                active={sortField === "stock"}
                direction={sortField === "stock" ? sortDirection : "asc"}
                onClick={() => handleSort("stock")}
                IconComponent={() => getSortIcon("stock")}
              >
                <Typography variant="subtitle2" fontWeight={600}>
                  Stock
                </Typography>
              </TableSortLabel>
            </TableCell>
            <TableCell align="center">
              <Typography variant="subtitle2" fontWeight={600}>
                Actions
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.map((product) => {
            const {
              _id,
              slug,
              name,
              price,
              images: rawImages,
              stock,
              pricing,
            } = product;

            // Debug logging to see what data we're getting
            // if (process.env.NODE_ENV === 'development') {
            //   console.log("Product data:", { 
            //     _id, 
            //     name, 
            //     stock, 
            //     stockType: typeof stock,
            //     stockValue: stock,
            //     allKeys: Object.keys(product)
            //   });
            // }

            const images = Array.isArray(rawImages) && rawImages.length > 0
              ? rawImages
              : [{ preview: "/assets/images/small-screen-logo.png" }];

            const productKey = slug || _id;
            const handleProductClick = () => {
              if (typeof window !== 'undefined' && window.NProgress) {
                window.NProgress.start();
              }
              const worker = getJsonWorker();
              if (worker) {
                worker.onmessage = (e) => {
                  try { sessionStorage.setItem(`product_${productKey}`, e.data); } catch {}
                };
                worker.postMessage(product);
              } else {
                try { sessionStorage.setItem(`product_${productKey}`, JSON.stringify(product)); } catch {}
              }
            };

            return (
              <TableRow
                key={_id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { backgroundColor: "#f9f9f9" },
                }}
              >
                <TableCell component="th" scope="row">
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      variant="rounded"
                      sx={{ width: 100, height: 100 }}
                      src={images[0]?.preview || "/assets/images/small-screen-logo.png"}
                      alt={name}
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Link 
                    href={`/products/${slug || _id}`} 
                    onClick={(e) => { handleProductClick(e); }}
                    onMouseEnter={() => { try { router.prefetch(`/products/${slug || _id}`); } catch (_) {} }}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        color: "text.primary",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      {name}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <ProductPrice 
                    price={price} 
                    discount={pricing} 
                    quantity={1} 
                    userLoggedIn={state?.user?.id ? true : false} 
                  />
                </TableCell>
                <TableCell align="center">
                  {stock !== undefined ? getStockStatus(stock) : <Chip label="N/A" color="default" size="small" />}
                </TableCell>
                <TableCell align="center">
                  <AddToCart 
                    product={product} 
                    buttonStack="row" 
                    quantity={1}
                    setQuantity={() => {}} 
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default ProductsTableView;
