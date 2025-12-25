// "use client";

// import { createContext, useMemo, useReducer, useEffect } from "react";
// import useUser from "hooks/useUser";


// const INITIAL_STATE = {
//   cart: [],
// };

// export const CartContext = createContext({});

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "CHANGE_CART_AMOUNT":
//       console.log("[CartReducer] CHANGE_CART_AMOUNT", {
//         prevCount: state.cart?.length,
//         payload: action.payload,
//       });
      
//       let cartList = state.cart;
//       let cartItem = action.payload;

//       // STEP 1: Check if any cart item is missing cartId
//       const hasEmptyCartId = cartList.some((item) => !item.cartId);
//       const existingCartId = cartList.find((item) => item.cartId)?.cartId;

//       if (hasEmptyCartId && existingCartId) {
//         // STEP 2: Assign cartId to all items that are missing it
//         cartList = cartList.map((item) =>
//           !item.cartId ? { ...item, cartId: existingCartId } : item
//         );
//       }

//       const existIndex = cartList.findIndex((item) => item.id === cartItem.id);

//       // Clamp quantity by available stock if provided
//       const maxStock = typeof cartItem.stock === "number" ? cartItem.stock : undefined;
//       if (maxStock !== undefined && cartItem.qty > maxStock) {
//         cartItem = { ...cartItem, qty: maxStock };
//       }

//       // REMOVE ITEM IF QUANTITY IS LESS THAN 1
//       if (cartItem.qty < 1) {
//         const updatedCart = cartList.filter((item) => item.id !== cartItem.id);
//         return {
//           ...state,
//           cart: updatedCart,
//         };
//       }

//       // IF PRODUCT ALREADY EXISTS IN CART
//       if (existIndex > -1) {
//         const updatedCart = [...cartList];
//         // Preserve all existing properties and update with new ones
//         updatedCart[existIndex] = {
//           ...updatedCart[existIndex],
//           ...cartItem,
//           qty: cartItem.qty,
//         };
//         if (maxStock !== undefined) {
//           updatedCart[existIndex].stock = maxStock;
//         }
//         return {
//           ...state,
//           cart: updatedCart,
//         };
//       }

//       return {
//         ...state,
//         cart: [...cartList, cartItem],
//       };

//     case "REMOVE_FROM_CART":
//       console.log("[CartReducer] REMOVE_FROM_CART", {
//         prevCount: state.cart?.length,
//         removeId: action.payload,
//       });
//       return {
//         ...state,
//         cart: state.cart.filter((item) => item.id !== action.payload),
//       };

//     case "CLEAR_CART":
//       console.log("[CartReducer] CLEAR_CART", { prevCount: state.cart?.length });
//       return {
//         ...state,
//         cart: [],
//       };

//     case "SET_CART":
//       const prevCount = state.cart?.length || 0;
//       const nextCount = Array.isArray(action.payload) ? action.payload.length : 0;
//       if (prevCount !== nextCount) {
//         console.log("[CartReducer] SET_CART", {
//           prevCount,
//           nextCount,
//         });
//       }
//       // Debug: Log SKU in payload
//       if (Array.isArray(action.payload) && action.payload.length > 0) {
//         console.log("[CartReducer] SET_CART payload with SKU:", 
//           action.payload.map(item => ({ id: item.id, sku: item.sku }))
//         );
//       }
//       return {
//         ...state,
//         cart: action.payload,
//       };

//     default:
//       return state;
//   }
// };

// export default function CartProvider({ children }) {
//   const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
//   const { state: userState } = useUser();
//   const user = userState?.user;

//   // ✅ Load cart from localStorage only if user exists AND cart is empty
//   // This prevents overwriting server cart that was just loaded
//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     if (user?.id) {
//       // Only load from localStorage if cart is empty
//       // This prevents overwriting server cart that was just loaded
//       if (state.cart?.length > 0) {
//         console.log("[CartProvider] Cart already has items, skipping localStorage load");
//         return;
//       }
      
//       try {
//         const savedCart = localStorage.getItem("cart");
//         if (savedCart) {
//           const parsed = JSON.parse(savedCart);
//           const items = Array.isArray(parsed) ? parsed : [];
          
//           // Normalize cart items
//           const normalized = items
//             .filter((item) => item && item.id)
//             .map((item) => {
//               const qty = Number(item.qty ?? item.quantity ?? 0);
//               const price = Number(item.price ?? 0);
//               return {
//                 ...item,
//                 qty: Number.isFinite(qty) ? qty : 0,
//                 price: Number.isFinite(price) ? price : 0,
//                 // Preserve SKU if it exists, otherwise default to empty string
//                 sku: item.sku !== undefined && item.sku !== null && item.sku !== "" ? String(item.sku) : "",
//                 user: item.user || user.id, // Ensure user ID is set
//               };
//             });

//           // Only load items that belong to current user
//           const userCartItems = normalized.filter(
//             (item) => !item.user || item.user === user.id
//           );

//           if (userCartItems.length > 0) {
//             console.log("[CartProvider] Loaded cart from localStorage", {
//               count: userCartItems.length,
//               userId: user.id,
//               itemsWithSku: userCartItems.filter(item => item.sku).length,
//             });
//             dispatch({ type: "SET_CART", payload: userCartItems });
//           }
//         }
//       } catch (err) {
//         console.error("[CartProvider] Error loading cart from localStorage", err);
//       }
//     } else {
//       // If user logs out or no user, clear cart everywhere
//       if (state.cart?.length > 0) {
//         dispatch({ type: "CLEAR_CART" });
//         try {
//           localStorage.removeItem("cart");
//           console.log("[CartProvider] Cleared cart - no user");
//         } catch (err) {
//           console.error("[CartProvider] Error clearing cart", err);
//         }
//       }
//     }
//   }, [user?.id, state.cart?.length]);

//   // ✅ Persist cart to localStorage on every change if user exists
//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     if (user?.id) {
//       try {
//         // Ensure all items have user ID and preserve SKU
//         const cartWithUser = state.cart.map((item) => {
//           // Debug: Log SKU before saving
//           console.log("[CartProvider] Saving item to localStorage:", {
//             id: item.id,
//             sku: item.sku,
//             skuType: typeof item.sku,
//             hasSku: item.sku !== undefined && item.sku !== null && item.sku !== "",
//           });
          
//           return {
//             ...item,
//             user: item.user || user.id,
//             // Ensure SKU is preserved when saving to localStorage
//             sku: item.sku !== undefined && item.sku !== null && item.sku !== "" ? String(item.sku) : "",
//           };
//         });
        
//         console.log("[CartProvider] Saving cart to localStorage with SKU:", 
//           cartWithUser.map(item => ({ id: item.id, sku: item.sku }))
//         );
        
//         localStorage.setItem("cart", JSON.stringify(cartWithUser));
//         if (state.cart.length > 0) {
//           console.log("[CartProvider] Saved cart to localStorage", {
//             count: state.cart.length,
//             userId: user.id,
//           });
//         }
//       } catch (err) {
//         console.error("[CartProvider] Error saving cart to localStorage", err);
//       }
//     } else {
//       // If no user, remove cart from localStorage
//       if (state.cart?.length > 0) {
//         try {
//           localStorage.removeItem("cart");
//         } catch (err) {
//           console.error("[CartProvider] Error removing cart from localStorage", err);
//         }
//       }
//     }
//   }, [state.cart, user?.id]);

//   const contextValue = useMemo(
//     () => ({
//       state,
//       dispatch,
//     }),
//     [state, dispatch]
//   );

//   return (
//     <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
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
import useUser from "hooks/useUser";

/* -------------------------- Initial State -------------------------- */
const INITIAL_STATE = {
  cart: [],
};

/* --------------------------- Reducer --------------------------- */
const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_CART_AMOUNT": {
      const cartItem = action.payload;
      let cartList = [...state.cart];

      // Fix missing cartId (same logic as original)
      const hasEmptyCartId = cartList.some((item) => !item.cartId);
      const existingCartId = cartList.find((item) => item.cartId)?.cartId;
      if (hasEmptyCartId && existingCartId) {
        cartList = cartList.map((item) =>
          !item.cartId ? { ...item, cartId: existingCartId } : item
        );
      }

      const existIndex = cartList.findIndex((item) => item.id === cartItem.id);
      const maxStock = typeof cartItem.stock === "number" ? cartItem.stock : Infinity;

      // Remove if qty < 1
      if (cartItem.qty < 1) {
        return {
          ...state,
          cart: cartList.filter((item) => item.id !== cartItem.id),
        };
      }

      const clampedQty = Math.min(cartItem.qty, maxStock);

      if (existIndex > -1) {
        cartList[existIndex] = {
          ...cartList[existIndex],
          ...cartItem,
          qty: clampedQty,
          stock: maxStock,
        };
      } else {
        cartList.push({ ...cartItem, qty: clampedQty, stock: maxStock });
      }

      return { ...state, cart: cartList };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "SET_CART":
      return { ...state, cart: action.payload };

    default:
      return state;
  }
};

/* --------------------------- Context --------------------------- */
export const CartContext = createContext(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

/* --------------------------- Provider --------------------------- */
export default function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { state: userState } = useUser();
  const user = userState?.user;

  // Prevent double hydration
  const hasHydrated = useRef(false);

  /* ------------------- Load + Save + Cleanup ------------------- */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const userId = user?.id;

    // --- Load from localStorage (only once, and only if cart is empty) ---
    const loadCart = () => {
      if (hasHydrated.current || !userId) return;

      try {
        const saved = localStorage.getItem("cart");
        if (!saved) return;

        const parsed = JSON.parse(saved);
        const items = Array.isArray(parsed) ? parsed : [];

        const normalized = items
          .filter((item) => item && item.id)
          .map((item) => ({
            ...item,
            qty: Number.isFinite(Number(item.qty ?? item.quantity))
              ? Number(item.qty ?? item.quantity)
              : 0,
            price: Number.isFinite(Number(item.price)) ? Number(item.price) : 0,
            sku:
              item.sku !== undefined && item.sku !== null && item.sku !== ""
                ? String(item.sku)
                : "",
            user: item.user || userId,
          }))
          .filter((item) => item.user === userId);

        if (normalized.length > 0 && state.cart.length === 0) {
          dispatch({ type: "SET_CART", payload: normalized });
        }
      } catch (err) {
        console.error("[CartProvider] Load error:", err);
      } finally {
        hasHydrated.current = true;
      }
    };

    // --- Save to localStorage ---
    const saveCart = () => {
      if (!userId) {
        localStorage.removeItem("cart");
        return;
      }

      try {
        const cartToSave = state.cart.map((item) => ({
          ...item,
          user: item.user || userId,
          sku:
            item.sku !== undefined && item.sku !== null && item.sku !== ""
              ? String(item.sku)
              : "",
        }));
        localStorage.setItem("cart", JSON.stringify(cartToSave));
      } catch (err) {
        console.error("[CartProvider] Save error:", err);
      }
    };

    // --- Clear on logout ---
    const clearCart = () => {
      if (state.cart.length > 0) {
        dispatch({ type: "CLEAR_CART" });
      }
      try {
        localStorage.removeItem("cart");
      } catch (err) {
        console.error("[CartProvider] Clear error:", err);
      }
    };

    // === Run logic ===
    if (userId) {
      loadCart();
      saveCart();
    } else {
      clearCart();
    }

    // Save on every change (after initial load)
    return () => {
      if (userId && state.cart.length > 0) {
        saveCart();
      }
    };
  }, [user?.id, state.cart]);

  /* ------------------- Memoized Context Value ------------------- */
  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}