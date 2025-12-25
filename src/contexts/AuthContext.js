
// "use client";

// import { createContext, useReducer, useEffect, useMemo, useContext } from "react";

// // ===========================================================
// // Initial Auth State
// const INITIAL_STATE = {
//   user: null,
//   token: null,
// };

// // ===========================================================
// // Auth Reducer
// const authReducer = (state, action) => {
//   switch (action.type) {
//     case "SET_USER":
//       return {
//         ...state,
//         user: action.payload,
//       };

//     case "SET_TOKEN":
//       return {
//         ...state,
//         token: action.payload,
//       };

//     case "LOGOUT":
//       return {
//         user: null,
//         token: null,
//       };

//     default:
//       return state;
//   }
// };

// // ===========================================================
// // Auth Context
// export const AuthContext = createContext({});

// // ===========================================================
// // Auth Provider
// export default function AuthProvider({ children }) {
//   const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

//   // ✅ Load from sessionStorage on mount
//   useEffect(() => {
//     const loadAuthData = () => {
//       const storedUserJson = sessionStorage.getItem("auth-user");
//       const storedToken = sessionStorage.getItem("auth-token");

//       if (storedUserJson) {
//         try {
//           dispatch({ type: "SET_USER", payload: JSON.parse(storedUserJson) });
//         } catch (err) {
//           console.error("Failed to parse stored user", err);
//         }
//       }

//       if (storedToken) {
//         dispatch({ type: "SET_TOKEN", payload: storedToken });
//       }
//     };

//     // Load immediately
//     loadAuthData();

//     // Also listen for storage events in case of multiple tabs
//     const handleStorageChange = (e) => {
//       if (e.key === "auth-token" || e.key === "auth-user") {
//         loadAuthData();
//       }
//     };

//     window.addEventListener("storage", handleStorageChange);
    
//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   // ✅ Persist to sessionStorage when user/token change
//   useEffect(() => {
//     if (state.user) {
//       sessionStorage.setItem("auth-user", JSON.stringify(state.user));
//       // keep role for quick access where only role is needed
//       if (state.user?.role) sessionStorage.setItem("auth-user-role", state.user.role);
//     } else {
//       sessionStorage.removeItem("auth-user");
//       sessionStorage.removeItem("auth-user-role");
//     }

//     if (state.token) {
//       sessionStorage.setItem("auth-token", state.token);
//     } else {
//       sessionStorage.removeItem("auth-token");
//     }
//   }, [state.user, state.token]);

//   // ✅ Memoized context value
//   const contextValue = useMemo(
//     () => ({
//       state,
//       dispatch,
//     }),
//     [state?.user?.id]
//   );

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

"use client";

import { createContext, useContext, useReducer, useEffect, useMemo } from "react";

const INITIAL_STATE = {
  user: null,
  token: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "LOGOUT":
      return { user: null, token: null };
    default:
      return state;
  }
};

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  // Load from localStorage on mount + sync across tabs
  useEffect(() => {
    const loadAuth = () => {
      const userJson = localStorage.getItem("auth-user");
      const token = localStorage.getItem("auth-token");

      if (userJson) {
        try {
          dispatch({ type: "SET_USER", payload: JSON.parse(userJson) });
        } catch (e) {
          console.error("Failed to parse auth-user", e);
        }
      }
      if (token) {
        dispatch({ type: "SET_TOKEN", payload: token });
      }
    };

    loadAuth();

    const handleStorage = (e) => {
      if (e.key === "auth-user" || e.key === "auth-token") {
        loadAuth();
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Persist on change
  useEffect(() => {
    if (state.user) {
      localStorage.setItem("auth-user", JSON.stringify(state.user));
      if (state.user.role) {
        localStorage.setItem("auth-user-role", state.user.role);
      }
    } else {
      localStorage.removeItem("auth-user");
      localStorage.removeItem("auth-user-role");
    }

    if (state.token) {
      localStorage.setItem("auth-token", state.token);
    } else {
      localStorage.removeItem("auth-token");
    }
  }, [state.user, state.token]);

  const contextValue = useMemo(
    () => ({ state, dispatch }),
    [state, dispatch]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Optional hook
export const useUser = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useUser must be used within AuthProvider");
  return context;
};