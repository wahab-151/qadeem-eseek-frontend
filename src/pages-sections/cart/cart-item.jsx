import Link from "next/link";
import Image from "next/image";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

// MUI ICON COMPONENTS
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Remove from "@mui/icons-material/Remove";

// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";

// GLOBAL CUSTOM HOOK
import useCart from "hooks/useCart";

// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";

// STYLED COMPONENT
import { Wrapper } from "./styles";
import { Box } from "@mui/material";

// CUSTOM DATA MODEL


// =========================================================


// =========================================================

export default function CartItem({
  item
}) {
  
  const {
    id,
    title,
    price,
    thumbnail,
    slug,
    qty
  } = item;
  const {
    dispatch
  } = useCart();

  
// HANDLE CHANGE CART PRODUCT QUANTITY
  const handleCartAmountChange = amount => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        id,
        title,
        price,
        thumbnail,
        slug,
        qty: amount
      }
    });
  };
  return (
    <Wrapper>
      <FlexBox alignItems="center" gap={2}>
        {/* ITEM IMAGE + TEXT */}
        <Box flex={4} display="flex" alignItems="center" gap={2}>
          {/* Product Image */}
          <Box
            component="img"
            src={item?.thumbnail || "/no-image.jpg"}
            alt={item?.title}
            sx={{
              width: 64,
              height: 64,
              borderRadius: 2,
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
  
          {/* Product Info */}
          <Box>
            <Typography fontWeight={600}>{item?.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {item?.id}
            </Typography>
          </Box>
        </Box>
  
        {/* ITEM PRICE */}
        <Typography flex={1} textAlign="center">
          ${item?.price.toFixed(2)}
        </Typography>
  
        {/* QTY CONTROL */}
        <FlexBox flex={1} justifyContent="center" alignItems="center" gap={1}>
          <IconButton
            size="small"
            onClick={() =>
              dispatch({
                type: "CHANGE_CART_AMOUNT",
                payload: { ...item, qty: item.qty - 1 },
              })
            }
            disabled={item?.qty === 1}
          >
            <Remove fontSize="small" />
          </IconButton>
          <Typography>{item?.qty}</Typography>
          <IconButton
            size="small"
            onClick={() =>
              dispatch({
                type: "CHANGE_CART_AMOUNT",
                payload: { ...item, qty: item.qty + 1 },
              })
            }
          >
            <Add fontSize="small" />
          </IconButton>
        </FlexBox>
  
        {/* SUBTOTAL */}
        <Typography flex={1} textAlign="right">
          ${(item.price * item.qty).toFixed(2)}
        </Typography>
      </FlexBox>
    </Wrapper>
  );



  // return <Wrapper >
  //     <Image alt={title} width={150} height={150} src={thumbnail} />

  //     {/* DELETE BUTTON */}
  //     <IconButton size="small" onClick={handleCartAmountChange(0)} sx={{
  //     position: "absolute",
  //     right: 15,
  //     top: 15
  //   }}>
  //       <Close fontSize="small" />
  //     </IconButton>

  //     <FlexBox p={2} rowGap={2} width="100%" flexDirection="column">
  //       <Link href={`/products/${slug}`}>
  //         <Typography noWrap component="h3" sx={{
  //         fontSize: 18
  //       }}>
  //           {title}
  //         </Typography>
  //       </Link>

  //       {/* PRODUCT PRICE SECTION */}
  //       <FlexBox gap={1} flexWrap="wrap" alignItems="center">
  //         <Typography variant="body1" sx={{
  //         color: "grey.600"
  //       }}>
  //           {currency(price)} x {qty}
  //         </Typography>

  //         <Typography variant="h6" color="primary">
  //           {currency(price * qty)}
  //         </Typography>
  //       </FlexBox>

  //       {/* PRODUCT QUANTITY INC/DEC BUTTONS */}
  //       <FlexBox alignItems="center" gap={2}>
  //         <Button color="primary" sx={{
  //         p: "5px"
  //       }} variant="outlined" disabled={qty === 1} onClick={handleCartAmountChange(qty - 1)}>
  //           <Remove fontSize="small" />
  //         </Button>

  //         <Typography variant="h6">{qty}</Typography>

  //         <Button color="primary" sx={{
  //         p: "5px"
  //       }} variant="outlined" onClick={handleCartAmountChange(qty + 1)}>
  //           <Add fontSize="small" />
  //         </Button>
  //       </FlexBox>
  //     </FlexBox>
  //   </Wrapper>;
}