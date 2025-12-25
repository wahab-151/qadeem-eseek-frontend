// "use client";

// import LoadingButton from "@mui/lab/LoadingButton";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// // GLOBAL CUSTOM COMPONENTS
// import { TextField, FormProvider } from "components/form-hook";

// // LOCAL CUSTOM COMPONENTS
// import Label from "../components/label";
// import EyeToggleButton from "../components/eye-toggle-button";
// import { useRouter, useSearchParams } from "next/navigation";
// // LOCAL CUSTOM HOOK
// import usePasswordVisible from "../use-password-visible";
// import {
//   useAddToCartMutation,
//   useGetUserCartQuery,
//   useUserLoginMutation,
// } from "app/store/services";
// import { useSnackbar } from "notistack";
// import { USERTYPE_ADMIN, USERTYPE_SALESPERSON } from "utils/constants";
// import useUser from "hooks/useUser";
// import { useEffect, useState, useRef } from "react";
// import useCart from "hooks/useCart";

// // import { useRouter } from "next/router";

// export default function LoginPageView({ onSuccess }) {
//   const { state, dispatch } = useUser();
//   const { enqueueSnackbar } = useSnackbar();
//   // const [getCartAgain, setGetCartAgain] = useState(false);
//   const [pauseCartFetch, setPauseCartFetch] = useState(false);
//   const hasProcessedCartRef = useRef(false);

//   // Only call the query if user is logged in
//   const {
//     data: cartData,
//     isLoading: cartLoading,
//     error: cartError,
//     refetch,
//   } = useGetUserCartQuery(undefined, {
//     skip: !state.user?.id || pauseCartFetch,
//   });
//   const [addToCart, { isLoading: addToCartLoading, error: addToCartError }] =
//     useAddToCartMutation();
//   const router = useRouter();
//   // const params = useSearchParams();
//   // const router = useRouter();
//   const { visiblePassword, togglePasswordVisible } = usePasswordVisible();

//   const [userLogin, { isLoading, error }] = useUserLoginMutation();

//   const { state: cartState, dispatch: cartDispatch } = useCart();

//   const cartDataRecieved = cartData?.data.items?.length > 0;

//   const searchParams = useSearchParams();
//   const [payload, setPayload] = useState(null);
//   const [returnUrl, setReturnUrl] = useState(null);
//   // const [hasProcessedPayload, setHasProcessedPayload] = useState(false);

//   // Handle query params to set payload so we can send them once user logs-in
//   useEffect(() => {
//     if (!searchParams) return;
//     const id = searchParams.get("id");
//     const qty = searchParams.get("qty");
//     const category = searchParams.get("category");
//     const returnTo = searchParams.get("returnTo");

//     if (id && category) {
//       setPayload({
//         id,
//         qty: parseInt(qty) || 1, // Default to 1 if qty is not provided or invalid
//         category,
//       });
//       // Pause initial cart fetch so add-to-cart can run first
//       setPauseCartFetch(true);
//     }

//     // Set return URL - prioritize returnTo query param (most reliable)
//     // This is explicitly set when login is triggered from add-to-cart or other pages
//     if (returnTo) {
//       // returnTo already contains pathname + search params, use it directly
//       setReturnUrl(returnTo);
//     } else {
//       // Fallback: Try to get the referrer from document
//       // Only use if returnTo is not available (e.g., direct login page access)
//       const referrer = document.referrer;
//       if (referrer && !referrer.includes('/login') && !referrer.includes('/signup')) {
//         // Extract pathname + search from full URL if referrer is a full URL
//         try {
//           const url = new URL(referrer);
//           // Only use referrer if it's from the same origin
//           if (url.origin === window.location.origin) {
//             setReturnUrl(url.pathname + url.search);
//           } else {
//             setReturnUrl('/home');
//           }
//         } catch {
//           // If referrer is already a path, use it directly
//           setReturnUrl(referrer);
//         }
//       } else {
//         setReturnUrl('/home');
//       }
//     }
//   }, [searchParams]);

//   // Handle cart update after successful login if payload is set
//   useEffect(() => {
//     if (!state.user?.id || !payload || hasProcessedCartRef.current) return;

//     const processCart = async () => {
//       try {
//         // Ensure token is available in sessionStorage before calling protected API
//         let token = sessionStorage.getItem("auth-token") || "";
//         if (!token) {
//           for (let i = 0; i < 10 && !token; i++) {
//             await new Promise((r) => setTimeout(r, 50));
//             token = sessionStorage.getItem("auth-token") || "";
//           }
//         }
//         // Add item to server cart with the quantity from URL params
//         try {
//           await addToCart({
//             productId: payload.id,
//             quantity: payload.qty,
//           }).unwrap();
//         } catch (error) {
//           const msg = error?.data?.message || "Failed to add item to cart";
//           enqueueSnackbar(msg, { variant: "error" });
//           setPauseCartFetch(false);
//           return; // stop further processing if add fails
//         }

//         // Refetch cart to get updated data - the cart query effect will handle SET_CART
//         setPauseCartFetch(false);
//         hasProcessedCartRef.current = true;
//         await refetch();

//         enqueueSnackbar("Item added to cart!", { variant: "success" });
        
//         // Clear query params after processing (App Router)
//         if (typeof window !== "undefined") {
//           router.replace(window.location.pathname);
//         }
//         // Clear the payload
//         setPayload(null);
//       } catch (error) {
//         setPauseCartFetch(false);
//       }
//     };

//     processCart();
//   }, [state.user?.id, payload, addToCart, refetch, enqueueSnackbar, router]);

//   // //this code for cart is for once user logs in

//   // STEP 2: Once user is logged in & cart query is initialized, process cart ONCE
//   // useEffect(() => {
//   //   // should  not processs if there is no user, data in payload, hasprocessedPayload is false, and refetch is a function or hasprocessedPayload is tru and Reflech is not a function
//   //   const canProcess =
//   //     state.user?.id && payload && !hasProcessedPayload && typeof refetch === "function";
//   //   if (!canProcess) return;

//   //   // const canProcess =
//   //   //   !state.user?.id && !payload && !typeof refetch === "function" || !hasProcessedPayload;

//   //   // if (!canProcess) return;

//   //   const processCart = async () => {
//   //     try {
//   //       await addToCart({
//   //         productId: payload.id,
//   //         quantity: payload.qty,
//   //       }).unwrap();

//   //       enqueueSnackbar("Item added to cart!", { variant: "success" });

//   //       // ✅ Refresh cart to get updated data
//   //       await refetch();

//   //       // ✅ Mark as processed so this never runs again
//   //       setHasProcessedPayload(true);
//   //       setPayload(null);
//   //     } catch (error) {
//   //       enqueueSnackbar("Failed to add item to cart", { variant: "error" });
//   //       console.error("Cart update error:", error);
//   //     }
//   //   };

//   //   processCart();
//   // }, [state.user?.id, payload, refetch, hasProcessedPayload]);

//   // Handle cart data for logged in users (normalize and set once) - SINGLE SOURCE OF TRUTH
//   useEffect(() => {
//     console.log("[Login] Cart effect triggered:", {
//       hasUser: !!state.user?.id,
//       cartLoading,
//       pauseCartFetch,
//       hasCartData: !!cartData?.data,
//       cartError: !!cartError,
//     });
    
//     if (cartError) {
//       enqueueSnackbar("Cart Fetch failed!", { variant: "error" });
//       return;
//     }

//     // Only proceed if we have a user and cart data is available (even if empty)
//     if (!state.user?.id || cartLoading || pauseCartFetch) {
//       console.log("[Login] Skipping cart normalization - conditions not met");
//       return;
//     }

//     // Prevent duplicate processing
//     if (!cartData?.data) {
//       console.log("[Login] Skipping cart normalization - no cart data");
//       return;
//     }

//     const serverItems = Array.isArray(cartData.data.items)
//       ? cartData.data.items
//       : [];
//     console.log("[Login] serverItems from API:", serverItems);
    
//     // Filter out any invalid items (e.g., missing product id) and normalize
//     const normalized = serverItems
//       .filter((item) => item && item.id)
//       .map((item) => {
//         // Debug: Log each item's SKU before normalization
//         console.log("[Login] Normalizing item:", {
//           id: item.id,
//           sku: item.sku,
//           skuType: typeof item.sku,
//           hasSku: item.sku !== undefined && item.sku !== null && item.sku !== "",
//         });
        
//         return {
//           id: item.id,
//           cartId: item.cartId,
//           slug: item.slug || item.title,
//           price: Number(item.price || 0),
//           title: item.title,
//           thumbnail: item.thumbnail,
//           qty: Number(item.quantity || 0),
//           user: state.user?.id,
//           stock: item.stock,
//           category: item?.category || "",
//           // Preserve SKU from server response, ensure it's a string
//           sku: item.sku !== undefined && item.sku !== null && item.sku !== "" ? String(item.sku) : "",
//         };
//       });
    
//     console.log("[Login] Normalized items with SKU:", normalized.map(item => ({ id: item.id, sku: item.sku })));

//     // ✅ CRITICAL FIX: If server cart is empty but local cart has items, preserve local cart
//     // This happens when user had items before login but server cart is empty
//     const localCart = cartState?.cart || [];
//     const hasLocalItems = localCart.length > 0;
//     const hasServerItems = normalized.length > 0;

//     // If server has items, use server (source of truth)
//     // If server is empty but local has items, preserve local cart
//     // If both are empty, set empty cart
//     if (hasServerItems) {
//       // Server has items - use server cart
//       const currentCartIds = localCart.map(item => item.id).sort().join(',');
//       const newCartIds = normalized.map(item => item.id).sort().join(',');
      
//       // Check if SKU is missing in local cart (even if IDs match)
//       const localCartMissingSku = localCart.some(item => !item.sku || item.sku === "");
//       const serverCartHasSku = normalized.some(item => item.sku && item.sku !== "");
      
//       console.log("[Login] Cart comparison:", {
//         currentCartIds,
//         newCartIds,
//         idsMatch: currentCartIds === newCartIds,
//         lengthMatch: normalized.length === localCart.length,
//         localCartMissingSku,
//         serverCartHasSku,
//         shouldUpdate: currentCartIds !== newCartIds || normalized.length !== localCart.length || (localCartMissingSku && serverCartHasSku),
//       });
      
//       // Update if IDs don't match, lengths don't match, OR if local cart is missing SKU but server has it
//       if (currentCartIds !== newCartIds || normalized.length !== localCart.length || (localCartMissingSku && serverCartHasSku)) {
//         console.log("[Login] Setting cart with normalized items:", normalized);
//         cartDispatch({ type: "SET_CART", payload: normalized });
//       } else {
//         console.log("[Login] Skipping cart update - IDs and SKU match");
//       }
//     } else if (hasLocalItems && !hasServerItems) {
//       // Server is empty but local has items - preserve local cart
//       // Don't overwrite with empty server cart
//       console.log("[Login] Server cart empty but local cart has items - preserving local cart", {
//         localItems: localCart.length
//       });
//       // Local cart is already set, just ensure it's saved
//       // The CartContext will handle saving it
//     } else {
//       // Both are empty - ensure cart is empty
//       if (localCart.length > 0) {
//         cartDispatch({ type: "SET_CART", payload: [] });
//       }
//     }
    
//   }, [cartData?.data?.items, cartLoading, cartError, state.user?.id, pauseCartFetch, cartState?.cart]);
  
//   // useEffect(() => {
//   //   if (!state.user?.id || !cartData?.data) return;
  
//   //   const normalized = cartData.data.items.map(item => ({
//   //     id: item.id,
//   //     cartId: item.cartId,
//   //     slug: item.slug || item.title,
//   //     price: Number(item.price || 0),
//   //     title: item.title,
//   //     thumbnail: item.thumbnail,
//   //     qty: Number(item.quantity || 0),
//   //     user: state.user?.id,
//   //     stock: item.stock,
//   //     category: item?.category || "",
//   //     sku: item.sku || "",
//   //   }));
  
//   //   console.log("[Login] Normalizing server cart for logged in user", normalized);
  
//   //   cartDispatch({ type: "SET_CART", payload: normalized });
//   // }, [state.user?.id, cartData?.data]);
  
//   //when i get payload and no user is logeed in... i have to login, add payload to cart and the read the query to set data to cartstate...

//   // LOGIN FORM FIELDS INITIAL VALUES
//   const initialValues = {
//     identifier: "",
//     password: "",
//   };

//   // LOGIN FORM FIELD VALIDATION SCHEMA
//   const validationSchema = yup.object().shape({
//     password: yup.string().required("Password is required"),
//     identifier: yup
//       .string()
//       .email("Invalid Email ")
//       .required("Email is required"),
//   });

//   const methods = useForm({
//     defaultValues: initialValues,
//     resolver: yupResolver(validationSchema),
//   });

//   const {
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;
 
//   const handleSubmitForm = handleSubmit(async (values) => {
//     try {
//       // Start route loader for perceived responsiveness
//       try {
//         if (typeof window !== 'undefined' && window.NProgress) {
//           window.__navTriggerType = 'login-submit';
//           window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
//           window.__startTimeRef && (window.__startTimeRef.current = Date.now());
//           window.NProgress.start();
//         }
//       } catch {}

//       const response = await userLogin(values).unwrap();
  
//       enqueueSnackbar("Login successful!", { variant: "success" });
//       onSuccess?.();
  
//       // Set user in state first
//       dispatch({ type: "SET_USER", payload: response?.data?.user });
//       // Also persist token in AuthContext so it doesn't get cleared by the sync effect
//       if (response?.data?.token) {
//         dispatch({ type: "SET_TOKEN", payload: response.data.token });
//       }

//       // ✅ REMOVED: Don't load cart from localStorage here
//       // The server cart query will load the cart with SKU from the server
//       // Loading from localStorage here would overwrite the server cart with items that don't have SKU
//       // The CartContext will handle loading from localStorage if needed (only if cart is empty)
  
//       if (
//         response?.data?.user &&
//         (response?.data?.user?.role === USERTYPE_ADMIN || response?.data?.user?.role === USERTYPE_SALESPERSON)
//       ) {
//         router.push("/admin/dashboard");
//         return;
//       }
  
//       // Store user in sessionStorage for persistence
//       sessionStorage.setItem("auth-user", JSON.stringify(response?.data?.user));
//       if (response?.data?.token) {
//         sessionStorage.setItem("auth-token", response.data.token);
//         sessionStorage.setItem("auth-user-role", response?.data?.user?.role);
//       }

//       // Navigate based on priority: returnUrl > default home
//       // Always return user to the page they came from (for regular users)
//       // Admin/sales users are already redirected to dashboard above
      
//       // Get returnTo from searchParams as fallback (in case state wasn't set)
//       const returnToFromParams = searchParams?.get("returnTo");
//       const finalReturnUrl = returnUrl || returnToFromParams;
      
//       if (finalReturnUrl && finalReturnUrl !== '/home' && !finalReturnUrl.includes('/login') && !finalReturnUrl.includes('/signup')) {
//         // Navigate back to the previous page with full URL including query params
//         router.push(finalReturnUrl);
//       } else {
//         // Default to home page
//         router.push("/home");
//       }
      
//     } catch (error) {
//       const msg = error?.data?.message || "Login failed. Please try again!";
//       enqueueSnackbar(msg, { variant: "error" });
//     }
//   });

//   return (
//     //  /   <>
//     //     Hello

//     //     </>
//     <FormProvider methods={methods} onSubmit={handleSubmitForm}>
//       <div className="mb-1">
//         <Label>Email </Label>
//         <TextField
//           fullWidth
//           name="identifier"
//           size="small"
//           type="email"
//           placeholder="exmple@mail.com"
//         />
//       </div>

//       <div className="mb-2">
//         <Label>Password</Label>
//         <TextField
//           fullWidth
//           size="small"
//           name="password"
//           autoComplete="on"
//           placeholder="*********"
//           type={visiblePassword ? "text" : "password"}
//           slotProps={{
//             input: {
//               endAdornment: (
//                 <EyeToggleButton
//                   show={visiblePassword}
//                   click={togglePasswordVisible}
//                 />
//               ),
//             },
//           }}
//         />
//       </div>

//       <LoadingButton
//         fullWidth
//         size="large"
//         type="submit"
//         color="primary"
//         variant="contained"
//         loading={isLoading}
//         disabled={isLoading}
//       >
//         {isLoading ? "Logging in..." : "Login"}
//       </LoadingButton>
//     </FormProvider>
//   );
// }


"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import useGuardedRouter from "hooks/useGuardedRouter";

import { TextField, FormProvider } from "components/form-hook";
import Label from "../components/label";
import EyeToggleButton from "../components/eye-toggle-button";

import usePasswordVisible from "../use-password-visible";
import useUser from "hooks/useUser";
import useCart from "hooks/useCart";
import { USERTYPE_ADMIN, USERTYPE_SALESPERSON } from "utils/constants";
import { useAddToCartMutation, useGetUserCartQuery, useUserLoginMutation } from "app/store/services";
import performanceMonitor from "utils/performanceMonitor";

export default function LoginPageView({ onSuccess }) {
  const { replace: routerReplace } = useGuardedRouter();
  const router = useRouter(); // Direct router for post-login navigation to bypass guard
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { enqueueSnackbar } = useSnackbar();
  const { state: userState, dispatch: userDispatch } = useUser();
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const payloadRef = useRef(false); // for add-to-cart payload only
  const previousPathnameRef = useRef(pathname);

  const [returnUrl, setReturnUrl] = useState(null);
  const [payload, setPayload] = useState(null);
  const [pauseCartFetch, setPauseCartFetch] = useState(false);

  const { visiblePassword, togglePasswordVisible } = usePasswordVisible();

  const [userLogin, { isLoading }] = useUserLoginMutation();
  const [addToCart] = useAddToCartMutation();

  const { data: cartData, refetch } = useGetUserCartQuery(undefined, {
    skip: !userState.user?.id || pauseCartFetch,
  });

  // -------------------------------
  // Track pathname changes for debugging
  // -------------------------------
  useEffect(() => {
    if (previousPathnameRef.current !== pathname) {
      console.log("[Login] Pathname changed:", {
        from: previousPathnameRef.current,
        to: pathname,
        search: typeof window !== 'undefined' ? window.location.search : '',
        fullUrl: typeof window !== 'undefined' ? window.location.href : 'N/A',
        timestamp: new Date().toISOString(),
      });
      previousPathnameRef.current = pathname;
    }
  }, [pathname]);

  // -------------------------------
  // Step 1: Parse query params
  // -------------------------------
  useEffect(() => {
    if (!searchParams) return;

    const id = searchParams.get("id");
    const qty = searchParams.get("qty");
    const category = searchParams.get("category");
    const returnTo = searchParams.get("returnTo");

    console.log("[Login] Parsing query params:", {
      id,
      qty,
      category,
      returnTo,
      fullUrl: typeof window !== 'undefined' ? window.location.href : 'N/A',
    });

    if (id && category) {
      setPayload({ id, qty: parseInt(qty) || 1, category });
      setPauseCartFetch(true); // pause fetching server cart until payload processed
    }

    if (returnTo) {
      console.log("[Login] Setting returnUrl from query param:", returnTo);
      setReturnUrl(returnTo);
    } else {
      console.log("[Login] No returnTo param, defaulting to /home");
      setReturnUrl("/home");
    }
  }, [searchParams]);

  // -------------------------------
  // Step 2: Process add-to-cart payload after login
  // -------------------------------
  useEffect(() => {
    if (!userState.user?.id || !payload || payloadRef.current) return;

    const processPayload = async () => {
      try {
        await addToCart({ productId: payload.id, quantity: payload.qty }).unwrap();
        enqueueSnackbar("Item added to cart!", { variant: "success" });
        payloadRef.current = true;
        setPayload(null);
      } catch (error) {
        enqueueSnackbar(error?.data?.message || "Failed to add item to cart", { variant: "error" });
      } finally {
        setPauseCartFetch(false);
      }
    };

    processPayload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState.user?.id, payload, addToCart]);

  // -------------------------------
  // Step 3: Fetch and normalize server cart AFTER login
  // -------------------------------
  useEffect(() => {
    if (!userState.user?.id || pauseCartFetch) return;

    const normalizeCart = async () => {
      try {
        const cartResp = await refetch();
        const items = cartResp?.data?.data?.items || [];

        const normalized = items
          .filter(item => item?.id)
          .map(item => ({
            id: item.id,
            cartId: item.cartId,
            slug: item.slug || item.title,
            price: Number(item.price || 0),
            title: item.title,
            thumbnail: item.thumbnail,
            qty: Number(item.quantity || 0),
            user: userState.user?.id,
            stock: item.stock,
            category: item.category || "",
            sku: item.sku || "",
          }));

        cartDispatch({ type: "SET_CART", payload: normalized });
        // Don't show success toast - cart fetch is a background operation
      } catch (error) {
        // Only show error toast for real errors, not network hiccups
        if (error?.status !== 'FETCH_ERROR' && error?.status !== 'CUSTOM_ERROR') {
          enqueueSnackbar("Failed to fetch cart", { variant: "error" });
        }
      }
    };

    normalizeCart();
  }, [userState.user?.id, pauseCartFetch, refetch, cartDispatch]);

  // -------------------------------
  // Step 4: Login form
  // -------------------------------
  const initialValues = { identifier: "", password: "" };
  const validationSchema = yup.object().shape({
    identifier: yup.string().email("Invalid Email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit } = methods;

  // const handleSubmitForm = handleSubmit(async (values) => {
  //   try {
  //     const response = await userLogin(values).unwrap();

  //     enqueueSnackbar("Login successful!", { variant: "success" });
  //     onSuccess?.();

  //     // Set user state & session
  //     userDispatch({ type: "SET_USER", payload: response?.data?.user });
  //     if (response?.data?.token) {
  //       userDispatch({ type: "SET_TOKEN", payload: response.data.token });
  //       sessionStorage.setItem("auth-token", response.data.token);
  //     }
  //     sessionStorage.setItem("auth-user", JSON.stringify(response?.data?.user));

  //     // Admin/sales redirect
  //     if (
  //       response?.data?.user?.role === USERTYPE_ADMIN ||
  //       response?.data?.user?.role === USERTYPE_SALESPERSON
  //     ) {
  //       router.replace("/admin/dashboard");
  //       return;
  //     }

  //     // Redirect user to returnUrl or home
  //     if (returnUrl && !returnUrl.includes("/login") && !returnUrl.includes("/signup")) {
  //       router.replace(returnUrl);
  //     } else {
  //       router.replace("/home");
  //     }
  //   } catch (error) {
  //     enqueueSnackbar(error?.data?.message || "Login failed. Please try again!", { variant: "error" });
  //   }
  // });
  // const handleSubmitForm = handleSubmit(async (values) => {
  //   try {
  //     const response = await userLogin(values).unwrap();
  
  //     enqueueSnackbar("Login successful!", { variant: "success" });
  //     onSuccess?.();
  
  //     // Set user state
  //     userDispatch({ type: "SET_USER", payload: response?.data?.user });
  //     if (response?.data?.token) {
  //       userDispatch({ type: "SET_TOKEN", payload: response.data.token });
  //       sessionStorage.setItem("auth-token", response.data.token);
  //     }
  //     sessionStorage.setItem("auth-user", JSON.stringify(response?.data?.user));
  
  //     // Admin/sales redirect
  //     if (
  //       response?.data?.user?.role === USERTYPE_ADMIN ||
  //       response?.data?.user?.role === USERTYPE_SALESPERSON
  //     ) {
  //       router.replace("/admin/dashboard");
  //       return;
  //     }
  
  //     // ✅ Read returnTo directly from URL at submission time
  //     const urlParams = new URLSearchParams(window.location.search);
  //     const returnTo = urlParams.get("returnTo");
  
  //     if (returnTo && !returnTo.includes("/login") && !returnTo.includes("/signup")) {
  //       router.replace(returnTo);
  //     } else {
  //       router.replace("/home");
  //     }
  //   } catch (error) {
  //     enqueueSnackbar(error?.data?.message || "Login failed. Please try again!", { variant: "error" });
  //   }
  // });
  const handleSubmitForm = handleSubmit(async (values) => {
    try {
      // Check if this is part of add-to-cart flow
      const perfId = typeof window !== 'undefined' ? sessionStorage.getItem('__addToCartPerfId') : null;
      
      // ----- Step 1: Login -----
      const loginStartTime = performance.now();
      const response = await userLogin(values).unwrap();
      const loginTime = performance.now() - loginStartTime;
      
      // Mark login success milestone if tracking add-to-cart
      if (perfId) {
        performanceMonitor.markMilestone(perfId, 'login-success', {
          loginTime,
        });
      }
  
      enqueueSnackbar("Login successful!", { variant: "success" });
  
      // Set user state & session
      userDispatch({ type: "SET_USER", payload: response?.data?.user });
      if (response?.data?.token) {
        userDispatch({ type: "SET_TOKEN", payload: response.data.token });
        sessionStorage.setItem("auth-token", response.data.token);
      }
      sessionStorage.setItem("auth-user", JSON.stringify(response?.data?.user));
  
      // Admin/sales redirect
      if (
        response?.data?.user?.role === USERTYPE_ADMIN ||
        response?.data?.user?.role === USERTYPE_SALESPERSON
      ) {
        // Use direct router for admin redirect to bypass guard
        router.replace("/admin/dashboard");
        // Close modal after navigation starts
        setTimeout(() => {
          onSuccess?.();
        }, 50);
        return;
      }
  
      // ----- Step 2 & 3: Add-to-cart and cart fetch are handled by useEffect hooks -----
      // No need to duplicate here - the useEffect hooks will handle:
      // - Adding item to cart if payload exists (line 545-562)
      // - Fetching and normalizing cart (line 567-598)
      // This prevents duplicate toasts
  
      // ----- Step 4: Navigate to trigger page -----
      const urlParams = new URLSearchParams(window.location.search);
      const returnTo = urlParams.get("returnTo");
      const returnUrlState = returnUrl; // from state
      
      // Check for last visited page (saved during previous logout)
      const lastVisitedPage = typeof window !== 'undefined' 
        ? localStorage.getItem('last-visited-page') 
        : null;
      
      console.log("[Login] Navigation decision:", {
        returnToFromUrl: returnTo,
        returnUrlFromState: returnUrlState,
        lastVisitedPage: lastVisitedPage,
        currentPath: window.location.pathname,
        currentSearch: window.location.search,
      });
      
      // Priority Logic:
      // 1. returnTo (from URL parameter) - highest priority for immediate redirects
      // 2. lastVisitedPage (saved from previous session) - better UX than generic /home
      // 3. returnUrlState (from state) - only if it's not default /home
      // 4. /home (default fallback)
      
      let finalDestination;
      
      if (returnTo) {
        // Explicit returnTo always wins
        finalDestination = returnTo;
      } else if (lastVisitedPage) {
        // Use saved last visited page for better UX
        finalDestination = lastVisitedPage;
        // Clear it after using
        try {
          localStorage.removeItem('last-visited-page');
          console.log('[Login] Using and clearing last visited page:', lastVisitedPage);
        } catch (err) {
          console.warn('[Login] Failed to clear last visited page:', err);
        }
      } else if (returnUrlState && returnUrlState !== '/home') {
        // Use returnUrlState only if it's not the default /home
        finalDestination = returnUrlState;
      } else {
        // Default fallback
        finalDestination = null; // Will redirect to /home in the next block
      }
      
      // Navigate first, then close modal
      // Use direct router.replace to bypass route guard (post-login navigation should always work)
      const navStartTime = performance.now();
      if (finalDestination && !finalDestination.includes("/login") && !finalDestination.includes("/signup")) {
        console.log("[Login] Navigating to:", finalDestination);
        // Use direct router to bypass guard and ensure navigation happens
        router.replace(finalDestination);
      } else {
        console.log("[Login] Navigating to default: /home");
        router.replace("/home");
      }
      
      // Mark navigation complete milestone
      if (perfId) {
        performanceMonitor.markMilestone(perfId, 'post-login-navigation-complete', {
          navigationTime: performance.now() - navStartTime,
          targetUrl: finalDestination || '/home',
        });
        
        // Mark page displayed milestone after a short delay to allow page to render
        setTimeout(() => {
          performanceMonitor.markMilestone(perfId, 'page-displayed', {
            targetPath: finalDestination || '/home',
          });
          
          // End the performance tracking
          performanceMonitor.end(perfId, 'success', {
            totalFlowTime: performance.now() - (performanceMonitor.activeTimers.get(perfId)?.startTime || performance.now()),
          });
          
          // Clean up
          if (typeof window !== 'undefined') {
            sessionStorage.removeItem('__addToCartPerfId');
          }
        }, 500); // Allow 500ms for page to render
      }
      
      // Close modal after navigation starts
      // Small delay to let navigation begin
      setTimeout(() => {
        onSuccess?.();
      }, 50);
  
    } catch (error) {
      // Mark login failure if tracking
      const perfId = typeof window !== 'undefined' ? sessionStorage.getItem('__addToCartPerfId') : null;
      if (perfId) {
        performanceMonitor.end(perfId, 'error', {
          error: error?.data?.message || 'Login failed',
        });
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('__addToCartPerfId');
        }
      }
      
      // ONLY login failure
      enqueueSnackbar(error?.data?.message || "Login failed. Please try again!", { variant: "error" });
    }
  });
  
  
  

  // -------------------------------
  // Render
  // -------------------------------
  return (
    <FormProvider methods={methods} onSubmit={handleSubmitForm}>
      <div className="mb-1">
        <Label>Email</Label>
        <TextField
          fullWidth
          name="identifier"
          size="small"
          type="email"
          placeholder="example@mail.com"
        />
      </div>

      <div className="mb-2">
        <Label>Password</Label>
        <TextField
          fullWidth
          size="small"
          name="password"
          autoComplete="on"
          placeholder="*********"
          type={visiblePassword ? "text" : "password"}
          slotProps={{
            input: {
              endAdornment: (
                <EyeToggleButton show={visiblePassword} click={togglePasswordVisible} />
              ),
            },
          }}
        />
      </div>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="primary"
        variant="contained"
        loading={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </LoadingButton>
    </FormProvider>
  );
}
