"use client";
import Image from "next/image";
import Typography from "@mui/material/Typography";

// GLOBAL CUSTOM COMPONENTS
import FlexBox from "components/flex-box/flex-box";
import useUser from "hooks/useUser";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function EmptyCartView({ onClose }) {
  const { state } = useUser();
  const router = useRouter();

  return (
    <FlexBox
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      height="calc(100% - 74px)"
    >
      <Image
        width={90}
        height={100}
        alt="shopping cart"
        src="/assets/images/icons/bag.svg"
      />

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
        <LoadingButton
          variant="contained"
          // loading={isLoading}
          onClick={() => router.push("/allProducts")}
          startIcon={<ShoppingCartIcon />} // <-- This adds the trolley icon
          sx={(theme) => ({
            borderRadius: "34px",
            mx: "auto",
            mb: 0,
            height: 40,
            textTransform: "none",
            backgroundColor: theme.palette.secondary.main,
            width: "70%",
            color: "#fff",
            "&:hover": {
              backgroundColor: theme.palette.primary.main,
            },
          })}
        >
          Start Shopping
        </LoadingButton>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          // mt={2}
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
        </Button>
      )}
    </FlexBox>
  );
}