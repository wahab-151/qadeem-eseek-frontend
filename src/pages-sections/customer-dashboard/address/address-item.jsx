"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

// MUI ICON COMPONENTS
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

import { useState } from "react";
import { useSnackbar } from "notistack";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

// STYLED COMPONENTS
const StyledCard = styled(Box)(({ theme }) => ({
  border: "1px solid #2B2118",
  padding: "1.5rem",
  borderRadius: "0px",
  position: "relative",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
  },
}));

import axiosInstance from "utils/axiosInstance";

export default function AddressListItem({ address }) {
  const { title, street, city, phone, id } = address;
  const { enqueueSnackbar } = useSnackbar();
  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // HANDLE ADDRESS DELETE
  const handleAddressDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await axiosInstance.delete(`/api/address/delete/${id}`);
      if (response.data?.success || response.status === 200) {
        enqueueSnackbar("Address deleted successfully", { variant: "success" });
        setOpenDelete(false);
        // Page refresh or state update would be needed here to reflect changes
        // Since it's server components for the page, a router.refresh() might be good
        window.location.reload();
      }
    } catch (error) {
      console.error("Delete Error:", error);
      enqueueSnackbar(
        error.response?.data?.message || "Failed to delete address",
        { variant: "error" },
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <StyledCard>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1.5}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: 700, color: "#2C2416" }}
          >
            {title} Address
          </Typography>

          <Box display="flex" alignItems="center" gap={1}>
            <IconButton
              size="small"
              component={Link}
              href={`/address/${id}`}
              sx={{
                color: "#2B2118",
                p: 0,
                "&:hover": { color: "primary.main" },
              }}
            >
              <Edit sx={{ fontSize: 18 }} />
            </IconButton>

            <IconButton
              size="small"
              onClick={(e) => {
                e.preventDefault();
                setOpenDelete(true);
              }}
              sx={{
                color: "error.main",
                p: 0,
                "&:hover": { color: "error.dark" },
              }}
            >
              <Delete sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        </Box>

        <Typography variant="body2" sx={{ color: "#2C2416", mb: 0.5 }}>
          {typeof address.user?.name === "object"
            ? `${address.user.name.firstName} ${address.user.name.lastName}`
            : address.user?.name || "User Name"}
        </Typography>

        <Typography variant="body2" sx={{ color: "#705D27", opacity: 0.8 }}>
          {phone}
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "#2C2416", mt: 0.5, lineHeight: 1.5 }}
        >
          {`${street}, ${city}`}
        </Typography>
      </StyledCard>

      {/* DELETE CONFIRMATION DIALOG */}
      <Dialog
        open={openDelete}
        onClose={() => !isDeleting && setOpenDelete(false)}
        PaperProps={{
          sx: {
            borderRadius: 0,
            p: 1,
            minWidth: { xs: 300, sm: 400 },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: "#2C2416" }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this address? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setOpenDelete(false)}
            disabled={isDeleting}
            sx={{
              color: "#2B2118",
              fontWeight: 600,
              borderRadius: 0,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddressDelete}
            loading={isDeleting} // MUI Lab button or fallback to disabled
            disabled={isDeleting}
            variant="contained"
            sx={{
              bgcolor: "error.main",
              color: "white",
              fontWeight: 600,
              borderRadius: 0,
              "&:hover": { bgcolor: "error.dark" },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
