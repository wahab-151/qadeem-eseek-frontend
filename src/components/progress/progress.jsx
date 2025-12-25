
// https://github.com/apal21/nextjs-progressbar/issues/86

"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import NProgress from "nprogress";
import useTheme from "@mui/material/styles/useTheme";
import GlobalStyles from "@mui/material/GlobalStyles";
import "nprogress/nprogress.css";

export default function ProgressBar() {
  const theme = useTheme();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const lastBaseUrlRef = useRef("");
  const safetyTimeoutRef = useRef(null);
  const isNavigatingRef = useRef(false);
  const startTimeRef = useRef(0);

  // Setup global triggers for starting the loader
  useEffect(() => {
    NProgress.configure({ showSpinner: false, minimum: 0.08, trickleSpeed: 200 });

    const getBaseUrl = (urlString) => {
      const url = new URL(urlString, window.location.href);
      return `${url.origin}${url.pathname}${url.search}`;
    };

    const startIfNotStarted = () => {
      // Avoid double-starts causing flicker
      if (NProgress.status == null && !isNavigatingRef.current) {
        isNavigatingRef.current = true;
        startTimeRef.current = Date.now();
        NProgress.start();
        if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
        safetyTimeoutRef.current = setTimeout(() => {
          NProgress.done(true);
          isNavigatingRef.current = false;
        }, 3000);
      }
    };

    // Make NProgress globally available for instant triggering
    if (typeof window !== 'undefined') {
      window.NProgress = NProgress;
      // Also expose the ref tracker so we can mark navigation as active
      window.__isNavigatingRef = isNavigatingRef;
      window.__startTimeRef = startTimeRef;
    }

    const handleAnchorClick = (event) => {
      const anchorElement = event.currentTarget;
      // Skip anchors with target attribute but different than _self
      if (anchorElement.target !== "_self" && anchorElement.target?.trim() !== "") return;
      // Skip anchors with download attribute
      if (anchorElement.hasAttribute("download")) return;
      // Do not start for hash-only navigations
      const currentBase = getBaseUrl(window.location.href);
      const targetBase = getBaseUrl(anchorElement.href);
      if (currentBase !== targetBase) {
        startIfNotStarted();
      }
    };

    const handleMutation = () => {
      const anchorElements = document.querySelectorAll("a[href]");
      anchorElements.forEach((anchor) => anchor.addEventListener("click", handleAnchorClick));
    };

    const mutationObserver = new MutationObserver(handleMutation);
    mutationObserver.observe(document, { childList: true, subtree: true });

    // Start ASAP on user intent (mousedown/touchstart) over anchors to avoid pre-click gap
    const findAnchor = (el) => {
      let node = el;
      for (let i = 0; i < 5 && node; i += 1) {
        if (node.tagName === 'A' && node.getAttribute('href')) return node;
        node = node.parentElement;
      }
      return null;
    };

    const onPointerIntent = (event) => {
      const anchor = findAnchor(event.target);
      if (!anchor) return;
      // same conditions as click handler
      if (anchor.target !== "_self" && anchor.target?.trim() !== "") return;
      if (anchor.hasAttribute("download")) return;
      const currentBase = getBaseUrl(window.location.href);
      const targetBase = getBaseUrl(anchor.href);
      if (currentBase !== targetBase) startIfNotStarted();
    };

    document.addEventListener('mousedown', onPointerIntent, { capture: true, passive: true });
    document.addEventListener('touchstart', onPointerIntent, { capture: true, passive: true });

    // Track generic fetch calls to keep progress accurate beyond axios
    const originalFetch = typeof window !== 'undefined' ? window.fetch : null;
    if (originalFetch) {
      window.fetch = async (...args) => {
        try {
          if (typeof window !== 'undefined') {
            window.__axiosActiveRequests = (window.__axiosActiveRequests || 0) + 1;
          }
          startIfNotStarted();
          const res = await originalFetch(...args);
          return res;
        } finally {
          if (typeof window !== 'undefined') {
            window.__axiosActiveRequests = Math.max((window.__axiosActiveRequests || 1) - 1, 0);
            const activeNow = window.__axiosActiveRequests || 0;
            if (activeNow <= 0) {
              NProgress.done(true);
              isNavigatingRef.current = false;
            }
          }
        }
      };
    }

    // Start progress on programmatic navigations
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = new Proxy(originalPushState, {
      apply: (target, thisArg, argArray) => {
        const currentBase = getBaseUrl(window.location.href);
        const newBase = getBaseUrl(argArray[2] || '');
        if (currentBase !== newBase) {
          startIfNotStarted();
        }
        return target.apply(thisArg, argArray);
      },
    });

    window.history.replaceState = new Proxy(originalReplaceState, {
      apply: (target, thisArg, argArray) => {
        const currentBase = getBaseUrl(window.location.href);
        const newBase = getBaseUrl(argArray[2] || '');
        if (currentBase !== newBase) {
          startIfNotStarted();
        }
        return target.apply(thisArg, argArray);
      },
    });

    // Start on back/forward only if base URL changes
    const onPopState = () => {
      const currentBase = getBaseUrl(window.location.href);
      if (lastBaseUrlRef.current && lastBaseUrlRef.current !== currentBase) startIfNotStarted();
    };
    window.addEventListener("popstate", onPopState);

    // Finish immediately on hash-only changes
    const onHashChange = () => NProgress.done(true);
    window.addEventListener("hashchange", onHashChange);

    // Initial scan for anchors
    handleMutation();

    // Avoid beforeunload to keep bfcache eligible
    const handleNextJSNavigation = () => {
      startIfNotStarted();
    };
    
    // Listen for route changes via Next.js router
    const originalAddEventListener = window.addEventListener;
    window.addEventListener = function(type, listener, options) {
      if (type === 'popstate' || type === 'pushstate' || type === 'replacestate') {
        const wrappedListener = function(event) {
          handleNextJSNavigation();
          if (listener) listener(event);
        };
        return originalAddEventListener.call(this, type, wrappedListener, options);
      }
      return originalAddEventListener.call(this, type, listener, options);
    };

    // Intercept Next.js router methods if available
    if (typeof window !== 'undefined' && window.next) {
      const originalRouter = window.next.router;
      if (originalRouter) {
        // Store original methods
        originalRouter._originalPush = originalRouter.push;
        originalRouter._originalReplace = originalRouter.replace;
        originalRouter._originalBack = originalRouter.back;
        originalRouter._originalForward = originalRouter.forward;

        originalRouter.push = function(...args) {
          startIfNotStarted();
          return originalRouter._originalPush.apply(this, args);
        };

        originalRouter.replace = function(...args) {
          startIfNotStarted();
          return originalRouter._originalReplace.apply(this, args);
        };

        originalRouter.back = function(...args) {
          startIfNotStarted();
          return originalRouter._originalBack.apply(this, args);
        };

        originalRouter.forward = function(...args) {
          startIfNotStarted();
          return originalRouter._originalForward.apply(this, args);
        };
      }
    }

    return () => {
      // Cleanup anchor listeners
      const anchorElements = document.querySelectorAll("a[href]");
      anchorElements.forEach((anchor) => anchor.removeEventListener("click", handleAnchorClick));
      mutationObserver.disconnect();

      // Restore original history methods
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;

      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("hashchange", onHashChange);
      // no beforeunload listener to preserve bfcache
      
      // Restore original addEventListener
      window.addEventListener = originalAddEventListener;
      // Remove pointer intent listeners
      document.removeEventListener('mousedown', onPointerIntent, { capture: true });
      document.removeEventListener('touchstart', onPointerIntent, { capture: true });
      // Restore original fetch
      if (originalFetch) {
        window.fetch = originalFetch;
      }
      
      // Restore Next.js router methods if they were intercepted
      if (typeof window !== 'undefined' && window.next && window.next.router) {
        const originalRouter = window.next.router;
        if (originalRouter._originalPush) {
          originalRouter.push = originalRouter._originalPush;
          originalRouter.replace = originalRouter._originalReplace;
          originalRouter.back = originalRouter._originalBack;
          originalRouter.forward = originalRouter._originalForward;
        }
      }
      
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
    };
  }, []);

  // Mark progress as done when route actually changes (pathname or search params)
  useEffect(() => {
    // Finish progress bar on route change only when there are no active network requests,
    // after at least a minimal duration, and after the next paint to avoid visual gaps
    const finishAfterPaint = () => {
      const minDuration = 100; // Reduced from 250ms to 100ms for faster rendering
      const elapsed = Date.now() - (startTimeRef.current || 0);
      const wait = Math.max(0, minDuration - elapsed);
      const end = () => {
        try {
          // Record navigation metric before finishing
          const trigger = (typeof window !== 'undefined' && window.__navTriggerType) || 'unknown';
          const from = (typeof window !== 'undefined' && window.__lastPathname) || '';
          const to = `${window.location.pathname}${window.location.search}`;
          const durationMs = Date.now() - (startTimeRef.current || Date.now());
          const metric = { trigger, from, to, durationMs, ts: Date.now() };
          if (typeof window !== 'undefined') {
            window.__navMetrics = Array.isArray(window.__navMetrics) ? window.__navMetrics : [];
            window.__navMetrics.push(metric);
            // Emit a custom event for listeners/analytics
            try {
              window.dispatchEvent(new CustomEvent('route-transition-complete', { detail: metric }));
            } catch {}
            // Optional dev-only log
            if (process.env.NODE_ENV === 'development') {
              // eslint-disable-next-line no-console
              console.log('[nav]', trigger, '→', to, `${durationMs}ms`);
            }
          }
          // Reset trigger after recording
          if (typeof window !== 'undefined') window.__navTriggerType = undefined;
        } catch {}
        NProgress.done(true);
        isNavigatingRef.current = false;
      };
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (wait > 0) setTimeout(end, wait); else end();
        });
      });
    };

    const active = typeof window !== 'undefined' ? (window.__axiosActiveRequests || 0) : 0;
    if (NProgress.status !== null && isNavigatingRef.current) {
      if (active <= 0) {
        finishAfterPaint();
      } else {
        const check = setInterval(() => {
          const currentActive = typeof window !== 'undefined' ? (window.__axiosActiveRequests || 0) : 0;
          if (currentActive <= 0) {
            clearInterval(check);
            finishAfterPaint();
          }
        }, 50);
        // Safety stop after 10s to avoid being stuck
        setTimeout(() => clearInterval(check), 10000);
      }
    }
    // Mark navigation change
    lastBaseUrlRef.current = `${window.location.origin}${pathname}${window.location.search}`;
    if (typeof window !== 'undefined') window.__lastPathname = lastBaseUrlRef.current;
  }, [pathname, searchParams]);

  return (
    <GlobalStyles
      styles={{
        "#nprogress": { pointerEvents: "none" },
        "#nprogress .bar": {
          top: 0,
          left: 0,
          height: 3,
          width: "100%",
          position: "fixed",
          zIndex: 9999999999,
          background: theme.palette.error.main,
        },
        "#nprogress .peg": {
          right: 0,
          opacity: 1,
          width: 100,
          height: "100%",
          display: "block",
          boxShadow: "none",
          position: "absolute",
          transform: "rotate(3deg) translate(0px, -4px)",
        },
      }}
    />
  );
}