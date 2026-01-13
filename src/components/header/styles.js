import Container from "@mui/material/Container";
import styled from "@mui/material/styles/styled";

// CONSTANT VARIABLES
import { layoutConstant } from "utils/constants";
export const HeaderWrapper = styled("div")(({
  theme
}) => ({
  zIndex: 3,
  position: "relative",
  height: layoutConstant.headerHeight,
  transition: "height 250ms ease-in-out",
  background: "#FEFAF0", // Background color
  borderTop: "none",
  [theme.breakpoints.down("sm")]: {
    height: layoutConstant.mobileHeaderHeight,
    position: "sticky",
    top: layoutConstant.topbarHeight,
    zIndex: 1200,
    boxShadow: theme.shadows[2]
  }
}));

export const StyledContainer = styled(Container)(({
  theme
}) => ({
  height: "100%",
  "& > div": {
    gap: 2,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  "& .main-header": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: 2,
  },
  "& .mobile-header": {
    display: "none"
  },
  [theme.breakpoints.down(1150)]: {
    "& .mobile-header": {
      display: "flex"
    },
    "& .main-header": {
      display: "none"
    }
  }
}));