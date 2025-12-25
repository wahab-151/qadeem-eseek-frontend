import { WishListPageView } from "pages-sections/customer-dashboard/wish-list";
import { generateMetadata } from "utils/helpers";
// API FUNCTIONS
import { getWishListProducts } from "utils/__api__/wish-list";


export const metadata = generateMetadata("Wish List");


// ==============================================================


// ==============================================================

export default async function WishList({
  searchParams
}) {
  const {
    page
  } = await searchParams;
  const data = await getWishListProducts(+page || 1);
  if (!data || data.products.length === 0) {
    return <div>Data not found</div>;
  }
  return <WishListPageView products={data.products} totalPages={data.totalPages} />;
}