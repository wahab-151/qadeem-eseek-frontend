"use client";

import { usePathname, useRouter } from "next/navigation";

// MUI
import MuiPagination from "@mui/material/Pagination";
import styled from "@mui/material/styles/styled";


// STYLED COMPONENT
export const StyledPagination = styled(MuiPagination)({
  display: "flex",
  marginTop: "2.5rem",
  justifyContent: "center"
});


// ==============================================================


// ==============================================================

export default function Pagination({
  count,
  page = 1
}) {
  const router = useRouter();
  const pathname = usePathname();
  if (count <= 1) return null;
  return <StyledPagination count={count} page={page} onChange={(_, newPage) => {
    const searchParams = new URLSearchParams();
    if (newPage === 1) searchParams.delete("page");else searchParams.set("page", newPage.toString());
    router.push(`${pathname}?${searchParams.toString()}`);
  }} />;
}