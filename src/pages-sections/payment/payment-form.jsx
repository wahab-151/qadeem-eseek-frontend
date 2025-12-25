// "use client";
// import Link from "next/link";
// import { Fragment, useEffect, useState } from "react";
// // MUI
// import Card from "@mui/material/Card";
// import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
// import Divider from "@mui/material/Divider";
// import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import Checkbox from "@mui/material/Checkbox";
// import FormControlLabel from "@mui/material/FormControlLabel";
// // GLOBAL CUSTOM COMPONENTS
// import FlexBox from "components/flex-box/flex-box";
// // LOCAL CUSTOM COMPONENTS
// import FormLabel from "./form-label";
// import CreditCardForm from "./credit-card-form";
// import { usePlaceOrderMutation } from "app/store/services";
// import { useRouter } from "next/navigation";
// import useCart from "hooks/useCart";
// import StripeWrapper from "components/StripeWrapper";
// import CheckoutShipTo from "pages-sections/checkout/checkout-summery/checkoutShipTo";
// import CheckoutSummary from "pages-sections/checkout/checkout-summery";
// import CheckoutShippingMethod from "pages-sections/checkout/checkout-summery/checkoutShippingMethod";
// import useUser from "hooks/useUser";
// import { useSnackbar } from "notistack";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import { useRef } from "react";
// import { Avatar, Radio, RadioGroup } from "@mui/material";
// import Image from "next/image";
// import CardDisplay from "./cardDisplay";

// const cards = [
//   {
//     id: "pm_1XXX",
//     card: {
//       brand: "visa",
//       last4: "4242",
//       exp_month: 12,
//       exp_year: 2026,
//     },
//   },
//   {
//     id: "pm_2YYY",
//     card: {
//       brand: "master",
//       last4: "5555",
//       exp_month: 10,
//       exp_year: 2027,
//     },
//   },
//   {
//     id: "pm_3ZZZ",
//     card: {
//       brand: "visa",
//       last4: "1111",
//       exp_month: 8,
//       exp_year: 2025,
//     },
//   },
// ];

// export default function PaymentForm() {
//   const [paymentMethod, setPaymentMethod] = useState("credit-card");
//   const [stripeToken, setStripeToken] = useState(null);
//   const [placeOrder, { isLoading }] = usePlaceOrderMutation();
//   const { state, dispatch } = useCart();
//   const router = useRouter();
//   const [authUser, setAuthUser] = useState(null);
//   const [shippingAddress, setShippingAddress] = useState({});
//   const [billingAddress, setBillingAddress] = useState({});
//   const [comments, setComments] = useState("");
//   const [agreeTerms, setAgreeTerms] = useState(false);
//    const [selectedCard, setSelectedCard] = useState("");

//   //stripe
//   const stripe = useStripe();
//   const elements = useElements();
//   const creditCardRef = useRef();

//   const { enqueueSnackbar } = useSnackbar();

//   const { state: userState } = useUser();

//   useEffect(() => {
//     // const user = JSON.parse(sessionStorage.getItem("auth-user"));
//     if (userState?.user?.id) {
//       setAuthUser(userState?.user?.id);
//       const shipping = JSON.parse(sessionStorage.getItem("checkout-shipping"));
//       // console.log("shipping", shipping?.shippingMethod)
//       const billing = JSON.parse(sessionStorage.getItem("checkout-billing"));
//       if (shipping) setShippingAddress(shipping);
//       if (billing) setBillingAddress(billing);
//     }
//   }, [userState?.user?.id]);
//   // console.log("shipping in payment=====>", shippingAddress);

//   const handleSubmitOrder = async () => {
//     // console.log("user",authUser, "userstate", userState, "cart stare", state )
//     if (!authUser || !state?.cart[0]?.cartId) {
//       enqueueSnackbar("User or Cart missing.", { variant: "error" });
//       return;
//     }

//     if (!agreeTerms) {
//       enqueueSnackbar("Please agree to the terms and conditions.", {
//         variant: "error",
//       });
//       return;
//     }

//     let paymentMethodId = paymentMethod;

//     // if (paymentMethod === "credit-card") {
//     //   if (!stripe || !elements) {
//     //     enqueueSnackbar("Stripe not loaded.", { variant: "error" });
//     //     return;
//     //   }

//     //   const cardElement = elements.getElement(CardElement);

//     //   const { error, paymentMethod } = await stripe.createPaymentMethod({
//     //     type: "card",
//     //     card: cardElement,
//     //   });

//     //   if (error) {
//     //     enqueueSnackbar(error.message || "Card error", { variant: "error" });
//     //     return;
//     //   }

//     //   paymentMethodId = paymentMethod.id; // use the generated payment method ID
//     // }

// if (paymentMethod === "credit-card") {
//   if (selectedCard === "new") {
//     if (!stripe || !elements) {
//       enqueueSnackbar("Stripe not loaded.", { variant: "error" });
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: cardElement,
//     });

//     if (error) {
//       enqueueSnackbar(error.message || "Card error", { variant: "error" });
//       return;
//     }

//     paymentMethodId = paymentMethod.id;
//   } else if (selectedCard) {
//     // It's a saved Stripe payment method ID
//     paymentMethodId = selectedCard;
//   } else {
//     enqueueSnackbar("Please select or enter a card.", { variant: "error" });
//     return;
//   }
// }

//     const payload = {
//       cart: state?.cart[0]?.cartId,
//       paymentMethodId,
//       shippingAddress,
//       billingAddress,
//       paymentMethod,
//       shippingMethod: shippingAddress?.shippingMethod || "ground",
//       userComments: comments,
//     };

//     try {
//       const res = await placeOrder(payload).unwrap();
//       console.log("Order Placed:", res);
//       router.push("/order-confirmation");
//       // router.push("/orders");
//       dispatch({ type: "CLEAR_CART" });

//       dispatch({ type: "CLEAR_CART" }); // Only clear cart on success
//     } catch (err) {
//       console.error("Order Failed:", err);
//       enqueueSnackbar("Order failed. Try again.", { variant: "error" });
//     }
//   };


 

//   const handleChange = (event) => {
//     setSelectedCard(event.target.value);
//   };

//   const getBrandIcon = (brand) => {
//     switch (brand.toLowerCase()) {
//       case "visa":
//         return "/assets/images/payment-methods/visacard.png";
//       case "mastercard":
//         return "/assets/images/payment-methods/mastercard.png";
//       default:
//         return "/icons/credit-card.png";
//     }
//   };

//   return (
//     <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
//       {/* Left Column - Payment Methods */}
//       <Box flex={1} sx={{ backgroundColor: "#FFFFFF" }}>
//         {/* <Typography variant="h6" mb={2}>Shipping  Review & Payments</Typography> */}
//         <Typography
//           variant="h6"
//           mb={2}
//           sx={{
//             px: 2,
//             py: 1,
//             marginLeft: 2,
//             marginRight: 2,
//             bgcolor: "#F3F5F9",
//             color: "text.primary",
//             borderRadius: 8,
//             fontSize: "1.20rem",
//             fontWeight: "bold",
//           }}
//         >
//           Payment Method
//         </Typography>
//         <Card sx={{ padding: 3, mb: 3, backgroundColor: "#FFFFFF" }}>
//           {/* <Typography variant="h6" mb={2}>Payment Methods</Typography> */}

//           {/* Credit Card */}
//           <Box
//             sx={{
//               boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
//               p: 3,
//               borderRadius: 3,
//               mb: 3,
//             }}
//           >
//             <FormLabel
//               name="credit-card"
//               title="Pay with credit card"
//               checked={paymentMethod === "credit-card"}
//               handleChange={(e) => setPaymentMethod(e.target.name)}
//             />
//             {/* Stripe form – shown only if selected */}
//             {paymentMethod === "credit-card" && selectedCard === "new" && (
//               // <Box sx={{ boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)", p: 3, borderRadius: 3, mb: 3 }}>
//               <>
//                 <CreditCardForm ref={creditCardRef} />
//               </>
//             )}
//           </Box>
//           <Box mb={2}>
//             <RadioGroup value={selectedCard} onChange={handleChange}>
//                <FormControlLabel
//     value="new"
//     control={<Radio />}
//     label="Use a New Credit Card"
//   />
//               <Box 
//               className="flex gap-4"
//               >
//                 {cards.map((card) => (
//                   <CardDisplay
//                     key={card.id}
//                     cardId={card.id}
//                     selectedCardId={selectedCard}
//                     onSelect={setSelectedCard}
//                     brand={card.card.brand}
//                     last4={card.card.last4}
//                     exp_month={card.card.exp_month}
//                     exp_year={card.card.exp_year}
//                   />
//                 ))}
//               </Box>
//             </RadioGroup>
//           </Box>

//           {/* PayPal */}
//           {/* <Box
//             sx={{
//               boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
//               p: 3,
//               borderRadius: 3,
//               mb: 3,
//             }}
//           >
//             <FormLabel
//               name="paypal"
//               title="PayPal Checkout"
//               checked={paymentMethod === "paypal"}
//               handleChange={(e) => setPaymentMethod(e.target.name)}
//             />
//           </Box> */}

//           {/* Cash on Delivery */}
//           {/* <Box
//             sx={{
//               boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
//               p: 3,
//               borderRadius: 3,
//               mb: 3,
//             }}
//           >
//             <FormLabel
//               name="cod"
//               title="Cash On Delivery"
//               checked={paymentMethod === "cod"}
//               handleChange={(e) => setPaymentMethod(e.target.name)}
//             />
//           </Box> */}
//           <Typography
//             variant="h6"
//             mb={2}
//             sx={{
//               px: 2,
//               py: 1,
//               bgcolor: "#F3F5F9",
//               color: "text.primary",
//               borderRadius: 8,
//               fontSize: "1.20rem",
//               fontWeight: "bold",
//             }}
//           >
//             Terms and conditions
//           </Typography>
//           <Box
//             sx={{
//               boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
//               p: 3,
//               borderRadius: 3,
//               mb: 3,
//             }}
//           >
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={agreeTerms}
//                   onChange={(e) => setAgreeTerms(e.target.checked)}
//                 />
//               }
//               label="Yes, I agree with the terms and conditions."
//             />
//           </Box>
//         </Card>
//         <Box mt={3}>
//           <Stack
//             direction="row"
//             spacing={2}
//             justifyContent="space-between"
//             sx={{ marginLeft: 3, marginRight: 3 }}
//           >
//             <Button
//               LinkComponent={Link}
//               href="/checkout"
//               variant="contained"
//               size="large"
//               // startIcon={<FileDownloadIcon />}
//               // onClick={exportToCSV}
//               sx={{
//                 px: 3,
//                 borderRadius: 10,
//                 color: "white",
//                 fontWeight: "bold",
//                 bgcolor: "black",
//                 "&:hover": { bgcolor: "black" },
//               }}
//             >
//               Back to Shipping
//             </Button>
//             <Button
//               variant="contained"
//               color="primary"
//               type="button"
//               onClick={() => {
//                 handleSubmitOrder();
//               }}
//               disabled={isLoading || !agreeTerms}
//               size="large"
//               // sx={{ flex: 1 }}
//               // variant="contained"
//               // size="large"
//               // startIcon={<FileDownloadIcon />}
//               // onClick={exportToCSV}
//               sx={{
//                 px: 3,
//                 borderRadius: 10,
//                 color: "white",
//                 fontWeight: "bold",
//                 bgcolor: "#5576FA",
//                 "&:hover": { bgcolor: "#405EDB" },
//               }}
//             >
//               {isLoading ? "Placing Order..." : "Place Order"}
//             </Button>
//           </Stack>
//         </Box>
//       </Box>
//       {/* Right Column - Order Summary */}
//       <Box width={{ xs: "100%", md: 350 }} flex="none">
//         <Card className="annie" sx={{ p: "8px !important" }}>
//           <Box>
//             <Typography
//               variant="h6"
//               mb={2}
//               sx={{
//                 px: 2,
//                 py: 1,
//                 bgcolor: "#F3F5F9",
//                 color: "text.primary",
//                 borderRadius: 8,
//                 fontSize: "1.20rem",
//                 fontWeight: "bold",
//               }}
//             >
//               Order Summary
//             </Typography>
//             <CheckoutSummary
//               url={"/payment"}
//               shipping={shippingAddress?.shippingMethod}
//             />
//           </Box>
//           <Typography
//             variant="h6"
//             mb={2}
//             sx={{
//               px: 2,
//               py: 1,
//               mt: 3,
//               bgcolor: "#F3F5F9",
//               color: "text.primary",
//               borderRadius: 8,
//               fontSize: "1.20rem",
//               fontWeight: "bold",
//             }}
//           >
//             Order Comment (optional)
//           </Typography>
//           <Box
//             sx={{
//               p: 3,
//               borderRadius: 4,
//               boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
//             }}
//           >
//             <TextField
//               fullWidth
//               multiline
//               value={comments}
//               rows={3}
//               placeholder="Type Your Comment"
//               onChange={(e) => setComments(e.target.value)}
//             />
//           </Box>
//           <Box mt={3}>
//             <Typography
//               variant="h6"
//               mb={2}
//               sx={{
//                 px: 2,
//                 py: 1,
//                 bgcolor: "#F3F5F9",
//                 color: "text.primary",
//                 borderRadius: 8,
//                 fontSize: "1.20rem",
//                 fontWeight: "bold",
//               }}
//             >
//               Ship To
//             </Typography>
//             <CheckoutShipTo checkoutData={shippingAddress} />
//           </Box>
//           <Box mt={3}>
//             <Typography
//               variant="h6"
//               mb={2}
//               sx={{
//                 px: 2,
//                 py: 1,
//                 bgcolor: "#F3F5F9",
//                 color: "text.primary",
//                 borderRadius: 8,
//                 fontSize: "1.20rem",
//                 fontWeight: "bold",
//               }}
//             >
//               Shipping Method
//             </Typography>
//             <CheckoutShippingMethod
//               selectedShippingMethod={shippingAddress?.shippingMethod}
//             />
//           </Box>
//         </Card>
//       </Box>
//     </Box>
//   );
// }


"use client";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
// MUI
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";
// LOCAL CUSTOM COMPONENTS
import FormLabel from "./form-label";
import CreditCardForm from "./credit-card-form";
import { useGetUserPaymentMethodQuery, usePlaceOrderMutation } from "app/store/services";
import { useRouter } from "next/navigation";
import useCart from "hooks/useCart";
import StripeWrapper from "components/StripeWrapper";
import CheckoutShipTo from "pages-sections/checkout/checkout-summery/checkoutShipTo";
import CheckoutSummary from "pages-sections/checkout/checkout-summery";
import CheckoutShippingMethod from "pages-sections/checkout/checkout-summery/checkoutShippingMethod";
import useUser from "hooks/useUser";
import { useSnackbar } from "notistack";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useRef } from "react";
import { Avatar, CircularProgress, Radio, RadioGroup } from "@mui/material";
import Image from "next/image";
import CardDisplay from "./cardDisplay";

const cards = [
  {
    id: "pm_123",
    card: {
      brand: "visa",
      last4: "4242",
      exp_month: 12,
      exp_year: 2026,
    },
  },
  {
    id: "pm_456",
    card: {
      brand: "master",
      last4: "5555",
      exp_month: 10,
      exp_year: 2027,
    },
  },
  {
    id: "pm_678",
    card: {
      brand: "visa",
      last4: "1111",
      exp_month: 8,
      exp_year: 2025,
    },
  },
];


// {
//     "success": true,
//     "message": "Payment methods fetched successfully",
//     "data": [
//         {
//             "stripePaymentMethodId": "pm_1RjI1WQuyILuVTbewYWUtzSP",
//             "brand": "visa",
//             "last4": "4242",
//             "exp_month": 4,
//             "exp_year": 2066,
//             "isDefault": true,
//             "_id": "pm_1RjI1WQuyILuVTbewYWUtzSP"
//         }
//     ]
// }

export default function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [stripeToken, setStripeToken] = useState(null);
  const [placeOrder, { isLoading }] = usePlaceOrderMutation();
  const { state, dispatch } = useCart();
  const router = useRouter();
  const [authUser, setAuthUser] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({});
  const [billingAddress, setBillingAddress] = useState({});
  const [comments, setComments] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
   const [selectedCard, setSelectedCard] = useState("");


  const { data, isLoading: getStripePayments, error, refetch } = useGetUserPaymentMethodQuery();

  console.log("getresponsefrom api",  data)



  const hasSavedCards = Array.isArray(data?.data) && data.data.length > 0;

  useEffect(() => {
    if (!getStripePayments && !hasSavedCards) {
      setSelectedCard("new");
    }
  }, [getStripePayments, hasSavedCards]);


  //stripe
  const stripe = useStripe();
  const elements = useElements();
  const creditCardRef = useRef();

  const { enqueueSnackbar } = useSnackbar();

  const { state: userState } = useUser();




  useEffect(() => {
    // const user = JSON.parse(sessionStorage.getItem("auth-user"));
    if (userState?.user?.id) {
      setAuthUser(userState?.user?.id);
      const shipping = JSON.parse(sessionStorage.getItem("checkout-shipping"));
      // console.log("shipping", shipping?.shippingMethod)
      const billing = JSON.parse(sessionStorage.getItem("checkout-billing"));
      if (shipping) setShippingAddress(shipping);
      if (billing) setBillingAddress(billing);
    }
  }, [userState?.user?.id]);
  // console.log("shipping in payment=====>", shippingAddress);

  const handleSubmitOrder = async () => {
    // console.log("user",authUser, "userstate", userState, "cart stare", state )
    if (!authUser || !state?.cart[0]?.cartId) {
      enqueueSnackbar("User or Cart missing.", { variant: "error" });
      return;
    }

    if (!agreeTerms) {
      enqueueSnackbar("Please agree to the terms and conditions.", {
        variant: "error",
      });
      return;
    }

    let paymentMethodId = paymentMethod;

    // if (paymentMethod === "credit-card") {
    //   if (!stripe || !elements) {
    //     enqueueSnackbar("Stripe not loaded.", { variant: "error" });
    //     return;
    //   }

    //   const cardElement = elements.getElement(CardElement);

    //   const { error, paymentMethod } = await stripe.createPaymentMethod({
    //     type: "card",
    //     card: cardElement,
    //   });

    //   if (error) {
    //     enqueueSnackbar(error.message || "Card error", { variant: "error" });
    //     return;
    //   }

    //   paymentMethodId = paymentMethod.id; // use the generated payment method ID
    // }

if (paymentMethod === "credit-card") {
  if (selectedCard === "new") {
    if (!stripe || !elements) {
      enqueueSnackbar("Stripe not loaded.", { variant: "error" });
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      enqueueSnackbar(error.message || "Card error", { variant: "error" });
      return;
    }

    paymentMethodId = paymentMethod.id;
  } else if (selectedCard) {
    // It's a saved Stripe payment method ID
    paymentMethodId = selectedCard;
  } else {
    enqueueSnackbar("Please select or enter a card.", { variant: "error" });
    return;
  }
}

    const payload = {
      cart: state?.cart[0]?.cartId,
      paymentMethodId,
      shippingAddress,
      billingAddress,
      paymentMethod,
      shippingMethod: shippingAddress?.shippingMethod || "ground",
      userComments: comments,
    };

    try {
      const res = await placeOrder(payload).unwrap();
      console.log("Order Placed:", res);
      router.push("/order-confirmation");
      // router.push("/orders");
      dispatch({ type: "CLEAR_CART" });

      dispatch({ type: "CLEAR_CART" }); // Only clear cart on success
    } catch (err) {
      console.error("Order Failed:", err);
      enqueueSnackbar("Order failed. Try again.", { variant: "error" });
    }
  };


 
 
  const handleChange = (event) => {
    setSelectedCard(event.target.value);

  };

  const getBrandIcon = (brand) => {
    switch (brand.toLowerCase()) {
      case "visa":
        return "/assets/images/payment-methods/visacard.png";
      case "mastercard":
        return "/assets/images/payment-methods/mastercard.png";
      default:
        return "/icons/credit-card.png";
    }
  };

  return (
    <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
      {/* Left Column - Payment Methods */}
      <Box flex={1} sx={{ backgroundColor: "#FFFFFF" }}>
        {/* <Typography variant="h6" mb={2}>Shipping  Review & Payments</Typography> */}
        <Typography
          variant="h6"
          mb={2}
          sx={{
            px: 2,
            py: 1,
            marginLeft: 2,
            marginRight: 2,
            bgcolor: "#F3F5F9",
            color: "text.primary",
            borderRadius: 8,
            fontSize: "1.20rem",
            fontWeight: "bold",
          }}
        >
          Payment Method
        </Typography>
        <Card sx={{ padding: 3, mb: 3, backgroundColor: "#FFFFFF" }}>
          {/* <Typography variant="h6" mb={2}>Payment Methods</Typography> */}

          {/* Credit Card */}
          <Box
            sx={{
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
              p: 3,
              borderRadius: 3,
              mb: 3,
            }}
          >
            <FormLabel
              name="credit-card"
              title="Pay with credit card"
              checked={paymentMethod === "credit-card"}
              handleChange={(e) => setPaymentMethod(e.target.name)}
            />
            {/* Stripe form – shown only if selected or no saved cards */}
            {paymentMethod === "credit-card" && (selectedCard === "new" || !hasSavedCards) && (
              // <Box sx={{ boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)", p: 3, borderRadius: 3, mb: 3 }}>
              <>
                <CreditCardForm ref={creditCardRef} />
              </>
            )}
          </Box>
          <Box mb={2}>
            <RadioGroup value={selectedCard} onChange={handleChange}>
               {hasSavedCards && (
                 <FormControlLabel
                   value="new"
                   control={<Radio />}
                   label="Use a New Credit Card"
                 />
               )}
              <Box 
              className="flex gap-4"
              >
              {getStripePayments ? (
                  <CircularProgress size={24} />
                  ) : (
                    hasSavedCards &&
                    data?.data?.map((card) => (
                      <CardDisplay
                        key={card._id}
                        cardId={card._id}
                        selectedCardId={selectedCard}
                        onSelect={setSelectedCard}
                        brand={card.brand}
                        last4={card.last4}
                        exp_month={card.exp_month}
                        exp_year={card.exp_year}
                      />
                    ))
                  )}

              </Box>
            </RadioGroup>
          </Box>

          {/* PayPal */}
          {/* <Box
            sx={{
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
              p: 3,
              borderRadius: 3,
              mb: 3,
            }}
          >
            <FormLabel
              name="paypal"
              title="PayPal Checkout"
              checked={paymentMethod === "paypal"}
              handleChange={(e) => setPaymentMethod(e.target.name)}
            />
          </Box> */}

          {/* Cash on Delivery */}
          {/* <Box
            sx={{
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
              p: 3,
              borderRadius: 3,
              mb: 3,
            }}
          >
            <FormLabel
              name="cod"
              title="Cash On Delivery"
              checked={paymentMethod === "cod"}
              handleChange={(e) => setPaymentMethod(e.target.name)}
            />
          </Box> */}
          <Typography
            variant="h6"
            mb={2}
            sx={{
              px: 2,
              py: 1,
              bgcolor: "#F3F5F9",
              color: "text.primary",
              borderRadius: 8,
              fontSize: "1.20rem",
              fontWeight: "bold",
            }}
          >
            Terms and conditions
          </Typography>
          <Box
            sx={{
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
              p: 3,
              borderRadius: 3,
              mb: 3,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
              }
              label="Yes, I agree with the terms and conditions."
            />
          </Box>
        </Card>
        <Box mt={3}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            sx={{ marginLeft: 3, marginRight: 3 }}
          >
            <Button
              LinkComponent={Link}
              href="/checkout"
              variant="contained"
              size="large"
              // startIcon={<FileDownloadIcon />}
              // onClick={exportToCSV}
              sx={{
                px: 3,
                borderRadius: 10,
                color: "white",
                fontWeight: "bold",
                bgcolor: "black",
                "&:hover": { bgcolor: "black" },
              }}
            >
              Back to Shipping
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="button"
              onClick={() => {
                handleSubmitOrder();
              }}
              disabled={isLoading || !agreeTerms}
              size="large"
              // sx={{ flex: 1 }}
              // variant="contained"
              // size="large"
              // startIcon={<FileDownloadIcon />}
              // onClick={exportToCSV}
              sx={{
                px: 3,
                borderRadius: 10,
                color: "white",
                fontWeight: "bold",
                bgcolor: "#5576FA",
                "&:hover": { bgcolor: "#405EDB" },
              }}
            >
              {isLoading ? "Placing Order..." : "Place Order"}
            </Button>
          </Stack>
        </Box>
      </Box>
      {/* Right Column - Order Summary */}
      <Box width={{ xs: "100%", md: 350 }} flex="none">
        <Card className="annie" sx={{ p: "8px !important" }}>
          <Box>
            <Typography
              variant="h6"
              mb={2}
              sx={{
                px: 2,
                py: 1,
                bgcolor: "#F3F5F9",
                color: "text.primary",
                borderRadius: 8,
                fontSize: "1.20rem",
                fontWeight: "bold",
              }}
            >
              Order Summary
            </Typography>
            <CheckoutSummary
              url={"/payment"}
              shipping={shippingAddress?.shippingMethod}
            />
          </Box>
          <Typography
            variant="h6"
            mb={2}
            sx={{
              px: 2,
              py: 1,
              mt: 3,
              bgcolor: "#F3F5F9",
              color: "text.primary",
              borderRadius: 8,
              fontSize: "1.20rem",
              fontWeight: "bold",
            }}
          >
            Order Comment (optional)
          </Typography>
          <Box
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            <TextField
              fullWidth
              multiline
              value={comments}
              rows={3}
              placeholder="Type Your Comment"
              onChange={(e) => setComments(e.target.value)}
            />
          </Box>
          <Box mt={3}>
            <Typography
              variant="h6"
              mb={2}
              sx={{
                px: 2,
                py: 1,
                bgcolor: "#F3F5F9",
                color: "text.primary",
                borderRadius: 8,
                fontSize: "1.20rem",
                fontWeight: "bold",
              }}
            >
              Ship To
            </Typography>
            <CheckoutShipTo checkoutData={shippingAddress} />
          </Box>
          <Box mt={3}>
            <Typography
              variant="h6"
              mb={2}
              sx={{
                px: 2,
                py: 1,
                bgcolor: "#F3F5F9",
                color: "text.primary",
                borderRadius: 8,
                fontSize: "1.20rem",
                fontWeight: "bold",
              }}
            >
              Shipping Method
            </Typography>
            <CheckoutShippingMethod
              selectedShippingMethod={shippingAddress?.shippingMethod}
            />
          </Box>
        </Card>
      </Box>
    </Box>
  );
}