import AuthModal from "app/@modal/auth-modal";
import { generateMetadata } from "utils/helpers";

export const metadata = generateMetadata("ResetPassword");
export default function ResetPassword() {
  return <AuthModal />;
}