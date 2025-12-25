
"use client";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { format } from "date-fns";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";
import { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "app/store/services";

export default function OrderActions({
  id,
  createdAt,
  status,
  productName,
  setStatus,
  setItems,
  items,
}) {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  // Debounce input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // RTK Query for products
  const {
    data: productsData,
    isLoading,
    error,
  } = useGetAllProductsQuery(
    { search: debouncedTerm },
    {
      skip: debouncedTerm.length <= 2,
    }
  );

  // Initialize with existing items
  useEffect(() => {
    if (items && items.length > 0) {
      setSelectedProducts(
        items?.map((item) => ({
          _id: item?.product?._id,
          name: item?.product?.name,
          pricing: item?.pricing,
          quantity: item?.quantity || 1,
          // Preserve other item data
          images: item?.product?.images || [],
          description: item?.product?.description || "",
        }))
      );
    } else if (productName) {
      setSelectedProducts([
        {
          _id: "initial",
          name: productName,
          price: 0,
          quantity: 1,
        },
      ]);
    }
  }, [items, productName]);

  const handleStatusChange = (id) => async (e) => {
    try {
      const newStatus = e.target.value;
      setStatus(newStatus);
    } catch (error) {
      console.log("Error on change status", error?.message);
    }
  };

  const handleProductSelection = (event, newValue) => {
    console.log("handleProductSelection called with:", newValue);
    console.log("Current items:", items);
    console.log("Current selectedProducts:", selectedProducts);
    
    if (!newValue || !newValue._id) {
      console.log("Invalid newValue:", newValue);
      return;
    }
    
    // Check if product already exists in order
    const existingItemIndex = items?.findIndex(item => 
      item?.product?._id === newValue._id || item?._id === newValue._id
    );
    console.log("Existing item index:", existingItemIndex);
    
    if (existingItemIndex !== -1) {
      // Product exists - increase quantity by 1
      const updatedItems = [...(items || [])];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex], // Preserve all existing data
        quantity: (updatedItems[existingItemIndex].quantity || 1) + 1
      };
      console.log("Updating existing item:", updatedItems[existingItemIndex]);
      setItems(updatedItems);
      
      // Update selected products state to reflect quantity change
      setSelectedProducts(prev => {
        const updated = [...prev];
        const existingProductIndex = updated.findIndex(p => p._id === newValue._id);
        if (existingProductIndex !== -1) {
          updated[existingProductIndex] = {
            ...updated[existingProductIndex],
            quantity: (updated[existingProductIndex].quantity || 1) + 1
          };
        }
        return updated;
      });
    } else {
      // New product - add to order
      // Get price: use pricing if it's a number, otherwise fall back to price field
      const productPrice = (typeof newValue?.pricing === 'number' && newValue.pricing > 0) 
        ? newValue.pricing 
        : (typeof newValue?.price === 'number' && newValue.price > 0)
        ? newValue.price
        : 0;
      
      console.log("Product price calculation:", {
        pricing: newValue?.pricing,
        price: newValue?.price,
        finalPrice: productPrice,
        productName: newValue?.name
      });
      
      const newOrderItem = {
        price: productPrice,
        product: {
          _id: newValue?._id,
          name: newValue?.name,
          images: newValue?.images || [],
        },
        quantity: 1,
        refunded: false,
        replaced: false,
        _id: newValue?._id,
      };
      
      console.log("Adding new item:", newOrderItem);
      
      // Add to existing items
      const updatedItems = [...(items || []), newOrderItem];
      console.log("Updated items array:", updatedItems);
      setItems(updatedItems);
      
      // Update selected products state
      setSelectedProducts(prev => [...prev, {
        _id: newValue?._id,
        name: newValue?.name,
        pricing: newValue?.pricing,
        quantity: 1
      }]);
    }

    // Clear search term
    setSearchTerm("");
  };
  return (
    <div>
      <FlexBox flexWrap="wrap" alignItems="center" columnGap={4} rowGap={1}>
        <Typography variant="body1" sx={{ span: { color: "grey.600" } }}>
          <span>Order ID:</span> {id}
        </Typography>

        <Typography variant="body1" sx={{ span: { color: "grey.600" } }}>
          {createdAt && !isNaN(new Date(createdAt)) ? (
            <span>
              Placed on: {format(new Date(createdAt), "dd MMM, yyyy")}
            </span>
          ) : (
            <span>Placed on: Unknown</span>
          )}
        </Typography>
      </FlexBox>

      <FlexBox gap={3} my={3} flexDirection={{ sm: "row", xs: "column" }}>
        <Autocomplete
          fullWidth
          options={productsData?.data?.products || []}
          value={null}
          onChange={handleProductSelection}
          onInputChange={(event, newInputValue) => {
            setSearchTerm(newInputValue);
          }}
          disabled={status !== "Pending"}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option._id === value?._id}
          loading={isLoading}
          renderOption={(props, option) => {
            // Display price: use pricing if it's a number, otherwise fall back to price field
            const displayPrice = (typeof option?.pricing === 'number' && option.pricing > 0)
              ? option.pricing
              : (typeof option?.price === 'number' && option.price > 0)
              ? option.price
              : 0;
            return (
              <li {...props}>
                {option.name} (${displayPrice})
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search products to add to order"
              placeholder="Type to search products"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />

     
      

        <TextField
          select
          fullWidth
          color="info"
          size="medium"
          label="Order Status"
          value={status}
          onChange={handleStatusChange(id)}
          slotProps={{
            select: {
              IconComponent: () => (
                <KeyboardArrowDown sx={{ color: "grey.600", mr: 1 }} />
              ),
            },
          }}
        >
          {status === "Pending" && <MenuItem value="Pending">Pending</MenuItem>}
          <MenuItem value="Processing">Processing</MenuItem>
          <MenuItem value="Delivered">Delivered</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
        </TextField>
      </FlexBox>
    </div>
  );
}
