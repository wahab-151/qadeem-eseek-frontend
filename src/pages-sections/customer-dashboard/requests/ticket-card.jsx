import Link from "next/link";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import East from "@mui/icons-material/East";
import { format } from "date-fns";

// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";
import Image from "next/image";
import { Box } from "@mui/material";

// CUSTOM DATA MODEL


// ==============================================================


// ==============================================================

export default function TicketCard({ ticket }) {
  const {
    id,
    slug,
    title,
    type,
    status,
    date,
    productImage,
    quantity,
    // category,
    price,
    reason,processedAt
  } = ticket;
   
console.log("ticket", ticket)
  return (
   
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 2,
          marginBottom: 2,
        }}
      >
        {/* PRODUCT IMAGE */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {productImage && (
            <Image
              src={productImage}
              alt={title}
              width={60}
              height={60}
              style={{ borderRadius: 8, objectFit: "cover" }}
            />
          )}

          <Box>
            {/* TITLE */}
            <Typography variant="body1" fontWeight={500}>
              {title}
            </Typography>

            {/* META */}
            <FlexBox alignItems="center" flexWrap="wrap" gap={1} mt={1}>
              <Chip
                label={type}
                size="small"
                color={type === "refund" ? "error" : "info"}
              />
              <Chip
                label={status}
                size="small"
                color={
                  status === "Pending"
                    ? "warning"
                    : status === "Approved"
                    ? "success"
                    : "default"
                }
              />
              <Typography variant="body2" sx={{ color: "grey.600" }}>
                {format(new Date(date), "MMM dd, yyyy")}
              </Typography>

              {quantity !== undefined && (
                <Typography variant="body2" sx={{ color: "grey.600" }}>
                  Qty: {quantity}
                </Typography>
              )}

              {price !== undefined && (
                <Typography variant="body2" sx={{ color: "grey.600" }}>
                  Price: ${price.toFixed(2)}
                </Typography>
              )}
{/* 
              <Typography variant="body2" sx={{ color: "grey.600" }}>
                Category: {category}
              </Typography> */}

              {reason && reason.trim() !== "" && (
                <Typography variant="body2" sx={{ color: "grey.600" }}>
                  Reason: {reason}
                </Typography>
              )}

              {/* <Typography variant="body2" sx={{ color: "grey.600" }}>
                Processed:{" "}
                {processedAt
                  ? format(new Date(processedAt), "MMM dd, yyyy")
                  : "Not processed yet"}
              </Typography> */}
            </FlexBox>
          </Box>
        </Box>
      </Card>

  );
}