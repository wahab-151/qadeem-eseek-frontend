// components/StripeWrapper.js

'use client'

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


export default function StripeWrapper({ children }) {
  // console.log("process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  return <Elements stripe={stripePromise}>{children}</Elements>;
}
