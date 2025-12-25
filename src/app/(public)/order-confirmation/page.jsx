import { OrderConfirmationPageView } from "pages-sections/order-confirmation";
import { generateMetadata } from "utils/helpers";




export const metadata = generateMetadata("Order Confirmation");
export default function OrderConfirmation() {
  return <OrderConfirmationPageView />;
}