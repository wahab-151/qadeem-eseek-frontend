// import { useCallback } from 'react';
// import NProgress from 'nprogress';

// export const useProgressBar = () => {
//   const startProgress = useCallback(() => {
//     if (NProgress.status == null) {
//       NProgress.start();
//     }
//   }, []);

//   const finishProgress = useCallback(() => {
//     if (NProgress.status !== null) {
//       NProgress.done(true);
//     }
//   }, []);

//   const setProgress = useCallback((progress) => {
//     if (NProgress.status !== null) {
//       NProgress.set(progress);
//     }
//   }, []);

//   return {
//     startProgress,
//     finishProgress,
//     setProgress,
//   };
// };

// hooks/useProgressBar.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const useProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const startProgress = () => {
    // console.log("Starting progress bar"); // Debug
    setProgress(50); // Simulate progress start (adjust based on your ProgressBar component)
  };

  const finishProgress = () => {
    // console.log("Finishing progress bar"); // Debug
    setProgress(100);
    setTimeout(() => setProgress(0), 500); // Reset after completion
  };

  useEffect(() => {
    const handleRouteChangeStart = () => {
      startProgress();
    };
    const handleRouteChangeComplete = () => {
      finishProgress();
    };

    router.events?.on("routeChangeStart", handleRouteChangeStart);
    router.events?.on("routeChangeComplete", handleRouteChangeComplete);
    router.events?.on("routeChangeError", handleRouteChangeComplete);

    return () => {
      router.events?.off("routeChangeStart", handleRouteChangeStart);
      router.events?.off("routeChangeComplete", handleRouteChangeComplete);
      router.events?.off("routeChangeError", handleRouteChangeComplete);
    };
  }, [router]);

  return { startProgress, finishProgress, progress };
};