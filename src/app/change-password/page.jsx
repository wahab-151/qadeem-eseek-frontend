import { ChangePasswordForm, ResetPasswordPageView } from "pages-sections/sessions/page-view";
import { generateMetadata } from "utils/helpers";



export const metadata = generateMetadata("Change Password");

export default function ResetPassword() {
  return <ChangePasswordForm />;
}