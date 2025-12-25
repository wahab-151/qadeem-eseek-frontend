"use client";

import { usePathname } from "next/navigation";

// MUI ICON COMPONENTS
import CreditCard from "@mui/icons-material/CreditCard";
import SupportAgent from "@mui/icons-material/SupportAgent";
import PlaceOutlined from "@mui/icons-material/PlaceOutlined";
import PersonOutlined from "@mui/icons-material/PersonOutlined";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";

// STYLED COMPONENTS
import { StyledLink } from "./styles";
const icons = {
  CreditCard,
  SupportAgent,
  PlaceOutlined,
  PersonOutlined,
  FavoriteBorder,
  ShoppingBagOutlined
};


// ==============================================================


// ==============================================================

export default function NavItem({
  item
}) {
  const {
    href,
    icon,
    title,
    count
  } = item;
  const pathname = usePathname();
  const Icon = icons[icon];
  
  const handleClick = () => {
    // Start loader on customer dashboard navigation click
    try {
      if (typeof window !== 'undefined' && window.NProgress) {
        window.__navTriggerType = 'customer-dashboard-nav';
        window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
        window.__startTimeRef && (window.__startTimeRef.current = Date.now());
        window.NProgress.start();
      }
    } catch {}
  };
  
  return <StyledLink href={href} key={title} isActive={pathname === href} onClick={handleClick}>
      <div className="title">
        <Icon color="inherit" fontSize="small" className="nav-icon" />
        <span>{title}</span>
      </div>

      {count ? <span>{count}</span> : null}
    </StyledLink>;
}