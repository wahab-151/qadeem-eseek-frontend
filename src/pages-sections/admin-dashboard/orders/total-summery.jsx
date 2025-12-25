import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// GLOBAL CUSTOM COMPONENTS
import { FlexBetween, FlexBox } from "components/flex-box";

// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";

// ==============================================================

// ==============================================================

export default function TotalSummery({
  total,
  // discount,
  // orderdiscount,
  // onDiscountChange,
  shippingFees,
  onShippingChange,
  orderStatus,
  shippingMethod,
}) {
  return (
    <Card
      sx={{
        px: 3,
        py: 4,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 2,
        }}
      >
        Total Summary
      </Typography>

      <FlexBetween mb={1.5}>
        <Typography
          variant="body1"
          sx={{
            color: "grey.600",
          }}
        >
          Subtotal:
        </Typography>
        <Typography variant="h6">{currency(total)}</Typography>
      </FlexBetween>

      <FlexBetween mb={1.5}>
        <Typography
          variant="body1"
          sx={{
            color: "grey.600",
          }}
        >
          Shipping method:
        </Typography>
        <Typography variant="h6" style={{ textTransform: "capitalize" }}>{shippingMethod || "N/A"}</Typography>
      </FlexBetween>

      <FlexBetween mb={1.5}>
        <Typography
          variant="body1"
          sx={{
            color: "grey.600",
          }}
        >
          Shipping fee:
        </Typography>

        <FlexBox alignItems="center" gap={1} maxWidth={140}>
          <p>$</p>
          <TextField
            disabled={orderStatus !== "Pending"}
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "black",
                color: "black",
              },
              "& .MuiInputLabel-root.Mui-disabled": {
                color: "black",
              },
              "& .MuiOutlinedInput-root": {
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: orderStatus === "Pending" ? "primary.main" : "transparent",
                },
              },
            }}
            value={shippingFees}
            type="number"
            onChange={(e) => onShippingChange && onShippingChange(Number(e.target.value))}
            inputProps={{
              min: 0,
              step: 0.01,
            }}
            size="small"
          />
        </FlexBox>
      </FlexBetween>

      {/* <FlexBetween mb={1.5}> */}
      {/* <Typography variant="body1" sx={{
        color: "grey.600"
      }}>
        Discount(%):
      </Typography>

      <FlexBox alignItems="center" gap={1} maxWidth={100}>
        <p>$</p>
        {/* <TextField color="info" defaultValue={discount} type="number" fullWidth /> */}
      {/* <TextField
          defaultValue={discount}
          type="number"
          onChange={(e) => onDiscountChange(Number(e.target.value))}
        /> */}
      {/* </FlexBox> */}
      {/* // </FlexBetween> */}

      <Divider
        sx={{
          my: 2,
        }}
      />

      <FlexBetween mb={2}>
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6">{currency(total+shippingFees)}</Typography>
      </FlexBetween>

      {/* <p>Paid by Credit/Debit Card</p> */}
    </Card>
  );
}
