'use client'
import { useEffect, useState } from "react";
// LOCAL CUSTOM COMPONENTS
import NavbarCategoryDropdown from "./navbar-category-dropdown";

// STYLED COMPONENTS
import { NavBarWrapper, InnerContainer } from "./styles";
import { useGetMegaMenuCategoriesQuery } from "app/store/services";
import NavigationList from "./nav-list";
import { transformCategoriesForMegaMenu } from "utils/helpers"
import { CircularProgress } from "@mui/material";


// ==========================================================


// ==========================================================

export default function Navbar({
  elevation = 2,
  border = 0,
  categories,
  navigation,
   isLoading
}) {
//  console.log("navbar ", navigation)
  return <NavBarWrapper elevation={elevation} border={border}  > 
    <InnerContainer centered={!categories}  >
      {/* CATEGORY MEGA MENU dropdown on left*/}
      {/* {categories ? <NavbarCategoryDropdown>{categories}</NavbarCategoryDropdown> : null} */}
     {isLoading ? 
     <CircularProgress size={24} />
      : navigation ? < NavigationList navigation={navigation} /> :""}

      {/* HORIZONTAL MENU */}
      {/* {navigation} */}
    </InnerContainer>
  </NavBarWrapper>;
}