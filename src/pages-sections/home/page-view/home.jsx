'use client'
import { Fragment } from "react";
import InlineLoader from "components/progress/InlineLoader";
import dynamic from "next/dynamic";
import SectionAboutSkeleton from "../section-about/section-about-skeleton";

// LOCAL CUSTOM COMPONENTS (dynamically loaded to reduce initial JS and prevent blocking route render)
// Keep SSR for above-the-fold content to improve LCP
const Section1 = dynamic(() => import("../section-1"));
const SectionAbout = dynamic(() => import("../section-about"), { 
  ssr: false, 
  loading: () => <SectionAboutSkeleton />
});
const Section2 = dynamic(() => import("../section-2"), { ssr: false, loading: () => <InlineLoader size={40} /> });
const Section3 = dynamic(() => import("../section-3"), { ssr: false, loading: () => <InlineLoader size={40} /> });
const Section4 = dynamic(() => import("../section-4"), { ssr: false, loading: () => <InlineLoader size={40} /> });
const Section5 = dynamic(() => import("../section-5"), { ssr: false, loading: () => <InlineLoader size={40} /> });
const SectionFeaturedTags = dynamic(() => import("../section-featured-tags/section-featured-tags"), { ssr: false, loading: () => <InlineLoader size={40} /> });
const Section6 = dynamic(() => import("../section-6"), { ssr: false, loading: () => <InlineLoader size={40} /> });
const Section7 = dynamic(() => import("../section-7"), { ssr: false, loading: () => <InlineLoader size={40} /> });
const Section8 = dynamic(() => import("../section-8"), { ssr: false, loading: () => <InlineLoader size={40} /> });
const Categoriescarousel = dynamic(() => import("../Categoriescarousel"), { ssr: false, loading: () => <InlineLoader size={40} /> });
import useProducts from "hooks/useProducts";

// import { useSelector } from "react-redux";
// ==============================================================
export default function GadgetOnePageView() {
  return <Fragment>
    {/* HERO SLIDER SECTION */}

    {/* MAIN PRODUCT CAROUSEL AND TOP PICK PRODUCTS AREA */}
    <Section1 />

    {/* ABOUT SECTION - QADEEM HANDICRAFT SHOP */}
    <SectionAbout />

    {/* FEATURED CATEGORIES AREA */}
    {/* <Section2 /> */}

    {/* DISCOUNT BANNER AREA */}
    {/* <Section3 /> */}

    {/* MOST VIEWED PRODUCTS AREA */}
    <Section4 />

    {/* FEATURED TAGS AREA */}
    <SectionFeaturedTags />

    {/* PROMOTION PRODUCTS */}
    <Section5 />

    {/* YOUTUBE BANNER AREA */}
    <Section6 />

    {/* BEST SELLING PRODUCTS AREA */}
    <Section8 />

    {/* CATEGORIES CAROUSEL AREA */}
    <Categoriescarousel />

    {/* OUR BLOG AREA */}
    <Section7 />

    {/* POPUP NEWSLETTER FORM */}
    {/* <Newsletter /> */}

    {/* SETTINGS IS USED ONLY FOR DEMO, YOU CAN REMOVE THIS */}
    {/* <Setting /> */}
  </Fragment>;
}