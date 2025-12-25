import { PaymentPageView } from "pages-sections/payment/page-view";
import { generateMetadata } from "utils/helpers";



export const metadata = generateMetadata("Payment");
export default function Payment() {
  return <PaymentPageView />;
}