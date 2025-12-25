import Image from "next/image";
import Avatar from "@mui/material/Avatar";

// MUI ICON COMPONENTS
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import RemoveRedEye from "@mui/icons-material/RemoveRedEye";

// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";

// STYLED COMPONENTS
import { StatusWrapper, StyledTableRow, StyledTableCell, StyledIconButton } from "../styles";

// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
import { Box } from "@mui/material";

// DATA TYPES


// ========================================================================

// const dummyRequests = [
//   {
//     name: "John Smith",
//     image: "https://randomuser.me/api/portraits/men/32.jpg",
//     orderNo: "ORD-2023-00145",
//     shopName: "ElectroHub",
//     amount: 249.99,
//     status: "Shipped",
//     trackingNo: "UPS-1Z5678A9034567890",
//     estimatedDelivery: "2023-06-15",
//     items: [
//       { name: "Wireless Headphones", qty: 1, price: 149.99 },
//       { name: "USB-C Cable", qty: 2, price: 50.00 }
//     ]
//   },
//   {
//     name: "Emily Johnson",
//     image: "https://randomuser.me/api/portraits/women/44.jpg",
//     orderNo: "ORD-2023-00146",
//     shopName: "FashionPlus",
//     amount: 87.50,
//     status: "Processing",
//     trackingNo: null,
//     estimatedDelivery: "2023-06-18",
//     items: [
//       { name: "Summer Dress", qty: 1, price: 59.99 },
//       { name: "Sun Hat", qty: 1, price: 27.51 }
//     ]
//   },
//   {
//     name: "Robert Chen",
//     image: "https://randomuser.me/api/portraits/men/75.jpg",
//     orderNo: "ORD-2023-00147",
//     shopName: "HomeGoods",
//     amount: 132.75,
//     status: "Delivered",
//     trackingNo: "FEDEX-987654321000",
//     estimatedDelivery: "2023-06-10",
//     deliveryDate: "2023-06-09",
//     items: [
//       { name: "Coffee Maker", qty: 1, price: 89.99 },
//       { name: "Kitchen Towels", qty: 3, price: 14.25 }
//     ]
//   },
//   {
//     name: "Maria Garcia",
//     image: "https://randomuser.me/api/portraits/women/68.jpg",
//     orderNo: "ORD-2023-00148",
//     shopName: "BookWorld",
//     amount: 42.97,
//     status: "Cancelled",
//     trackingNo: null,
//     items: [
//       { name: "Bestseller Novel", qty: 1, price: 19.99 },
//       { name: "Cookbook", qty: 1, price: 22.98 }
//     ]
//   },
//   {
//     name: "David Kim",
//     image: "https://randomuser.me/api/portraits/men/81.jpg",
//     orderNo: "ORD-2023-00149",
//     shopName: "TechGadgets",
//     amount: 599.00,
//     status: "Returned",
//     trackingNo: "USPS-920559016345721000",
//     returnReason: "Wrong item received",
//     items: [
//       { name: "Smart Watch", qty: 1, price: 599.00 }
//     ]
//   }
// ];

// // Usage example:

// ========================================================================

export default function RefundRequestRow({
  request
}) {

  const {
    orderNo,
    user,
    requestType,
    requestQty,
    requestedDate,
    status,requestId
  } = request;

  // const requestType = ["refund", "replace"]
// console.log("requestttttt is==",request)
  const STYLE = {
    fontWeight: 400
  };
  return <StyledTableRow tabIndex={-1} role="checkbox">
    <StyledTableCell align="left">#{requestId}</StyledTableCell>

    <StyledTableCell align="left" sx={STYLE}>
      {requestQty}
    </StyledTableCell>

    <StyledTableCell align="left">
      <FlexBox alignItems="center" gap={1.5}>
        {/* <Avatar variant="rounded">
            <Image fill src={image} alt={name} sizes="(60px, 60px)" />
          </Avatar> */}

        <p>{requestedDate}</p>
      </FlexBox>
    </StyledTableCell>

    <StyledTableCell align="left" sx={STYLE}>
      {(Array.isArray(requestType) ? requestType : [requestType]).map((type, idx) => (
        <Box
          key={idx}
          component="span"
          sx={{
            display: 'inline-block',
            backgroundColor: type === 'refund' ? 'error.main' : 'warning.main',
            color: 'white',
            px: 1,
            py: 0.3,
            borderRadius: '4px',
            fontSize: '12px',
            mr: 0.5,
            
          }}
        >
          {type.toUpperCase()}
        </Box>
      ))}
    </StyledTableCell>



    <StyledTableCell align="left" sx={STYLE}>
      {user}
    </StyledTableCell>

    <StyledTableCell align="left" sx={STYLE}>
      <StatusWrapper status={status}>{status}</StatusWrapper>
    </StyledTableCell>

    <StyledTableCell align="center">
      {/* <StyledIconButton>
        <Edit />
      </StyledIconButton> */}

      <StyledIconButton href={`/admin/refund-request/${requestId}`}>
        <RemoveRedEye />
      </StyledIconButton>

      {/* <StyledIconButton>
        <Delete />
      </StyledIconButton> */}
    </StyledTableCell>
  </StyledTableRow>;
}