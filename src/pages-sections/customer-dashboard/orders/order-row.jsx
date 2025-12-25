import Link from "next/link";

// MUI
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import East from "@mui/icons-material/East";
import { format } from "date-fns";

// LOCAL CUSTOM COMPONENT
import TableRow from "../table-row";

// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";

// CUSTOM DATA MODEL


// =================================================


// =================================================

export default function OrderRow({
  order
}) {

// console.log("order details", order)
  const getColor = status => {
    if (status === "Pending") return "secondary"; else if (status === "Processing") return "info"; else if (status === "Delivered") return "success"; else if (status === "Cancelled") return "error"; else return "default";
  };
  return <Link href={`/orders/${order._id}`}>
    <TableRow sx={{
      gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr"
    }}>
      <Typography noWrap variant="h5">
        #{order._id}
      </Typography>

      <Box textAlign="center">
        <Chip size="small" label={order?.status} color={getColor(order?.status)} />
      </Box>

      <Typography variant="body1" sx={{
        textAlign: {
          sm: "center",
          xs: "left"
        }
      }}>
        {format(new Date(order?.createdAt), "MMM dd, yyyy")}
      </Typography>

      <Typography variant="body1" sx={{
        textAlign: "center"
      }}>
        {currency(order?.amount)}
      </Typography>

      <Box justifyContent="end" display={{
        sm: "inline-flex",
        xs: "none"
      }}>
        <IconButton>
          <East className="east" fontSize="small" />
        </IconButton>
      </Box>
    </TableRow>
  </Link>;
}























// import Link from "next/link";

// // MUI
// import Box from "@mui/material/Box";
// import Chip from "@mui/material/Chip";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import East from "@mui/icons-material/East";
// import { format } from "date-fns";

// // LOCAL CUSTOM COMPONENT
// import TableRow from "../table-row";

// // CUSTOM UTILS LIBRARY FUNCTION
// import { currency } from "lib";

// // CUSTOM DATA MODEL


// // =================================================


// // =================================================

// export default function OrderRow({
//   order
// }) {
//   const getColor = status => {
//     if (status === "Pending") return "secondary";else if (status === "Processing") return "info";else if (status === "Delivered") return "success";else if (status === "Cancelled") return "error";else return "default";
//   };
//   return <Link href={`/orders/${order.id}`}>
//       <TableRow sx={{
//       gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr"
//     }}>
//         <Typography noWrap variant="h5">
//           #{order.id.substring(0, 18)}
//         </Typography>

//         <Box textAlign="center">
//           <Chip size="small" label={order.status} color={getColor(order.status)} />
//         </Box>

//         <Typography variant="body1" sx={{
//         textAlign: {
//           sm: "center",
//           xs: "left"
//         }
//       }}>
//           {format(new Date(order.createdAt), "MMM dd, yyyy")}
//         </Typography>

//         <Typography variant="body1" sx={{
//         textAlign: "center"
//       }}>
//           {currency(order.totalPrice)}
//         </Typography>

//         <Box justifyContent="end" display={{
//         sm: "inline-flex",
//         xs: "none"
//       }}>
//           <IconButton>
//             <East className="east" fontSize="small" />
//           </IconButton>
//         </Box>
//       </TableRow>
//     </Link>;
// }