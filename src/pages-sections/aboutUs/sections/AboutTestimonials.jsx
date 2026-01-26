"use client";

import dynamic from "next/dynamic";
import InlineLoader from "components/progress/InlineLoader";

const Testimonials = dynamic(
  () => import("pages-sections/home/Testimonials"),
  { ssr: false, loading: () => <InlineLoader size={40} /> }
);

const CREAM_BG = "#F5F0E8";

export default function AboutTestimonials() {
  return <Testimonials backgroundColor={CREAM_BG} />;
}
