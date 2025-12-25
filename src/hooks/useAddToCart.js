import { useState, useEffect, useRef } from "react";
import { useSnackbar } from "notistack";
import useCart from "./useCart";
import useUser from "./useUser";
import useGuardedRouter from "./useGuardedRouter";
import { useAddToCartMutation, useGetUserCartQuery } from "app/store/services";
import performanceMonitor from "utils/performanceMonitor";

/**
 * Unified add-to-cart hook that handles both logged-in and non-logged-in users
 * 
 * For logged-in users:
 * 1. Add to session storage cart
 * 2. Update cart state
 * 3. Call server add API
 * 4. Refetch cart from server
 * 
 * For non-logged-in users:
 * 1. Redirect to login with product parameters
 * 2. After login, add API is called and cart is synced
 */
export default function useAddToCart() {
  const { push: routerPush } = useGuardedRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { state: userState } = useUser();
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  // Only call the query if user is logged in
  const {
    data: cartData,
    refetch: refetchCart,
  } = useGetUserCartQuery(undefined, {
    skip: !userState?.user?.id,
  });

  const [addToCartMutation, { isLoading: addToCartLoading }] = useAddToCartMutation();

  /**
   * Add product to cart with consistent flow
   * @param {Object} product - Product object with id, title, price, thumbnail, slug, etc.
   * @param {number} quantity - Quantity to add (default: 1)
   * @param {string} categoryId - Category ID for breadcrumb navigation
   */
  const addToCart = async (product, quantity = 1, categoryId = null) => {
    if (!product?.id) {
      enqueueSnackbar("Invalid product data", { variant: "error" });
      return;
    }

    setIsLoading(true);

    try {
      // Check if user is logged in
      if (!userState?.user?.id) {
        // Start performance tracking for add-to-cart when not logged in
        const perfId = performanceMonitor.start('add-to-cart-guest', 'add-to-cart-login-redirect', {
          productId: product.id,
          productTitle: product.title,
          quantity,
          currentPath: typeof window !== 'undefined' ? window.location.pathname : 'N/A',
        });
        
        // Non-logged-in user flow: redirect to login with product parameters
        enqueueSnackbar("Please login to add items to cart", {
          variant: "warning",
        });

        const queryParams = new URLSearchParams({
          id: product.id,
          qty: quantity.toString(),
          category: categoryId || product.category?._id || "",
        });

        // Preserve current location to navigate back after login
        if (typeof window !== 'undefined') {
          queryParams.set('returnTo', window.location.pathname + window.location.search);
        }

        const loginUrl = `/login?${queryParams.toString()}`;
        
        console.log("[useAddToCart] Redirecting to login:", {
          loginUrl,
          productId: product.id,
          returnTo: queryParams.get('returnTo'),
          currentPath: typeof window !== 'undefined' ? window.location.pathname : 'N/A',
          timestamp: new Date().toISOString(),
        });

        // Mark loader start
        const loaderStartTime = performance.now();
        try {
          if (typeof window !== 'undefined' && window.NProgress) {
            window.__navTriggerType = 'add-to-cart-login-redirect';
            window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
            window.__startTimeRef && (window.__startTimeRef.current = Date.now());
            window.NProgress.start();
          }
        } catch {}
        performanceMonitor.markMilestone(perfId, 'loader-shown', {
          loaderStartTime: performance.now() - loaderStartTime,
        });

        // Ensure the button loader resets before navigation
        setIsLoading(false);
        
        // Navigate to login
        const navStartTime = performance.now();
        await routerPush(loginUrl);
        performanceMonitor.markMilestone(perfId, 'navigation-complete', {
          navigationTime: performance.now() - navStartTime,
          targetUrl: loginUrl,
        });
        
        // Note: Login success and page display will be tracked in login page
        // Store perfId in sessionStorage to retrieve after login
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('__addToCartPerfId', perfId);
        }
        
        return;
      }

      // Logged-in user flow

      // Determine effective price based on user role (if pricing provided)
      let effectivePrice = product?.price;
      const userRole = userState?.user?.role;
      if (product?.pricing && userRole && product?.pricing?.[userRole]?.price != null) {
        effectivePrice = product.pricing[userRole].price;
      }

      // 1. Add to local cart state immediately for better UX
      cartDispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: {
          id: product.id,
          slug: product.slug || product.title,
          price: effectivePrice,
          title: product.title,
          thumbnail: product.thumbnail,
          qty: quantity,
          user: userState.user.id,
          stock: product.stock,
          category: product.category?._id || categoryId,
          sku: product.sku || "",
        },
      });

      // 2. Call server API to add to cart
      await addToCartMutation({
        productId: product.id,
        quantity,
      }).unwrap();

      // 3. Refetch cart from server to ensure consistency
      const result = await refetchCart();
      
      // 4. Update local cart with fresh server data
      if (result.data?.data?.items) {
        const serverItems = result.data.data.items.map(item => ({
          id: item.id,
          cartId: item.cartId,
          slug: item.slug || item.title,
          price: Number(item.price || 0),
          title: item.title,
          thumbnail: item.thumbnail || "",
          qty: Number(item.quantity || 0),
          user: userState.user.id,
          stock: item.stock,
          category: item.category || "",
          // Preserve SKU from server response, ensure it's a string
          sku: item.sku !== undefined && item.sku !== null ? String(item.sku) : "",
        }));
        
        cartDispatch({
          type: "SET_CART",
          payload: serverItems,
        });
      }

      // 5. Show success notification
      enqueueSnackbar("Product added to cart successfully!", {
        variant: "success",
      });

    } catch (error) {
      // Revert local cart changes on server error
      if (userState?.user?.id) {
        // Refetch cart to get correct state from server
        try {
          await refetchCart();
        } catch {}
      }
      
      const errorMessage = error?.data?.message || "Failed to add product to cart";
      enqueueSnackbar(errorMessage, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Remove product from cart
   * @param {string} productId - Product ID to remove
   */
  const removeFromCart = (productId) => {
    cartDispatch({
      type: "REMOVE_FROM_CART",
      payload: productId,
    });
  };

  /**
   * Clear entire cart
   */
  const clearCart = () => {
    cartDispatch({
      type: "CLEAR_CART",
    });
  };

  /**
   * Update product quantity in cart
   * @param {string} productId - Product ID to update
   * @param {number} quantity - New quantity
   */
  const updateCartQuantity = (productId, quantity) => {
    const product = cartState.cart.find(item => item.id === productId);
    if (product) {
      cartDispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: {
          ...product,
          qty: quantity,
        },
      });
    }
  };

  return {
    addToCart,
    removeFromCart,
    clearCart,
    updateCartQuantity,
    isLoading: isLoading || addToCartLoading,
    cart: cartState.cart,
    cartItemCount: cartState.cart?.reduce((total, item) => total + (item.qty || 0), 0) || 0,
  };
}
