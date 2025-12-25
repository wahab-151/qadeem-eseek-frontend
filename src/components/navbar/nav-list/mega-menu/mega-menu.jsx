// import Grid from "@mui/material/Grid2";
// import Card from "@mui/material/Card";
// import List from "@mui/material/List";
// import Typography from "@mui/material/Typography";
// import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

// // GLOBAL CUSTOM COMPONENTS
// import { NavLink } from "components/nav-link";

// // GLOBAL CUSTOM HOOKS
// import useOverflowDetect from "hooks/useOverflowDetect";

// // STYLED COMPONENTS
// import { MenuListItem, MenusContainer, Wrapper } from "./styles";

// // DATA TYPES


// // ===============================================================


// // ===============================================================

// const gridSize = length => {
//   if (length === 1) return 12;
//   if (length === 2) return 6;
//   if (length === 3) return 4;
//   return 3;
// };
// export default function MegaMenu({
//   title,
//   menuList
// }) {
//   console.log("mega menu ====>>>>",title, menuList)
// // get grid size the basis of menu list
//   const grid = gridSize(menuList.length);
//   const {
//     elementRef,
//     isLeftOverflowing,
//     isRightOverflowing,
//     checkOverflow
//   } = useOverflowDetect();
//   return <Wrapper onMouseOver={checkOverflow}>
//       <div className="menu-title">
//         {title} hereeeeeee
//         <KeyboardArrowDown className="icon" />
//       </div>

//       <MenusContainer ref={elementRef} className="menu-list" left={isLeftOverflowing} right={isRightOverflowing}>
//         <Card className="card" elevation={5}>
//           <Grid container>
//             {menuList.slice(0, 4).map((category, key) => <Grid size={{
//             md: grid
//           }} key={key} className="grid-item">
//                 {category.map((item, i) => <CategoryList category={item} key={item.title + i} />)}
//               </Grid>)}
//           </Grid>
//         </Card>
//       </MenusContainer>
//     </Wrapper>;
// }


// function CategoryList({
//   category: {
//     title,
//     child
//   }
// }) {
//   return <List>
//       <Typography variant="h6"  sx={{
//       mb: 0.5,
//       pl: 4,
//       fontWeight: 'bold'
//     }}>
//         {title} adfgadfgsd
//       </Typography>

//       {child.map((sub, i) => <NavLink href={sub.url} key={sub.title + i}>
//           <MenuListItem>{sub.title}</MenuListItem>
//         </NavLink>)}
//     </List>;
// }
import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Image from "next/image";

// GLOBAL CUSTOM COMPONENTS
import { NavLink } from "components/nav-link";

// GLOBAL CUSTOM HOOKS
import useOverflowDetect from "hooks/useOverflowDetect";

// STYLED COMPONENTS
import { MenuListItem, MenusContainer, Wrapper } from "./styles";
import { Box } from "@mui/material";

// Helper to determine grid size
const getGridSize = (length) => {
  if (length === 1) return 12;
  if (length === 2) return 6;
  if (length === 3) return 4;
  return 3;
};

export default function MegaMenu({ title, menuList }) {
  const grid = getGridSize(menuList.length);
  const {
    elementRef,
    isLeftOverflowing,
    isRightOverflowing,
    checkOverflow,
  } = useOverflowDetect();

// console.log("mega menu ====>>>>",title, menuList)

  return (
    <Wrapper onMouseOver={checkOverflow}>
      <div className="menu-title">
        {title} meganu hai
        <KeyboardArrowDown className="icon" />
      </div>

      <MenusContainer
        ref={elementRef}
        className="menu-list"
        left={isLeftOverflowing}
        right={isRightOverflowing}
      >
        <Card className="card" elevation={5}>
          <Grid container spacing={2}>
            {menuList.map((categoryGroup, idx) => (
              <Grid item md={grid} xs={12} sm={6} key={idx} className="grid-item">
                {categoryGroup.map((item, subIdx) => (
                  <CategoryList category={item} key={`${item.title}-${subIdx}`} />
                ))}
              </Grid>
            ))}
          </Grid>
        </Card>
      </MenusContainer>
    </Wrapper>
  );
}
function CategoryList({ category }) {
  if (!category?.child?.length) return null;

  return (
    <List>
      <Box sx={{ display: "flex", alignItems: "center", pl: 2, mb: 1 }}>
        {category.image && (
          <Image
            src={category.image}
            alt={category.title}
            width={30}
            height={30}
            style={{ marginRight: 8, borderRadius: 4 }}
          />
        )}
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {category.title}
        </Typography>
      </Box>

      {category.child.map((sub, i) => {
        const key = `${sub.title}-${i}`;

        return sub.url ? (
          <NavLink href={sub.url} key={key}>
            <MenuListItem>{sub.title}</MenuListItem>
          </NavLink>
        ) : (
          <MenuListItem key={key} sx={{ pl: 4, color: "text.secondary" }}>
            {sub.title}
          </MenuListItem>
        );
      })}
    </List>
  );
}
