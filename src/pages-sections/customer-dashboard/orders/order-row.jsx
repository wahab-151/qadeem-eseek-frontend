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

export default function OrderRow({ order }) {
  return (
    <Link
      href={`/orders/${order._id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", sm: "1.2fr 1.2fr 1fr 1fr" },
          rowGap: { xs: 1, sm: 0 },
          alignItems: "center",
          py: { xs: 2.5, sm: 3 },
          borderBottom: "1px solid #F0E9D9",
          transition: "background-color 0.2s",
          "&:hover": {
            backgroundColor: "#FEFAF0",
          },
        }}
      >
        <Box>
          <Typography
            variant="caption"
            sx={{ display: { sm: "none" }, color: "grey.600", mb: 0.5 }}
          >
            Number ID
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "500",
              color: "#2C2416",
              fontSize: "15px",
            }}
          >
            #{order._id.substring(order._id.length - 8).toUpperCase()}
          </Typography>
        </Box>

        <Box>
          <Typography
            variant="caption"
            sx={{ display: { sm: "none" }, color: "grey.600", mb: 0.5 }}
          >
            Dates
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#2C2416", fontSize: "15px" }}
          >
            {format(new Date(order?.createdAt), "MMMM dd, yyyy")}
          </Typography>
        </Box>

        <Box>
          <Typography
            variant="caption"
            sx={{ display: { sm: "none" }, color: "grey.600", mb: 0.5 }}
          >
            Status
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#2C2416",
              fontSize: "15px",
            }}
          >
            {order?.status}
          </Typography>
        </Box>

        <Box>
          <Typography
            variant="caption"
            sx={{ display: { sm: "none" }, color: "grey.600", mb: 0.5 }}
          >
            Price
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "500",
              color: "#2C2416",
              fontSize: "15px",
            }}
          >
            {currency(order?.amount)}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
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
