"use client";

import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";

import Link from "next/link";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useDispatch } from "react-redux";
import LogoutDialog from "components/LogoutDialog";

import Person from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";
import PlaceOutlined from "@mui/icons-material/PlaceOutlined";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";

import useUser from "hooks/useUser";
import useCart from "hooks/useCart";
import QadeemButton from "components/QadeemButton";
import { logoutUser } from "utils/helpers";

export default function HeaderLoginButton() {
  const router = useRouter();
  const theme = useTheme();
  const { state: userState, dispatch: userDispatch } = useUser();
  const { dispatch: cartDispatch } = useCart();
  const rtkQueryDispatch = useDispatch();

  const BRAND_COLOR = "#271E03";

  const user = userState?.user;
  const [mounted, setMounted] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const open = Boolean(anchorEl);

  // Fix hydration mismatch by only showing content after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = (event) => {
    if (user?.id) {
      setAnchorEl(event.currentTarget);
    } else {
      // If not logged in, navigate to login page
      try {
        if (typeof window !== "undefined" && window.NProgress) {
          window.__navTriggerType = "header-login";
          window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
          window.__startTimeRef && (window.__startTimeRef.current = Date.now());
          window.NProgress.start();
        }
      } catch {}
      router.push("/login");
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleClose();
    setLogoutDialogOpen(true);
  };

  const confirmLogout = () => {
    setLogoutDialogOpen(false);
    logoutUser(router, userDispatch, cartDispatch, rtkQueryDispatch);
  };

  const cancelLogout = () => {
    setLogoutDialogOpen(false);
  };

  // Show placeholder during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <QadeemButton
        variant="contained"
        color="primary"
        onClick={() => {}}
        sx={{
          color: "#F5F5F0",
          px: 2.5,
          py: 1,
          fontSize: "0.875rem",
        }}
      >
        Log in
      </QadeemButton>
    );
  }

  const userAvatar =
    user?.avatar ||
    (Array.isArray(user?.file) && user.file[0]) ||
    "/assets/images/faces/propic.png";

  const userName = user?.firstName
    ? `${user.firstName} ${user.lastName || ""}`.trim()
    : user?.name || "User";

  if (user?.id) {
    return (
      <>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            src={userAvatar}
            sx={{ width: 56, height: 56, border: "2px solid #fff" }}
          >
            {user?.firstName?.charAt(0) || user?.email?.charAt(0)}
          </Avatar>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          sx={{
            "& .MuiMenuItem-root": {
              color: BRAND_COLOR,
              "& .MuiListItemIcon-root": {
                color: BRAND_COLOR,
              },
              "&:hover": {
                bgcolor: BRAND_COLOR,
                color: "white",
                "& .MuiListItemIcon-root": {
                  color: "white",
                },
              },
              "&.logout-item": {
                color: "error.main",
                "& .MuiListItemIcon-root": {
                  color: "error.main",
                },
              },
              "&.logout-item:hover": {
                bgcolor: "error.main",
                color: "white",
                "& .MuiListItemIcon-root": {
                  color: "white",
                },
              },
            },
          }}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                borderRadius: 0,
                minWidth: 200, // Ensure enough width for email
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Box sx={{ px: 2, py: 1.5, textAlign: "center" }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, color: "text.primary", lineHeight: 1.2 }}
            >
              {userName}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {user.email}
            </Typography>
          </Box>
          <Divider sx={{ my: 0.5 }} />

          <MenuItem component={Link} href="/profile">
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            Account
          </MenuItem>

          <MenuItem component={Link} href={`/profile/${user.id}`}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Edit Account
          </MenuItem>

          <MenuItem component={Link} href="/address">
            <ListItemIcon>
              <PlaceOutlined fontSize="small" />
            </ListItemIcon>
            Address
          </MenuItem>

          <MenuItem component={Link} href="/orders">
            <ListItemIcon>
              <ShoppingBagOutlined fontSize="small" />
            </ListItemIcon>
            Orders
          </MenuItem>

          <Divider sx={{ my: 0.5 }} />

          <MenuItem onClick={handleLogoutClick} className="logout-item">
            <ListItemIcon>
              <LogoutOutlined fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>

        <LogoutDialog
          open={logoutDialogOpen}
          handleClose={cancelLogout}
          confirmLogout={confirmLogout}
        />
      </>
    );
  }

  return (
    <QadeemButton
      variant="contained"
      color="primary"
      onClick={handleClick}
      sx={{
        color: "#F5F5F0", // Light off-white color
        px: 2.5,
        py: 1,
        fontSize: "0.875rem",
      }}
    >
      Log in
    </QadeemButton>
  );
}
