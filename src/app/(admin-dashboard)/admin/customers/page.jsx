import { CustomersPageView } from "pages-sections/admin-dashboard/customers/page-view";

// API FUNCTIONS
import api from "utils/__api__/dashboard";
export const metadata = {
  title: "QADEEM - Wholesale & Retail Store with Personalized Pricing",
  description: `QADEEM is a wholesale and retail e-commerce platform built with Next.js and React. Enjoy personalized pricing, exclusive discounts based on your profile, and bigger savings the more you shop. Perfect for bulk buyers, resellers, and smart shoppers.`,
  authors: [{
    name: "QADEEM",
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

export default async function Customers() {
  // const customers = await api.customers();
  return <CustomersPageView
  //  customers={customers} 
   />;
}