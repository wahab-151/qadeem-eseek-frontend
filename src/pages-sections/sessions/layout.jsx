"use client";
// LOCAL CUSTOM COMPONENTS
import LogoWithTitle from "./components/logo-title";
import SocialButtons from "./components/social-buttons";

// GLOBAL CUSTOM COMPONENTS
import FlexRowCenter from "components/flex-box/flex-row-center";

// COMMON STYLED COMPONENT
import { SignUpWrapper } from "./styles";
import Script from "next/script";
import useUser from "hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// ==============================================================

// ==============================================================

export default function AuthLayout({ children, bottomContent }) {
  console.log("AuthLayout children", children);
  const { state: userState } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (userState?.user?.id) {
      router.replace("/home");
    }
  }, [userState?.user?.id]);
  console.log("userState aut layout", userState?.user?.id);
  return (
    <FlexRowCenter
      // flexDirection="column"
      minHeight="100vh"
      px={2}
    >
      <SignUpWrapper elevation={6}>
        {/* LOGO WITH TITLE AREA */}
        <LogoWithTitle />
        <Script
          strategy="beforeInteractive"
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        />
        {/* FORM AREA */}
        {children}

        {/* SOCIAL BUTTON AREA */}
        {/* <SocialButtons /> */}

        {/* RENDER BOTTOM CONTENT BASED ON CONDITION */}
        {bottomContent}
      </SignUpWrapper>
    </FlexRowCenter>
  );
}
