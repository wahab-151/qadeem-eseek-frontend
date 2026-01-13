"use client";

import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import useUser from "hooks/useUser";
import QadeemButton from "components/QadeemButton";

export default function HeaderLoginButton() {
  const router = useRouter();
  const theme = useTheme();
  const { state } = useUser();
  const user = state?.user;

  const handleClick = () => {
    if (user?.id) {
      // If user is logged in, navigate to their dashboard
      try {
        if (typeof window !== 'undefined' && window.NProgress) {
          window.__navTriggerType = 'header-login-dashboard';
          window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
          window.__startTimeRef && (window.__startTimeRef.current = Date.now());
          window.NProgress.start();
        }
      } catch {}
      router.push("/orders");
    } else {
      // If not logged in, navigate to login page
      try {
        if (typeof window !== 'undefined' && window.NProgress) {
          window.__navTriggerType = 'header-login';
          window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
          window.__startTimeRef && (window.__startTimeRef.current = Date.now());
          window.NProgress.start();
        }
      } catch {}
      router.push("/login");
    }
  };

  return (
    <QadeemButton
      variant="contained"
      color="primary"
      onClick={handleClick}
      sx={{
        color: "#F5F5F0", // Light off-white color
        px: 2.5,
        py: 1,
        fontSize: "0.875rem",
      }}
    >
      {user?.id ? "My Account" : "Log in"}
    </QadeemButton>
  );
}

