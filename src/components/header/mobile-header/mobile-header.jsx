"use client";

import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";

// GLOBAL CUSTOM COMPONENTS
import { FlexBetween, FlexBox } from "components/flex-box";
export default function MobileHeader({
  children
}) {
  return <FlexBetween width="100%">{children}</FlexBetween>;
}
MobileHeader.Left = ({
  children
}) => {
  return <Box sx={{ width: 'auto', minWidth: 'fit-content' }}>{children}</Box>;
};
MobileHeader.Logo = ({
  logoUrl
}) => {
  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10px',
        flex: 1,
        maxWidth: '100%',
        overflow: 'hidden',
        px: { xs: 1, sm: 2 }
      }}
    >
      <Link 
        href="/home" 
        style={{ 
          display: 'block', 
          maxWidth: '100%',
          width: 'fit-content'
        }}
      >
        <Image 
          width={110} 
          height={94} 
          src={logoUrl} 
          alt="logo"
          style={{
            maxWidth: '100%',
            height: 'auto',
            objectFit: 'contain'
          }}
          sizes="(max-width: 600px) 90px, 110px"
        />
      </Link>
    </Box>
  );
};
MobileHeader.Right = ({
  children
}) => {
  return <FlexBox justifyContent="end" sx={{ width: 'auto', minWidth: 'fit-content' }}>
      {children}
    </FlexBox>;
};

MobileHeader.Left.displayName = 'MobileHeader.Left';
MobileHeader.Logo.displayName = 'MobileHeader.Logo';
MobileHeader.Right.displayName = 'MobileHeader.Right';