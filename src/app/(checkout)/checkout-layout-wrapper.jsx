"use client";

import ShopLayout1 from "components/layouts/shop-layout-1";
import { Suspense } from "react";
import InlineLoader from "components/progress/InlineLoader";

export default function CheckoutLayoutWrapper({ children }) {
  return (
    <ShopLayout1>
      <Suspense fallback={<InlineLoader size={40} />}>
        {children}
      </Suspense>
    </ShopLayout1>
  );
}

