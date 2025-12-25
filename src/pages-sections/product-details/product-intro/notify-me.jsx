"use client";

import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { FlexBox } from "components/flex-box";
import { useSubscribeRestockMutation } from "app/store/services";
import { enqueueSnackbar } from "notistack";
import EmailIcon from "@mui/icons-material/Email";

export default function NotifyMe({ product }) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribeRestock, { isLoading }] = useSubscribeRestockMutation();

  const handleSubscribe = async () => {
    if (!email) {
      enqueueSnackbar("Please enter your email address", { variant: "warning" });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      enqueueSnackbar("Please enter a valid email address", { variant: "warning" });
      return;
    }

    try {
      await subscribeRestock({
        productId: product._id,
        email: email,
      }).unwrap();

      setIsSubscribed(true);
      enqueueSnackbar("You'll be notified when this product is back in stock!", {
        variant: "success",
      });
    } catch (error) {
      console.error("Subscribe error:", error);
      enqueueSnackbar(
        error?.data?.message || "Failed to subscribe. Please try again.",
        { variant: "error" }
      );
    }
  };

  if (isSubscribed) {
    return (
      <Box
        sx={{
          p: 2,
          border: "2px solid",
          borderColor: "success.main",
          borderRadius: 2,
          backgroundColor: "success.light",
          textAlign: "center",
        }}
      >
        <Typography variant="body1" color="success.dark" fontWeight="bold">
          ✅ You&apos;re subscribed!
        </Typography>
        {/* <Typography variant="body2" color="success.dark">
          We&apos;ll email you at <strong>{email}</strong> when this product is back in stock.
        </Typography> */}
      </Box>
    );
  }

  return (
    
      
      <FlexBox flexDirection="column" gap={2}>
        <TextField
          fullWidth
          type="email"
          // label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          variant="outlined"
          size="medium"
          InputProps={{
            startAdornment: <EmailIcon sx={{ mr: 1, color: "text.secondary" }} />,
          }}
        />
        
        <Button
          variant="contained"
          onClick={handleSubscribe}
          disabled={isLoading || !email}
          startIcon={isLoading ? <CircularProgress size={20} /> : <EmailIcon />}
          sx={{
            borderRadius: "34px",
            height: 40,
            textTransform: "none",
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
            "&.Mui-disabled": {
              backgroundColor: "grey.400",
            },
          }}
        >
          {isLoading ? "Subscribing..." : "Notify Me When Available"}
        </Button>
      </FlexBox>
  
  );
}
