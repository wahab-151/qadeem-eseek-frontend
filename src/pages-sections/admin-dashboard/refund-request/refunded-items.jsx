import Image from "next/image";

// MUI
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

// MUI ICON COMPONENT
import Delete from "@mui/icons-material/Delete";

// GLOBAL CUSTOM COMPONENTS
import { FlexBetween, FlexBox } from "components/flex-box";

// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
import { useSnackbar } from "notistack";
import { Button, Chip } from "@mui/material";
import { formatTime } from "utils/helpers";
import { useAcceptRequestMutation, useRejectRequestMutation } from "app/store/services";
import { useState } from "react";
import { useRouter } from "next/navigation";

// CUSTOM DATA MODEL


// ==============================================================


// ==============================================================

export default function RefundedItems({
  product,
  index,
  onQuantityChange,
  requestId,
  requestedDate,
  requestType,
  orderId,
  reason: initialReason,

}) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [reason, setReason] = useState(initialReason || "");
  const {
    product_id,
    product_img,
    product_name,
    product_price,
    product_quantity,
    product_status
  } = product || {};


  const [acceptRequest, { isLoading: isAcceptLoading }] = useAcceptRequestMutation();

  const [rejectRequest, { isLoading: isRejectLoading }] = useRejectRequestMutation();

  // // Accept equest
  const handleAcceptRequest = async () => {



    // Try to get product ID from different possible locations
    const finalProductId = product_id || orderId || "unknown";

    try {
      const payload = {
        requestId,
        productId: finalProductId,
        reason: reason.trim() || "No reason provided"
      };

      const res = await acceptRequest(payload).unwrap();
      enqueueSnackbar(res?.message || "Request accepted successfully.", { variant: "success" });
      setReason(""); // Clear reason after successful action
      router.push('/admin/refund-request')
    } catch (error) {
      console.error("Error accepting request:", error);
      enqueueSnackbar(error?.data?.message || "Failed to accept request.", { variant: "error" });
    }
  };

  // // Reject Refund
  const handleRejectRequest = async () => {


    // Try to get product ID from different possible locations
    const finalProductId = product_id || orderId || "unknown";

    try {
      const payload = {
        requestId,
        productId: finalProductId,
        reason: reason.trim() || "No reason provided"
      };

      const res = await rejectRequest(payload).unwrap();
      enqueueSnackbar(res?.message || "Request rejected successfully.", { variant: "success" });
      setReason(""); // Clear reason after successful action
      router.push('/admin/refund-request')
    } catch (error) {
      console.error("Error rejecting request:", error);
      enqueueSnackbar(error?.data?.message || "Failed to reject request.", { variant: "error" });
    }
  };







  return <>

    <Box
      my={2}
      gap={2}
      display="grid"
      gridTemplateColumns={{ xs: "1fr", md: "repeat(6, 1fr)" }}
      alignItems="center"
    >
      {/* 1. Product */}
      <FlexBox flexShrink={0} gap={1.5} alignItems="center">
        <Avatar
          variant="rounded"
          sx={{ height: 64, width: 64 }}
        >
          <Image
            fill
            alt={product_name}
            src={product_img}
            sizes="(64px, 64px)"
          />
        </Avatar>

        <Box>
          <Typography variant="h6" mb={1}>
            {product_name}
          </Typography>

          <FlexBox alignItems="center" gap={1}>
            <Typography variant="body1" color="grey.600">
              {currency(product_price)} x {product_quantity}
            </Typography>

            {/* <Box maxWidth={60}>
          <TextField
            defaultValue={product_quantity}
            type="number"
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Box> */}

            <Typography fontWeight="bold">
              = {currency(product_price * product_quantity)}
            </Typography>
          </FlexBox>
        </Box>
      </FlexBox>



      {/* 3. Request Type */}
      <Box display="flex" justifyContent="center">
        <Box
          component="span"
          sx={{
            backgroundColor: requestType === 'refund' ? 'error.main' : 'warning.main',
            color: 'white',
            px: 1.5,
            py: 0.3,
            borderRadius: '4px',
            fontSize: '12px',
            textAlign: 'center',
            display: 'inline-block',
            minWidth: 60,
            whiteSpace: 'nowrap',
          }}
        >
          {requestType.toUpperCase()}
        </Box>
      </Box>
      {/* 2. Date */}
      <Typography variant="h6" textAlign="center">
        {formatTime(requestedDate)}
      </Typography>
      {/* 4. Status */}
      <Box display="flex" justifyContent="center">
        <Chip
          label={product_status}
          sx={{
            backgroundColor: "#e0f7fa",
            color: "#00796b",
            fontWeight: "bold",
            px: 1.5,
            py: 0.5,
            borderRadius: "8px"
          }}
        />
      </Box>

      {/* 5. Reason */}
      <Box>
        <TextField
          fullWidth
          size="small"
          placeholder={product_status === 'pending' ? "Enter reason..." : "No reason provided"}
          value={product_status === 'pending' ? reason : (initialReason || "No reason provided")}
          onChange={(e) => setReason(e.target.value)}
          InputProps={{ 
            readOnly: product_status !== 'pending',
            sx: product_status !== 'pending' ? { backgroundColor: '#f5f5f5' } : {}
          }}
          sx={{ minWidth: 120 }}
        />
      </Box>


      {/* 6. Actions */}
      {product_status === 'pending' && (
        <FlexBox justifyContent="flex-end" gap={2}>
          <Button
            variant="outlined"
            size="small"
            color="success"
            onClick={() => handleAcceptRequest()}
            disabled={isAcceptLoading}
          >
            {isAcceptLoading ? "Accepting..." : "Accept"}
          </Button>

          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={() => handleRejectRequest()}
            disabled={isRejectLoading}
          >
            {isRejectLoading ? "Rejecting..." : "Decline"}
          </Button>
        </FlexBox>
      )}
    </Box>


  </>
}