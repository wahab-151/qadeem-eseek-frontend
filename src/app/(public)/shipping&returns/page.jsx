// 'use client'
// import GadgetOnePageView from "pages-sections/home/page-view";
import { generateMetadata } from "utils/helpers"
import  ShippinInfo  from "pages-sections/shipping&returns/page-view";


export const metadata = generateMetadata("SIFRA")

export default function Shipping() {
  return <ShippinInfo />
}