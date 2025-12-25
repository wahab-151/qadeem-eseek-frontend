

"use client";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
// LOCAL CUSTOM COMPONENT
import OrderActions from "../order-actions";
import TotalSummery from "../total-summery";
import PageWrapper from "../../page-wrapper";
import OrderedProduct from "../ordered-product";
import ShippingAddress from "../shipping-address";
import {
  useAcceptOrderMutation,
  useGetOrderByIdQuery,
  useRefundOrderMutation,
  useUpdateOrderMutation,
  useUpdateOrderStatusMutation,
} from "app/store/services";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { getShippingCost } from "utils/helpers";
// CUSTOM DATA MODEL
// ==============================================================
// ==============================================================
export default function OrderDetailsPageView({ id }) {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  // payload
  const [status, setStatus] = useState("");
  // const [shippingFees, setShippingFees] = useState(0);
  const [orderdiscount, setOrderDiscount] = useState(0);
  const [address, setAddress] = useState({});
  const [note, setNote] = useState("");
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState(null);
  const [shippingFee, setShippingFee] = useState(0);
  const [isShippingManuallyEdited, setIsShippingManuallyEdited] = useState(false);
  const { data, isLoading, error, refetch } = useGetOrderByIdQuery(id);
  // const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [updateOrder] = useUpdateOrderMutation();
  const [refundOrder] = useRefundOrderMutation();
  const [acceptOrder, { isLoading: isAcceptLoading }] =
    useAcceptOrderMutation();
  // console.log("dweeeeeeeeeee<<<<<<<<<<<<<>>>>>>>>>>>>>> admin", data?.data, id)
  const handleUpdateOrder = async () => {
    const payload = {
      orderId: order?._id,
      shippingFees: shippingFee,
      discount: orderdiscount,
      status,
      items,
    };
    try {
      console.log("payload===>", payload);
      await updateOrder(payload).unwrap();
      // refetch();
      enqueueSnackbar(res?.message || "Order updated successfully", {
        variant: "success",
      });
      router.push("/admin/orders");
    } catch (error) {
      console.error("Error updating order:", error.message);
    }
  };
  useEffect(() => {
    if (data?.data) {
      setOrder(data?.data);
      setItems(data.data.items || []);
    }
    // Populate address and note from backend
    setAddress(data?.data?.shippingAddress || "");
    setNote(data?.data?.customerNote || "Please deliver ASAP.");
    setStatus(data?.data?.status || "");
  }, [data?.data, error]);

  // Recalculate shipping whenever items or shipping method change
  useEffect(() => {
    if (!isShippingManuallyEdited) {
      const subtotal = items.reduce((total, item) => total + item.quantity * item.price, 0);
      const method = order?.shippingMethod || "ground";
      setShippingFee(getShippingCost(method, subtotal));
    }
  }, [items, order?.shippingMethod, isShippingManuallyEdited]);

  const handleShippingChange = (newShippingFee) => {
    setShippingFee(newShippingFee);
    setIsShippingManuallyEdited(true);
  };
  // Refund full order
  const handleRefundOrder = async (id) => {
    try {
      const res = await refundOrder({ orderId: id }).unwrap();
      enqueueSnackbar(res?.message || "Order refunded successfully", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Failed to refund order", { variant: "error" });
      console.error("Error refunding order:", error);
    }
  };


  const handleAcceptOrder = async () => {
    try {
      const payload = {
        orderId: order._id,
        status: status,
        shippingAddress: address,
        customerNote: note,
        items,
        shippingFees: shippingFee,
      };
      console.log("Accept Order Payload:", payload);
      const res = await acceptOrder(payload).unwrap();
      enqueueSnackbar(res.message, { variant: "success" });
      router.push("/admin/orders");
    } catch (err) {
      enqueueSnackbar(err.data.message, { variant: "error" });
    }
  };
  const totalAmount = items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);
console.log("itemssss", items)


  return (
    <PageWrapper title="Order Details ">
      {isLoading === true || !order ? (
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
                <OrderActions
                  id={order?._id}
                  createdAt={order?.createdAt}
                  productName={order?.product?.name}
                  setStatus={setStatus}
                  status={status}
                  setItems={setItems}
                  items={items}
                />
                {items?.map((item, index) => (
                  <OrderedProduct
                    key={`${order?._id}-${index}`}
                    index={index}
                    product={{
                      product_id: item?.product?._id,
                      product_img:
                        item?.product?.images[0]?.preview ||
                        "/assets/images/logo.jpeg",
                      product_name: item?.product?.name,
                      product_price: item?.price,
                      product_quantity: item?.quantity,
                    }}
                    orderId={order?._id}
                    onQuantityChange={(index, quantity) => {
                      const updatedItems = [...items];
                      updatedItems[index] = {
                        ...updatedItems[index],
                        quantity,
                      };
                      setItems(updatedItems);
                    }}
                    orderStatus={order?.status}
                    setItems={setItems}
                    items={items}
                  />
                ))}
              </Card>
            </Grid>
            {/* SHIPPING ADDRESS & CUSTOMER NOTES */}
            <Grid
              size={{
                md: 6,
                xs: 12,
              }}
            >
              <ShippingAddress
                address={address}
                note={note}
                setAddress={setAddress}
                setNote={setNote}
                orderStatus={order?.status}
              />
            </Grid>
            {/* TOTAL SUMMERY OF ORDER */}
            <Grid
              size={{
                md: 6,
                xs: 12,
              }}
            >
              {/* <TotalSummery total={order?.price} discount={order?.amount} /> */}
              <TotalSummery
                total={totalAmount}
                shippingFees={shippingFee}
                onShippingChange={handleShippingChange}
                orderStatus={order?.status}
                shippingMethod={order?.shippingMethod}
              />
            </Grid>
            {/* CHANGE BUTTON */}
            <Grid size={12}>
              {/* {order?.status === "Pending" && ( */}
              <Button
                variant="contained"
                color="secondary"
                onClick={order?.status === "Pending" ? handleAcceptOrder : handleUpdateOrder}
                disabled={isAcceptLoading}
              >
                {order?.status === "Pending" ? "Accept Order" : "Update Order"}
              </Button>
              {/* )} */}
            </Grid>
          </Grid>
        </>
      )}
    </PageWrapper>
  );
}
