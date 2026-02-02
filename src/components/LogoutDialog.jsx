"use client";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import QadeemButton from "components/QadeemButton";

/**
 * Reusable Logout Confirmation Dialog
 * @param {boolean} open - Whether the dialog is open
 * @param {function} handleClose - Function to call when the dialog should close (Cancel)
 * @param {function} confirmLogout - Function to call when logout is confirmed
 */
export default function LogoutDialog({ open, handleClose, confirmLogout }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 0,
          padding: 1,
          width: { xs: "90%", sm: "100%" },
          mx: "auto",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
          border: "1px solid #eee",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: "1.25rem",
          color: "#2C2416",
          fontFamily: "Inter, sans-serif",
          pb: 1,
        }}
      >
        Confirm Logout
      </DialogTitle>
      <DialogContent>
        <Typography
          sx={{ color: "text.secondary", fontFamily: "Inter, sans-serif" }}
        >
          Are you sure you want to log out of your account?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, pt: 1 }}>
        <QadeemButton
          variant="outlined"
          onClick={handleClose}
          sx={{
            px: 3,
            fontSize: "0.875rem",
            borderRadius: 0,
          }}
        >
          Cancel
        </QadeemButton>
        <QadeemButton
          onClick={confirmLogout}
          sx={{
            px: 3,
            fontSize: "0.875rem",
            borderRadius: 0,
            bgcolor: "error.main",
            "&:hover": { bgcolor: "error.dark" },
          }}
        >
          Logout
        </QadeemButton>
      </DialogActions>
    </Dialog>
  );
}
