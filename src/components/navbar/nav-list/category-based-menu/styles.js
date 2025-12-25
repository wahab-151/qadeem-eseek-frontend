import List from "@mui/material/List";
import Card from "@mui/material/Card";
import ListItem from "@mui/material/ListItem";
import styled from "@mui/material/styles/styled";







const Wrapper = styled("div")(({ theme }) => ({
  cursor: "pointer",
  transition: "color 150ms ease-in-out",
  overflow: "hidden",
  whiteSpace: "nowrap",
  maxWidth: "100%",
 
  ":hover": {
    color: theme.palette.primary.main,
  },
 "& .menu-title": {
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontSize: "0.9rem",
  gap: "16px",

  ".icon": {
    fontSize: "1rem",
    color: theme.palette.grey[500],
    flexShrink: 0,
  },

  [theme.breakpoints.down("md")]: {
    fontSize: "0.8rem",
    gap: "12px",
    ".icon": {
      fontSize: "0.9rem",
    },
  },

  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
    gap: "8px",
    ".icon": {
      fontSize: "0.8rem",
    },
  },

  [theme.breakpoints.down("xs")]: {
    fontSize: "0.65rem",
    gap: "6px",
    ".icon": {
      fontSize: "0.75rem",
    },
  },
},}))

const MenusContainer = styled("div")({
  left: "43%", // Start from center
  transform: "translateX(-42%)", // Adjust back by half of width
  zIndex: 2,
  top: "70%",
  width: "96%", // 80% of viewport width
  height: "100%",
  display: "none",
  minHeight: "500px",
  maxHeight: "500px",
  position: "absolute",
});


const StyledCard = styled(Card)({
  marginTop: 12,
  height: "100%",
  display: "flex",
  borderRadius: 0,
  overflow: "unset",
});



const CategoryList = styled(List)(({ theme }) => ({
  margin:'18px !important',
  // border:"2px solid red",

  // padding: "0px 10px 0px 0px",
padding:'10px',
  
  // margin:'4px',
  width: 300,
  height: "94%",
  borderRadius: "15px",

  backgroundColor: `${theme.palette.grey[200]}`,
  overflowY: "auto",
  overflowX: "hidden",

  // Custom scrollbar
  "&::-webkit-scrollbar": {
    width: "6px", // Thin scrollbar
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.grey[200], // same as background
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.grey[400], // slightly darker so it's visible
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: theme.palette.grey[500], // on hover, a little more contrast
  },

  // Firefox support
  scrollbarWidth: "thin",
  scrollbarColor: `${theme.palette.grey[400]} ${theme.palette.grey[200]}`,
}));

const CategoryListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ theme, active }) => ({
  width: "90%",
  // border: "1px solid green",
  margin: "auto",
  marginBottom: "10px",
  padding: "10px 16px",
  borderRadius: "25px",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
  opacity: 0,
  transform: "translateX(-20px)",
  animation: "slideIn 0.3s ease forwards",
  transition: "all 0.3s ease",
  color: active ? theme.palette.primary.main : "#333",
  backgroundColor: active ? "#fff" : "transparent",
  fontWeight: active ? "600" : "400",
  "& .icon": {
    fontSize: "1.3rem",
    color: active ? theme.palette.primary.main : "#999", // Default arrow color
    transition: "color 0.3s ease",
  },
  fontSize: "1.1rem", // :white_check_mark: Increased text size for label
  "& span": {
    fontSize: "1.1rem", // :white_check_mark: Explicitly for label text
  },
  "&:hover": {
    backgroundColor: "#FFFFFF", // :white_check_mark: Deep gray on hover
    color: "#007AFF", // :white_check_mark: Text primary color on hover
    "& .icon": {
      color: "#007AFF", // :white_check_mark: Arrow primary color on hover
    },
  },
  "@keyframes slideIn": {
    to: {
      opacity: 1,
      transform: "translateX(0)",
    },
  },
}));

// const CategoryListItem = styled(ListItem, {
//   shouldForwardProp: (prop) => prop !== "active",
// })(({ theme, active }) => ({
//   margin: "10px",
//   // padding: "1rem 1.5rem",

//   //  border:'2px solid red',
//   transition: "all 0.3s",
//   justifyContent: "space-between",
//   opacity: 0,
//   transform: "translateX(-20px)",
//   animation: "slideIn 0.3s ease forwards",
//   borderRadius: "25px", // Ensure this is always applied
//   overflow: "hidden", // Helps show the border radius if inner content overflows
//   alignSelf: "start", // Prevents full width stretching
//   "& .icon": {
//     fontSize: "1.3rem",
//     transition: "all 0.3s ease-in-out", // smooth zoom
//   },
//   ":dir(rtl) .icon": {
//     rotate: "180deg",
//   },
//   ...(active && {
//     color: theme.palette.secondary.main,
//     // backgroundColor: theme.palette.secondary.hover,
//     borderRadius: "25px",
//     fontSize: "1rem",
//   }),
//   "&:hover": {
//     backgroundColor: "theme.palette.secondary.main",
//     // color: theme.palette.secondary.main,
//     fontWeight: "bold",
//   },
//   "@keyframes slideIn": {
//     to: {
//       opacity: 1,
//       transform: "translateX(0)",
//     },
//   },
// }));

const SubCategoryList = styled(List)(({ theme }) => ({
  padding: 0,
    // border:'1px solid red',
  display: "grid",
  //  overflowY: "scroll",
  // overflowX: "hidden",
  gridTemplateColumns: "repeat(6, 1fr)",
  [theme.breakpoints.down("xl")]: {
    gridTemplateColumns: "repeat(5, 1fr)",
  },
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
}));

const SubCategoryListItem = styled(ListItem)(({ theme }) => ({
  gap: 12,
  fontSize: 13,
  padding: "0",
  alignItems: "center",
  // marginBottom: "1.5rem",
  transition: "all 0.3s",
//  border:'1px solid red',
  ":hover": {
    color: theme.palette.primary.main,
  },
  "& .sub-item-avatar": {
    borderRadius: "4px",
    backgroundColor: theme.palette.grey[100],
  },
}));
export {
  Wrapper,
  StyledCard,
  CategoryList,
  MenusContainer,
  SubCategoryList,
  CategoryListItem,
  SubCategoryListItem,
};

// import List from "@mui/material/List";
// import Card from "@mui/material/Card";
// import ListItem from "@mui/material/ListItem";
// import styled from "@mui/material/styles/styled";

// const Wrapper = styled("div")(({ theme }) => ({
//   cursor: "pointer",
//   transition: "color 150ms ease-in-out",
//   ":hover": {
//     color: theme.palette.primary.main,
//     "& .menu-list": {
//       display: "block",
//     },
//   },
//   "& .menu-title": {
//     fontWeight: 700,
//     display: "flex",
//     alignItems: "flex-end",
//     justifyContent: "center",
//     gap: theme.spacing(0.3),
//     ".icon": {
//       fontSize: "1.1rem",
//       color: theme.palette.grey[500],
//     },
//   },
// }));

// const MenusContainer = styled("div")({
//   left: "43%", // Start from center
//   transform: "translateX(-42%)", // Adjust back by half of width
//   zIndex: 2,
//   top: "66%",
//   width: "96%", // 80% of viewport width
//   height: "100%",
//   display: "none",
//   minHeight: "500px",
//   maxHeight: "500px",
//   position: "absolute",
//   // border: "2px solid red",
// });

// const StyledCard = styled(Card)({
//   marginTop: 12,
//   height: "100%",
//   display: "flex",
//   borderRadius: 0,
//   overflow: "unset",
// });
// // const CategoryList = styled(List)(({
// //   theme
// // }) => ({
// //   padding: 0,
// //   width: 300,
// //   height: "100%",
// //   borderRight: `1px solid ${theme.palette.grey[200]}`
// // }));
// // const CategoryListItem = styled(ListItem, {
// //   shouldForwardProp: prop => prop !== "active"
// // })(({
// //   theme,
// //   active
// // }) => ({
// //   padding: "1rem 1.5rem",
// //   transition: "all 0.3s",
// //   justifyContent: "space-between",
// //   "& .icon": {
// //     fontSize: "1rem"
// //   },
// //   ":dir(rtl) .icon": {
// //     rotate: "180deg"
// //   },
// //   ...(active && {
// //     color: theme.palette.primary.main,
// //     backgroundColor: theme.palette.action.hover
// //   })
// // }));

// const CategoryList = styled(List)(({ theme }) => ({
//   padding: "0px",
//   // margin:'4px',
//   width: 300,
//   height: "100%",
//   borderRadius: "15px",
//   // borderRight: `1px solid ${theme.palette.grey[200]}`,
//   border: `1px solid ${theme.palette.grey[200]}`,
//   backgroundColor: `${theme.palette.grey[200]}`,
//   overflowY: "scroll",

//   // Custom scrollbar
//   "&::-webkit-scrollbar": {
//     width: "6px", // Thin scrollbar
//   },
//   "&::-webkit-scrollbar-track": {
//     backgroundColor: theme.palette.grey[200], // same as background
//     borderRadius: "10px",
//   },
//   "&::-webkit-scrollbar-thumb": {
//     backgroundColor: theme.palette.grey[400], // slightly darker so it's visible
//     borderRadius: "10px",
//   },
//   "&::-webkit-scrollbar-thumb:hover": {
//     backgroundColor: theme.palette.grey[500], // on hover, a little more contrast
//   },

//   // Firefox support
//   scrollbarWidth: "thin",
//   scrollbarColor: `${theme.palette.grey[400]} ${theme.palette.grey[200]}`,
// }));

// // const CategoryListItem = styled(ListItem, {
// //   shouldForwardProp: (prop) => prop !== 'active'
// // })(({ theme, active }) => ({
// //   margin:'5px',
// //   padding: "1rem 1.5rem",
// //   transition: "all 0.3s",
// //   justifyContent: "space-between",
// //   opacity: 0,
// //   transform: "translateX(-20px)",
// //   animation: "slideIn 0.3s ease forwards",
// //   // border:`1px solid red`,
// //   "& .icon": {
// //     fontSize: "1rem"
// //   },
// //   ":dir(rtl) .icon": {
// //     rotate: "180deg"
// //   },
// //   ...(active && {
// //     color: theme.palette.primary.main,
// //     // backgroungdColor:"white",
// //     backgroundColor: theme.palette.action.hover,
// //     borderRadius:'15px'

// //   }),
// //   "@keyframes slideIn": {
// //     to: {
// //       opacity: 1,
// //       transform: "translateX(0)"
// //     }
// //   }
// // }));

// const CategoryListItem = styled(ListItem, {
//   shouldForwardProp: (prop) => prop !== "active",
// })(({ theme, active }) => ({
//   // border: "2px solid red",

//   margin: "15px",
//   padding: "1rem 1.5rem",
//   transition: "all 0.3s",
//   justifyContent: "space-between",
//   opacity: 0,
//   transform: "translateX(-20px)",
//   animation: "slideIn 0.3s ease forwards",
//   borderRadius: "25px", // Ensure this is always applied
//   overflow: "hidden", // Helps show the border radius if inner content overflows
//   alignSelf: "start", // Prevents full width stretching
//   width: "86%",
//   "& .icon": {
//     fontSize: "1.3rem",
//     transition: "all 0.3s ease-in-out", // smooth zoom
//   },
//   ":dir(rtl) .icon": {
//     rotate: "180deg",
//   },
//   ...(active && {
//     color: theme.palette.secondary.main,
//     backgroundColor: theme.palette.action.hover,
//     borderRadius: "25px",
//     fontSize: "1rem",
//   }),
//   "&:hover": {
//     backgroundColor: "#ffffff",
//     // color: theme.palette.secondary.main,
//     fontWeight: "bold",
//   },
//   "@keyframes slideIn": {
//     to: {
//       opacity: 1,
//       transform: "translateX(0)",
//     },
//   },
// }));

// const SubCategoryList = styled(List)(({ theme }) => ({
//   padding: 0,
//   // border: "2px solid red",
//   height: "100%",
//   overflowY: "scroll",
//   display: "grid",
//   gridTemplateColumns: "repeat(6, 1fr)",
//   [theme.breakpoints.down("xl")]: {
//     gridTemplateColumns: "repeat(5, 1fr)",
//   },
//   [theme.breakpoints.down("lg")]: {
//     gridTemplateColumns: "repeat(4, 1fr)",
//   },
//   // Custom scrollbar
//   "&::-webkit-scrollbar": {
//     width: "6px", // Thin scrollbar
//   },
//   "&::-webkit-scrollbar-track": {
//     backgroundColor: theme.palette.grey[200], // same as background
//     borderRadius: "10px",
//   },
//   "&::-webkit-scrollbar-thumb": {
//     backgroundColor: theme.palette.grey[400], // slightly darker so it's visible
//     borderRadius: "10px",
//   },
//   "&::-webkit-scrollbar-thumb:hover": {
//     backgroundColor: theme.palette.grey[500], // on hover, a little more contrast
//   },

//   // Firefox support
//   scrollbarWidth: "thin",
//   scrollbarColor: `${theme.palette.grey[400]} ${theme.palette.grey[200]}`,
// }));

// const SubCategoryListItem = styled(ListItem)(({ theme }) => ({
//   gap: 12,
//   fontSize: 13,
//   padding: "0",
//   alignItems: "center",
//   // marginBottom: "1.5rem",
//   transition: "all 0.3s",
//   ":hover": {
//     color: theme.palette.primary.main,
//   },
//   "& .sub-item-avatar": {
//     borderRadius: "4px",
//     backgroundColor: theme.palette.grey[100],
//   },
// }));

// export {
//   Wrapper,
//   StyledCard,
//   CategoryList,
//   MenusContainer,
//   SubCategoryList,
//   CategoryListItem,
//   SubCategoryListItem,
// };
