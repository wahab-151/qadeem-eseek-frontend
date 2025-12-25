import Grid from "@mui/material/Grid2";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

// GLOBAL CUSTOM COMPONENTS
import FlexBetween from "components/flex-box/flex-between";

// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";

// CUSTOM DATA MODEL


// ==============================================================


// ==============================================================

function ListItem({
  title,
  value
}) {


  return <FlexBetween mb={1}>
      <Typography color="textSecondary" variant="body1">
        {title}
      </Typography>

      <Typography variant="h6">{value}</Typography>
    </FlexBetween>;
}
export default function OrderSummery({
  order
}) {

  // console.log("order summary",order)
  return <Grid container spacing={3}>
      {/* SHIPMENT ADDRESS SECTION */}
      <Grid size={{
      md: 6,
      xs: 12
    }}>
        <Card sx={{
        p: 3
      }}>
          <Typography variant="h5" sx={{
          mb: 2
        }}>
            Shipping Address 
          </Typography>

          <Typography variant="body1">
             {order?.shippingAddress?.shipping_name} <br/>
            {order?.shippingAddress?.shipping_address1} <br/>
            {order?.shippingAddress?.shipping_address2} <br/>
            {order?.shippingAddress?.shipping_zip}, {order?.shippingAddress?.shipping_city} <br/>
            {order?.shippingAddress?.country}



          </Typography>
        </Card>
      </Grid>

      {/* TOTAL SUMMERY SECTION */}
      <Grid size={{
      md: 6,
      xs: 12
    }}>
        <Card sx={{
        p: 3
      }}>
          <Typography variant="h5" sx={{
          mb: 2
        }}>
            Total Summary
          </Typography>

          <ListItem title="Subtotal:" value={currency(order?.amount - order?.shippingFee )} />
          <ListItem title="Shipping fee:" value={currency(order?.shippingFee)} />
          {/* <ListItem title="Discount:" value={currency(order?.discount)} /> */}

          <Divider sx={{
          mb: 1
        }} />

          <FlexBetween mb={2}>
            <Typography variant="h6"><b>Total</b></Typography>
            <Typography variant="h6"><b>{currency(order?.amount)}</b></Typography>
          </FlexBetween>

          {/* <p>Paid by Credit/Debit Card </p>  {/* <p>Paid by Credit/Debit Card </p> */}
        </Card>
      </Grid>
    </Grid>;
}