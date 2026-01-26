"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import FullScreenLoader from "components/loaders/FullScreenLoader";

export default function PublicPageLoader({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [minimumLoadingTime, setMinimumLoadingTime] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Reset loading state when route changes
    setIsLoading(true);
    setMinimumLoadingTime(true);

    // Ensure loader shows for at least 600ms for better UX
    const minTimer = setTimeout(() => {
      setMinimumLoadingTime(false);
    }, 600);

    // Wait for critical content to load
    const checkLoading = () => {
      // Check if the page is fully loaded
      if (document.readyState === 'complete') {
        setIsLoading(false);
      }
    };

    // Check immediately
    checkLoading();

    // Listen for load event
    window.addEventListener('load', checkLoading);
    
    // Also check on DOMContentLoaded for faster transition
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      setTimeout(() => setIsLoading(false), 100);
    }

    return () => {
      clearTimeout(minTimer);
      window.removeEventListener('load', checkLoading);
    };
  }, [pathname]); // Re-run when pathname changes

  // Show loader until both minimum time has passed AND page is loaded
  if (isLoading || minimumLoadingTime) {
    return <FullScreenLoader />;
  }

  return children;
}
