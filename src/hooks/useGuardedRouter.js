// "use client";

// import { useRouter } from "next/navigation";
// import { useRef, useCallback } from "react";

// // Global navigation state to prevent duplicate calls across all instances
// const globalNavigationState = {
//   inProgress: false,
//   lastRoute: null,
//   lastFullRoute: null, // Track full URL with query params for exact duplicate detection
//   lastTimestamp: 0,
//   pendingCallbacks: [],
// };

// // Debounce delay in milliseconds
// const NAVIGATION_DEBOUNCE_MS = 300;
// // Minimum time between navigations to the same route (increased for better duplicate prevention)
// const SAME_ROUTE_COOLDOWN_MS = 2000; // Increased from 1000ms to 2000ms

// /**
//  * Custom hook that provides guarded router methods to prevent duplicate navigation calls
//  * This hook wraps Next.js router with:
//  * - Debouncing to prevent rapid successive calls
//  * - Duplicate route prevention
//  * - Global state tracking across all hook instances
//  */
// export default function useGuardedRouter() {
//   const router = useRouter();
//   const instanceIdRef = useRef(Math.random().toString(36).substring(7));

//   /**
//    * Normalize route for comparison (remove trailing slashes, query params for comparison)
//    */
//   const normalizeRoute = useCallback((route) => {
//     if (typeof route === 'string') {
//       // Remove query params for comparison (but keep them for actual navigation)
//       const [path] = route.split('?');
//       return path.replace(/\/$/, '') || '/';
//     }
//     return route;
//   }, []);

//   /**
//    * Check if navigation should be allowed
//    */
//   const shouldAllowNavigation = useCallback((route, method) => {
//     const normalizedRoute = normalizeRoute(route);
//     const now = Date.now();
    
//     // Check if this is a critical user action (login, logout, checkout)
//     // These should bypass most restrictions to ensure immediate navigation
//     const isCriticalRoute = typeof route === 'string' && (
//       route.startsWith('/login') ||
//       route.startsWith('/logout') ||
//       route.startsWith('/checkout') ||
//       route.startsWith('/register')
//     );
    
//     // First check: If EXACT same route (including query params) was called very recently, block it
//     // This catches rapid clicks on the same link
//     // For critical routes, use shorter timeout (100ms vs 500ms)
//     const exactDuplicateTimeout = isCriticalRoute ? 100 : 500;
//     if (
//       globalNavigationState.lastFullRoute === route &&
//       (now - globalNavigationState.lastTimestamp) < exactDuplicateTimeout
//     ) {
//       console.log(`[RouteGuard] Exact duplicate ${method} call prevented (same URL):`, route, {
//         timeSince: now - globalNavigationState.lastTimestamp,
//       });
//       return false;
//     }
    
//     // Second check: If navigation is already in progress, block it
//     // For critical routes, allow if it's been more than 100ms
//     if (globalNavigationState.inProgress) {
//       if (isCriticalRoute && (now - globalNavigationState.lastTimestamp) > 100) {
//         // Allow critical routes after brief delay
//         return true;
//       }
//       console.log(`[RouteGuard] Navigation already in progress, blocking ${method} to:`, route);
//       return false;
//     }

//     // Third check: If same route path (without query) was called recently, prevent duplicate
//     // For critical routes, use shorter cooldown (500ms vs 2000ms)
//     const routeCooldown = isCriticalRoute ? 500 : SAME_ROUTE_COOLDOWN_MS;
//     if (
//       globalNavigationState.lastRoute === normalizedRoute &&
//       (now - globalNavigationState.lastTimestamp) < routeCooldown
//     ) {
//       console.log(`[RouteGuard] Duplicate ${method} call prevented (same path):`, route, {
//         lastCall: globalNavigationState.lastTimestamp,
//         timeSince: now - globalNavigationState.lastTimestamp,
//         cooldown: routeCooldown,
//       });
//       return false;
//     }

//     // Fourth check: If called too quickly after last navigation (debounce)
//     // For critical routes, use shorter debounce (100ms vs 300ms)
//     const debounceTimeout = isCriticalRoute ? 100 : NAVIGATION_DEBOUNCE_MS;
//     if ((now - globalNavigationState.lastTimestamp) < debounceTimeout) {
//       console.log(`[RouteGuard] ${method} call debounced to:`, route, {
//         timeSince: now - globalNavigationState.lastTimestamp,
//         debounce: debounceTimeout,
//       });
//       return false;
//     }

//     return true;
//   }, [normalizeRoute]);

//   /**
//    * Execute navigation with guard
//    */
//   const executeNavigation = useCallback(async (route, method, originalMethod) => {
//     const normalizedRoute = normalizeRoute(route);
//     const now = Date.now();

//     // State is already set in push/replace methods, just update normalized route
//     globalNavigationState.lastRoute = normalizedRoute;

//     console.log(`[RouteGuard] Executing ${method} to:`, route, {
//       instanceId: instanceIdRef.current,
//       timestamp: new Date().toISOString(),
//     });

//     try {
//       // Execute the actual navigation
//       const result = await originalMethod(route);
      
//       // Keep in progress flag longer to prevent rapid successive calls
//       // This helps prevent Next.js from making multiple RSC requests
//       setTimeout(() => {
//         globalNavigationState.inProgress = false;
//       }, Math.max(NAVIGATION_DEBOUNCE_MS, 500)); // At least 500ms

//       return result;
//     } catch (error) {
//       console.error(`[RouteGuard] Navigation error in ${method}:`, error);
//       // Reset in progress flag on error, but still keep timestamp to prevent immediate retry
//       setTimeout(() => {
//         globalNavigationState.inProgress = false;
//       }, 200);
//       throw error;
//     }
//   }, [normalizeRoute]);

//   /**
//    * Guarded push method
//    */
//   const push = useCallback(async (route, options) => {
//     // IMMEDIATE synchronous check before ANY operations - prevents race conditions
//     // This must be the FIRST check to catch duplicate calls before they can both set the flag
//     if (globalNavigationState.inProgress) {
//       console.log(`[RouteGuard] IMMEDIATE BLOCK: Navigation in progress, blocking push to:`, route);
//       return Promise.resolve();
//     }
    
//     // Check exact duplicate immediately (synchronous)
//     const now = Date.now();
//     if (
//       globalNavigationState.lastFullRoute === route &&
//       (now - globalNavigationState.lastTimestamp) < 500
//     ) {
//       console.log(`[RouteGuard] IMMEDIATE BLOCK: Exact duplicate detected, blocking push to:`, route);
//       return Promise.resolve();
//     }
    
//     // Check if navigation should be allowed BEFORE setting inProgress flag
//     // This prevents blocking navigation due to inProgress being set too early
//     if (!shouldAllowNavigation(route, 'push')) {
//       return Promise.resolve();
//     }
    
//     // Set flag IMMEDIATELY (synchronously) before any async operations
//     // This prevents the second call from even starting
//     globalNavigationState.inProgress = true;
//     globalNavigationState.lastFullRoute = route;
//     globalNavigationState.lastTimestamp = now;
    
//     try {
//       return executeNavigation(route, 'push', (r) => router.push(r, options));
//     } catch (error) {
//       // Reset flag on error
//       globalNavigationState.inProgress = false;
//       throw error;
//     }
//   }, [router, shouldAllowNavigation, executeNavigation]);

//   /**
//    * Guarded replace method
//    */
//   const replace = useCallback(async (route, options) => {
//     // IMMEDIATE synchronous check before ANY operations - prevents race conditions
//     if (globalNavigationState.inProgress) {
//       console.log(`[RouteGuard] IMMEDIATE BLOCK: Navigation in progress, blocking replace to:`, route);
//       return Promise.resolve();
//     }
    
//     // Check exact duplicate immediately (synchronous)
//     const now = Date.now();
//     if (
//       globalNavigationState.lastFullRoute === route &&
//       (now - globalNavigationState.lastTimestamp) < 500
//     ) {
//       console.log(`[RouteGuard] IMMEDIATE BLOCK: Exact duplicate detected, blocking replace to:`, route);
//       return Promise.resolve();
//     }
    
//     // Check if navigation should be allowed BEFORE setting inProgress flag
//     // This prevents blocking navigation due to inProgress being set too early
//     if (!shouldAllowNavigation(route, 'replace')) {
//       return Promise.resolve();
//     }
    
//     // Set flag IMMEDIATELY (synchronously) before any async operations
//     globalNavigationState.inProgress = true;
//     globalNavigationState.lastFullRoute = route;
//     globalNavigationState.lastTimestamp = now;
    
//     try {
//       return executeNavigation(route, 'replace', (r) => router.replace(r, options));
//     } catch (error) {
//       // Reset flag on error
//       globalNavigationState.inProgress = false;
//       throw error;
//     }
//   }, [router, shouldAllowNavigation, executeNavigation]);

//   /**
//    * Guarded back method (with debouncing)
//    */
//   const back = useCallback(() => {
//     const now = Date.now();
//     if (globalNavigationState.inProgress) {
//       console.log('[RouteGuard] Navigation in progress, skipping back()');
//       return;
//     }

//     if ((now - globalNavigationState.lastTimestamp) < NAVIGATION_DEBOUNCE_MS) {
//       console.log('[RouteGuard] back() call debounced');
//       return;
//     }

//     globalNavigationState.inProgress = true;
//     globalNavigationState.lastTimestamp = now;

//     console.log('[RouteGuard] Executing back()', {
//       instanceId: instanceIdRef.current,
//       timestamp: new Date().toISOString(),
//     });

//     router.back();

//     setTimeout(() => {
//       globalNavigationState.inProgress = false;
//     }, NAVIGATION_DEBOUNCE_MS);
//   }, [router]);

//   /**
//    * Guarded refresh method
//    */
//   const refresh = useCallback(() => {
//     const now = Date.now();
//     if (globalNavigationState.inProgress) {
//       console.log('[RouteGuard] Navigation in progress, skipping refresh()');
//       return;
//     }

//     if ((now - globalNavigationState.lastTimestamp) < NAVIGATION_DEBOUNCE_MS) {
//       console.log('[RouteGuard] refresh() call debounced');
//       return;
//     }

//     globalNavigationState.inProgress = true;
//     globalNavigationState.lastTimestamp = now;

//     console.log('[RouteGuard] Executing refresh()', {
//       instanceId: instanceIdRef.current,
//       timestamp: new Date().toISOString(),
//     });

//     router.refresh();

//     setTimeout(() => {
//       globalNavigationState.inProgress = false;
//     }, NAVIGATION_DEBOUNCE_MS);
//   }, [router]);

//   return {
//     push,
//     replace,
//     back,
//     refresh,
//     // Expose original router for cases where guard is not needed
//     router,
//   };
// }

"use client";

import { useRouter } from "next/navigation";
import { useRef, useCallback } from "react";

// ========================================================
// 🔧 GLOBAL STATE (shared across all hook instances)
// ========================================================
const globalState = {
  inProgress: false,
  lastRoute: null,
  lastFullRoute: null,
  lastTimestamp: 0,
};

// ========================================================
// ⚙️ CONFIG
// ========================================================
const DEBOUNCE_MS = 300;
const COOLDOWN_MS = 2000;
const EXACT_DUPLICATE_MS = 2000; // Increased from 500ms to prevent multiple RSC requests
const IN_PROGRESS_DURATION_MS = 1500; // Keep flag set longer to prevent rapid calls
const CRITICAL_ROUTES = ["/login", "/logout", "/checkout", "/register"];

// ========================================================
// 🧠 HELPER FUNCTIONS
// ========================================================
const isCritical = (route) =>
  typeof route === "string" && CRITICAL_ROUTES.some((p) => route.startsWith(p));

const normalize = (route) => {
  if (typeof route !== "string") return route;
  const [path] = route.split("?");
  return path.replace(/\/$/, "") || "/";
};

const allowNavigation = (route, method) => {
  const now = Date.now();
  const critical = isCritical(route);
  const exactTimeout = critical ? 100 : EXACT_DUPLICATE_MS; // Use longer timeout for non-critical routes
  const cooldown = critical ? 500 : COOLDOWN_MS;
  const debounce = critical ? 100 : DEBOUNCE_MS;
  const normalized = normalize(route);

  // 1️⃣ Prevent exact same route call (STRICT - longer timeout)
  if (
    globalState.lastFullRoute === route &&
    now - globalState.lastTimestamp < exactTimeout
  ) {
    console.log(`[RouteGuard] Blocked exact duplicate ${method}:`, route, {
      timeSince: now - globalState.lastTimestamp,
      timeout: exactTimeout,
    });
    return false;
  }

  // 2️⃣ Block if navigation already in progress (STRICT - no exceptions for non-critical)
  if (globalState.inProgress) {
    if (critical && now - globalState.lastTimestamp > 100) return true;
    console.log(`[RouteGuard] Blocked (in progress) ${method}:`, route, {
      timeSince: now - globalState.lastTimestamp,
    });
    return false;
  }

  // 3️⃣ Block same normalized route within cooldown window
  if (
    globalState.lastRoute === normalized &&
    now - globalState.lastTimestamp < cooldown
  ) {
    console.log(`[RouteGuard] Cooldown block ${method}:`, route, {
      timeSince: now - globalState.lastTimestamp,
      cooldown,
    });
    return false;
  }

  // 4️⃣ Debounce rapid calls
  if (now - globalState.lastTimestamp < debounce) {
    console.log(`[RouteGuard] Debounced ${method}:`, route, {
      timeSince: now - globalState.lastTimestamp,
      debounce,
    });
    return false;
  }

  return true;
};

const executeNavigation = async (route, method, callback) => {
  const critical = isCritical(route);
  // Keep inProgress flag set longer to prevent rapid successive calls
  // This helps prevent Next.js from making multiple RSC requests
  const resetDelay = critical ? 100 : IN_PROGRESS_DURATION_MS;

  console.log(`[RouteGuard] Executing ${method} to:`, route, {
    timestamp: new Date().toISOString(),
    resetDelay,
  });

  try {
    // Execute navigation and wait for it to complete
    const result = await callback(route);
    
    // Keep flag set longer to prevent rapid successive calls
    // This is critical to prevent Next.js from making multiple RSC requests
    setTimeout(() => {
      globalState.inProgress = false;
      console.log(`[RouteGuard] Reset inProgress flag for ${method}:`, route);
    }, resetDelay);
    
    return result;
  } catch (err) {
    // On error, reset flag but keep timestamp to prevent immediate retry
    setTimeout(() => {
      globalState.inProgress = false;
    }, Math.min(resetDelay, 500));
    console.error(`[RouteGuard] Error in ${method}:`, err);
    throw err;
  }
};

// ========================================================
// 🔍 EXPORTED HELPER: Check if navigation would be blocked
// ========================================================
/**
 * Synchronously check if a route would be blocked by the guard
 * Use this in components BEFORE calling push() to prevent unnecessary work
 */
export function wouldBlockNavigation(route) {
  const now = Date.now();
  
  // Check if navigation is in progress
  if (globalState.inProgress) {
    return { blocked: true, reason: 'in-progress', timeSince: now - globalState.lastTimestamp };
  }
  
  // Check exact duplicate
  if (
    globalState.lastFullRoute === route &&
    now - globalState.lastTimestamp < EXACT_DUPLICATE_MS
  ) {
    return { blocked: true, reason: 'exact-duplicate', timeSince: now - globalState.lastTimestamp };
  }
  
  // Check if allowNavigation would block it
  if (!allowNavigation(route, 'push')) {
    return { blocked: true, reason: 'not-allowed' };
  }
  
  return { blocked: false };
}

// ========================================================
// 🧩 MAIN HOOK
// ========================================================
export default function useGuardedRouter() {
  const router = useRouter();
  const idRef = useRef(Math.random().toString(36).slice(2));

  // Shared guarded method template
  const guardedNav = useCallback(
    async (method, route, options) => {
      const now = Date.now();

      // IMMEDIATE synchronous check - prevents race conditions
      if (globalState.inProgress) {
        console.log(`[RouteGuard] IMMEDIATE BLOCK: ${method} in progress →`, route, {
          timeSince: now - globalState.lastTimestamp,
        });
        return Promise.resolve();
      }

      // IMMEDIATE exact duplicate check - stricter timeout
      if (
        globalState.lastFullRoute === route &&
        now - globalState.lastTimestamp < EXACT_DUPLICATE_MS
      ) {
        console.log(`[RouteGuard] IMMEDIATE BLOCK: duplicate ${method} →`, route, {
          timeSince: now - globalState.lastTimestamp,
          timeout: EXACT_DUPLICATE_MS,
        });
        return Promise.resolve();
      }

      // Additional checks
      if (!allowNavigation(route, method)) {
        return Promise.resolve();
      }

      // Set flags IMMEDIATELY (synchronously) before any async operations
      // This prevents the second call from even starting
      globalState.inProgress = true;
      globalState.lastFullRoute = route;
      globalState.lastRoute = normalize(route);
      globalState.lastTimestamp = now;

      return executeNavigation(
        route,
        method,
        (r) => router[method](r, options)
      );
    },
    [router]
  );

  const push = useCallback((r, o) => guardedNav("push", r, o), [guardedNav]);
  const replace = useCallback((r, o) => guardedNav("replace", r, o), [guardedNav]);

  const back = useCallback(() => {
    const now = Date.now();
    if (globalState.inProgress || now - globalState.lastTimestamp < DEBOUNCE_MS)
      return console.log("[RouteGuard] back() debounced");
    globalState.inProgress = true;
    globalState.lastTimestamp = now;
    router.back();
    setTimeout(() => (globalState.inProgress = false), DEBOUNCE_MS);
  }, [router]);

  const refresh = useCallback(() => {
    const now = Date.now();
    if (globalState.inProgress || now - globalState.lastTimestamp < DEBOUNCE_MS)
      return console.log("[RouteGuard] refresh() debounced");
    globalState.inProgress = true;
    globalState.lastTimestamp = now;
    router.refresh();
    setTimeout(() => (globalState.inProgress = false), DEBOUNCE_MS);
  }, [router]);

  return { push, replace, back, refresh, router };
}
