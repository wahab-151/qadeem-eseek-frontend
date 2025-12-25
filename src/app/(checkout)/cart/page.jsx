import { CartPageView } from "pages-sections/cart/page-view";
import { generateMetadata } from "utils/helpers";

export const metadata = generateMetadata("Cart");

// Cart page is dynamic (user-specific content)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Cart() {
  return <CartPageView />;
}