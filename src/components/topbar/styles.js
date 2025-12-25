"use client";

import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import styled from "@mui/material/styles/styled";
import { layoutConstant } from "utils/constants";


export const StyledRoot = styled("div", {
  shouldForwardProp: prop => prop !== "bgColor" && prop !== "expand"
})(({
  theme,
  bgColor,
  expand
}) => ({
  fontSize: 12,
  height: layoutConstant.topbarHeight,
  borderBottom: `1px solid ${theme.palette.secondary.main}`,
  color: theme.palette.text.primary,
  background: bgColor || theme.palette.background.paper,
  transition: "height 300ms ease",
  // marquee keyframes
  "@keyframes marquee": {
    "0%": { transform: "translateX(0)" },
    "100%": { transform: "translateX(-100%)" }
  },
  "& .menuItem": {
    minWidth: 100
  },
  "& .marginRight": {
    marginRight: "1.25rem"
  },
  "& .expand": {
    display: "none",
    padding: 0
  },
  "& .handler": {
    height: layoutConstant.topbarHeight
  },
  "& .menuTitle": {
    fontSize: 12,
    marginLeft: "0.5rem",
    fontWeight: 600
  },
  "& .topbarRight": {
    display: "flex",
    alignItems: "center",
    flexShrink: 0
  },
  // ticker styles
  "& .ticker": {
    flex: 1,
    display: "flex",
    alignItems: "center",
    minWidth: 0
  },
  "& .tickerViewport": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    width: "100%"
  },
  "& .tickerContent": {
    display: "inline-block",
    paddingLeft: "100%",
    willChange: "transform",
    animation: "marquee 18s linear infinite"
  },
  "& .title": {
    fontWeight: 700,
    fontSize: 14
  },
  // ensure tag row allocates space correctly
  "& .tag": {
    minWidth: 0,
    flex: 1
  },
  "& .tag .MuiChip-root": {
    flexShrink: 0
  },
  [theme.breakpoints.down("sm")]: {
    height: expand ? 80 : layoutConstant.topbarHeight,
    position: "sticky",
    top: 0,
    zIndex: 1100,
    background: bgColor || theme.palette.background.paper,
    color: theme.palette.text.primary,
    "& .MuiSvgIcon-root": {
      color: theme.palette.text.primary
    },
    "& .topbarRight": {
      paddingBottom: 5,
      alignItems: "center",
      display: "flex",
      gap: 8
    },
    "& .expand": {
      display: "none",
      height: layoutConstant.topbarHeight
    },
    // ensure ticker remains one-line and scrollable on mobile
    "& .tickerViewport": {
      overflow: "hidden",
      whiteSpace: "nowrap",
      width: "100%"
    },
    // show promo chip but compress it to leave room for ticker
    "& .tag": {
      gap: ".35rem"
    },
    "& .tag .MuiChip-root": {
      flexShrink: 1,
      maxWidth: 100,
      height: 22,
      fontSize: 10
    },
    "& .tag .MuiChip-root .MuiChip-label": {
      paddingInline: ".5rem",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }
}));
export const StyledContainer = styled(Container)(({
  theme
}) => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  // keep a single row on mobile so icons and ticker share the top bar
}));
export const StyledChip = styled(Chip)(({
  theme
}) => ({
  color: "white",
  fontWeight: 600,
  backgroundColor: theme.palette.primary.main,
  "& .MuiChip-label": {
    paddingInline: ".8rem"
  }
}));
export const LeftContent = styled("div")(() => ({
  flex: 1,
  minWidth: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  ".tag": {
    gap: ".5rem",
    display: "flex",
    alignItems: "center"
  }
}));