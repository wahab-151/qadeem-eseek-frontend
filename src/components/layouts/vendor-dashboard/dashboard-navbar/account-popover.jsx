// "use client";
// import { useEffect, useState, useRef } from "react";
// import { IconButton, Avatar, Typography, Box, Button, Popper, Fade, Paper } from "@mui/material";
// import styled from "@mui/material/styles/styled";
// import { logoutUser } from "utils/helpers";
// import { useRouter } from "next/navigation";
// import { useTheme } from "@mui/material/styles";
// import { USERTYPE_ADMIN } from "utils/constants";
// import useUser from "hooks/useUser";
// import useCart from "hooks/useCart";
// import { useDispatch } from "react-redux";
// import appSlice from "app/store/services";

// const Divider = styled("div")(({ theme }) => ({
//   margin: "0.5rem 0",
//   border: `1px dashed ${theme.palette.grey[200]}`,
// }));

// const DropdownMenu = styled("div")(({ theme }) => ({
//   minWidth: 200,
//   backgroundColor: theme.palette.background.paper,
//   borderRadius: "8px",
//   boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
//   border: "1px solid",
//   borderColor: theme.palette.grey[200],
//   "& .MuiMenuItem-root:hover": {
//     backgroundColor: theme.palette.grey[100],
//   },
// }));

// const MenuItem = styled("div")(({ theme }) => ({
//   padding: "12px 16px",
//   cursor: "pointer",
//   transition: "background-color 0.2s ease",
//   "&:hover": {
//     backgroundColor: theme.palette.grey[100],
//   },
//   "&:first-of-type": {
//     borderTopLeftRadius: "8px",
//     borderTopRightRadius: "8px",
//   },
//   "&:last-of-type": {
//     borderBottomLeftRadius: "8px",
//     borderBottomRightRadius: "8px",
//   },
// }));

// export default function AccountPopover() {
//   const { state, dispatch } = useUser();
//   const { dispatch: cartDispatch } = useCart();
//   const rtkQueryDispatch = useDispatch(); // RTK Query dispatch for cache invalidation
//   const theme = useTheme();
//   const router = useRouter();
//   const [user, setUser] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [hovering, setHovering] = useState(false);
//   const timeoutRef = useRef(null);

//   useEffect(() => {
//     // Update user state whenever auth state changes (including when user logs out)
//     if (state?.user?.id) {
//       setUser(state.user);
//     } else {
//       // Clear user state when user logs out
//       setUser(null);
//     }
//   }, [state?.user]);

//   const handleMouseEnter = (event) => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//     setAnchorEl(event.currentTarget);
//     setHovering(true);
//   };

//   const handleMouseLeave = () => {
//     timeoutRef.current = setTimeout(() => {
//       setHovering(false);
//     }, 300);
//   };

//   const handleClose = () => {
//     setHovering(false);
//   };

//   const navigateLogin = () => {
//     // Start loader on login navigation
//     try {
//       if (typeof window !== 'undefined' && window.NProgress) {
//         window.__navTriggerType = 'account-login';
//         window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
//         window.__startTimeRef && (window.__startTimeRef.current = Date.now());
//         window.NProgress.start();
//       }
//     } catch {}
//     router.push("/login");
//   };
//   const navigateSignUp = () => {
//     // Start loader on register navigation
//     try {
//       if (typeof window !== 'undefined' && window.NProgress) {
//         window.__navTriggerType = 'account-register';
//         window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
//         window.__startTimeRef && (window.__startTimeRef.current = Date.now());
//         window.NProgress.start();
//       }
//     } catch {}
//     router.push("/register");
//   };

//   const open = Boolean(anchorEl) && hovering;
//   const id = open ? "account-popper" : undefined;

//   return (
//     <div 
//       style={{ position: "relative" }}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <IconButton
//         sx={{
//           height: 47,
//           px: 1.5,
//           py: 0.5,
//           borderRadius: "24px",
//           backgroundColor: {
//             xs: "transparent",
//             sm: "transparent",
//             md: theme.palette.primary.main,
//           },
//           display: "flex",
//           alignItems: "center",
//           gap: 1,
//           transition: "all 0.3s ease",
//           "&:hover": {
//             backgroundColor: theme.palette.secondary.main,
//           },
//         }}
//         aria-haspopup="true"
//         aria-expanded={open ? "true" : undefined}
//         aria-controls={open ? "account-menu" : undefined}
//       >
//         <Avatar
//           alt="My Account"
//           src="/assets/images/avatars/001-man.svg"
//           sx={{
//             width: 24,
//             height: 24,
//             transition: "all 0.3s ease",
//             "&:hover": {
//               border: `2px solid ${theme.palette.common.white}`,
//             },
//           }}
//         />
//         <Typography
//           variant="body2"
//           color="white"
//           sx={{ display: { xs: "none", sm: "none", md: "inline" } }}
//         >
//           My Account
//         </Typography>
//       </IconButton>

//       <Popper
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         placement="bottom-end"
//         transition
//         disablePortal={false}
//         PaperProps={{
//           onMouseEnter: () => {
//             if (timeoutRef.current) {
//               clearTimeout(timeoutRef.current);
//             }
//             setHovering(true);
//           },
//           onMouseLeave: handleMouseLeave,
//         }}
//         sx={{ mt: 1, zIndex: 10000 }}
//       >
//         {({ TransitionProps }) => (
//           <Fade {...TransitionProps} timeout={250}>
//             <DropdownMenu>
//         <Box px={2} pt={1}>
//           <Typography variant="h6">
//             Welcome {user?.firstName || ""}
//           </Typography>
//           <Typography variant="body1" sx={{ fontSize: 12, color: "grey.500" }}>
//             {user?.role || "Guest"}
//           </Typography>
//         </Box>
//         <Divider />
        
//         {user?.role === USERTYPE_ADMIN ? (
//           <>
//             <MenuItem onClick={() => {
//               // Start loader on admin dashboard navigation
//               try {
//                 if (typeof window !== 'undefined' && window.NProgress) {
//                   window.__navTriggerType = 'account-admin-dashboard';
//                   window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
//                   window.__startTimeRef && (window.__startTimeRef.current = Date.now());
//                   window.NProgress.start();
//                 }
//               } catch {}
//               router.push("/admin/dashboard");
//             }}>
//               Admin Dashboard
//             </MenuItem>
//             <Divider />
//           </>
//         ) : user?.role ? (
//           <>
//             <MenuItem onClick={() => {
//               // Start loader on customer dashboard navigation
//               try {
//                 if (typeof window !== 'undefined' && window.NProgress) {
//                   window.__navTriggerType = 'account-customer-dashboard';
//                   window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
//                   window.__startTimeRef && (window.__startTimeRef.current = Date.now());
//                   window.NProgress.start();
//                 }
//               } catch {}
//               router.push("/orders");
//             }}>
//               My Dashboard
//             </MenuItem>
//             <Divider />
//           </>
//         ) : null}
        
//         {user?.id ? (
//           <MenuItem>
//             <Button
//               variant="contained"
//               color="primary"
//               fullWidth
//               onClick={() => {
//                 handleClose();
//                 // Clear contexts, invalidate cache, and navigate - logoutUser will handle everything
//                 logoutUser(router, dispatch, cartDispatch, rtkQueryDispatch);
//               }}
//             >
//               Logout
//             </Button>
//           </MenuItem>
//         ) : (
//           <>
//             <MenuItem>
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 fullWidth
//                 onClick={() => {
//                   navigateLogin();
//                   handleClose();
//                 }}
//               >
//                 Login
//               </Button>
//             </MenuItem>
//             <MenuItem>
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 fullWidth
//                 onClick={() => {
//                   navigateSignUp();
//                   handleClose();
//                 }}
//               >
//                 Register
//               </Button>
//             </MenuItem>
//           </>
//                   )}
//             </DropdownMenu>
//           </Fade>
//         )}
//       </Popper>
//     </div>
//   );
// }


"use client";
import { useEffect, useState, useRef } from "react";
import {
  IconButton,
  Avatar,
  Typography,
  Box,
  Button,
  Popper,
  Fade,
} from "@mui/material";
import styled from "@mui/material/styles/styled";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import useUser from "hooks/useUser";
import useCart from "hooks/useCart";
import { useDispatch } from "react-redux";
import { logoutUser } from "utils/helpers";
import { USERTYPE_ADMIN } from "utils/constants";

const Divider = styled("div")(({ theme }) => ({
  margin: "0.5rem 0",
  border: `1px dashed ${theme.palette.grey[200]}`,
}));

const DropdownMenu = styled("div")(({ theme }) => ({
  minWidth: 220,
  backgroundColor: theme.palette.background.paper,
  borderRadius: "8px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
  border: "1px solid",
  borderColor: theme.palette.grey[200],
}));

const MenuItem = styled("div")(({ theme }) => ({
  padding: "12px 16px",
  cursor: "pointer",
  "&:hover": { backgroundColor: theme.palette.grey[100] },
}));

export default function AccountPopover() {
  const { state, dispatch } = useUser();
  const { dispatch: cartDispatch } = useCart();
  const rtkQueryDispatch = useDispatch();
  const theme = useTheme();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [hovering, setHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const timeoutRef = useRef(null);
  const wrapperRef = useRef(null);

  // ✅ Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Sync user state
  useEffect(() => {
    setUser(state?.user?.id ? state.user : null);
  }, [state?.user]);

  // ✅ Outside click detection for mobile
  useEffect(() => {
    if (!isMobile) return;

    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setAnchorEl(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobile]);

  // ✅ Hover logic (desktop)
  const handleMouseEnter = (event) => {
    if (isMobile) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setAnchorEl(event.currentTarget);
    setHovering(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    timeoutRef.current = setTimeout(() => setHovering(false), 300);
  };

  // ✅ Mobile click toggle
  const handleClick = (event) => {
    if (!isMobile) return;
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = isMobile ? Boolean(anchorEl) : Boolean(anchorEl) && hovering;
  const id = open ? "account-popper" : undefined;

  // ✅ Helper for navigation with NProgress support
  const navigateWithLoader = (path) => {
    try {
      if (typeof window !== "undefined" && window.NProgress) {
        window.__navTriggerType = path;
        window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
        window.__startTimeRef && (window.__startTimeRef.current = Date.now());
        window.NProgress.start();
      }
    } catch {}
    router.push(path);
  };

  return (
    <div
      ref={wrapperRef}
      style={{ position: "relative" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <IconButton
        sx={{
          height: 47,
          px: 1.5,
          py: 0.5,
          borderRadius: "24px",
          backgroundColor: {
            xs: "transparent",
            sm: "transparent",
            md: theme.palette.primary.main,
          },
          "&:hover": { backgroundColor: theme.palette.secondary.main },
        }}
        onClick={handleClick}
        aria-describedby={id}
      >
        <Avatar
          alt="My Account"
          src="/assets/images/avatars/001-man.svg"
          sx={{ width: 24, height: 24 }}
        />
        <Typography
          variant="body2"
          color="white"
          sx={{ display: { xs: "none", sm: "none", md: "inline" }, ml: 1 }}
        >
          My Account
        </Typography>
      </IconButton>

      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        transition
        sx={{ mt: 1, zIndex: 10000 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={250}>
            <DropdownMenu>
              <Box px={2} pt={1}>
                <Typography variant="h6">
                  Welcome {user?.firstName || ""}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "grey.500", fontSize: 12 }}
                >
                  {user?.role || "Guest"}
                </Typography>
              </Box>

              <Divider />

              {/* ✅ Admin Dashboard */}
              {user?.role === USERTYPE_ADMIN && (
                <>
                  <MenuItem
                    onClick={() => {
                      navigateWithLoader("/admin/dashboard");
                      setAnchorEl(null);
                    }}
                  >
                    Admin Dashboard
                  </MenuItem>
                  <Divider />
                </>
              )}

              {/* ✅ Customer Dashboard */}
              {user?.id && user?.role !== USERTYPE_ADMIN && (
                <>
                  <MenuItem
                    onClick={() => {
                      navigateWithLoader("/orders");
                      setAnchorEl(null);
                    }}
                  >
                    My Dashboard
                  </MenuItem>
                  <Divider />
                </>
              )}

              {/* ✅ Auth / Logout Buttons */}
              {user?.id ? (
                <MenuItem>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      logoutUser(
                        router,
                        dispatch,
                        cartDispatch,
                        rtkQueryDispatch
                      );
                      setAnchorEl(null);
                    }}
                  >
                    Logout
                  </Button>
                </MenuItem>
              ) : (
                <>
                  <MenuItem>
                    <Button
                      fullWidth
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        navigateWithLoader("/login");
                        setAnchorEl(null);
                      }}
                    >
                      Login
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      fullWidth
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        navigateWithLoader("/register");
                        setAnchorEl(null);
                      }}
                    >
                      Register
                    </Button>
                  </MenuItem>
                </>
              )}
            </DropdownMenu>
          </Fade>
        )}
      </Popper>
    </div>
  );
}
