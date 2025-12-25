"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// MUI
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";

// GLOBAL CUSTOM COMPONENTS
import SearchInput from "components/SearchInput";
import { MobileSearchInput } from "components/search-box";
import IconComponent from "components/IconComponent";
import OverlayScrollbar from "components/overlay-scrollbar";
import { MobileNavigationBar } from "components/mobile-navigation";
import { HeaderCart, HeaderLogin } from "components/header";
import { MobileMenu } from "components/navbar/mobile-menu";
import { HeaderSearch, MobileHeader } from "components/header/mobile-header";
import renderChild from "./render-child";

// STYLES
import { CategoryListItem, StyledRoot } from "./styles";
import AccountPopover from "components/layouts/vendor-dashboard/dashboard-navbar/account-popover";
import { Box } from "@mui/material";

// TYPES


// ==============================================================


// ==============================================================

export default function MobileCategoriesPageView({
  data=null
}) {
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);

  if (!data) {
    return <p>No data available.</p>; // or show fallback UI or return null
  }

  // Set initial selected state after data check
  if (!selected && data.header?.categoryMenus?.length > 0) {
    setSelected(data.header.categoryMenus[0]);
  }

  const {
    header,
    mobileNavigation
  } = data;
  
  const handleCategoryClick = async (item) => {
    if (item.children) {
      setSelected(item);
    } else {
      setIsNavigating(true);
      try {
        await router.push(item.href);
      } catch (error) {
        console.error("Navigation error:", error);
      } finally {
        setIsNavigating(false);
      }
    }
  };

  return <StyledRoot>
    <p>page-view mobile cat</p>
      <div className="header">
        <MobileHeader>
          <MobileHeader.Left>
            <MobileMenu navigation={header.navigation} />
          </MobileHeader.Left>

          <MobileHeader.Logo logoUrl={mobileNavigation.logo} />

          <MobileHeader.Right>
            <HeaderSearch>
              <MobileSearchInput />
            </HeaderSearch>

            {/* <HeaderLogin /> */}
             <AccountPopover />
            <HeaderCart />
          </MobileHeader.Right>
        </MobileHeader>
      </div>

      <OverlayScrollbar className="category-list">
        {header.categoryMenus.map((item, i) => (
          <Tooltip key={i} title={item.title} placement="right" arrow>
            <CategoryListItem 
              isActive={selected.title === item.title} 
              onClick={() => handleCategoryClick(item)}
              sx={{ position: 'relative' }}
            >
              {isNavigating && item.href && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 1,
                    zIndex: 1,
                  }}
                >
                  <CircularProgress size={20} color="primary" />
                </Box>
              )}
              <IconComponent icon={item.icon} className="icon" />
              <p className="title">{item.title}</p>
            </CategoryListItem>
          </Tooltip>
        ))}
      </OverlayScrollbar>

      <div className="container">{renderChild(selected.children)}</div>

      <MobileNavigationBar navigation={mobileNavigation.version1} />
    </StyledRoot>;
}