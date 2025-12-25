"use client";

import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";

// MUI ICON COMPONENTS
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

// GLOBAL CUSTOM COMPONENTS
import { NavLink } from "components/nav-link";
import FlexBox from "components/flex-box/flex-box";

// LOCAL CUSTOM COMPONENTS
// import MegaMenu from "./mega-menu";
import NavItemChild from "./nav-item-child";
import CategoryBasedMenu from "./category-based-menu";

// STYLED COMPONENTS
import { NAV_LINK_STYLES, ChildNavListWrapper } from "../styles";

// DATA TYPES

// ==============================================================

// ==============================================================

export default function NavigationList({ navigation }) {
  const renderNestLevel = (children) => {
    return children?.map((nav) => {
      if (nav?.child) {
        return (
          <NavItemChild nav={nav} key={nav.title}>
            {renderNestLevel(nav?.child)}
          </NavItemChild>
        );
      }
      return (
        <NavLink href={nav.url || "#"} key={nav.title}>
          <MenuItem>{nav.title} </MenuItem>
        </NavLink>
      );
    });
  };
  // console.log("navigation list", navigation);

  const renderRootLevel = (list) => {
    return list?.map((nav) => {
      // console.log("navigation menu map", nav)
      return (
        <CategoryBasedMenu
          key={nav?.title}
          title={nav?.title}
          menuList={nav?.child || []}
          nav={nav}
        />
      );
    });
  };

  return (
    <>
      {navigation?.length ? (
//         <FlexBox
//   sx={{
//     border: "1px solid #F3F5F9",
//     height: "70%",
//     borderRadius: "22px",
//     backgroundColor: "#F3F5F9",
//     width: "100%",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: "6px",
//     overflowX: "auto",
//     overflowY: "hidden",
//     whiteSpace: "nowrap",
//     scrollBehavior: "smooth",

//     "&::-webkit-scrollbar": {
//       height: "4px",
//     },
//     "&::-webkit-scrollbar-track": {
//       backgroundColor: "transparent",
//     },
//     "&::-webkit-scrollbar-thumb": {
//       backgroundColor: "#ccc",
//       borderRadius: "8px",
//     },
//     "&::-webkit-scrollbar-thumb:hover": {
//       backgroundColor: "#b3b3b3",
//     },

//     scrollbarWidth: "thin",
//     scrollbarColor: "#ccc transparent",
//   }}
//   gap={{ xs: "20px",md:"25px", xl: 5 }}
// >
//   {renderRootLevel(navigation)}
// </FlexBox>
<FlexBox
  sx={{
    border: "1px solid #F3F5F9",
    height: "70%",
    borderRadius: "22px",
    backgroundColor: "#F3F5F9",
    width: "100%",
   justifyContent: "space-between", // :white_check_mark: space between text and icon
    alignItems: "center",
    padding: "6px",
    overflowX: "auto",
    overflowY: "hidden",
    whiteSpace: "nowrap",
    scrollBehavior: "smooth",
    "&::-webkit-scrollbar": {
      height: "4px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#ccc",
      borderRadius: "8px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#B3B3B3",
    },
    scrollbarWidth: "thin",
    scrollbarColor: "#ccc transparent",
  }}
  gap={{ xs: "20px",md:"25px", xl: 5 }}
>
  {renderRootLevel(navigation)}
</FlexBox>
      ) : (
        ""
      )}
    </>
  );
}
