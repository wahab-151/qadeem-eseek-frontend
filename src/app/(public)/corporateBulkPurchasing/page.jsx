// 'use client'
// import GadgetOnePageView from "pages-sections/home/page-view";
import CorporateBulkPurchasingView from "pages-sections/corporateBulkPurchasing"
import { generateMetadata } from "utils/helpers"


export const metadata = generateMetadata("SIFRA")

export default function CorporateBulkPurchasing() {
  return <CorporateBulkPurchasingView />
}