// import GadgetOnePageView from "pages-sections/home/page-view";
import TermsView from "pages-sections/t&c/page-view/t&c";
import { generateMetadata } from "utils/helpers"



export const metadata = generateMetadata("SIFRA")

export default function PrivacyPolicy() {
  return <TermsView />;
}