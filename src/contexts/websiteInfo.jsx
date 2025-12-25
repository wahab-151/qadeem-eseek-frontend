// "use client";

// import { createContext, useReducer, useMemo } from "react";

// // ======================== Initial Data =========================

// const INITIAL_WEBSITE_INFO_STATE = {
//   description: "",
//   aboutUs: "", // HTML string
//   shippingAndReturnPolicy: "", // HTML string (✅ updated key)
//   privacyPolicy: "", // HTML string
//   termsAndConditions: "", // HTML string (✅ updated key)
//   bulkPurchasing: "", // HTML string (✅ new key if used)
//   contact: {
//     phone: "",
//     email: "",
//     address: "",
//   },
//   socialLinks: {
//     facebook: "",
//     instagram: "",
//     tiktok: "",
//     twitter: "",
//     youtube: "",
//   },
//   loading: false,
// };

// // ========================== Reducer ============================

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "SET_WEBSITE_INFO":
//       return { ...state, ...action.payload };
//     case "SET_WEBSITE_INFO_LOADING":
//       return { ...state, loading: action.payload };
//     default:
//       return state;
//   }
// };

// // ========================= Context =============================

// export const WebsiteInfoContext = createContext({});

// // ======================== Provider =============================

// export default function WebsiteInfoProvider({ children }) {
//   const [state, dispatch] = useReducer(reducer, INITIAL_WEBSITE_INFO_STATE);

//   const contextValue = useMemo(() => ({ state, dispatch }), [state]);

//   return (
//     <WebsiteInfoContext.Provider value={contextValue}>
//       {children}
//     </WebsiteInfoContext.Provider>
//   );
// }
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";

// ==============================================================
// Initial State
// ==============================================================
const INITIAL_STATE = {
  description: "",
  aboutUs: "",
  shippingAndReturnPolicy: "",
  privacyPolicy: "",
  termsAndConditions: "",
  contact: {
    email: "",
    phone: "",
    address: "",
  },
  socialLinks: [],
  bulkPurchasing: null,
  homepageBanners: [], // Add homepageBanners to context
};

// ==============================================================
// Reducer
// ==============================================================
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_WEBSITE_INFO":
      return { ...state, ...action.payload };
    case "CLEAR_WEBSITE_INFO":
      return INITIAL_STATE;
    default:
      return state;
  }
};

// ==============================================================
// Context
// ==============================================================
export const WebsiteInfoContext = createContext({});

// Optional hook
export const useWebsiteInfo = () => {
  const context = useContext(WebsiteInfoContext);
  if (!context) {
    throw new Error("useWebsiteInfo must be used within WebsiteInfoProvider");
  }
  return context;
};

// ==============================================================
// Provider
// ==============================================================
export default function WebsiteInfoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const hasHydrated = useRef(false);

  // Load from localStorage only once
  useEffect(() => {
    if (typeof window === "undefined" || hasHydrated.current) return;

    try {
      const saved = localStorage.getItem("website-info");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          dispatch({ type: "SET_WEBSITE_INFO", payload: parsed });
        }
      }
    } catch (err) {
      console.error("[WebsiteInfoProvider] Failed to load from localStorage", err);
    } finally {
      hasHydrated.current = true;
    }
  }, []);

  // Persist to localStorage whenever state changes
  useEffect(() => {
    if (!hasHydrated.current) return;

    try {
      localStorage.setItem("website-info", JSON.stringify(state));
    } catch (err) {
      console.error("[WebsiteInfoProvider] Failed to save to localStorage", err);
    }
  }, [state]);

  // Memoized context value
  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  return (
    <WebsiteInfoContext.Provider value={contextValue}>
      {children}
    </WebsiteInfoContext.Provider>
  );
}