"use client";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
  Divider,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Remove as RemoveIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";

const ImageDeleteDialog = ({
  open,
  onClose,
  onConfirm,
  imageName,
  isProcessing = false,
}) => {
  const handleRemoveFromProduct = () => {
    onConfirm("product");
  };

  const handleDeleteFromS3 = () => {
    onConfirm("s3");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <WarningIcon color="warning" />
          <Typography variant="h6">Delete Image</Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1" gutterBottom>
          What would you like to do with the image <strong>&quot;{imageName}&quot;</strong>?
        </Typography>

        <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
          <Typography variant="body2">
            <strong>Note:</strong> This image might be used in other products or categories. 
            Choose carefully based on your needs.
          </Typography>
        </Alert>

        <Box mt={3}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            startIcon={<RemoveIcon />}
            onClick={handleRemoveFromProduct}
            disabled={isProcessing}
            sx={{ 
              mb: 2, 
              p: 2,
              justifyContent: 'flex-start',
              textAlign: 'left'
            }}
          >
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                Remove from this product only
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Remove the image from this product but keep it in the S3 bucket. 
                The image will remain available for other products.
              </Typography>
            </Box>
          </Button>

          <Divider sx={{ my: 2 }} />

          <Button
            variant="outlined"
            color="error"
            fullWidth
            startIcon={<DeleteIcon />}
            onClick={handleDeleteFromS3}
            disabled={isProcessing}
            sx={{ 
              p: 2,
              justifyContent: 'flex-start',
              textAlign: 'left'
            }}
          >
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                Delete from S3 bucket completely
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Permanently delete the image from the S3 bucket. This action cannot be undone 
                and will affect all products using this image.
              </Typography>
            </Box>
          </Button>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button 
          onClick={onClose} 
          disabled={isProcessing}
          color="inherit"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageDeleteDialog;
