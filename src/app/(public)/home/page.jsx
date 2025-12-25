import GadgetOnePageView from "pages-sections/home/page-view";
import { generateMetadata } from "utils/helpers"
import { Suspense } from "react";
import InlineLoader from "components/progress/InlineLoader";

export const metadata = generateMetadata("SIFRA")

// Home page can be cached but should revalidate periodically
// Using 'auto' allows Next.js to optimize while still allowing dynamic updates
export const dynamic = 'auto';
export const revalidate = 3600; // Revalidate every hour

export default function GadgetShop() {
  // console.log("home called")
  // Suspense allows progressive rendering while sections load dynamically
  return (
    <Suspense fallback={<InlineLoader size={40} />}>
      <GadgetOnePageView />
    </Suspense>
  );
}