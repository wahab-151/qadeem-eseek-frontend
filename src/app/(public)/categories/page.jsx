import CategoriesPageView from "pages-sections/categories/page-view";
import { Suspense } from "react";
import InlineLoader from "components/progress/InlineLoader";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sifrausa.com';

export const metadata = {
  title: 'All Categories - QADEEM | Browse Product Categories',
  description: 'Browse all product categories at QADEEM. Find tools, parts, and supplies organized by category. Wholesale and retail with personalized pricing.',
  keywords: [
    'product categories',
    'wholesale categories',
    'retail categories',
    'tools',
    'parts',
    'supplies',
    'QADEEM',
  ],
  openGraph: {
    title: 'All Categories - SIFRA',
    description: 'Browse all product categories at SIFRA. Find tools, parts, and supplies organized by category.',
    type: 'website',
    url: `${SITE_URL}/categories`,
    siteName: 'SIFRA',
  },
  alternates: {
    canonical: `${SITE_URL}/categories`,
  },
};

export const dynamic = 'auto';
export const revalidate = 3600;

export default function CategoriesPage() {
  return (
    <Suspense fallback={<InlineLoader size={40} />}>
      <CategoriesPageView />
    </Suspense>
  );
}
