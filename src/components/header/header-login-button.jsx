"use client";

import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import useUser from "hooks/useUser";
import QadeemButton from "components/QadeemButton";

export default function HeaderLoginButton() {
  const router = useRouter();
  const theme = useTheme();
  const { state } = useUser();
  const user = state?.user;
  const [mounted, setMounted] = useState(false);

  // Fix hydration mismatch by only showing content after mount
  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Show placeholder during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <QadeemButton
        variant="contained"
        color="primary"
        onClick={() => {}}
        sx={{
          color: "#F5F5F0",
          px: 2.5,
          py: 1,
          fontSize: "0.875rem",
        }}
      >
        Log in
      </QadeemButton>
    );
  }

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

