
// LOCAL CUSTOM COMPONENT
import ProductForm from "../product-form";
import PageWrapper from "../../page-wrapper";
import { Suspense } from "react";
export default function ProductCreatePageView() {
  return <PageWrapper title="Add New Product">
      {/* <ProductForm /> */}
      <Suspense fallback={<div>Loading form...</div>}>
        <ProductForm />
      </Suspense>
    </PageWrapper>;
}