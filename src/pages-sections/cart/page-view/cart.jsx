"use client";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Linke from "next/link";


// GLOBAL CUSTOM HOOK
import useCart from "hooks/useCart";

// LOCAL CUSTOM COMPONENTS
import CartItem from "../cart-item";
import CheckoutForm from "../checkout-form";
import { Card, CircularProgress, InputAdornment, Link } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";

// MUI Icons
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import Close from "@mui/icons-material/Close";
import { FlexBox } from "components/flex-box";
import OrderQuantity from "pages-sections/mini-cart/components/productQuantity";
import { Delete } from "@mui/icons-material";
import { StyledIconButton } from "components/footer/styles";

import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SearchArea from "pages-sections/admin-dashboard/search-box";
import { useEffect, useState, useRef, useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { usePathname, useRouter } from "next/navigation";
import debounce from "lodash/debounce";
import { useGetUserCartQuery, useUpdateCartMutation } from "app/store/services";
import { useSnackbar } from "notistack";
import useUser from "hooks/useUser";


// export default function CartPageView() {
//   const router = useRouter();
//   const { enqueueSnackbar } = useSnackbar();
//   const { state, dispatch } = useCart();
//   const { state:userState, dispatch:userDispatch}=useUser();
//   const { id, title, price, thumbnail, slug, qty } = state?.cart || [];
//   const [query, setQuery] = useState("");
//   const [filteredCart, setFilteredCart] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);


//   const [loading, setLoading] = useState(false);
//   const lastCartIds = useRef('');

//   // Define onToggleSelectAll early using useCallback so it's available in useEffect
//   const onToggleSelectAll = useCallback((checked) => {
//     setSelectedItems(checked ? filteredCart.map((item) => item.id).filter(Boolean) : []);
//   }, [filteredCart]);

// console.log("user", userState)
//   // useEffect(() => {
//   //   setFilteredCart(state.cart);
//   // }, [state.cart]);
//   useEffect(() => {
//     setFilteredCart(state.cart);
  
//     // Automatically select all items when cart loads or changes
//     if (state.cart?.length > 0) {
//       setSelectedItems(state.cart.map(item => item.id).filter(Boolean));
//     } else {
//       setSelectedItems([]);
//     }
//   }, [state.cart]);
  

//   // Select all items by default when filteredCart is set (on cart load)
//   // useEffect(() => {
//   //   // Create a string representation of cart IDs to detect changes
//   //   const currentCartIds = state.cart.map(item => item.id).sort().join(',');
//   //   const cartChanged = currentCartIds !== lastCartIds.current;
    
//   //   // Check if no search is active (query is empty and filteredCart matches state.cart)
//   //   const isNoSearchActive = query.length === 0 && 
//   //     filteredCart.length === state.cart.length && 
//   //     filteredCart.length > 0 &&
//   //     filteredCart.every((item, index) => item.id === state.cart[index]?.id);
    
//   //   // Auto-select when cart loads/changes (no search active)
//   //   if (isNoSearchActive && cartChanged) {
//   //     // Call onToggleSelectAll to select all items on cart load
//   //     onToggleSelectAll(true);
//   //     lastCartIds.current = currentCartIds;
//   //   } else if (filteredCart.length === 0 && state.cart.length === 0) {
//   //     setSelectedItems([]);
//   //     lastCartIds.current = '';
//   //   }
//   // }, [filteredCart, state.cart, query, onToggleSelectAll]);

//  //for updating cart
//   const [updateCart, { isLoading: updateCartLoading, error: updateCartError }] =
//     useUpdateCartMutation(userState?.user?.id, {
//       skip: !userState?.user?.id,
//     });

//   // search cart items based on query
//   // Debounced search cart items based on query
//   const handleSearch = debounce((value) => {
//     setLoading(true);
//     setQuery(value);

//     if (value.length >= 3) {
//       const results = state.cart.filter((item) =>
//         item.title?.toLowerCase().includes(value.toLowerCase())
//       );
//       setFilteredCart(results);
//       // Update selectedItems to only include items that are in the filtered results
//       setSelectedItems((prev) => prev.filter((id) => 
//         results.some((item) => item.id === id)
//       ));
//     } else {
//       // Reset to full cart if under 3 characters and reselect all items
//       setFilteredCart(state.cart);
//       // Reset cart tracking so auto-selection can work again
//       lastCartIds.current = '';
//       setSelectedItems(state.cart.map((item) => item.id).filter(Boolean));
//     }

//     setLoading(false);
//   }, 300);
// // console.log("filteredddddd", filteredCart)

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setQuery(value); // Update field immediately
//     if (value.length >= 3 || value.length === 0) {
//       handleSearch(value); // Debounced search call
//     }
//   };


//   //for checkboxes 
//   const onToggleSelect = (id, checked) => {
//     setSelectedItems((prev) =>
//       checked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
//     );
//   };
//   // console.log("Cart selected:", selectedItems);


//   // export data to csv file
//   const exportToCSV = () => {
//     try {
//       const selectedData = state.cart.filter(item => selectedItems.includes(item.id));

//       if (selectedData.length === 0) {
//         enqueueSnackbar("Please select at least one product to export.", { variant: "error" });

//         // alert("Please select at least one product to export.");
//         return;
//       }

//       // Debug: Log cart items to check SKU
//       console.log("Cart items for CSV export:", selectedData);

//       const csvHeaders = ["ID", "Title", "SKU", "Price", "Quantity", "Subtotal", "Image URL"];

//       const csvRows = selectedData.map(item => [
//         item.id,
//         `"${item.title}"`, // Quote in case of commas
//         `"${item.sku || ''}"`, // Quote SKU in case of commas or special characters
//         item.price,
//         item.qty,
//         (item.price * item.qty).toFixed(2),
//         item.thumbnail || ''
//       ]);

//       const csvContent = '\uFEFF' + [csvHeaders, ...csvRows]
//         .map(e => e.join(","))
//         .join("\n");


//       const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//       const url = URL.createObjectURL(blob);

//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "selected-products.csv");
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (error) {
//       enqueueSnackbar("Error exporting to CSV", { variant: "error" });
//       console.error("Error exporting to CSV:", error);
//     }
//   };



//   // for save cart
//   const saveCart = () => {

//     try {

//       if (state.cart.length === 0) {

//         enqueueSnackbar("Cart is empty, nothing to save.", { variant: "error" });

//         return;
//       }

//       localStorage.setItem("savedCart", JSON.stringify(state.cart));

//       enqueueSnackbar("Cart saved successfully!", { variant: "success" });
//     } catch (error) {
//       enqueueSnackbar("Error saving cart", { variant: "error" });
//       console.error("Error saving cart:", error);
//     }
//   };

//   // for clear cart
//   const clearCart = () => {
//     try {
//       if (state.cart.length === 0) {

//         enqueueSnackbar("Cart is already empty.", { variant: "error" });

//         return;
//       }

//       dispatch({ type: "CLEAR_CART" });
//       localStorage.removeItem("savedCart");
//       setSelectedItems([]);

//       enqueueSnackbar("Cart cleared successfully", { variant: "success" });
//     } catch (error) {
//       enqueueSnackbar("Error clearing cart", { variant: "error" });
//       console.error("Error clearing cart:", error);
//     }
//   };


//   // const handleUpdateCart =(quntity, product)=>{
//   //     //for updating cart
      
//   //       console.log("handleCartAmountChange");
//   //       //for updating cart
//   //       dispatch({
//   //         type: "CHANGE_CART_AMOUNT",
//   //         payload: {
//   //           ...product,
//   //           qty: quntity,
//   //         },
//   //       });
//   //     };
//       //  console.log("state in mini before", state)
//       useEffect(() => {
//         // Sanitize cart before sending to API
//         const updatedCart = Array.isArray(state?.cart) ? state.cart : [];
//         const sanitized = updatedCart
//           .filter((item) => item && item.id && Number.isFinite(Number(item.qty)))
//           .map((item) => ({
//             ...item,
//             qty: Number(item.qty),
//             price: Number(item.price || 0),
//           }));
//         if (sanitized.length !== updatedCart.length) {
//           dispatch({ type: "SET_CART", payload: sanitized });
//         }
//     console.log("[CartPage] updateCart", {
//       prevCount: updatedCart.length,
//       sanitizedCount: sanitized.length,
//       userId: userState?.user?.id,
//     });
//     updateCart(sanitized).unwrap().catch((e) => {
//       console.warn("[CartPage] updateCart failed", e);
//     });
//       }, [state]);
  

export default function CartPageView() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = useCart();
  const { state: userState } = useUser();

  const [query, setQuery] = useState("");
  const [filteredCart, setFilteredCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const lastCartIds = useRef('');

  // Track cart loading state from API
  const {
    isLoading: cartLoading,
  } = useGetUserCartQuery(userState?.user?.id, {
    skip: !userState?.user?.id,
  });

  const [updateCart] = useUpdateCartMutation(userState?.user?.id, {
    skip: !userState?.user?.id,
  });

  // ----------------- SELECT ALL LOGIC -----------------
  const onToggleSelectAll = useCallback((checked) => {
    setSelectedItems(checked ? filteredCart.map((item) => item.id).filter(Boolean) : []);
  }, [filteredCart]);

  const onToggleSelect = (id, checked) => {
    setSelectedItems(prev =>
      checked ? [...prev, id] : prev.filter(itemId => itemId !== id)
    );
  };

  // ----------------- LOAD CART -----------------
  useEffect(() => {
    setFilteredCart(state.cart || []);
    if (state.cart?.length > 0) {
      setSelectedItems(state.cart.map(item => item.id).filter(Boolean));
    } else {
      setSelectedItems([]);
    }
  }, [state.cart]);

  // ----------------- SEARCH -----------------
  const handleSearch = debounce((value) => {
    setQuery(value);
    setLoading(true);

    if (value.length >= 3) {
      const searchWords = value.toLowerCase().split(" ").filter(Boolean);

      const results = state.cart.filter(item => {
        const title = item.title?.toLowerCase() || "";
        const sku = item.sku?.toLowerCase() || "";
        return searchWords.every(word => title.includes(word) || sku.includes(word));
      });

      setFilteredCart(results);
      setSelectedItems(prev => prev.filter(id => results.some(item => item.id === id)));
    } else {
      setFilteredCart(state.cart || []);
      setSelectedItems(state.cart.map(item => item.id).filter(Boolean));
    }

    setLoading(false);
  }, 300);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length >= 3 || value.length === 0) handleSearch(value);
  };

  // ----------------- SAVE CART -----------------
  const saveCart = () => {
    try {
      if (!state.cart.length) {
        enqueueSnackbar("Cart is empty, nothing to save.", { variant: "error" });
        return;
      }
      localStorage.setItem("savedCart", JSON.stringify(state.cart));
      enqueueSnackbar("Cart saved successfully!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Error saving cart", { variant: "error" });
      console.error(error);
    }
  };

  // ----------------- CLEAR CART -----------------
  const clearCart = () => {
    try {
      if (!state.cart.length) {
        enqueueSnackbar("Cart is already empty.", { variant: "error" });
        return;
      }
      dispatch({ type: "CLEAR_CART" });
      localStorage.removeItem("savedCart");
      setSelectedItems([]);
      enqueueSnackbar("Cart cleared successfully", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Error clearing cart", { variant: "error" });
      console.error(error);
    }
  };

  // ----------------- EXPORT CSV -----------------
  const exportToCSV = () => {
    try {
      const selectedData = state.cart.filter(item => selectedItems.includes(item.id));
      if (!selectedData.length) {
        enqueueSnackbar("Please select at least one product to export.", { variant: "error" });
        return;
      }

      const csvHeaders = ["ID", "Title", "SKU", "Price", "Quantity", "Subtotal", "Image URL"];
      const csvRows = selectedData.map(item => [
        item.id,
        `"${item.title}"`,
        `"${item.sku || ''}"`,
        item.price,
        item.qty,
        (item.price * item.qty).toFixed(2),
        item.thumbnail || ''
      ]);

      const csvContent = '\uFEFF' + [csvHeaders, ...csvRows].map(e => e.join(",")).join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "selected-products.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      enqueueSnackbar("Error exporting to CSV", { variant: "error" });
      console.error(error);
    }
  };

  // ----------------- SYNC CART WITH API -----------------
  useEffect(() => {
    const updatedCart = Array.isArray(state?.cart) ? state.cart : [];
    const sanitized = updatedCart
      .filter(item => item && item.id && Number.isFinite(Number(item.qty)))
      .map(item => ({
        ...item,
        qty: Number(item.qty),
        price: Number(item.price || 0),
      }));

    if (sanitized.length !== updatedCart.length) {
      dispatch({ type: "SET_CART", payload: sanitized });
    }

    updateCart(sanitized).unwrap().catch(console.warn);
  }, [state.cart]);

  // console.log("state", state);

  return (
    <Grid container spacing={3}>
      {/* CART PRODUCT LIST */}
      <Grid size={{ md: 8, xs: 12 }} backgroundColor="#F3F5F9" borderRadius={5}>
        {/* Search Box */}
        <Box mb={3} px={{ xs: 1, md: 2 }} py={1} mt={2} width="100%" >

          <TextField
            fullWidth
            value={query}
            onChange={handleInputChange}
            placeholder="Search cart items..."
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 30,
                backgroundColor: 'white',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ccc',
                },
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent',
              },
            }}
          />


        </Box>

        {/* Cart Items Header */}
        <Box 
          display="flex" 
          py={2} 
          borderBottom={1} 
          borderColor="divider"
          sx={{
            display: { xs: 'none', md: 'flex' } // Hide on mobile
          }}
        >
          {/* Selection Checkbox */}
          {/* Selection Checkbox */}

          <Checkbox
            sx={{ marginLeft: 2 }}
            checked={selectedItems.length === filteredCart.length && filteredCart.length > 0}
            indeterminate={selectedItems.length > 0 && selectedItems.length < filteredCart.length}
            onChange={(e) => onToggleSelectAll(e.target.checked)}
          />

          <Typography flex={3} fontWeight={900} fontSize="1rem" textAlign="center" >Item</Typography>
          <Typography flex={1} fontWeight={900} fontSize="1rem" textAlign="center">Price</Typography>
          <Typography flex={1} fontWeight={900} fontSize="1rem" textAlign="center">Qty</Typography>
          <Typography flex={1} fontWeight={900} fontSize="1rem" textAlign="right" marginRight={10}>Subtotal</Typography>
        </Box>
        
        {/* Mobile Header */}
        <Box 
          display="flex" 
          py={2} 
          px={2}
          borderBottom={1} 
          borderColor="divider"
          sx={{
            display: { xs: 'flex', md: 'none' } // Show only on mobile
          }}
        >
          <Checkbox
            sx={{ marginRight: 1 }}
            checked={selectedItems.length === filteredCart.length && filteredCart.length > 0}
            indeterminate={selectedItems.length > 0 && selectedItems.length < filteredCart.length}
            onChange={(e) => onToggleSelectAll(e.target.checked)}
          />
          <Typography fontWeight={900} fontSize="1rem">Select All</Typography>
        </Box>

        {/* Cart Items */}
        <Box sx={{
          // maxHeight: "60%",
          overflowY: "auto",
          overflowX: "hidden",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",

        }}>
          {cartLoading || loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" p={3}>
              <CircularProgress />
            </Box>
          ) : filteredCart.length > 0 ? (
            filteredCart.map((item) => (
              <Box key={item?.id} sx={{ px: { xs: 1, md: 2 }, py: 1 }}>
                {/* Desktop Layout */}
                <FlexBox
                  alignItems="center"
                  gap={2}
                  px={2}
                  sx={{
                    display: { xs: 'none', md: 'flex' }, // Hide on mobile
                    px: 0,
                    py: 3,
                    bgcolor: "#FFFFFF",
                    color: "text.primary",
                    borderRadius: 5,
                  }}
                >
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onChange={(e) => onToggleSelect(item.id, e.target.checked)}
                  />

                  {/* ITEM IMAGE + TEXT */}
                  <Box flex={4} display="flex" alignItems="center" gap={2} sx={{ minWidth: 0, flexShrink: 1 }}>
                    <Box
                      component="img"
                      src={item?.thumbnail || "/no-image.jpg"}
                      alt={item?.title}
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: 2,
                        objectFit: "cover",
                        flexShrink: 0,
                      }}
                    />
                    <Box sx={{ minWidth: 0, overflow: 'hidden' }}>
                      <Typography fontWeight={600} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item?.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item?.id}
                      </Typography>
                    </Box>
                  </Box>

                  {/* PRICE */}
                  <Typography
                    flex={1}
                    textAlign="center"
                    sx={{ 
                      fontSize: "1rem", 
                      fontWeight: "bold",
                      minWidth: '60px',
                      flexShrink: 0
                    }}
                  >
                    {(Number(item?.price || 0)).toFixed(2)}
                  </Typography>

                  {/* QUANTITY */}
                  <FlexBox 
                    flex="0 0 auto"
                    justifyContent="center" 
                    alignItems="center" 
                    sx={{
                      minWidth: { xs: 'auto', md: '120px' },
                      maxWidth: { xs: '100%', md: '140px' },
                      flexShrink: 0
                    }}
                  >
                    <OrderQuantity
                      quantity={item.qty}
                      onChange={(newQty) =>
                        dispatch({
                          type: "CHANGE_CART_AMOUNT",
                          payload: { ...item, qty: newQty, stock: item?.stock },
                        })
                      }
                      max={item?.stock ?? 999}
                    />
                  </FlexBox>

                  {/* SUBTOTAL */}
                  <Typography
                    flex={1}
                    textAlign="right"
                    sx={{ 
                      fontSize: "1rem", 
                      fontWeight: "bold",
                      minWidth: '70px',
                      flexShrink: 0,
                      pr: 1
                    }}
                  >
                    ${(Number(item?.price || 0) * Number(item?.qty || 0)).toFixed(2)}
                  </Typography>

                  {/* DELETE BUTTON */}
                  <Box sx={{ flexShrink: 0, width: 'auto' }}>
                    <StyledIconButton onClick={() => {
                      dispatch({ type: "REMOVE_FROM_CART", payload: item.id });
                      enqueueSnackbar("Item removed from cart", { variant: "info" });
                    }}>
                      <Delete
                        sx={{
                          color: "red",
                          fontSize: "1.8rem",
                          fontWeight: "bold",
                          cursor: "pointer",
                          "&:hover": { color: "darkred" },
                        }}
                      />
                    </StyledIconButton>
                  </Box>
                </FlexBox>

                {/* Mobile Layout */}
                <Box
                  sx={{
                    display: { xs: 'block', md: 'none' }, // Show only on mobile
                    bgcolor: "#FFFFFF",
                    borderRadius: 5,
                    p: 2,
                  }}
                >
                  <FlexBox alignItems="flex-start" gap={2} mb={2}>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onChange={(e) => onToggleSelect(item.id, e.target.checked)}
                    />
                    <Box
                      component="img"
                      src={item?.thumbnail || "/no-image.jpg"}
                      alt={item?.title}
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 2,
                        objectFit: "cover",
                        flexShrink: 0,
                      }}
                    />
                    <Box flex={1}>
                      <Typography fontWeight={600} fontSize="0.95rem">
                        {item?.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" fontSize="0.85rem">
                        ID: {item?.id}
                      </Typography>
                    </Box>
                    <StyledIconButton onClick={() => {
                      dispatch({ type: "REMOVE_FROM_CART", payload: item.id });
                      enqueueSnackbar("Item removed from cart", { variant: "info" });
                    }}>
                      <Delete
                        sx={{
                          color: "red",
                          fontSize: "1.5rem",
                          "&:hover": { color: "darkred" },
                        }}
                      />
                    </StyledIconButton>
                  </FlexBox>

                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography fontSize="0.9rem" color="text.secondary">
                      Price:
                    </Typography>
                    <Typography fontSize="1rem" fontWeight="bold">
                      ${(Number(item?.price || 0)).toFixed(2)}
                    </Typography>
                  </Box>

                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography fontSize="0.9rem" color="text.secondary">
                      Quantity:
                    </Typography>
                    <OrderQuantity
                      quantity={item.qty}
                      onChange={(newQty) =>
                        dispatch({
                          type: "CHANGE_CART_AMOUNT",
                          payload: { ...item, qty: newQty, stock: item?.stock },
                        })
                      }
                      max={item?.stock ?? 999}
                    />
                  </Box>

                  <Box display="flex" justifyContent="space-between" alignItems="center" pt={1} borderTop={1} borderColor="divider">
                    <Typography fontSize="1rem" fontWeight="bold" color="text.primary">
                      Subtotal:
                    </Typography>
                    <Typography fontSize="1.1rem" fontWeight="bold" color="primary">
                      ${(Number(item?.price || 0) * Number(item?.qty || 0)).toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <Typography textAlign="center" mt={2} p={3}>
              {cartLoading ? "" : "No items found"}
            </Typography>
          )}


        </Box>

        {/* Action Buttons */}
        <Box
          display="flex"
          justifyContent="flex-end"
          mt={{ xs: 2, }}
          gap={2}
          px={{ xs: 2, md: 4 }}
          sx={{ 
            marginBottom: "10px",
            flexWrap: { xs: 'wrap', md: 'nowrap' },
            flexDirection: { xs: 'column', md: 'row' }
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={saveCart}
            fullWidth={{ xs: true, md: false }}
            sx={{
              px: { xs: 2, md: 3 },
              py: { xs: 1.5, md: 2 },
              fontSize: { xs: "0.875rem", md: "1rem" },
              borderRadius: 10,
              color: 'white',
              fontWeight: 'bold',
              bgcolor: '#5576fa',
              '&:hover': { bgcolor: '#405edb' },
            }}
          >
            Save Cart
          </Button>

          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={clearCart}
            fullWidth={{ xs: true, md: false }}
            sx={{
              px: { xs: 2, md: 3 },
              py: { xs: 1.5, md: 2 },
              fontSize: { xs: "0.875rem", md: "1rem" },
              borderRadius: 10,
              color: 'white',
              fontWeight: 'bold',
              bgcolor: '#5576fa',
              '&:hover': { bgcolor: '#405edb' },
            }}
          >
            Clear Cart
          </Button>

          <Button
            variant="contained"
            startIcon={<FileDownloadIcon />}
            onClick={exportToCSV}
            fullWidth={{ xs: true, md: false }}
            sx={{
              px: { xs: 2, md: 3 },
              py: { xs: 1.5, md: 2 },
              fontSize: { xs: "0.875rem", md: "1rem" },
              borderRadius: 10,
              color: 'white',
              fontWeight: 'bold',
              bgcolor: '#5576fa',
              '&:hover': { bgcolor: '#405edb' },
            }}
          >
            Export CSV File
          </Button>
        </Box>
      </Grid>

      {/* CHECKOUT SUMMARY */}
      <Grid size={{ md: 4, xs: 12 }} >
        <Typography
          variant="h6"
          mb={2}
          sx={{
            px: 2,
            py: 1,
            bgcolor: "#F3F5F9",
            color: "text.primary",
            borderRadius: 8,
            fontSize: { xs: "1rem", md: "1.20rem" },
            fontWeight: "bold"
          }}
        >Shipping Details:</Typography>
        <Box sx={{ boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)" }} p={{ xs: 2, md: 3 }} borderRadius={3} mb={3}>
          <Typography variant="body2" sx={{ fontSize: { xs: "0.875rem", md: "0.875rem" } }}>
            `{userState?.user?.firstName}  {userState?.user?.lastName}`<br />
             {userState?.user?.companyName} <br />
             {userState?.user?.addressLine1}<br />
                 {userState?.user?.addressLine2},      {userState?.user?.city},      {userState?.user?.postalCode} <br />
            United States<br />
                 {userState?.user?.phone}
          </Typography>
        </Box>

        <Typography
          variant="h6"
          mb={2}
          sx={{
            px: 2,
            py: 1,
            bgcolor: "#F3F5F9",
            color: "text.primary",
            borderRadius: 8,
            fontSize: { xs: "1rem", md: "1.20rem" },
            fontWeight: "bold"
          }}
        >Order Summary:</Typography>

        <Card sx={{ p: { xs: 2, md: 3 }, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)" }} >
          <Box display="flex" justifyContent="space-between" mb={2} >
            <Typography sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}>Estimated total:</Typography>
            <Typography 
              variant="h6" 
              fontWeight={600}
              sx={{ fontSize: { xs: "1.1rem", md: "1.25rem" } }}
            >
              ${state.cart.reduce(
                (acc, item) => acc + (Number(item?.price || 0) * Number(item?.qty || 0)),
                0
              ).toFixed(2)}
            </Typography>
          </Box>

          {state.cart.length === 0 || state.cart.reduce(
            (acc, item) => acc + (Number(item?.price || 0) * Number(item?.qty || 0)),
            0
          ) === 0 ? (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              href="/home"
              LinkComponent={Linke}
              sx={{
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: "0.875rem", md: "1rem" },
                borderRadius: 10,
                color: 'white',
                fontWeight: 'bold',
                bgcolor: '#5576fa',
                '&:hover': { bgcolor: '#405edb' },
              }}
            >
              Continue Shopping
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              href="/checkout"
              LinkComponent={Linke}
              sx={{
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: "0.875rem", md: "1rem" },
                borderRadius: 10,
                color: 'white',
                fontWeight: 'bold',
                bgcolor: '#5576fa',
                '&:hover': { bgcolor: '#405edb' },
              }}
            >
              Proceed to Checkout
            </Button>
          )}
        </Card>
      </Grid>
    </Grid >
  );
}