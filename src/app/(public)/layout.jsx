
// import api from "utils/__api__/layout";
// import ShopLayout1 from "components/layouts/shop-layout-1";

// export default async function PublicLayout({ children }) {
//   const data = await api.getLayoutData();
//   // console.log("public layout", data)
//   return <ShopLayout1 data={data}>{children}</ShopLayout1>;
// }

import api from "utils/__api__/layout";
import ShopLayout1 from "components/layouts/shop-layout-1";
import { Suspense } from "react";
import InlineLoader from "components/progress/InlineLoader";

// Layout is already optimized - getLayoutData returns empty object immediately
// Suspense boundaries allow progressive rendering
export default async function PublicLayout({ children }) {
  const data = await api.getLayoutData();
  // console.log("public layout", data)
  return <ShopLayout1 data={data}>
    <Suspense fallback={<InlineLoader size={40} />}> 
      {children}
    </Suspense>
  </ShopLayout1>;
}