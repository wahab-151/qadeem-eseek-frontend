import Image from "next/image";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

// LOCAL CUSTOM COMPONENTS
import LogoArea from "./logo-area";
import LayoutDrawer from "../../layout-drawer";
import MultiLevelMenu from "./multi-level-menu";

// LOCAL CUSTOM HOOK
import { useLayout } from "../dashboard-layout-context";

// STYLED COMPONENT
import { SidebarWrapper } from "./styles";
import Link from "next/link";
export default function DashboardSidebar() {
  const {
    sidebarCompact,
    TOP_HEADER_AREA,
    showMobileSideBar,
    handleSidebarHover,
    handleCloseMobileSidebar
  } = useLayout();
  const downLg = useMediaQuery(theme => theme.breakpoints.down("lg"));
  if (downLg) {
    return <LayoutDrawer open={showMobileSideBar ? true : false} onClose={handleCloseMobileSidebar}>
        <Box p={2} maxHeight={TOP_HEADER_AREA} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
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
                  alt="QADEEM Logo" 
                  width={44} 
                  height={44} 
                  src="/assets/images/small-screen-logo.png" 
                  style={{ objectFit: 'contain' }}
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, alignItems: 'flex-end' }}>
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
        </Box>

        <MultiLevelMenu />
      </LayoutDrawer>;
  }
  return <SidebarWrapper compact={sidebarCompact ? 1 : 0} onMouseEnter={() => handleSidebarHover(true)} onMouseLeave={() => sidebarCompact && handleSidebarHover(false)}>
      {/* SIDEBAR TOP LOGO SECTION */}
      <LogoArea />

      {/* SIDEBAR NAVIGATION SECTION */}
      <MultiLevelMenu />

    </SidebarWrapper>;
}