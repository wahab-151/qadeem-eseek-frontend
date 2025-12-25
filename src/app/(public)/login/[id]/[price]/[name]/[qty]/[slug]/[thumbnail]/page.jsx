
import { LoginPageView } from "pages-sections/sessions/page-view";
import { generateMetadata } from "utils/helpers";




export const metadata = generateMetadata("Login");
export default function Login({params}) {
    // const { id, price, name, qty, slug,} = params;
    // const thumbnail = decodeURIComponent(params.get("thumbnail") || "");
    return <LoginPageView />;
}