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
import {
  useDeleteOrderMutation,
  useRefundOrderMutation,
  useRefundProductMutation,
} from "app/store/services";
import { Button } from "@mui/material";

// CUSTOM DATA MODEL

// ==============================================================

// ==============================================================

export default function OrderedProduct({
  product,
  orderId,
  index,
  onQuantityChange,
  orderStatus,
  setItems,items
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [refundProduct] = useRefundProductMutation();

  const [deleteOder, { isloading }] = useDeleteOrderMutation();
  // const [refundOrder] = useRefundOrderMutation();

  const {
    product_id,
    product_img,
    product_name,
    product_price,
    product_quantity,
  } = product || {};

  // Handle individual product refund
  const handleRefundProduct = async () => {
    try {
      const refundAmount = product_price * product_quantity;
      const response = await refundProduct({
        orderId,
        productId: product_id,
        amount: refundAmount,
      }).unwrap();

      enqueueSnackbar(response?.message || "Product refunded", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Failed to refund product", { variant: "error" });
      console.error("Admin refund error:", error);
    }
  };

  // Handle individual product refund
  // const handleDeleteOrder = async (orderId, productId) => {
  //   try {
  //     const data = {
  //       orderId,
  //       productId,
  //     };
  //     const response = await deleteOder(data).unwrap();

  //     enqueueSnackbar(response?.message || "Product Delete Successfully", {
  //       variant: "success",
  //     });
  //   } catch (error) {
  //     enqueueSnackbar("Failed to delete product", { variant: "error" });
  //     console.error("Admin refund error:", error);
  //   }
  // };

  const handleDeleteOrder = (productId)=>{
    // Filter out the items to keep
  const updatedItems = items.filter(item => item.product._id !== productId);
  setItems(updatedItems)
  }

  return (
    <Box
      my={2}
      gap={2}
      display="grid"
      gridTemplateColumns={{
        md: "1fr 1fr",
        xs: "1fr",
      }}
    >
      <FlexBox flexShrink={0} gap={1.5} alignItems="center">
        <Avatar
          variant="rounded"
          sx={{
            height: 64,
            width: 64,
          }}
        >
          <Image
            fill
            alt={product_name}
            src={product_img}
            sizes="(64px, 64px)"
          />
        </Avatar>

        <div>
          <Typography
            variant="h6"
            sx={{
              mb: 1,
            }}
          >
            {product_name}
          </Typography>

          <FlexBox alignItems="center" gap={1}>
            <Typography
              variant="body1"
              sx={{
                color: "grey.600",
              }}
            >
              {currency(product_price)} x
            </Typography>

            <Box maxWidth={60}>
              {/* <TextField defaultValue={product_quantity} type="number" fullWidth /> */}
              <TextField
                defaultValue={product_quantity}
                sx={{
                 
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                    color: "black",
                  },
                  "& .MuiInputLabel-root.Mui-disabled": {
                    color: "black",
                  },
                }}
                type="number"
                // onChange={(e) => onQuantityChange(index, Number(e.target.value))}
                onChange={(e) => {
                  const quantity = parseInt(e.target.value, 10);
                  onQuantityChange(index, quantity);
                }}
                disabled={
                  orderStatus === "Delivered" ||
                  orderStatus === "Cancelled" ||
                  orderStatus === "Processing"
                }
              />
            </Box>
          </FlexBox>
        </div>
      </FlexBox>

      <FlexBetween flexShrink={0}>
        <Typography variant="body1" sx={{ color: "grey.600" }}>
        {currency(product_price * product_quantity)}
        </Typography>

        <FlexBox gap={2}>
          {/* <Button variant="outlined" size="small" color="secondary" onClick={handleRefundProduct}>
          Refund 
        </Button>

        <Button variant="outlined" size="small" color="secondary" onClick={handleRefundProduct}>
          Return / Replace
        </Button> */}

          {orderStatus === "Pending" && (
            <IconButton>
              <Delete
                sx={{ color: "grey.600", fontSize: 22 }}
                // onClick={() => handleDeleteOrder(orderId, product_id)}
                   onClick={() => handleDeleteOrder( product_id)}  
              />
            </IconButton>
          )}
        </FlexBox>
      </FlexBetween>

      {/* <FlexBetween flexShrink={0}>
      <Typography variant="body1" sx={{
        color: "grey.600"
      }}>
        Product properties: Black, L
      </Typography>

      <IconButton>
        <Delete sx={{
          color: "grey.600",
          fontSize: 22
        }} />
      </IconButton>
    </FlexBetween> */}
    </Box>
  );
}
