"use client";

import Link from "next/link";
import Card from "@mui/material/Card";
import styled from "@mui/material/styles/styled";
export const MainContainer = styled(Card)(({ theme }) => ({
  width: 262,
  paddingBottom: "1.5rem",
  backgroundColor: "#FEFAF0", // Warm Cream
  borderRadius: "0px",
  boxShadow: "none",
  border: "none",
  overflow: "hidden",
  [theme.breakpoints.down("lg")]: {
    width: "100%",
    overflowY: "auto",
    height: "calc(100vh - 64px)",
  },
}));
export const StyledLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== "isActive",
})(({ theme, isActive }) => ({
  display: "inline-flex",
  alignItems: "center",
  padding: "12px 0",
  margin: "0 30px",
  justifyContent: "flex-start",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  color: "#6C7275",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: isActive ? "600" : "400",
  width: "calc(100% - 60px)",
  "& .title": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  },
  "& .nav-icon": {
    display: "none", // Design doesn't show icons in the sidebar list
  },
  "&:hover": {
    color: "#2C2416",
  },
  ...(isActive && {
    color: "#2C2416",
  }),
}));
