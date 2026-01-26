import Link from "next/link";
import { Fragment } from "react";
import Image from "next/image";
import { Typography, Box } from "@mui/material";

// CUSTOM ICON COMPONENTS
import Globe from "icons/Globe";
import Toggle from "icons/Toggle";

// LOCAL CUSTOM HOOKS
import { useLayout } from "../dashboard-layout-context";

// STYLED COMPONENTS
import { CustomButton, ToggleWrapper } from "./styles";
export default function LeftContent() {
  const {
    handleOpenMobileSidebar
  } = useLayout();
  return <Fragment>
      <ToggleWrapper onClick={handleOpenMobileSidebar}>
        <Toggle />
      </ToggleWrapper>
      <Link href="/home" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
        <Box sx={{
          backgroundColor: '#FEFAF0',
          borderRadius: '50%',
          padding: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '60px',
          height: '60px',
        }}>
          <Image 
            src="/assets/images/small-screen-logo.png"
            alt="QADEEM Logo" 
            width={44}
            height={44}
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', gap: 0.5, alignItems: 'flex-end' }}>
          <Typography
            sx={{
              fontFamily: '"Times New Roman", Times, serif',
              fontWeight: 500,
              fontSize: '18px',
              color: '#2C2416',
              letterSpacing: '2.5px',
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}
          >
            QADEEM
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Times New Roman", Times, serif',
              fontWeight: 400,
              fontSize: '9px',
              color: '#2C2416',
              letterSpacing: '1.5px',
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}
          >
            CRAFTS
          </Typography>
        </Box>
      </Link>
       
      {/* <CustomButton LinkComponent={Link} href="/" startIcon={<Globe sx={{
      color: "grey.900"
    }} />}>
        Browse Website
      </CustomButton> */}
    </Fragment>;
}