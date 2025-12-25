import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import useGuardedRouter from "hooks/useGuardedRouter";

// MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Clear from "@mui/icons-material/Clear";

// GLOBAL CUSTOM HOOK
import useCart from "hooks/useCart";
import { useNavigation } from "contexts/NavigationContext";
import useUser from "hooks/useUser";

// LOCAL CUSTOM COMPONENTS
import MiniCartItem from "./components/cart-item";
import EmptyCartView from "./components/empty-view";

// GLOBAL CUSTOM COMPONENT
import { FlexBetween, FlexBox } from "components/flex-box";
import OverlayScrollbar from "components/overlay-scrollbar";

// CUSTOM ICON COMPONENT
import CartBag from "icons/CartBag";

// CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";
import { useUpdateCartMutation } from "app/store/services";
import { useEffect, useState } from "react";

// CUSTOM DATA MODEL

export default function MiniCart({ onClose }) {
  const { push, back } = useGuardedRouter();
  const searchParams = useSearchParams?.() || null;
  const pathname = usePathname?.() || "";
  const { state, dispatch } = useCart();
  const { previousPath } = useNavigation();
  const { state: authState } = useUser();

  const [user, setUser] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [navigationType, setNavigationType] = useState(null); // 'checkout' or 'cart'

  //for updating cart
  const [updateCart, { isLoading: updateCartLoading, error: updateCartError }] =
    useUpdateCartMutation(user?.id, {
      skip: !user,
    });
  // const CART_LENGTH = state.cart.length;
  const CART_LENGTH = state?.cart?.reduce((total, item) => total + (item.qty || 0), 0);
  
  useEffect(() => {
    const authUser = localStorage.getItem("auth-user");
    setUser(authUser ? JSON.parse(authUser) : null);
  }, []);


  useEffect(() => {
    // Tracking updateCartLoading state
  }, [updateCartLoading]);

  //for updating cart
  const handleCartAmountChange = (quntity, product) => () => {
    //for updating cart
    const maxStock = typeof product?.stock === "number" ? product.stock : undefined;
    const clampedQty = maxStock !== undefined ? Math.min(quntity, maxStock) : quntity;
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        ...product,
        qty: clampedQty,
        stock: product?.stock,
      },
    });
  };
  //  console.log("state in mini before", state)
  useEffect(() => {
    if (!user) return; // only sync when a user is present

    // Sanitize cart before sending to API to avoid invalid items causing 400s
    const updatedCart = Array.isArray(state?.cart) ? state.cart : [];
    const sanitized = updatedCart
      .filter((item) => item && item.id && Number.isFinite(Number(item.qty)))
      .map((item) => ({
        ...item,
        qty: Number(item.qty),
        price: Number(item.price || 0),
      }));

    if (sanitized.length !== updatedCart.length) {
      // Reflect sanitation locally to keep UI consistent
      dispatch({ type: "SET_CART", payload: sanitized });
    }

    if (sanitized.length > 0 || updatedCart.length === 0) {
      // Send even when empty to allow clearing on server
      console.log("[MiniCart] updateCart", {
        prevCount: updatedCart.length,
        sanitizedCount: sanitized.length,
        userId: user?.id,
      });
      updateCart(sanitized).unwrap().catch((e) => {
        console.warn("[MiniCart] updateCart failed", e);
      });
    }
  }, [state, user]);

  const getTotalPrice = () => {
    const items = Array.isArray(state?.cart) ? state.cart : [];
    return items.reduce((acc, item) => {
      const price = Number(item?.price);
      const qty = Number(item?.qty);
      if (!Number.isFinite(price) || !Number.isFinite(qty)) return acc;
      return acc + price * qty;
    }, 0);
  };

  const handleClose = async () => {
    if (onClose) {
      onClose();
    } else {
      // Fallback for when used outside of modal context
      try {
        const isLoggedIn = authState?.user && authState?.token;
        const fromParam = searchParams?.get && searchParams.get("from");
        const sameOriginReferrer =
          typeof window !== "undefined" && document.referrer &&
          new URL(document.referrer).origin === window.location.origin
            ? new URL(document.referrer).pathname
            : null;

        if (sameOriginReferrer && sameOriginReferrer !== "/mini-cart") {
          back();
          return;
        }

        if (fromParam && fromParam !== "/mini-cart") {
          await push(fromParam);
          return;
        }
        
        // Use the tracked previous path from NavigationContext
        if (previousPath && previousPath !== "/mini-cart") {
          // Navigate back to the previous page
          await push(previousPath);
        } else if (typeof window !== "undefined" && document.referrer) {
          // Fallback: use document.referrer to get the actual previous page
          const referrerUrl = new URL(document.referrer);
          const referrerPath = referrerUrl.pathname;
          
          // Only use referrer if it's not the same path and not a login/register page
          if (referrerPath && referrerPath !== "/mini-cart" && 
              !referrerPath.includes("/login") && !referrerPath.includes("/register")) {
            await push(referrerPath);
            return;
          }
        }
        
        // If no valid previous path, just navigate to home
        await push("/home");
      } catch (_err) {
        await push("/home");
      }
    }
  };

  const handleProductClick = async (id, categoryId) => {
    await push(`/products/${id}?category=${categoryId}`);
  };

  const handleCheckoutClick = async () => {
    // Avoid re-navigating if we're already on checkout; just close the mini-cart
    if (pathname === '/checkout') {
      if (onClose) {
        onClose();
      } else {
        setIsNavigating(false);
      }
      return;
    }

    setIsNavigating(true);
    setNavigationType('checkout');
    await push('/checkout');
    // Close the mini-cart when navigating to checkout
    if (onClose) {
      onClose();
    }
  };

  const handleViewCartClick = async () => {
    // Avoid re-navigating if we're already on cart; just close the mini-cart
    if (pathname === '/cart') {
      if (onClose) {
        onClose();
      } else {
        setIsNavigating(false);
      }
      return;
    }

    setIsNavigating(true);
    setNavigationType('cart');
    await push('/cart');
    // Close the mini-cart when navigating to cart
    if (onClose) {
      onClose();
    }
  };




  return (
    <Box height="100vh" width="100%">
      {/* HEADING SECTION */}
      <FlexBetween ml={3} mr={2} height={74}>
        <FlexBox gap={1} alignItems="center" color="secondary.main">
          <CartBag color="inherit" />
          <Typography variant="h6">{CART_LENGTH} item(s)</Typography>
        </FlexBox>

        <IconButton onClick={handleClose}>
          
          <Clear />
        </IconButton>
      </FlexBetween>

      <Divider />

      {/* CART ITEM LIST */}
      <Box height={`calc(100% - ${CART_LENGTH ? "207px" : "75px"})`}>
        {CART_LENGTH > 0 ? (
          <OverlayScrollbar>
            {state.cart.map((item) => (
              <MiniCartItem
                item={item}
                key={item.id}
                handleCartAmountChange={handleCartAmountChange}
                onProductClick={handleProductClick}
              />
            ))}
          </OverlayScrollbar>
        ) : (
          <EmptyCartView onClose={onClose} />
        )}
      </Box>

      {/* CART BOTTOM ACTION BUTTONS */}
      {CART_LENGTH > 0 ? (
        <Box p={2.5}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            sx={{
              mb: "0.75rem",
              height: 40,
            }}
            onClick={handleCheckoutClick}
            disabled={isNavigating}
            startIcon={
              isNavigating && navigationType === 'checkout' ? (
                <CircularProgress size={16} color="inherit" />
              ) : null
            }
          >
            {isNavigating && navigationType === 'checkout' 
              ? 'Processing...' 
              : `Checkout Now (${currency(getTotalPrice())})`
            }
          </Button>

          <Button
            fullWidth
            color="primary"
            variant="outlined"
            sx={{
              height: 40,
            }}
            onClick={handleViewCartClick}
            disabled={isNavigating}
            startIcon={
              isNavigating && navigationType === 'cart' ? (
                <CircularProgress size={16} color="inherit" />
              ) : null
            }
          >
            {isNavigating && navigationType === 'cart' 
              ? 'Loading...' 
              : 'View Cart'
            }
          </Button>
        </Box>
      ) : null}
    </Box>
  );
}
