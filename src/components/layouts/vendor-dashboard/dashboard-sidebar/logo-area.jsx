import Image from "next/image";
import { Typography, Box } from "@mui/material";

// GLOBAL CUSTOM COMPONENT
import FlexBetween from "components/flex-box/flex-between";

// LOCAL CUSTOM HOOK
import { useLayout } from "../dashboard-layout-context";

// STYLED COMPONENT
import { ChevronLeftIcon } from "./styles";
export default function LogoArea() {
  const {
    TOP_HEADER_AREA,
    COMPACT,
    sidebarCompact,
    handleSidebarCompactToggle
  } = useLayout();
  return <FlexBetween 
      p={2} 
      maxHeight={TOP_HEADER_AREA} 
      justifyContent={COMPACT ? "center" : "space-between"}
    >
      {COMPACT ? (
        <Box sx={{
          backgroundColor: '#FEFAF0',
          borderRadius: '50%',
          padding: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '56px',
          height: '56px',
        }}>
          <Image 
            alt="QADEEM Logo" 
            src="/assets/images/small-screen-logo.png"
            width={40} 
            height={40} 
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </Box>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Box sx={{
            backgroundColor: '#FEFAF0',
            borderRadius: '50%',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '70px',
            height: '70px',
          }}>
            <Image 
              alt="QADEEM Logo" 
              src="/assets/images/small-screen-logo.png"
              width={50} 
              height={50} 
              style={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, alignItems: 'flex-end' }}>
            <Typography
              sx={{
                fontFamily: '"Times New Roman", Times, serif',
                fontWeight: 500,
                fontSize: '20px',
                color: '#FFFFFF',
                letterSpacing: '3px',
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
                fontSize: '10px',
                color: '#FFFFFF',
                letterSpacing: '2px',
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}
            >
              CRAFTS
            </Typography>
          </Box>
        </div>
      )}

      <ChevronLeftIcon color="disabled" compact={COMPACT} onClick={handleSidebarCompactToggle} sidebar_compact={sidebarCompact ? 1 : 0} />
    </FlexBetween>;
}