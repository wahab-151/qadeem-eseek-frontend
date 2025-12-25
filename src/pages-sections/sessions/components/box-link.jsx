"use client";
import Link from "next/link";
import Box from "@mui/material/Box";


// ==============================================================


// ==============================================================

export default function BoxLink({
  href,
  title
}) {
  const handleClick = () => {
    // Start loader on navigation click
    try {
      if (typeof window !== 'undefined' && window.NProgress) {
        window.__navTriggerType = 'box-link-nav';
        window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
        window.__startTimeRef && (window.__startTimeRef.current = Date.now());
        window.NProgress.start();
      }
    } catch {}
  };
  
  return <Box href={href} component={Link} fontWeight={500} borderColor="grey.900" borderBottom="1px solid" onClick={handleClick}>
      {title}
    </Box>;
}