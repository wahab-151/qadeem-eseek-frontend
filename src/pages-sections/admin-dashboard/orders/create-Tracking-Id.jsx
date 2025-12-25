

'use client';

import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  TextField,
  Button
} from "@mui/material";
import { useSnackbar } from "notistack";

import PageWrapper from "pages-sections/admin-dashboard/page-wrapper";
import RefundActions from "../refund-request/request-actions";

import {
  useGetOrderByIdQuery,
  useOrderTrackingIdMutation
} from "app/store/services";
import { useRouter } from "next/navigation";

export default function GenerateTrackingId({ id }) {
  const { enqueueSnackbar } = useSnackbar();
const router=useRouter()
  const [trackingId, setTrackingId] = useState("");
  const [order, setOrder] = useState(null);

  const { data, isLoading, error, refetch } = useGetOrderByIdQuery(id);
  const [orderTrackingId, { isLoading: isSubmitting }] = useOrderTrackingIdMutation();

  useEffect(() => {
    if (data?.data) {
      const orderData = data?.data;
      setOrder(orderData);

      if (orderData.trackingId) {
        // Already exists, we're editing
        setTrackingId(orderData.trackingId);
      } 
    }
  }, [data]);
  // console.log("order",data?.data)

  const handleSaveTrackingId = async () => {
    if (!trackingId.trim()) {
      enqueueSnackbar("Tracking ID cannot be empty", { variant: "warning" });
      return;
    }

    try {
     
    
        await orderTrackingId({
        orderId: order._id,
        trackingId: trackingId.trim()
      }).unwrap();
     

      
      enqueueSnackbar("Tracking ID saved successfully", { variant: "success" });
      router.push('/admin/orders')
      refetch();
    } catch (err) {
      console.error("Failed to save tracking ID:", err);
      enqueueSnackbar("Failed to save tracking ID", { variant: "error" });
    }
  };

  if (isLoading || !order) {
    return (
      <PageWrapper title="Tracking ID">
        <Box display="flex" justifyContent="center" alignItems="center" p={4}>
          <CircularProgress />
        </Box>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="Tracking ID">
      <RefundActions
        id={order._id}
        createdAt={order.createdAt}
        userName={order.user.firstName + " " + order.user.lastName}
      />

      <Box my={3} sx={{ p: 3, borderRadius: 2, boxShadow: 10 }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          {order?.trackingId ? "Edit Tracking ID" : "Create Tracking ID"}
        </Typography>

        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveTrackingId();
          }}
        >
          <TextField
            label="Tracking ID"
            size="small"
            variant="outlined"
            fullWidth
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting || !trackingId.trim()}
            sx={{ px: 4, py: 1, fontWeight: 600 }}
          >
            {order.trackingId ? "Update" : "Save"}
          </Button>
        </Box>
      </Box>
    </PageWrapper>
  );
}

