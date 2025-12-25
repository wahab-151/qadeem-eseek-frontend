"use client";
import Image from "next/image";
import { Box, Card, Button, Avatar, Typography } from "@mui/material";
import { format } from "date-fns";
import { useSnackbar } from "notistack";

// COMPONENTS
import { FlexBetween, FlexBox } from "components/flex-box";
import { currency } from "lib";

// HOOKS / RTK
import {
  useRefundOrderMutation,
  useRefundProductMutation,
  useReplacesProductMutation,
} from "app/store/services";
import { ORDER_STATUS_DELIVERED } from "utils/constants";

export default function OrderedProducts({ order,refetch }) {
  const { enqueueSnackbar } = useSnackbar();
  // const [refundOrder] = useRefundOrderMutation();
  const [refundProduct] = useRefundProductMutation();
  const [replacesProduct] = useReplacesProductMutation();

  const { _id, createdAt, items, deliveredAt, status } = order;

  console.log("order products", items);
  // Refund full order
  // const handleRefundOrder = async (id) => {
  //   try {
  //     const res = await refundOrder({ orderId: id }).unwrap();
  //     enqueueSnackbar(res?.message || "Order refunded successfully", {
  //       variant: "success",
  //     });
  //   } catch (error) {
  //     enqueueSnackbar("Failed to refund order", { variant: "error" });
  //     console.error("Error refunding order:", error);
  //   }
  // };

  // Refund a single product
  const handleRefundProduct = async (orderId, productId, amount) => {
    try {
      console.log("refund product", orderId, productId, amount);
      const res = await refundProduct({ orderId, productId, amount }).unwrap();
      console.log("refund product res", res);
      enqueueSnackbar(res?.message || "Product refunded successfully", {
        variant: "success",
      });
      refetch();
    } catch (error) {
      console.log("refund product res", error?.data?.message);
      enqueueSnackbar(error?.data?.message || 'Failed to refund product' , { variant: "error" });
      console.error("Error refunding product:", error);
    }
  };

  // replace a single product
  const handleReplaceProduct = async (orderId, productId, amount) => {
    try {
      const res = await replacesProduct({
        orderId,
        productId,
        amount,
      }).unwrap();
      enqueueSnackbar(res?.message || "Product refunded successfully", {
        variant: "success",
      });
      refetch();
    } catch (error) {
      enqueueSnackbar("Failed to refund product", { variant: "error" });
      console.error("Error refunding product:", error);
    }
  };

  return (
    <Card sx={{ p: 0, mb: "30px" }}>
      <FlexBetween px={3} py={2} flexWrap="wrap" bgcolor="grey.200">
        <Item title="Order ID:" value={_id} />
        <Item
          title="Placed on:"
          value={format(new Date(createdAt), "dd MMM, yyyy")}
        />
        <Item
          title="Delivered on:"
          value={
            deliveredAt ? format(new Date(deliveredAt), "dd MMM, yyyy") : "None"
          }
        />
      </FlexBetween>
      {/* <Box textAlign="right" p={2}>
        {status === ORDER_STATUS_DELIVERED && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleRefundOrder(_id)}
          >
            Refund / Return Full Order
          </Button>
        )} 
      </Box> */}
      {items?.map((item, ind) => (
        <FlexBetween key={ind} px={2} py={1} flexWrap="wrap">
          <FlexBox gap={2.5} alignItems="center">
            <Avatar
              variant="rounded"
              sx={{ height: 64, width: 64, backgroundColor: "grey.100" }}
            >
              <Image
                fill
                alt={item?.product?.name}
                src={
                  item?.product?.images[0]?.preview ||
                  "/assets/images/logo.jpeg"
                }
                sizes="(60px, 60px)"
              />
            </Avatar>

            <div>
              <Typography variant="h6" sx={{width:"170px  ",overflow:"hidden",textOverflow:"ellipsis"}}>{item?.product?.name}</Typography>
              <Typography variant="body1" sx={{ color: "grey.600" }}>
                {currency(item?.price)} x {item?.quantity}
              </Typography>
              {item?.product?.sku && (
                <Typography variant="body2" sx={{ color: "grey.500", fontSize: "0.75rem" }}>
                  SKU: {item?.product?.sku}
                </Typography>
              )}
            </div>
          </FlexBox>

          {item.variant && (
            <Typography noWrap variant="body1" sx={{ color: "grey.600" }}>
              Product properties: {item?.variant}
            </Typography>
          )}
          <Typography variant="body1" sx={{ color: "grey.600" }}>
            Cost: {currency(item?.price * item?.quantity)}
          </Typography>
          {(status?.toLowerCase()) === ORDER_STATUS_DELIVERED && (
            <Box display="flex" gap={2}>
              {/* <Button
              variant="text"
              color="secondary"
              onClick={() =>
                handleRefundProduct(_id, item?.product?._id, item?.price * item?.quantity)
              }
            >
              Refund Product
            </Button> */}
           {(!item?.refunded  && !item?.replaced) ? <>  <Button
                variant="outlined"
                size="small"
                color="secondary"
                // onClick={handleRefundProduct}
                onClick={() =>
                  handleRefundProduct(
                    _id,
                    item?.product?._id,
                    item?.price * item?.quantity
                  )
                }
              >
                Refund
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="secondary"
                // onClick={handleRefundProduct}
                onClick={() =>
                  handleReplaceProduct(
                    _id,
                    item?.product?._id,
                    item?.price * item?.quantity
                  )
                }
              >
                Return / Replace
              </Button>
              </> :   <Typography variant="body1" sx={{ color: "primary.600" , fontWeight:"bold"}}> Refund/Replace Requested</Typography>}
            </Box>
          )}
        </FlexBetween>
      ))}
    </Card>
  );
}

function Item({ title, value }) {
  return (
    <FlexBox gap={1} alignItems="center">
      <Typography variant="body1" sx={{ color: "grey.600" }}>
        {title}
      </Typography>
      <p>{value}</p>
    </FlexBox>
  );
}

// import Image from "next/image";

// // MUI
// import Card from "@mui/material/Card";
// import Button from "@mui/material/Button";
// import Avatar from "@mui/material/Avatar";
// import Typography from "@mui/material/Typography";
// import { format } from "date-fns";

// // GLOBAL CUSTOM COMPONENTS
// import { FlexBetween, FlexBox } from "components/flex-box";

// // CUSTOM UTILS LIBRARY FUNCTION
// import { currency } from "lib";
// import { Box } from "@mui/material";
// import { useRefundOrderMutation } from "app/store/services";
// import { useSnackbar } from "notistack";

// // CUSTOM DATA MODEL

// // ==============================================================

// // ==============================================================

// export default function OrderedProducts({
//   order
// }) {

//   const { enqueueSnackbar } = useSnackbar();

//   console.log("order==>oooooooooooooode customer", order)
//   const {
//     _id,
//     createdAt,
//     items,
//     deliveredAt,
//     price,
//     product,
//     quantity
//   } = order;

//   const [refundOrder] = useRefundOrderMutation()

//   const handleRefundOrder = async (id) => {
//     try {
//       await refundOrder({ orderId: id }).unwrap();
//       // const response = await refundOrder({ orderId: id }).unwrap();

//       // if (response?.success === true) {
//       //   enqueueSnackbar(response?.message, { variant: 'success' });
//       // }else{
//       //   enqueueSnackbar(response?.message, { variant: 'error' });
//       // }

//     } catch (error) {
//       console.error("Error refunding order:", error);
//     }
//   };

//   // const items = [
//   //   {
//   //     product_name: product?.name || "Unnamed Product",
//   //     product_price: price,
//   //     product_quantity: quantity,
//   //     product_img: product?.image || "/placeholder.jpg",
//   //   },
//   // ];

//   return <Card sx={{
//     p: 0,
//     mb: "30px"
//   }}>
//     <FlexBetween px={3} py={2} flexWrap="wrap" bgcolor="grey.200">
//       <Item title="Order ID:" value={_id} />
//       <Item title="Placed on:" value={format(new Date(createdAt), "dd MMM, yyyy")} />
//       <Item title="Delivered on:" value={deliveredAt ? format(new Date(deliveredAt), "dd MMM, yyyy") : "None"} />
//     </FlexBetween>

//     {items?.map((item, ind) => <FlexBetween px={2} py={1} flexWrap="wrap" key={ind}>
//       <FlexBox gap={2.5} alignItems="center">
//         <Avatar variant="rounded" sx={{
//           height: 64,
//           width: 64,
//           backgroundColor: "grey.100"
//         }}>
//           <Image fill alt={item?.product?.name} src={item?.product?.images[0]?.preview} sizes="(60px, 60px)" />
//         </Avatar>

//         <div>
//           <Typography variant="h6">{item?.product?.name}</Typography>
//           <Typography variant="body1" sx={{
//             color: "grey.600"
//           }}>
//             {currency(item?.price)} x {item?.quantity}
//           </Typography>
//         </div>
//       </FlexBox>

//       {item.variant ? <Typography noWrap variant="body1" sx={{
//         color: "grey.600"
//       }}>
//         Product properties: {item.variant}

//       </Typography> : null}
//       <Box>
//         <Button variant="text" color="secondary" onClick={() => handleRefundOrder(_id)}>
//           Refund/Return
//         </Button>
//         {/* <Button variant="text" color="primary">
//           Write a Review
//         </Button> */}
//       </Box>
//     </FlexBetween>)}
//   </Card>;
// }
// function Item({
//   title,
//   value
// }) {
//   return <FlexBox gap={1} alignItems="center">
//     <Typography variant="body1" sx={{
//       color: "grey.600"
//     }}>
//       {title}
//     </Typography>
//     <p>{value}</p>
//   </FlexBox>;
// }

// import Image from "next/image";

// // MUI
// import Card from "@mui/material/Card";
// import Button from "@mui/material/Button";
// import Avatar from "@mui/material/Avatar";
// import Typography from "@mui/material/Typography";
// import { format } from "date-fns";

// // GLOBAL CUSTOM COMPONENTS
// import { FlexBetween, FlexBox } from "components/flex-box";

// // CUSTOM UTILS LIBRARY FUNCTION
// import { currency } from "lib";
// import { Box } from "@mui/material";

// // CUSTOM DATA MODEL

// // ==============================================================

// // ==============================================================

// export default function OrderedProducts({
//   order
// }) {
//   const {
//     _id,
//     createdAt,
//     items,
//     deliveredAt
//   } = order;

//   console.log("dddddddddddd", items)

//   return <Card sx={{
//     p: 0,
//     mb: "30px"
//   }}>
//     <FlexBetween px={3} py={2} flexWrap="wrap" bgcolor="grey.200">
//       <Item title="Order ID:" value={_id} />
//       <Item title="Placed on:" value={format(new Date(createdAt), "dd MMM, yyyy")} />
//       <Item title="Delivered on:" value={deliveredAt ? format(new Date(deliveredAt), "dd MMM, yyyy") : "None"} />
//     </FlexBetween>

//     {items.map((item, ind) => <FlexBetween px={2} py={1} flexWrap="wrap" key={ind}>
//       <FlexBox gap={2.5} alignItems="center">
//         <Avatar variant="rounded" sx={{
//           height: 64,
//           width: 64,
//           backgroundColor: "grey.100"
//         }}>
//           <Image fill alt={item.product?.name} src={item.product_img} sizes="(60px, 60px)" />
//         </Avatar>

//         <div>
//           <Typography variant="h6">{item.product_name}</Typography>
//           <Typography variant="body1" sx={{
//             color: "grey.600"
//           }}>
//             {currency(item?.price)} x {item.product_quantity}
//           </Typography>
//         </div>
//       </FlexBox>

//       {item.variant ? <Typography noWrap variant="body1" sx={{
//         color: "grey.600"
//       }}>
//         Product properties: {item.variant}

//       </Typography> : null}
//       <Box>
//         <Button variant="text" color="secondary">
//           Refund/Return
//         </Button>
//         <Button variant="text" color="primary">
//           Write a Review
//         </Button>
//       </Box>
//     </FlexBetween>)}
//   </Card>;
// }
// function Item({
//   title,
//   value
// }) {
//   return <FlexBox gap={1} alignItems="center">
//     <Typography variant="body1" sx={{
//       color: "grey.600"
//     }}>
//       {title}
//     </Typography>
//     <p>{value}</p>
//   </FlexBox>;
// }
