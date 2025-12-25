import { ProductReviewsPageView } from "pages-sections/admin-dashboard/products/page-view";


import { generateMetadata } from "utils/helpers";
// API FUNCTIONS
import api from "utils/__api__/dashboard";





export const metadata = generateMetadata("Product review");
export default async function ProductReviews() {
  const reviews = await api.reviews();
  return <ProductReviewsPageView reviews={reviews} />;
}