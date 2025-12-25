// import GadgetOnePageView from "pages-sections/home/page-view";
import { generateMetadata } from "utils/helpers"
import PrivacyPolicyView from "pages-sections/privacyPolicy/page-view";


export const metadata = generateMetadata("SIFRA")

export default function PrivacyPolicy() {
  return <PrivacyPolicyView />;
}