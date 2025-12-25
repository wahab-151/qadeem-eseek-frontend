import AuthModal from "app/@modal/auth-modal";
import { generateMetadata } from "utils/helpers";

export const metadata = generateMetadata("Register");
export default function Register() {
  return <AuthModal />;
}