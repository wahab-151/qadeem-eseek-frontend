
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
import PublicPageLoader from "components/loaders/PublicPageLoader";

// Layout is already optimized - getLayoutData returns empty object immediately
// Suspense boundaries allow progressive rendering
export default async function PublicLayout({ children }) {
  const data = await api.getLayoutData();
  // console.log("public layout", data)
  return <ShopLayout1 data={data}>
    <PublicPageLoader>
      <Suspense fallback={null}> 
        {children}
      </Suspense>
    </PublicPageLoader>
  </ShopLayout1>;
}