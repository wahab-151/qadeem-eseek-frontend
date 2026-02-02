"use client";

import { usePathname } from "next/navigation";

// MUI ICON COMPONENTS
import CreditCard from "@mui/icons-material/CreditCard";
import SupportAgent from "@mui/icons-material/SupportAgent";
import PlaceOutlined from "@mui/icons-material/PlaceOutlined";
import PersonOutlined from "@mui/icons-material/PersonOutlined";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";

import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import useUser from "hooks/useUser";
import useCart from "hooks/useCart";
import QadeemButton from "components/QadeemButton";
import { logoutUser } from "utils/helpers";
import LogoutDialog from "components/LogoutDialog";

// STYLED COMPONENTS
import { StyledLink } from "./styles";
const icons = {
  CreditCard,
  SupportAgent,
  PlaceOutlined,
  PersonOutlined,
  FavoriteBorder,
  ShoppingBagOutlined,
  AccountCircleOutlined,
  LogoutOutlined,
};

export default function NavItem({ item }) {
  const { href, icon, title, count } = item;
  const pathname = usePathname();
  const router = useRouter();
  const { dispatch: userDispatch } = useUser();
  const { dispatch: cartDispatch } = useCart();
  const rtkQueryDispatch = useDispatch();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const Icon = icons[icon];
  const isLogout = title === "Log Out";

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setLogoutDialogOpen(true);
  };

  const confirmLogout = () => {
    setLogoutDialogOpen(false);
    logoutUser(router, userDispatch, cartDispatch, rtkQueryDispatch);
  };

  const cancelLogout = () => {
    setLogoutDialogOpen(false);
  };

  const handleClick = () => {
    // Start loader on customer dashboard navigation click
    try {
      if (typeof window !== "undefined" && window.NProgress) {
        window.__navTriggerType = "customer-dashboard-nav";
        window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
        window.__startTimeRef && (window.__startTimeRef.current = Date.now());
        window.NProgress.start();
      }
    } catch {}
  };

  return (
    <>
      <StyledLink
        href={isLogout ? "#" : href}
        key={title}
        isActive={!isLogout && pathname === href}
        onClick={isLogout ? handleLogoutClick : handleClick}
        sx={
          isLogout
            ? {
                color: "error.main",
                "&:hover": {
                  color: "error.main",
                },
              }
            : {}
        }
      >
        <div className="title" style={{ paddingLeft: "5px" }}>
          <span
            style={{
              fontSize: "16px",
              color: "inherit",
            }}
          >
            {title}
          </span>
        </div>

        {count ? <span>{count}</span> : null}
      </StyledLink>

      <LogoutDialog
        open={logoutDialogOpen}
        handleClose={cancelLogout}
        confirmLogout={confirmLogout}
      />
    </>
  );
}
