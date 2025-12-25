"use client";

import Grid from "@mui/material/Grid2";

// LOCAL CUSTOM COMPONENTS
import PaymentForm from "../payment-form";
import PaymentSummary from "../payment-summery";
import StripeWrapper from "components/StripeWrapper";
export default function PaymentPageView() {
  return <Grid container flexWrap="wrap-reverse" spacing={3}>
      <Grid size={{
      md: 12,
      xs: 12
    }}>
       <StripeWrapper>

        <PaymentForm />
       </StripeWrapper>
      </Grid>

      {/* <Grid size={{
      md: 4,
      xs: 12
    }}>
        <PaymentSummary />
        

      </Grid> */}
    </Grid>;
}