// 'use client';

// import useUser from "hooks/useUser";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import InlineLoader from "components/progress/InlineLoader";

const IndexPageView = dynamic(() => import("pages-sections/landing/page-view"), {
  ssr: true,
  loading: () => <InlineLoader size={40} />
});








export default function IndexPage() {



  return (
    <>
      <Suspense fallback={<InlineLoader size={40} />}>
        <IndexPageView />
      </Suspense>
    </>
  )
}