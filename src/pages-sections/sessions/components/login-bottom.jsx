'use client'
import { Fragment } from "react";
import BoxLink from "./box-link";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import { useRouter } from "next/navigation";

export default function LoginBottom() {
  const router = useRouter();
  
  const handleResetPasswordClick = () => {
    // Start loader on reset password navigation
    try {
      if (typeof window !== 'undefined' && window.NProgress) {
        window.__navTriggerType = 'reset-password-nav';
        window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
        window.__startTimeRef && (window.__startTimeRef.current = Date.now());
        window.NProgress.start();
      }
    } catch {}
    router.push("/reset-password");
  };
  
  return <Fragment>
      {/* DON'T HAVE ACCOUNT AREA */}
      <FlexRowCenter gap={1} my={3}>
        Don&apos;t have account?
        <BoxLink title="Register" href="/register" />
      </FlexRowCenter>

      {/* FORGET YOUR PASSWORD AREA */}
      <FlexBox gap={1} py={2} borderRadius={1} justifyContent="center" bgcolor="grey.200">
        Forgot your password?
        {/* <BoxLink title="Reset It" href="/reset-password" /> */}
        <span style={{cursor: "pointer" , borderBottom: "1px solid"}} onClick={handleResetPasswordClick}>Reset Password</span>
        
      </FlexBox>
    </Fragment>;
}