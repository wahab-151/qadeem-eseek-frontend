import ButtonBase from "@mui/material/ButtonBase";
import { alpha, styled } from "@mui/material/styles";

// MUI ICON COMPONENTS
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";


// ===============================================================


// ===============================================================

const SidebarWrapper = styled("div", {
  shouldForwardProp: prop => prop !== "compact"
})(({
  theme,
  compact
}) => ({
  width: 280,
  height: "100vh",
  position: "fixed",
  transition: "all .2s ease",
  zIndex: theme.zIndex.drawer,
  color: "#FEFAF0", // Warm cream text
  backgroundColor: "#2C2416", // Deep warm brown background
  backgroundImage: "linear-gradient(135deg, #2C2416 0%, #4A3F26 100%)",
  ...(compact && {
    width: 86,
    "&:hover": {
      width: 280
    }
  })
}));

const NavItemButton = styled(ButtonBase, {
  shouldForwardProp: prop => prop !== "active"
})(({
  theme,
  active
}) => ({
  height: 44,
  width: "100%",
  borderRadius: 8,
  marginBottom: 4,
  padding: "0 12px 0 16px",
  justifyContent: "flex-start",
  transition: "all 0.15s ease",
  fontFamily: '"Times New Roman", Times, serif',
  fontSize: '15px',
  letterSpacing: '0.5px',
  color: "#FEFAF0", // Warm cream text
  "&:hover": {
    backgroundColor: alpha("#8B7548", 0.2), // Heritage bronze with transparency
    color: "#D4C4A0", // Lighter gold on hover
  },
  ...(active && {
    color: "#8B7548", // Heritage bronze for active
    backgroundColor: alpha("#8B7548", 0.15), // Light bronze background
    borderLeft: "3px solid #8B7548", // Bronze border accent
    paddingLeft: "13px", // Adjust for border
    "& .MuiSvgIcon-root .secondary": {
      color: "#8B7548", // Heritage bronze
      opacity: 1
    }
  })
}));
const ListLabel = styled("p", {
  shouldForwardProp: prop => prop !== "compact"
})(({
  compact
}) => ({
  fontWeight: 600,
  fontSize: "12px",
  fontFamily: '"Times New Roman", Times, serif',
  letterSpacing: '1px',
  marginTop: "20px",
  marginLeft: "15px",
  marginBottom: "10px",
  textTransform: "uppercase",
  transition: "all 0.15s ease",
  ...(compact && {
    opacity: 0,
    width: 0
  })
}));
const ListIconWrapper = styled("div")(({
  theme
}) => ({
  width: 22,
  height: 22,
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  marginRight: "0.8rem",
  justifyContent: "center",
  "& svg": {
    width: "100%",
    height: "100%",
    color: "#D4C4A0" // Warm gold for icons
  }
}));
const ExternalLink = styled("a")({
  overflow: "hidden",
  whiteSpace: "pre",
  marginBottom: "8px",
  textDecoration: "none"
});
const StyledText = styled("span", {
  shouldForwardProp: prop => prop !== "compact"
})(({
  compact
}) => ({
  whiteSpace: "nowrap",
  fontFamily: '"Times New Roman", Times, serif',
  fontSize: '15px',
  letterSpacing: '0.5px',
  transition: "all 0.15s ease",
  ...(compact && {
    opacity: 0,
    width: 0
  })
}));



const BulletIcon = styled("div", {
  shouldForwardProp: prop => prop !== "active"
})(({
  theme,
  active
}) => ({
  width: 3,
  height: 3,
  marginLeft: "10px",
  overflow: "hidden",
  borderRadius: "50%",
  marginRight: "1.3rem",
  background: active ? "#8B7548" : "#FEFAF0", // Heritage bronze when active
  boxShadow: active ? `0px 0px 0px 4px ${alpha("#8B7548", 0.2)}` : "none"
}));
const BadgeValue = styled("div", {
  shouldForwardProp: prop => prop !== "compact"
})(({
  compact
}) => ({
  padding: "1px 8px",
  overflow: "hidden",
  borderRadius: "300px",
  display: compact ? "none" : "unset"
}));
const ChevronLeftIcon = styled(ChevronLeft, {
  shouldForwardProp: prop => prop !== "compact" && prop !== "sidebar_compact"
})(({
  compact,
  sidebar_compact
}) => ({
  width: 40,
  height: 40,
  padding: 8,
  cursor: "pointer",
  borderRadius: "50%",
  transition: "all 0.3s",
  color: "#D4C4A0", // Warm gold
  display: compact ? "none" : "block",
  transform: sidebar_compact ? "rotate(180deg)" : "rotate(0deg)",
  "&:hover": {
    color: "#8B7548", // Heritage bronze on hover
    background: alpha("#8B7548", 0.15)
  }
}));
const ChevronRightIcon = styled(ChevronRight, {
  shouldForwardProp: prop => prop !== "compact" && prop !== "collapsed"
})(({
  collapsed,
  compact,
  theme: {
    direction
  }
}) => ({
  fontSize: 18,
  color: "#D4C4A0", // Warm gold
  transform: collapsed ? "0deg" : "rotate(90deg)",
  transition: "transform 0.3s cubic-bezier(0, 0, 0.2, 1) 0ms",
  ...(compact && {
    display: "none",
    width: 0
  }),
  ...(collapsed && direction === "rtl" && {
    transform: "rotate(180deg)"
  })
}));
export { ListLabel, StyledText, BulletIcon, BadgeValue, ExternalLink, NavItemButton, SidebarWrapper, ListIconWrapper, ChevronLeftIcon, ChevronRightIcon };