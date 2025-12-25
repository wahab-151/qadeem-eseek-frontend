import { CardElement } from "@stripe/react-stripe-js";
import React, { forwardRef, useImperativeHandle } from "react";

import { Box } from "@mui/material";

const CreditCardForm = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    getCardElement: () => cardElement,
  }));

  let cardElement = null;

  return (
    <Box sx={{ border: "1px solid #ccc", borderRadius: 2, padding: 2, backgroundColor: "#fff" }}>
      <CardElement
        options={{
          hidePostalCode: true,
          style: {
            base: {
              fontSize: "16px",
              color: "#333",
              "::placeholder": { color: "#999" },
            },
            invalid: { color: "#E53935" },
          },
        }}
        onReady={(el) => { cardElement = el; }}
      />
    </Box>
  );
});

CreditCardForm.displayName = 'CreditCardForm';
export default CreditCardForm;




// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import Button from "@mui/material/Button";
// import Grid from "@mui/material/Grid2";
// import { useEffect } from "react";
// import { Box } from "@mui/material";
// import { useSnackbar } from "notistack";
// export default function CreditCardForm({ stripeToken, onToken }) {
//   const { enqueueSnackbar } = useSnackbar();
//   const stripe = useStripe();
//   const elements = useElements();
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;
//     const cardElement = elements.getElement(CardElement);
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: cardElement,
//     });
//     if (error) {
//       console.error("Stripe error:", error);
//       enqueueSnackbar('Card registration failed!', { variant: 'error' });
//       // alert(error.message);
//     } else {
//       onToken(paymentMethod.id); // send to parent (PaymentForm)
//       enqueueSnackbar('Card successfully added!', { variant: 'success' });
//     }
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <Grid container spacing={3} flexDirection="column">
//         <Grid item xs={12}>
//           <Box
//             sx={{
//               border: "1px solid #ccc",
//               borderRadius: 2,
//               padding: 2,
//               backgroundColor: "#fff",
//             }}
//           >
//             <CardElement
//               options={{
//                 hidePostalCode: true, // :white_check_mark: correct key for CardElement
//                 style: {
//                   base: {
//                     fontSize: "16px",
//                     color: "#333",
//                     "::placeholder": {
//                       color: "#999",
//                     },
//                   },
//                   invalid: {
//                     color: "#E53935",
//                   },
//                 },
//               }}
//             />
//           </Box>
//         </Grid>
//         <Grid item xs={12}>
//           <Box display="flex" justifyContent="flex-end">
//             <Button
//               variant="contained"
//               color="secondary"
//               type="submit"
//               disable={stripeToken}
//               sx={{
//                 width: "10rem",
//                 '&:hover': {
//                   backgroundColor: (theme) => theme.palette.primary.main,
//                 },
//               }}
//             >
//               Submit
//             </Button>
//           </Box>
//         </Grid>
//       </Grid>
//     </form>
//   );
// }






