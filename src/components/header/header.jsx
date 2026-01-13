"use client";

import Link from "next/link";
import clsx from "clsx";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect, useRef } from "react";

// GLOBAL CUSTOM COMPONENTS
import LazyImage from "components/LazyImage";
import FlexBox from "components/flex-box/flex-box";
import performanceMonitor from "utils/performanceMonitor";

// LOCAL CUSTOM COMPONENT
import HeaderCategoryDropdown from "./header-category-dropdown";

// STYLED COMPONENTS
import { HeaderWrapper, StyledContainer } from "./styles";


// ==============================================================


export default function Header({
  className,
  children,
  mobileHeader
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false); // Track if header was re-revealed after being hidden
  const lastScrollY = useRef(0);
  const isVisibleRef = useRef(true);
  const isRevealedRef = useRef(false);
  const autoShowTimeoutRef = useRef(null);
  const scrollThreshold = 100; // Minimum scroll distance before hiding
  const autoShowDelay = 50; // Delay in ms before auto-showing header after hide

  // Keep refs in sync with state
  useEffect(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);

  useEffect(() => {
    isRevealedRef.current = isRevealed;
  }, [isRevealed]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Clear any pending auto-show timeout when scrolling
      if (autoShowTimeoutRef.current) {
        clearTimeout(autoShowTimeoutRef.current);
        autoShowTimeoutRef.current = null;
      }
      
      // Near top of page - reset everything, show header in relative position
      if (currentScrollY <= scrollThreshold) {
        setIsScrolled(false);
        setIsVisible(true);
        setIsRevealed(false); // Reset the revealed state
      }
      // Scrolling up (towards top)
      else if (currentScrollY < lastScrollY.current) {
        // If header was hidden, reveal it with fixed position
        if (!isVisibleRef.current) {
          setIsVisible(true);
          setIsScrolled(true);
          setIsRevealed(true); // Mark as re-revealed
        } else {
          // Header is already visible, keep it visible with fixed position
          setIsScrolled(true);
          setIsVisible(true);
        }
      } 
      // Scrolling down - only hide if not yet revealed after being hidden
      else if (currentScrollY > lastScrollY.current && currentScrollY > scrollThreshold) {
        // Only hide if header hasn't been re-revealed yet
        if (!isRevealedRef.current) {
          setIsScrolled(true);
          setIsVisible(false);
          
          // Auto-show header after delay
          autoShowTimeoutRef.current = setTimeout(() => {
            setIsVisible(true);
            setIsRevealed(true); // Mark as re-revealed
            autoShowTimeoutRef.current = null;
          }, autoShowDelay);
        } else {
          // Once revealed, keep it visible
          setIsScrolled(true);
          setIsVisible(true);
        }
      }
      
      lastScrollY.current = currentScrollY;
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (autoShowTimeoutRef.current) {
        clearTimeout(autoShowTimeoutRef.current);
      }
    };
  }, [autoShowDelay]);

  // Determine position: fixed when scrolled (whether visible or not), relative at top
  const shouldBeFixed = isScrolled;

  return (
    <HeaderWrapper 
      className={clsx(className, {
        'header-hidden': !isVisible,
        'header-fixed': shouldBeFixed && isVisible,
      })}
      sx={{
        position: shouldBeFixed ? 'fixed' : 'relative',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        borderTop: 'none',
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        opacity: isVisible ? 1 : 0,
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, box-shadow 0.3s ease',
        boxShadow: shouldBeFixed && isVisible ? '0px 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
        zIndex: shouldBeFixed ? 1300 : 3,
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      <StyledContainer>
        <div className="main-header">{children}</div>
        <div className="mobile-header">{mobileHeader}</div>
      </StyledContainer>
    </HeaderWrapper>
  )
}


function HeaderLeft({
  children
}) {
  return (
    <FlexBox 
      minWidth={100} 
      alignItems="center"
      sx={{
        flexShrink: 0
      }}
    >
      {children}
    </FlexBox>
  );
}


Header.Logo = ({
  url
}) => {
  const handleLogoClick = () => {
    // Start performance tracking for logo click
    const perfId = performanceMonitor.start('logo-click', 'app-initialization', {
      trigger: 'logo-click',
      targetPath: '/',
    });
    
    // Mark navigation start
    performanceMonitor.markMilestone(perfId, 'navigation-started', {
      timestamp: Date.now(),
    });
    
    // Store perfId to track app initialization after navigation
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('__logoClickPerfId', perfId);
    }
  };

  return (
    <HeaderLeft>
      <Link 
        href="/" 
        onClick={handleLogoClick} 
        style={{ 
          display: 'block', 
          textDecoration: 'none',
          maxWidth: '100%',
          width: 'fit-content'
        }}
      >
        {/* Large screen logo */}
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
          }}
        >
          <LazyImage
            src="/assets/images/Large-screen-logo.png"
            alt="logo"
            style={{
              objectFit: 'contain',
              width: '230px',
              height: 'auto',
              maxWidth: '230px',
              display: 'block',
              flexShrink: 0
            }}
            width={230}
            height={94}
          />
        </Box>
        {/* Small screen logo */}
        <Box
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          <LazyImage
            src="/assets/images/small-screen-logo.png"
            alt="logo"
            style={{
              objectFit: 'contain',
              width: '230px',
              height: 'auto',
              maxWidth: '230px',
              display: 'block',
              flexShrink: 0
            }}
            width={230}
            height={60}
          />
        </Box>
      </Link>
    </HeaderLeft>
  );
};


Header.CategoryDropdown = ({
  children
}) => {
  return <HeaderLeft>
    <HeaderCategoryDropdown>{children}</HeaderCategoryDropdown>
  </HeaderLeft>;
};


Header.Mid = ({
  children
}) => {
  return (
    <FlexBox 
      flex={1} 
      justifyContent="center" 
      alignItems="center"
      sx={{
        display: { xs: "none", md: "flex" }
      }}
    >
      {children}
    </FlexBox>
  );
};


Header.Right = ({
  children
}) => {
  return (
    <FlexBox 
      alignItems="center" 
      gap={2}
      sx={{
        minWidth: "fit-content",
        flexShrink: 0
      }}
    >
      {children}
    </FlexBox>
  );
};

HeaderLeft.displayName = 'HeaderLeft';
Header.Logo.displayName = 'Header.Logo';
Header.CategoryDropdown.displayName = 'Header.CategoryDropdown';
Header.Mid.displayName = 'Header.Mid';
Header.Right.displayName = 'Header.Right';