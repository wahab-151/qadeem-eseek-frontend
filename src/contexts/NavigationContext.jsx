"use client";

import { createContext, useContext, useCallback, useRef, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useProgressBar } from "hooks/useProgressBar";

const NavigationContext = createContext({});

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};

export const NavigationProvider = ({ children }) => {
  const { startProgress, finishProgress } = useProgressBar();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [previousPath, setPreviousPath] = useState(null);
  const currentPathRef = useRef(null);

  // Track pathname changes to store previous path
  useEffect(() => {
    const search = searchParams ? `?${searchParams.toString()}` : "";
    const currentUrl = `${pathname}${search}`;
    if (currentPathRef.current && currentPathRef.current !== currentUrl) {
      setPreviousPath(currentPathRef.current);
    }
    currentPathRef.current = currentUrl;
  }, [pathname, searchParams]);

  const navigateWithProgress = useCallback((href, options = {}) => {
    startProgress();
    // The progress will be finished by the route change detection in ProgressBar component
    return href;
  }, [startProgress]);

  const value = {
    navigateWithProgress,
    startProgress,
    finishProgress,
    previousPath,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};