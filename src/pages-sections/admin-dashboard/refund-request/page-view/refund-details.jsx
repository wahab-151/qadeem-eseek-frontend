"use client";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";

// LOCAL CUSTOM COMPONENT

import {
  useGetRequestsByIdQuery,
  useUpdateOrderMutation,
} from "app/store/services";
import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import OrderActions from "../../orders/order-actions";
import OrderedProduct from "../../orders/ordered-product";
import ShippingAddress from "../../orders/shipping-address";
import TotalSummery from "../../orders/total-summery";
import PageWrapper from "pages-sections/admin-dashboard/page-wrapper";

import RefundedItems from "../refunded-items";
import RefundActions from "../request-actions";
import { FlexBetween } from "components/flex-box";

// CUSTOM DATA MODEL

// ==============================================================

// ==============================================================

export default function RefundDetailsPageView({ id }) {
  const { enqueueSnackbar } = useSnackbar();

  // payload
  const [status, setStatus] = useState("");
  const [shippingFees, setShippingFees] = useState(0);
  const [orderdiscount, setOrderDiscount] = useState(0);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState();

  const [order, setOrder] = useState(null);

  const { data, isLoading, error, refetch } = useGetRequestsByIdQuery(id);

  // const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const [updateOrder] = useUpdateOrderMutation();
  // const [refundOrder] = useRefundOrderMutation();



  const handleUpdateOrder = async () => {
    const payload = {
      orderId: order?._id,
      shippingFees,
      discount: orderdiscount,
      status,
      items,
    };

    try {
      console.log("payload===>", payload);
      await updateOrder(payload).unwrap();
      refetch();
    } catch (error) {
      console.error("Error updating order:", error.message);
    }
  };

  useEffect(() => {

    
    if (data?.data) {
    
      setOrder(data.data);
      setItems(data.data?.requestItems || []);
    }
  }, [data]);


  console.log("Current items state:", items);
  console.log("Current order:", order);

  return (
    <PageWrapper title="Request Details">
      {isLoading === true || (!order && !data?.data) ? (
        <Box display="flex" justifyContent="center" alignItems="center" p={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid size={12}>
              <Card
                sx={{
                  p: 3,
                }}
              >
                {/* ADD PRODUCT & CHANGE ORDER STATUS ACTION  */}
                <RefundActions
                  id={(order || data?.data)?.orderNo}
                  createdAt={(order || data?.data)?.requestedDate}
                  userName={(order || data?.data)?.user?.name}
                />
                {/* Table Header */}
                <Box
                  display="grid"
                  gridTemplateColumns={{ xs: "1fr", md: "repeat(6, 1fr)" }}
                  px={2}
                  py={1}
                  bgcolor="grey.100"
                  borderRadius={1}
                  mb={2}
                >
                  <Typography fontWeight="bold" textAlign="left">
                    Product
                  </Typography>
                  <Typography fontWeight="bold" textAlign="center">
                    Request Type
                  </Typography>
                  <Typography fontWeight="bold" textAlign="center">
                    Date
                  </Typography>

                  <Typography fontWeight="bold" textAlign="center">
                    Status
                  </Typography>
                  <Typography fontWeight="bold" textAlign="center">
                    Reason
                  </Typography>
                  <Typography fontWeight="bold" textAlign="right">
                    Actions
                  </Typography>
                  {/* </FlexBetween> */}
                </Box>

                {items?.map((item, index) => {
                  console.log("Item at index", index, ":", item);
                  
                  
                  return (
                    <RefundedItems
                      key={`${(order || data?.data)?._id}-${index}`}
                      index={index}
                      product={{
                        product_id: item?.productId,
                        product_img:
                          item?.image?.[0]?.preview ||
                          "/assets/images/logo.jpeg",
                        product_name:  item?.name,
                        product_price: item?.price,
                        product_quantity: item?.quantity,
                        product_status: item?.status,
                      }}
                      orderId={order?.orderNo}
                      requestId={order?.requestId }
                      requestType={item?.requestType}
                      requestedDate={order?.requestedDate }
                      onQuantityChange={(index, quantity) => {
                        const updatedItems = [...(items || data?.data?.requestItems || [])];
                        updatedItems[index] = {
                          ...updatedItems[index],
                          quantity,
                        };
                        setItems(updatedItems);
                      }}
                    />
                  );
                })}
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </PageWrapper>
  );
}
