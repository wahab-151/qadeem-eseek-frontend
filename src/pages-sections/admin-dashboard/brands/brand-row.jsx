
'use client'

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
// MUI ICON COMPONENTS
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";
// GLOBAL CUSTOM COMPONENT
import BazaarSwitch from "components/BazaarSwitch";
// STYLED COMPONENTS
import { StyledIconButton, StyledTableCell, StyledTableRow } from "../styles";
import { Edit } from "@mui/icons-material";
import BrandForm from "./brand-form";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useDeleteBrandMutation, useListAllCategoriesQuery } from "app/store/services";
import { useSnackbar } from "notistack";
// ========================================================================
// ========================================================================
export default function BrandRow({
  brand
}) {
  const {
    name,
    featured,
    logo,
    id,
    slug
  } = brand;
  // const [featuredCategory, setFeaturedCategory] = useState(featured);
  // const [editOpen, setEditOpen] = useState(false);
  // // const [deleteBrand, { isLoading, error }] = useDeleteBrandMutation();
  // // const [updateCategory, { isLoading, error }] = useUpdateCategoryMutation();
  // const { enqueueSnackbar } = useSnackbar();
  // const [confirmOpen, setConfirmOpen] = useState(false);
  // // const handleDelete = async () => {
  // //   try {
  // //     console.log("hit brand delte")
  // //     await deleteBrand({ id }).unwrap();;
  // //     enqueueSnackbar('Brand deleted successfully', { variant: 'success' });
  // //   } catch (error) {
  // //     enqueueSnackbar('Failed to delete Brand', { variant: 'error' });
  // //     console.error('Delete error:', error?.message || error);
  // //   }
  // // };
  const [featuredCategory, setFeaturedCategory] = useState(featured);

  const [editOpen, setEditOpen] = useState(false)
  const [mode, setMode] = useState("create")

  const [deleteBrand, { isLoading: deleting, error: deleteError }] = useDeleteBrandMutation();
  // const [updateCategory, { isLoading, error }] = useUpdateCategoryMutation();
  const { enqueueSnackbar } = useSnackbar();
  const [confirmOpen, setConfirmOpen] = useState(false);

  // console.log("brandddd", brand)



  // console.log("mode", mode)
  const handleDelete = async () => {
    try {
      // console.log("hit brand delte")
      await deleteBrand({ id }).unwrap();;
      enqueueSnackbar('Brand deleted successfully', { variant: 'success' });
    } catch (error) {
      const msg = error?.data?.message
      enqueueSnackbar(msg, { variant: 'error' });
      console.error('Delete error:', error?.message || error);
    }
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const brandAction = `${capitalize(mode)} Brand`;
  // console.log("mbrandAction==>", brandAction)

  return <StyledTableRow tabIndex={-1} role="checkbox">
    <StyledTableCell align="center">#{id}</StyledTableCell>
    <StyledTableCell align="center">{name}</StyledTableCell>
    <StyledTableCell align="center">
      <Box sx={{
        width: 55,
        height: 35,
        margin: "auto",
        position: "relative",
        img: {
          objectFit: "contain"
        }
      }}>
        <Image fill src={logo} alt={name} sizes="(100%, 100%)" />
      </Box>
    </StyledTableCell>
    <StyledTableCell align="center">
      <BazaarSwitch color="info" checked={featuredCategory} onChange={() => setFeaturedCategory(state => !state)} />
    </StyledTableCell>
    <StyledTableCell align="center">
      {/* <Link href={/admin/categories/${slug}}> */}
      <StyledIconButton onClick={() => {
        setEditOpen(true);
        // console.log("set as view");
        setMode("view")
      }}>
        <RemoveRedEye />
      </StyledIconButton>

      {/* view brand details Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle style={{ textAlign: "center", fontWeight: 600 }}>
          {brandAction}
        </DialogTitle>
        <DialogContent>

          <BrandForm
            initialValues={{
              id: brand.id,
              name: brand.name,
              title: brand.title,
              image: brand.logo,
              featured: brand.featured,
              slug: brand.slug,
              // categories: brand.categories
            }}
            onSuccess={() => setEditOpen(false)}
            mode={mode}
          />
        </DialogContent>
      </Dialog>


      <StyledIconButton onClick={() => {
        setEditOpen(true);
        // console.log("set as edit")
        setMode("edit")
      }}
      >
        <Edit />
      </StyledIconButton>
      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>

        <DialogTitle style={{ textAlign: "center", fontWeight: 600 }}>
          {brandAction}
        </DialogTitle>
        <DialogContent>
          <BrandForm
            initialValues={{
              id: brand.id,
              name: brand.name,
              title: brand.title,
              image: brand.logo,
              featured: brand.featured,
              slug: brand.slug,
              // categories: brand.categories
            }}
            onSuccess={() => setEditOpen(false)}
            mode={mode}
          />
        </DialogContent>
      </Dialog>





      <StyledIconButton
        onClick={() => setConfirmOpen(true)}
        disabled={deleting}
      >
        {deleting ? <CircularProgress size={24} /> : <Delete />}
      </StyledIconButton>
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the Brand &quot;{name}&quot;?
          </Typography>
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </StyledTableCell>
  </StyledTableRow>;
}