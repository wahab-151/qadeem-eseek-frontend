"use client";

import Container from "@mui/material/Container";

// LOCAL CUSTOM COMPONENTS
import BodyWrapper from "./dashboard-body-wrapper";
import DashboardNavbar from "./dashboard-navbar/dashboard-navbar";
import DashboardSidebar from "./dashboard-sidebar/dashboard-sidebar";

// LOCAL LAYOUT CONTEXT PROVIDER
import { LayoutProvider } from "./dashboard-layout-context";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { useAuth } from "contexts/AuthContext";
import { useSnackbar } from "notistack";
import { USERTYPE_ADMIN, USERTYPE_SALESPERSON } from "utils/constants";

export default function VendorDashboardLayout({ children }) {
  //making admin route rolebase and valid token-protected route
  // const { user, token } = useAuth();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return; // ensure this is only client-side

    // Add a small delay to ensure localStorage is available after page refresh
    const checkAuth = () => {
      let token = localStorage.getItem("auth-token");
      let userRole = localStorage.getItem("auth-user-role");

      // If either is missing, wait a bit and retry once (handles race conditions after page refresh)
      if (!token || !userRole) {
        setTimeout(() => {
          token = localStorage.getItem("auth-token");
          userRole = localStorage.getItem("auth-user-role");
          
          // Verify auth after retry
          verifyAuth(token, userRole);
        }, 100);
        return;
      }

      // We have both token and userRole, verify immediately
      verifyAuth(token, userRole);
    };

    const verifyAuth = (token, userRole) => {
      if (!token || !userRole) {
        enqueueSnackbar("Login to access Admin Panel!", { variant: "error" });
        router.push("/home");
        setIsCheckingAuth(false);
        return;
      }

      const isAdmin =
        userRole?.trim().toLowerCase() === USERTYPE_ADMIN.trim().toLowerCase();
      
      const isSalesPerson =
        userRole?.trim().toLowerCase() === USERTYPE_SALESPERSON.trim().toLowerCase();

      const isAuthorized = isAdmin || isSalesPerson;

      if (!isAuthorized) {
        enqueueSnackbar("Login to access Admin Panel!", { variant: "error" });
        router.push("/home");
        setIsCheckingAuth(false);
        return;
      }

      // Auth is valid
      setIsCheckingAuth(false);
    };

    checkAuth();
  }, [router, enqueueSnackbar]);


  return (
    <LayoutProvider>
      {/* DASHBOARD SIDEBAR NAVIGATION */}
      <DashboardSidebar />

      <BodyWrapper>
        {/* DASHBOARD HEADER / TOP BAR AREA */}
        <DashboardNavbar />

        {/* MAIN CONTENT AREA */}
        <Container maxWidth="lg">{children}</Container>
      </BodyWrapper>
    </LayoutProvider>
  );
}
