import CheckoutLayoutWrapper from "./checkout-layout-wrapper";

// Route segment config to ensure proper chunk generation
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function CheckoutGroupLayout({ children }) {
  return <CheckoutLayoutWrapper>{children}</CheckoutLayoutWrapper>;
}