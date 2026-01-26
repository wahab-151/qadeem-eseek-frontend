"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
// MUI ICON COMPONENTS
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
import ContentCopy from "@mui/icons-material/ContentCopy";
// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";
import BazaarSwitch from "components/BazaarSwitch";
// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
// STYLED COMPONENTS
import {
  StyledTableRow,
  CategoryWrapper,
  StyledTableCell,
  StyledIconButton,
} from "../styles";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Box from "@mui/material/Box";
import {
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "app/store/services";
import { useSnackbar } from "notistack";
import ProductForm from "./product-form";
import { Wrapper } from "pages-sections/sessions/styles";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// ========================================================================
// ========================================================================
export default function ProductRow({ product, refetch }) {
  const {
    category,
    name,
    price,
    image,
    brand,
    id,
    published,
    mostPopular,
    mostSold,
    costPrice,
    models,
    stock,
    subcategory,
    displayOrder,
    createdAt,
    // slug
  } = product;
  // console.log("mode product==>", product);
  const [productPublish, setProductPublish] = useState(published);
  const [soldProduct, setSoldProduct] = useState(mostSold);
  const [popularProduct, setpopularProduct] = useState(mostPopular);
  const [featuredProduct, setFeaturedProduct] = useState(product.featured);
  // const [selectedProduct,setSelectedProduct]= useState()
  const [editOpen, setEditOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const { enqueueSnackbar } = useSnackbar();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [updateProduct, { isLoading: Updating, error: updateFailed }] =
    useUpdateProductMutation();
  const [deleteProduct, { isLoading, error }] = useDeleteProductMutation();
  
  // Track which field is currently being updated
  const [updatingField, setUpdatingField] = useState(null);

  // Only update state when the actual values change AND they differ from current state
  // This prevents overwriting optimistic updates
  useEffect(() => {
    if (product?.published !== undefined && product.published !== productPublish) {
      setProductPublish(product.published);
    }
  }, [product?.published]);

  useEffect(() => {
    if (product?.mostSold !== undefined && product.mostSold !== soldProduct) {
      setSoldProduct(product.mostSold);
    }
  }, [product?.mostSold]);

  useEffect(() => {
    if (product?.mostPopular !== undefined && product.mostPopular !== popularProduct) {
      setpopularProduct(product.mostPopular);
    }
  }, [product?.mostPopular]);

  useEffect(() => {
    if (product?.featured !== undefined && product.featured !== featuredProduct) {
      setFeaturedProduct(product.featured);
    }
  }, [product?.featured]);



  // Handle publish toggle update
  const handlePublishToggle = async (newValue) => {
    setUpdatingField('published');
    try {
      await updateProduct({
        id,
        published: newValue,
      }).unwrap();
      enqueueSnackbar("Product publish status updated successfully", { variant: "success" });
      // Refetch to get the updated data from the server
      if (refetch) refetch();
    } catch (error) {
      console.error("Publish update error:", error);
      enqueueSnackbar("Failed to update publish status", { variant: "error" });
      // Reset to original state on failure
      setProductPublish(published);
    } finally {
      setUpdatingField(null);
    }
  };

  // Handle most sold toggle update
  const handleMostSoldToggle = async (newValue) => {
    setUpdatingField('mostSold');
    try {
      await updateProduct({
        id,
        mostSold: newValue,
      }).unwrap();
      enqueueSnackbar("Product most sold status updated successfully", { variant: "success" });
      // Refetch to get the updated data from the server
      if (refetch) refetch();
    } catch (error) {
      console.error("Most sold update error:", error);
      enqueueSnackbar("Failed to update most sold status", { variant: "error" });
      // Reset to original state on failure
      setSoldProduct(mostSold);
    } finally {
      setUpdatingField(null);
    }
  };

  // Handle most popular toggle update
  const handleMostPopularToggle = async (newValue) => {
    setUpdatingField('mostPopular');
    try {
      await updateProduct({
        id,
        mostPopular: newValue,
      }).unwrap();
      enqueueSnackbar("Product most popular status updated successfully", { variant: "success" });
      // Refetch to get the updated data from the server
      if (refetch) refetch();
    } catch (error) {
      console.error("Most popular update error:", error);
      enqueueSnackbar("Failed to update most popular status", { variant: "error" });
      // Reset to original state on failure
      setpopularProduct(mostPopular);
    } finally {
      setUpdatingField(null);
    }
  };

  // Handle featured toggle update
  const handleFeaturedToggle = async (newValue) => {
    setUpdatingField('featured');
    try {
      await updateProduct({
        id,
        featured: newValue,
      }).unwrap();
      enqueueSnackbar("Product featured status updated successfully", { variant: "success" });
      // Refetch to get the updated data from the server
      if (refetch) refetch();
    } catch (error) {
      console.error("Featured update error:", error);
      enqueueSnackbar("Failed to update featured status", { variant: "error" });
      // Reset to original state on failure
      setFeaturedProduct(product?.featured);
    } finally {
      setUpdatingField(null);
    }
  };

  const handleDelete = async () => {
    try {
      // console.log("hit brand delte");
      // Send id in query use below code
      await deleteProduct(id).unwrap();
      // Send id in body use below code
      // await deleteProduct({ id }).unwrap();
      enqueueSnackbar("Product deleted successfully", { variant: "success" });
      setConfirmOpen(false);
      refetch();
    } catch (error) {
      enqueueSnackbar("Failed to delete Product", { variant: "error" });
      console.error("Delete error:", error?.message || error);
    }
  };
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const productAction = `${capitalize(mode)} Product`;
  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          <Avatar 
            variant="rounded" 
            sx={{ 
              width: 50, 
              height: 50,
              backgroundColor: '#EFE6D5' // Light heritage beige
            }}
          >
            {image ? (
              <Image 
                fill 
                src={image?.[0]?.preview || "/assets/images/small-screen-logo.png"} 
                alt={name} 
                sizes="(50px, 50px)"
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <Typography variant="caption" color="text.secondary">
                No Image
              </Typography>
            )}
          </Avatar>
        </FlexBox>
      </StyledTableCell>
      <StyledTableCell align="left">
        <Typography variant="h6">{name}</Typography>
      </StyledTableCell>
      <StyledTableCell align="left">
        <CategoryWrapper>{category?.name}</CategoryWrapper>
      </StyledTableCell>
      {/* <StyledTableCell align="left">
      <Box sx={{
        width: 55,
        height: 25,
        position: "relative",
        img: {
          objectFit: "contain"
        }
      }}>
        <CategoryWrapper>{brand?.name}</CategoryWrapper>
        <Image fill src={brand.name} alt={name} sizes="(55px, 25px)" />
      </Box>
    </StyledTableCell> */}
     <StyledTableCell align="left">
        <Box display="flex" alignItems="center" gap={1}>
          <Typography 
            variant="body2" 
            color={stock === 0 ? "error.main" : stock < 10 ? "warning.main" : "success.main"}
            fontWeight={500}
          >
            {stock !== undefined && stock !== null ? stock : "N/A"}
          </Typography>
          {/* {stock !== undefined && stock !== null && (
            <Typography variant="caption" color="text.secondary">
              {stock === 0 ? "Out of Stock" : stock < 10 ? "Low Stock" : "In Stock"}
            </Typography>
          )} */}
        </Box>
      </StyledTableCell>
      <StyledTableCell align="left">{currency(price)}</StyledTableCell>
     
      <StyledTableCell align="left">
        <Typography variant="body2">{displayOrder || '-'}</Typography>
      </StyledTableCell>
      <StyledTableCell align="left">
        <Typography variant="body2">
          {createdAt ? new Date(createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }) : '-'}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="left">
        <Box display="flex" alignItems="center" gap={1}>
          <BazaarSwitch
            color="info"
            checked={productPublish}
            disabled={updatingField === 'published'}
                      onChange={() => {
            if (updatingField === 'published') return; // Prevent multiple updates
            const newValue = !productPublish;
            setProductPublish(newValue);
            handlePublishToggle(newValue);
          }}
          />
          {updatingField === 'published' && (
            <CircularProgress size={16} />
          )}
        </Box>
      </StyledTableCell>

      <StyledTableCell align="left">
        <Box display="flex" alignItems="center" gap={1}>
          <BazaarSwitch
            color="info"
            checked={soldProduct}
            disabled={updatingField === 'mostSold'}
                      onChange={() => {
            if (updatingField === 'mostSold') return; // Prevent multiple updates
            const newValue = !soldProduct;
            setSoldProduct(newValue);
            handleMostSoldToggle(newValue);
          }}
          />
          {updatingField === 'mostSold' && (
            <CircularProgress size={16} />
          )}
        </Box>
      </StyledTableCell>
      <StyledTableCell align="left">
        <Box display="flex" alignItems="center" gap={1}>
          <BazaarSwitch
            color="info"
            checked={popularProduct}
            disabled={updatingField === 'mostPopular'}
                      onChange={() => {
            if (updatingField === 'mostPopular') return; // Prevent multiple updates
            const newValue = !popularProduct;
            setpopularProduct(newValue);
            handleMostPopularToggle(newValue);
          }}
          />
          {updatingField === 'mostPopular' && (
            <CircularProgress size={16} />
          )}
        </Box>
      </StyledTableCell>

      <StyledTableCell align="left">
        <Box display="flex" alignItems="center" gap={1}>
          <BazaarSwitch
            color="info"
            checked={featuredProduct}
            disabled={updatingField === 'featured'}
            onChange={() => {
              if (updatingField === 'featured') return; // Prevent multiple updates
              const newValue = !featuredProduct;
              setFeaturedProduct(newValue);
              handleFeaturedToggle(newValue);
            }}
          />
          {updatingField === 'featured' && (
            <CircularProgress size={16} />
          )}
        </Box>
      </StyledTableCell>
   
      {/* <StyledTableCell align="center">
        <StyledIconButton
          onClick={() => {
            setEditOpen(true);
            // console.log("set as edit");
            setMode("view");
            // setSelectedProduct()
          }}
        >
          <RemoveRedEye />
        </StyledIconButton>
          </StyledTableCell> */}
<StyledTableCell align="center">
  <Box sx={{ display: "flex", gap: "8px", justifyContent: "center" }}>
    {/* View Button */}
    <StyledIconButton
      onClick={() => {
        setEditOpen(true);
        setMode("view");
      }}
    >
      <RemoveRedEye />
    </StyledIconButton>

    {/* Duplicate Button */}
    <StyledIconButton
      onClick={() => {
        setEditOpen(true);
        setMode("duplicate");
      }}
    >
      <ContentCopy />
    </StyledIconButton>

    {/* Edit Button */}
    <StyledIconButton
      onClick={() => {
        setEditOpen(true);
        setMode("edit");
      }}
    >
      <Edit />
    </StyledIconButton>

    {/* Delete Button */}
    <StyledIconButton
      onClick={() => setConfirmOpen(true)}
      disabled={isLoading}
    >
      {isLoading ? <CircularProgress size={24} /> : <Delete />}
    </StyledIconButton>
  </Box>

  {/* Shared View/Edit Dialog */}
  <Dialog
    open={editOpen}
    onClose={() => setEditOpen(false)}
    maxWidth="sm"
    fullWidth
      PaperProps={{
    sx: {
      position: "relative", // this makes the absolute positioning work
    },
  }}
  >
    
              {/* Close Button */}
              <IconButton
                aria-label="close"
                onClick={() => setEditOpen(false)}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.primary[500],
                  zIndex: 1,
                }}
              >
                <CloseIcon />
              </IconButton>
    <DialogTitle sx={{ textAlign: "center", fontWeight: 600 }}>
      {mode === "view" ? "View Product" : mode === "edit" ? "Edit Product" : "Duplicate Product"}
    </DialogTitle>
    <DialogContent>
      <ProductForm
        onSuccess={() => {console.log("onSuccess called for close n refetch")
          setEditOpen(false)
          refetch()
        }}
        mode={mode}
        product={product}
        refetch={refetch}
      />
    </DialogContent>
  
  </Dialog>

  {/* Delete Confirmation Dialog */}
  <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
    <DialogTitle>Confirm Delete</DialogTitle>
    <DialogContent>
      <Typography>
        Are you sure you want to delete the product &quot;{name}&quot;?
      </Typography>
      <Typography variant="body2" color="error" sx={{ mt: 1 }}>
        This action cannot be undone.
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
      <Button
        onClick={handleDelete}
        color="error"
        variant="contained"
        disabled={isLoading}
      >
        {isLoading ? "Deleting..." : "Delete"}
      </Button>
    </DialogActions>
  </Dialog>
</StyledTableCell>

    </StyledTableRow>
  );
}
