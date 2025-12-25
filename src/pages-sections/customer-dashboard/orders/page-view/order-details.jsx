'use client'
import { Fragment, useEffect, useState } from "react";
import ShoppingBag from "@mui/icons-material/ShoppingBag";

// LOCAL CUSTOM COMPONENTS
import OrderSummery from "../order-summery";
import OrderProgress from "../order-progress";
import OrderedProducts from "../ordered-products";
import DashboardHeader from "../../dashboard-header";
import { useGetOrderByIdQuery } from "app/store/services";
import { Box, CircularProgress, Button } from "@mui/material";
import * as XLSX from "xlsx";


// CUSTOM DATA MODEL


// =============================================================


// =============================================================

export default function OrderDetailsPageView({
  id
}) {

  const [order, setOrder] = useState(null);

  const { data, isLoading, error, refetch } = useGetOrderByIdQuery(id);

  useEffect(() => {
    // console.log("use 111111", data);
    if (data?.data) {
      setOrder(data?.data);

  console.log("dweeeeeeeeeee<<<<<<<<<<<<<>>>>>>>>>>>>>> custooomer", order, id)
    }
  }, [data?.data, error]);



  // if (isLoading || !order) {
  //   return <div>Loading order details...</div>;
  // }


  return <Fragment>
    {/* TITLE HEADER AREA */}
    {/* <DashboardHeader href="/orders" Icon={ShoppingBag} title="Order Details" buttonText="Orders" /> */}

    {(isLoading === true || !order?._id) ? (
      <Box display="flex" justifyContent="center" alignItems="center" p={4}>
        <CircularProgress />
      </Box>
    ) : (
      <>

        {/* ORDER PROGRESS AREA */}
        <OrderProgress status={order?.status} deliveredAt={order?.deliveredAt} isDelivered={order?.isDelivered} trackingId={order?.trackingId}/>

        {/* ORDERED PRODUCT LIST */}


        <OrderedProducts order={order}  refetch={refetch}/>

        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button variant="outlined" onClick={() => {
            try {
              const rows = (order?.items || []).map((item, idx) => ({
                "#": idx + 1,
                Product: item?.product?.name || "",
                SKU: item?.product?.sku || "",
                Quantity: item?.quantity || 0,
                Price: item?.price || 0,
                Subtotal: (item?.quantity || 0) * (item?.price || 0),
              }));
              rows.push({
                "#": "",
                Product: "",
                SKU: "",
                Quantity: "",
                Price: "Shipping Fee",
                Subtotal: order?.shippingFee || 0,
              });
              rows.push({
                "#": "",
                Product: "",
                SKU: "",
                Quantity: "",
                Price: "Discount",
                Subtotal: order?.discount || 0,
              });
              rows.push({
                "#": "",
                Product: "",
                SKU: "",
                Quantity: "",
                Price: "Total",
                Subtotal: order?.amount || 0,
              });

              const worksheet = XLSX.utils.json_to_sheet(rows);
              const workbook = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(workbook, worksheet, "Order");
              const fileName = `order-${order?._id}.xlsx`;
              XLSX.writeFile(workbook, fileName);
            } catch (e) {
              console.error("Failed to export order as Excel", e);
            }
          }}>
            Download Excel
          </Button>
        </Box>




        {/* {order?.map((item, index) => (
          <OrderedProducts
            key={`${order._id}-${index}`}
            order={{
              id: item?._id,
              createdAt: item?.createdAt,
              items: item?.items,
              deliveredAt: item?.deliveredAt,
            }}
          />
        ))} */}


        {/* SHIPPING AND ORDER SUMMERY */}
        <OrderSummery order={order} />
      </>
    )}
  </Fragment>;
}


