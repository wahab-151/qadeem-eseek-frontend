"use client";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";
import useUser from "hooks/useUser";
import QadeemButton from "components/QadeemButton";
import { useRouter } from "next/navigation";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartBag from "icons/CartBag";

export default function EmptyCartView({ onClose }) {
  const { state } = useUser();
  const router = useRouter();
  const theme = useTheme();

  return (
    <FlexBox
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      height="calc(100% - 74px)"
    >
      <Box
        sx={{
          color: "#271E03",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CartBag sx={{ fontSize: 100 }} />
      </Box>

      <Typography
        variant="body1"
        sx={{
          mt: 2,
          mb: 2,
          maxWidth: 200,
          color: "grey.600",
          textAlign: "center",
        }}
      >
        Your shopping bag is empty.
      </Typography>
      {state?.user?.id ? (
        <QadeemButton
          variant="contained"
          onClick={() => router.push("/allProducts")}
          startIcon={<ShoppingCartIcon />}
          sx={{
            mx: "auto",
            mb: 0,
            height: 40,
            width: "70%",
            color: "#fff",
          }}
        >
          Start Shopping
        </QadeemButton>
      ) : (
        <QadeemButton
          variant="contained"
          color="secondary"
          onClick={() => {
            // Start loader on login navigation
            try {
              if (typeof window !== 'undefined' && window.NProgress) {
                window.__navTriggerType = 'empty-cart-login';
                window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
                window.__startTimeRef && (window.__startTimeRef.current = Date.now());
                window.NProgress.start();
              }
            } catch {}
            // Close mini-cart before navigating to login
            if (onClose) {
              onClose();
            }
            router.push("/login");
          }}
        >
          Login
        </QadeemButton>
      )}
    </FlexBox>
  );
}