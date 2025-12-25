



"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from 'react';
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Fade, Box, CircularProgress } from "@mui/material";
import { LoginPageView, RegisterPageView, ResetPasswordPageView } from 'pages-sections/sessions/page-view';
import { Wrapper } from "pages-sections/sessions/styles";
import LoginBottom from "pages-sections/sessions/components/login-bottom";
import LogoWithTitle from "pages-sections/sessions/components/logo-title";
import RegisterBottom from "pages-sections/sessions/components/register-bottom";
import { useSnackbar } from "notistack";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useUser from "hooks/useUser";
export default function CommonModalPage() {
  const { enqueueSnackbar } = useSnackbar();
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMediaQuery(theme => theme.breakpoints.down("xs"));
  const [open, setOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { state: authState } = useUser();
  const previousAuthState = useRef(null);
  const previousPathname = useRef(pathname);

  const modalPaths = ['/login', '/register', '/reset-password'];

  // Check if user is already logged in and redirect with toast
  useEffect(() => {
    const isLoggedIn = authState?.user && authState?.token;
    const wasLoggedIn = previousAuthState.current?.user && previousAuthState.current?.token;
    
    // Only show "already logged in" message if user navigates to modal while already logged in
    // Don't show it if auth state changes from logged out to logged in (fresh login)
    if (isLoggedIn && !wasLoggedIn && modalPaths.includes(pathname)) {
      // User just logged in, don't show "already logged in" message
      // This happens during successful login
      return;
    }
    
    if (isLoggedIn && wasLoggedIn && modalPaths.includes(pathname)) {
      // User navigates to login while already logged in
      enqueueSnackbar("You are already logged in!", { variant: "info" });
      router.push("/home");
      return;
    }
    
    // Update previous auth state
    previousAuthState.current = { user: authState?.user, token: authState?.token };
  }, [authState, pathname, enqueueSnackbar, router]);

  useEffect(() => {
    const isLoggedIn = authState?.user && authState?.token;
    const wasLoggedIn = previousAuthState.current?.user && previousAuthState.current?.token;
    
    // If user just logged in and we're still on a modal path, close modal immediately
    // Navigation will happen from login form
    if (isLoggedIn && !wasLoggedIn && modalPaths.includes(pathname)) {
      setOpen(false);
      return;
    }
    
    // Only open modal if we're navigating TO a modal path and user is NOT logged in
    if (modalPaths.includes(pathname)) {
      if (isLoggedIn) {
        // User is logged in, don't show modal
        setOpen(false);
      } else {
        // Open immediately for fast response
        setOpen(true);
      }
    } else {
      // If we're not on a modal path, close the modal
      // This handles the case when navigation happens and pathname changes
      setOpen(false);
    }
  }, [pathname, authState]);

  // Handle form transitions with loading state
  useEffect(() => {
    const isFormTransition = 
      modalPaths.includes(pathname) && 
      modalPaths.includes(previousPathname.current) &&
      pathname !== previousPathname.current;

    if (isFormTransition) {
      setIsTransitioning(true);
      // Short delay for smooth transition
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setIsTransitioning(false);
    }

    previousPathname.current = pathname;
  }, [pathname]);

  const closeModal = (skipNavigation = false) => {
    // Close immediately for fast response
    setOpen(false);
    // Only navigate if not skipping (i.e., when user manually closes, not on successful login)
    if (!skipNavigation) {
      // Navigate after a short delay to allow animation
      setTimeout(() => {
        if (modalPaths.includes(pathname)) {
          router.push("/home");
        }
      }, 150);
    }
  };

  // useEffect(()=>{
  //   if(open === false) setOpen(true)
  // },[])
  // useEffect(() => {
  //   // Check localStorage only once when component mounts
  //   sessionStorage.setItem('modalSubmitted', 'true');
  //   const wasSubmitted = sessionStorage.getItem('modalSubmitted');
  //   // Only open modal if form wasn't submitted
  //   // console.log("localstoraaage", wasSubmitted);
  //   const notSubmit = wasSubmitted === 'true' ? true : false
  //   setOpen(notSubmit);
  // }, []);

  // console.log("from(.)layout console",open)
  const showRegister = pathname === '/register';
  const showResetPassword = pathname === '/reset-password';


  const handleFormToggle = (isRegister) => {
    setIsTransitioning(true);
    // Start loader on form toggle navigation
    try {
      if (typeof window !== 'undefined' && window.NProgress) {
        window.__navTriggerType = 'modal-form-toggle';
        window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
        window.__startTimeRef && (window.__startTimeRef.current = Date.now());
        window.NProgress.start();
      }
    } catch {}
    router.push(isRegister ? '/register' : '/login');
    // Transition will be handled by useEffect
  };

  const handleSuccess = () => {
    // Close modal without navigating - let the login form handle navigation
    closeModal(true);
  };


  // const closeModal = () => {
  //   setOpen(false)
  //   router.push("/home");
  // }
  return (
    <>
      <Dialog
        open={open}
        scroll="body"
        fullWidth={isMobile}
        onClose={closeModal}
        TransitionComponent={Fade}
        transitionDuration={200}
        sx={{
          '& .MuiDialog-paper': {
            transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
          },
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <Wrapper sx={{ position: "relative" }}>
          {/* Close Button */}
          <IconButton
            aria-label="close"
            onClick={closeModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.primary[500],
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>
          
          <LogoWithTitle />
          
          {/* Loading overlay during form transitions */}
          {isTransitioning ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '300px',
                position: 'relative',
              }}
            >
              <CircularProgress size={40} />
            </Box>
          ) : (
            <>
              {showRegister ? (
                <>
                  <RegisterPageView
                    onLoginClick={() => handleFormToggle(false)}
                    onSuccess={handleSuccess}
                  />
                  <RegisterBottom />
                </>
              ) : showResetPassword ? (
                <>
                  <ResetPasswordPageView
                    onSuccess={handleSuccess}
                  />
                </>
              ) : (
                <>
                  <LoginPageView
                    onRegisterClick={() => handleFormToggle(true)}
                    onSuccess={handleSuccess}
                  />
                  <LoginBottom />
                </>
              )}
            </>
          )}
        </Wrapper>
      </Dialog>
    </>
  );
}