import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// GLOBAL CUSTOM COMPONENT
import OverlayScrollbar from "components/overlay-scrollbar";

// LOCAL CUSTOM COMPONENT
import SidebarAccordion from "./sidebar-accordion";

// LOCAL CUSTOM HOOKS
import { useLayout } from "../dashboard-layout-context";

// SIDEBAR NAVIGATION LIST
import { navigation } from "../dashboard-navigation";
import { salespersonNavigation } from "../salesperson-navigation";

// STYLED COMPONENTS
import {
  ListLabel,
  BadgeValue,
  StyledText,
  BulletIcon,
  ExternalLink,
  NavItemButton,
  ListIconWrapper,
} from "./styles";
import { logoutUser } from "utils/helpers";
import { useTheme } from "@mui/material";
import useUser from "hooks/useUser";
import useCart from "hooks/useCart";
import { useDispatch } from "react-redux";

export default function MultiLevelMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const { COMPACT, TOP_HEADER_AREA, handleCloseMobileSidebar } = useLayout();
  const { dispatch: userDispatch } = useUser();
  const { dispatch: cartDispatch } = useCart();
  const rtkQueryDispatch = useDispatch(); // RTK Query dispatch for cache invalidation

  const theme=useTheme()

  // Get user role and determine which navigation to use
  const userRole = typeof window !== "undefined" ? localStorage.getItem("auth-user-role") : null;
  const isSalesPerson = userRole?.trim().toLowerCase() === "salesperson";
  const currentNavigation = isSalesPerson ? salespersonNavigation : navigation;


  // HANDLE ACTIVE CURRENT PAGE
  const activeRoute = (path) => (pathname === path ? 1 : 0);
  const renderLevels = (data) => {
    return data?.map((item, index) => {
      const isLogout = item?.name === "Logout";

      if (item.type === "label") {
        return (
          <ListLabel key={index} compact={COMPACT}>
            {item.label}
          </ListLabel>
        );
      }

      if (item.children) {
        return (
          <SidebarAccordion key={index} item={item}>
            {renderLevels(item.children)}
          </SidebarAccordion>
        );
      }

      if (item.type === "extLink") {
        return (
          <ExternalLink
            key={index}
            href={item.path}
            rel="noopener noreferrer"
            target="_blank"
          >
            <NavItemButton key={item.name} name="child" active={0}>
              {item.icon ? (
                <ListIconWrapper>
                  <item.icon
                    style={{
                      color: isLogout
                        ? theme.palette.primary.main
                        : "inherit",
                    }}
                  />
                </ListIconWrapper>
              ) : (
                <span
                  className="item-icon icon-text"
                  style={{
                    color: isLogout
                      ? theme.palette.primary.main
                      : "inherit",
                  }}
                >
                  {item.iconText}
                </span>
              )}

              <StyledText
                compact={COMPACT}
                style={{
                  color: isLogout ? theme.palette.primary.main : "inherit",
                }}
              >
                {item.name}
              </StyledText>

              {item.badge ? (
                <BadgeValue compact={COMPACT}>{item.badge.value}</BadgeValue>
              ) : null}
            </NavItemButton>
          </ExternalLink>
        );
      }

      return (
        <Link key={index} href={item.path} passHref>
          <NavItemButton
            className="navItem"
            active={activeRoute(item.path)}
              onClick={() => {
                try {
                  if (typeof window !== 'undefined' && window.NProgress) {
                    window.__navTriggerType = 'navigation-item';
                    window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
                    window.__startTimeRef && (window.__startTimeRef.current = Date.now());
                    window.NProgress.start();
                  }
                } catch {}
              if (isLogout) {
                // console.log("logout mutation call");
                // Clear contexts, invalidate cache, and navigate - logoutUser will handle everything
                logoutUser(router, userDispatch, cartDispatch, rtkQueryDispatch);
              }
              handleCloseMobileSidebar();
            }}
            sx={{
              color: isLogout
                ? theme.palette.primary.main
                : "inherit",
              "& .MuiSvgIcon-root": {
                color: isLogout
                  ? theme.palette.primary.main
                  : "inherit",
              },
            }}
          >
            {item?.icon ? (
              <ListIconWrapper>
                <item.icon />
              </ListIconWrapper>
            ) : (
              <BulletIcon
                active={activeRoute(item.path)}
                style={{
                  color: isLogout
                    ? theme.palette.primary.main
                    : "inherit",
                }}
              />
            )}

            <StyledText
              compact={COMPACT}
              style={{
                color: isLogout ? theme.palette.primary.main : "inherit",
              }}
            >
              {item.name}
            </StyledText>

            {item.badge ? (
              <BadgeValue compact={COMPACT}>
                {item.badge.value}
              </BadgeValue>
            ) : null}
          </NavItemButton>
        </Link>
      );
    });
  };

  return (
    <OverlayScrollbar
      sx={{
        px: 2,
        overflowX: "hidden",
        maxHeight: `calc(100vh - ${TOP_HEADER_AREA}px)`,
      }}
    >
      {renderLevels(currentNavigation)}
    </OverlayScrollbar>
  );
}
