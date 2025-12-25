import AuthModal from "app/@modal/auth-modal";
import { generateMetadata } from "utils/helpers";

export const metadata = generateMetadata("Login");
export default function Login() {
  return <AuthModal />;
}