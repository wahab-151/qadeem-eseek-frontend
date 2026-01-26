import Image from "next/image";

// MUI
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

// MUI ICON COMPONENTS
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Remove from "@mui/icons-material/Remove";

// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";

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
  const handleClick = () => {
    if (onProductClick) {
      // Use slug for SEO-friendly URLs, fallback to id
      onProductClick(item?.slug || item?.id, item?.category);
    }
  };

  const handleRemove = () => {
    handleCartAmountChange(0, item)();
  };

  const handleDecrement = () => {
    if (item.qty > 1) {
      handleCartAmountChange(item.qty - 1, item)();
    }
  };

  const handleIncrement = () => {
    const maxStock = typeof item?.stock === "number" ? item.stock : 99;
    if (item.qty < maxStock) {
      handleCartAmountChange(item.qty + 1, item)();
    }
  };

  const itemPrice = Number(item.price) || 0;
  const itemQty = Number(item.qty) || 0;
  const totalItemPrice = itemPrice * itemQty;

  return (
    <Box
      sx={{
        px: 3,
        py: 2.5,
        display: "flex",
        alignItems: "flex-start",
        gap: 2,
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      {/* Product Image */}
      <Box 
        onClick={handleClick} 
        sx={{ 
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            width: "65px",
            height: "65px",
            borderRadius: "4px",
            overflow: "hidden",
            border: "1px solid #E5E7EB",
            position: "relative",
            backgroundColor: "#FFFFFF",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Image
            alt={item.title}
            src={item.thumbnail || "/assets/images/small-screen-logo.png"}
            fill
            sizes="65px"
            style={{ objectFit: "cover" }}
          />
        </Box>
      </Box>

      {/* Middle Section: Product Name and Quantity */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          minWidth: 0,
        }}
      >
        {/* Product Name */}
        <Typography
          onClick={handleClick}
          sx={{
            cursor: 'pointer',
            color: "#211E1F",
            fontSize: "15px",
            fontWeight: 400,
            fontFamily: "sans-serif",
            lineHeight: 1.4,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {item.title}
        </Typography>

        {/* Quantity Controls */}
        <FlexBox alignItems="center" gap={0.5}>
          <IconButton
            onClick={handleDecrement}
            disabled={itemQty <= 1}
            sx={{
              padding: "2px",
              color: "#211E1F",
              minWidth: "auto",
              width: "20px",
              height: "20px",
              "&:hover": {
                backgroundColor: "rgba(33, 30, 31, 0.04)",
              },
              "&.Mui-disabled": {
                color: "#9CA3AF",
              },
            }}
          >
            <Remove sx={{ fontSize: "16px" }} />
          </IconButton>
          
          <Typography
            sx={{
              color: "#211E1F",
              fontSize: "16px",
              fontWeight: 600,
              fontFamily: "sans-serif",
              minWidth: "20px",
              textAlign: "center",
            }}
          >
            {itemQty}
          </Typography>

          <IconButton
            onClick={handleIncrement}
            disabled={itemQty >= (item?.stock || 99)}
            sx={{
              padding: "2px",
              color: "#211E1F",
              minWidth: "auto",
              width: "20px",
              height: "20px",
              "&:hover": {
                backgroundColor: "rgba(33, 30, 31, 0.04)",
              },
              "&.Mui-disabled": {
                color: "#9CA3AF",
              },
            }}
          >
            <Add sx={{ fontSize: "16px" }} />
          </IconButton>
        </FlexBox>
      </Box>

      {/* Right Section: Price and Remove Button */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 1,
          flexShrink: 0,
        }}
      >
        {/* Remove Button - aligned with product name */}
        <IconButton
          onClick={handleRemove}
          sx={{
            padding: "4px",
            color: "#211E1F",
            minWidth: "auto",
            width: "24px",
            height: "24px",
            "&:hover": {
              backgroundColor: "rgba(33, 30, 31, 0.04)",
            },
          }}
        >
          <Close sx={{ fontSize: "16px" }} />
        </IconButton>

        {/* Price - aligned with quantity controls */}
        <Typography
          sx={{
            color: "#211E1F",
            fontSize: "15px",
            fontWeight: 600,
            fontFamily: "sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          Rs {Math.round(totalItemPrice).toLocaleString('en-US', { maximumFractionDigits: 0 })}
        </Typography>
      </Box>
    </Box>
  );
}
