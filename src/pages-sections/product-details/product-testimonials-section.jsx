"use client";

import dynamic from "next/dynamic";

// Import the reusable Testimonials component
const Testimonials = dynamic(() => import("pages-sections/home/Testimonials"), {
  ssr: false,
});

export default function ProductTestimonialsSection() {
  return <Testimonials backgroundColor="#FEFAF0" />;
}

