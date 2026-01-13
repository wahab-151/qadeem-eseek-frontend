"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "@mui/material/styles/styled";
import clsx from "clsx";

// STYLED COMPONENT
const StyledLink = styled(Link, {
  shouldForwardProp: prop => prop !== "active"
})(({
  theme,
  active
}) => ({
  position: "relative",
  transition: "color 150ms ease-in-out",
  color: active ? theme.palette.primary.main : "inherit",
  fontWeight: active ? 700 : 400,
  "&:hover": {
    color: `${theme.palette.primary.main} !important`
  }
}));


// ==============================================================

// mobile mega menu sub child drop down
// ==============================================================

export default function NavLink({
  href,
  children,
  style,
  className,
  ...props
}) {
  const pathname = usePathname();

  
// // CHECK CURRENT ROUTE
  const isActive = () => {
    if (href === "/") return pathname === href || pathname === "/home";
    if (href === "/home") return pathname === "/home" || pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const active = isActive();
  
  return <StyledLink 
    href={href} 
    style={style} 
    className={clsx(className)} 
    active={active ? 1 : 0}
    data-active={active}
    {...props}
  >
     
     {children}
    </StyledLink>;
}