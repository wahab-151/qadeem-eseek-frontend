"use client";

import styled from "@mui/material/styles/styled";
export const COMMON_DOT_STYLES = {
  left: 0,
  right: 0,
  bottom: 25,
  position: "absolute"
};
// export const RootStyle = styled("div", {
//   shouldForwardProp: prop => prop !== "space"
// })(({
//   space
// }) => ({
//   ".slick-list": {
//     marginInline: -space
//   },
//   ".slick-slide": {
//     paddingInline: space
//   },
//   ":hover .slick-arrow": {
//     opacity: 1,
//     borderRadius: 8,
//     "&.next": {
//       right: 6
//     },
//     "&.prev": {
//       left: 6
//     }
//   }
// }));

export const RootStyle = styled("div", {
  shouldForwardProp: (prop) => prop !== "space"
})(({ space, theme }) => ({
  position: "relative",
  backgroundColor: "transparent",
  overflow: "visible",

 ".slick-list": {
  marginInline: -space,
  overflow: "hidden",
},

  ".slick-slide": {
    paddingInline: space
  },
  
  // Ensure dots are visible
  "& .slick-dots": {
    display: "flex !important",
    visibility: "visible !important",
    opacity: "1 !important",
    position: "relative !important",
    bottom: "0 !important",
    marginTop: "16px",
  }
}));





export const DotList = styled("ul", {
  shouldForwardProp: prop => prop !== "activeDotColor"
})(({
  theme,
  activeDotColor
}) => ({
  display: "flex !important",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  margin: "0 !important",
  padding: "0 !important",
  listStyle: "none !important",
  position: "relative",
  bottom: "0",
  "& li": {
    width: "8px",
    height: "8px",
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.4s",
    margin: "0 4px",
    "& button": {
      display: "none",
    },
    "&.slick-active span": {
      backgroundColor: activeDotColor || theme.palette.primary.main
    },
    "&.slick-active": {
      width: "8px",
      height: "8px"
    }
  }
}));
export const Dot = styled("span", {
  shouldForwardProp: prop => prop !== "dotColor"
})(({
  dotColor,
  theme
}) => ({
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  cursor: "pointer",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: dotColor || "#FFC107",
  display: "block"
}));
export const ArrowButton = styled("div")(({
  theme
}) => ({
  zIndex: 1,
  width: 35,
  height: 35,
  padding: 0,
  opacity: 0,
  top: "50%",
  display: "flex",
  cursor: "pointer",
  position: "absolute",
  alignItems: "center",
  justifyContent: "center",
  transform: "translate(0, -50%)",
  transition: "all 0.2s ease-in-out",
  color: theme.palette.secondary.contrastText,
  backgroundColor: theme.palette.secondary.main,
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
  "&.prev": {
    left: 0
  },
  "&.next": {
    right: 0
  },
  "&.slick-disabled": {
    visibility: "hidden"
  },
  ...(theme.direction === "rtl" && {
    ".back-icon, .forward-icon": {
      rotate: "180deg"
    }
  })
}));