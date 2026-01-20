import Link from "next/link";
import Image from "next/image";

// MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

// MUI ICON COMPONENTS
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Remove from "@mui/icons-material/Remove";

// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";

// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
import OrderQuantity from "./productQuantity";

// CUSTOM DATA MODEL


// ==============================================================


// ==============================================================

// export default function MiniCartItem({
//   item,
//   handleCartAmountChange,
//   onProductClick
// }) {

  
//   return <FlexBox py={2} px={2.5} key={item.id} alignItems="center" borderBottom="1px dashed" borderColor="divider" gap={2}>
//       <Link href={`/products/${item.slug}`}>
//         <Avatar variant="rounded" sx={{
//         width: 75,
//         height: 75,
//         borderRadius: 3
//       }}>
//           <Image alt={item.title} src={item.thumbnail} fill sizes="(75px, 75px)" />
//         </Avatar>
//       </Link>

//       <Box flex="1" textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden">
//         <Typography noWrap variant="h6" className="title">
//           {item.title}
//         </Typography>

//         <Typography variant="body1" sx={{
//         fontSize: 12,
//         color: "grey.600",
//         mb: 1
//       }}>
//           {currency(item.price)} x {item.qty}
//         </Typography>
// <OrderQuantity
//   quantity={item.qty}
//   onChange={(newQty) => handleCartAmountChange(newQty, item)()} // call the returned function
// />
//         {/* <FlexBox alignItems="center" gap={1}>
//           <Button size="small" color="primary" variant="outlined" onClick={handleCartAmountChange(item.qty + 1, item)} sx={{
//           height: 24,
//           width: 24,
//           borderRadius: 1.5
//         }}>
//             <Add fontSize="small" />
//           </Button>

//           <Typography variant="h6" sx={{
//           mx: "3px"
//         }}>
//             {item.qty}
//           </Typography>

//           <Button size="small" color="primary" variant="outlined" disabled={item.qty === 1} onClick={handleCartAmountChange(item.qty - 1, item)} sx={{
//           height: 24,
//           width: 24,
//           borderRadius: 1.5
//         }}>
//             <Remove fontSize="small" />
//           </Button>
//         </FlexBox> */}
//       </Box>

//       <IconButton size="small" onClick={handleCartAmountChange(0, item)}>
//         <Close fontSize="small" />
//       </IconButton>
//     </FlexBox>;
// }

export default function MiniCartItem({
  item,
  handleCartAmountChange,
  onProductClick
}) {
  // console.log("item", item)
  const handleClick = () => {
    if (onProductClick) {
      // Use slug for SEO-friendly URLs, fallback to id
      onProductClick(item?.slug || item?.id, item?.category);
    }
  };

  return (
    <FlexBox
      py={2}
      px={2.5}
      key={item.id}
      alignItems="center"
      borderBottom="1px dashed"
      borderColor="divider"
      gap={2}
    >
      {/* Clickable Image */}
      <Box onClick={handleClick} sx={{ cursor: 'pointer' }}>
        <Avatar
          variant="rounded"
          sx={{
            width: 75,
            height: 75,
            borderRadius: 3,
          }}
        >
          <Image
            alt={item.title}
            src={item.thumbnail || "/assets/images/logo.jpeg"}
            fill
            sizes="(75px, 75px)"
          />
        </Avatar>
      </Box>

      <Box
        flex="1"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        overflow="hidden"
      >
        {/* ✅ Make Title Clickable */}
        <Typography
          noWrap
          variant="h6"
          className="title"
          onClick={handleClick}
          sx={{ cursor: 'pointer' }}
        >
          {item.title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: 12,
            color: 'grey.600',
            mb: 1,
          }}
        >
          {currency(Number(item.price) || 0)} x {Number(item.qty) || 0}
        </Typography>

        <OrderQuantity
          quantity={item.qty}
          onChange={(newQty) => handleCartAmountChange(newQty, item)()}
          max={99}
        />
      </Box>

      <IconButton size="small" onClick={handleCartAmountChange(0, item)}>
        <Close fontSize="small" />
      </IconButton>
    </FlexBox>
  );
}
