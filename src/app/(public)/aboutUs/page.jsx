// 'use client'
// import GadgetOnePageView from "pages-sections/home/page-view";
import { generateMetadata } from "utils/helpers"
import  AboutUsView  from "pages-sections/aboutUs/page-view";


export const metadata = generateMetadata("SIFRA")

export default function AboutUs() {
  return <AboutUsView />
}