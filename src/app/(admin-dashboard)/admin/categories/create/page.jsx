import { CreateCategoryPageView } from "pages-sections/admin-dashboard/categories/page-view";
import { Suspense } from "react";
export const metadata = {
  title: "SIFRA - Wholesale & Retail Store with Personalized Pricing",
  description: `SIFRA is a wholesale and retail e-commerce platform built with Next.js and React. Enjoy personalized pricing, exclusive discounts based on your profile, and bigger savings the more you shop. Perfect for bulk buyers, resellers, and smart shoppers.`,
  authors: [{
    name: "SIFRA",
    url: "https://www.sifrausa.com"
  }],
  keywords: [
    "wholesale e-commerce", 
    "retail store online", 
    "custom pricing shop", 
    "Next.js e-commerce", 
    "React e-commerce template", 
    "bulk discounts", 
    "profile-based discounts", 
    "multi-vendor platform", 
    "online wholesale shopping", 
    "personalized shopping experience"
  ]
};

export default function CreateCategory() {
  return (
    <Suspense fallback={null}>
      <CreateCategoryPageView />
    </Suspense>
  );
}