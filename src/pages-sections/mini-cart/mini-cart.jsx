import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import useGuardedRouter from "hooks/useGuardedRouter";

// MUI
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
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
import QadeemButton from "components/QadeemButton";

// CUSTOM UTILS LIBRARY FUNCTION
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

  const handleProductClick = async (slugOrId, categoryId) => {
    await push(`/products/${slugOrId}?category=${categoryId}`);
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
    <Box 
      height="100vh" 
      width="100%" 
      sx={{ 
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* HEADING SECTION */}
      <Box sx={{ px: 3, py: 2.5 }}>
        <FlexBetween>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#211E1F",
              fontSize: "18px",
              fontFamily: "sans-serif",
            }}
          >
            Shopping Cart
          </Typography>

          <IconButton 
            onClick={handleClose}
            sx={{
              color: "#211E1F",
              padding: "4px",
              "&:hover": {
                backgroundColor: "rgba(33, 30, 31, 0.04)",
              },
            }}
          >
            <Clear sx={{ fontSize: "20px" }} />
          </IconButton>
        </FlexBetween>
      </Box>

      {/* Separator */}
      <Box
        sx={{
          height: "1px",
          backgroundColor: "#D1D5DB",
          width: "100%",
        }}
      />

      {/* CART ITEM LIST */}
      <Box 
        sx={{ 
          flex: 1,
          overflow: "hidden",
        }}
      >
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
        <Box 
          sx={{ 
            px: 3,
            py: 2.5,
            borderTop: "1px solid #D1D5DB",
          }}
        >
          {/* Total Section */}
          <FlexBetween sx={{ mb: 1.5 }}>
            <Typography
              sx={{
                fontWeight: 600,
                color: "#211E1F",
                fontSize: "16px",
                fontFamily: "sans-serif",
              }}
            >
              Total :
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
                color: "#211E1F",
                fontSize: "18px",
                fontFamily: "sans-serif",
              }}
            >
              {Math.round(getTotalPrice()).toLocaleString('en-US', { maximumFractionDigits: 0 })} Rs
            </Typography>
          </FlexBetween>

          {/* Taxes Note */}
          <Typography
            sx={{
              fontSize: "12px",
              color: "#6B7280",
              mb: 2,
              fontFamily: "sans-serif",
            }}
          >
            Taxes and shipping calculated at checkout
          </Typography>

          {/* Check out Button */}
          <QadeemButton
            fullWidth
            onClick={handleCheckoutClick}
            disabled={isNavigating}
            loading={isNavigating && navigationType === 'checkout'}
            variant="contained"
            sx={{
              backgroundColor: "#3B2C05",
              color: "#FFFFFF",
              height: "44px",
              mb: 1.5,
              fontSize: "16px",
              fontWeight: 500,
              fontFamily: "sans-serif",
              "&:hover": {
                backgroundColor: "#2A1F03",
              },
              "&:disabled": {
                backgroundColor: "#3B2C05",
                opacity: 0.6,
              },
            }}
          >
            {isNavigating && navigationType === 'checkout' 
              ? 'Processing...' 
              : 'Check out'
            }
          </QadeemButton>

          {/* View cart Button */}
          <QadeemButton
            fullWidth
            onClick={handleViewCartClick}
            disabled={isNavigating}
            loading={isNavigating && navigationType === 'cart'}
            variant="contained"
            sx={{
              backgroundColor: "#F8E7B1",
              color: "#3B2C05",
              height: "44px",
              fontSize: "16px",
              fontWeight: 500,
              fontFamily: "sans-serif",
              "&:hover": {
                backgroundColor: "#F5DF9D",
              },
              "&:disabled": {
                backgroundColor: "#F8E7B1",
                opacity: 0.6,
              },
            }}
          >
            {isNavigating && navigationType === 'cart' 
              ? 'Loading...' 
              : 'View cart'
            }
          </QadeemButton>
        </Box>
      ) : null}
    </Box>
  );
}
