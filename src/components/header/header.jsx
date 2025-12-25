"use client";

import Link from "next/link";
import clsx from "clsx";

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
  return (
    <HeaderWrapper className={clsx(className)}>
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
  return <FlexBox minWidth={100} alignItems="center">
    {children}
  </FlexBox>;
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
          maxWidth: '100%',
          width: 'fit-content'
        }}
      >
        <LazyImage
          src={url}
          alt="logo"
          style={{
            objectFit: 'contain',
            borderRadius: '25px',
            width: '105px',
            height: '66px',
            maxWidth: '100%',
            maxHeight: '66px',
            display: 'block'
          }}
          width={105}
          height={66}
        />
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
  return children;
};


Header.Right = ({
  children
}) => {
  return <div style={{
    display: 'flex', flexDirection: 'row', gap: '10px',
    alignItems: 'center'
  }}>{children}</div>;
};

HeaderLeft.displayName = 'HeaderLeft';
Header.Logo.displayName = 'Header.Logo';
Header.CategoryDropdown.displayName = 'Header.CategoryDropdown';
Header.Mid.displayName = 'Header.Mid';
Header.Right.displayName = 'Header.Right';