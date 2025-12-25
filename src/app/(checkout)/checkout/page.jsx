import CheckoutPageView from "pages-sections/checkout/page-view";
import { generateMetadata } from "utils/helpers";

export const metadata = generateMetadata("Checkout");

// Checkout page is dynamic (user-specific, cart-dependent)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Checkout() {
  return <CheckoutPageView />;
}