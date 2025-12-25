"use client";

import { useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import styled from "@mui/material/styles/styled";
// const theme=useTheme();

// STYLED COMPONENT

// STYLED COMPONENT
export const Wrapper = styled(Card)(({ theme }) => ({
  width: "100%",
  minHeight:'200px',
  overflow: "hidden",
  position: "relative",
  marginBottom: "1.25rem",
  transition: "border 0.3s ease",
  border: `1px solid ${theme.palette.grey[200]}`,

  '&:hover': {
    border: `1px solid ${theme.palette.secondary.main}`,
  },
}));


// export const ContentWrapper = styled("div")(({
//   theme
// }) => ({
//   display: "flex",
//   alignItems: "center",
//   flexDirection: "row",
//   "& .img-wrapper": {
//     width: 150,
//     flexShrink: 0,
//     position: "relative",
//     backgroundColor: theme.palette.grey[200]
//   },
//   "& .content": {
//     flex: 1,
//     padding: "1rem",
//     display: "flex",
//     alignItems: "flex-end",
//     justifyContent: "space-between"
//   },
//   [theme.breakpoints.down("sm")]: {
//     flexDirection: "column",
//     alignItems: "flex-start",
//     "& .img-wrapper": {
//       width: "100%"
//     },
//     "& .content": {
//       width: "100%"
//     }
//   }
// }));



export const ContentWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",

  "& .img-wrapper": {
    width: 150,
    flexShrink: 0,
    position: "relative",
    backgroundColor: theme.palette.grey[200],
  },

  "& .content": {
    flex: 1,
    padding: "1rem",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexDirection: "row", // make sure it's row by default
  },

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",

    "& .img-wrapper": {
      width: "100%",
    },

    "& .content": {
      width: "100%",
      flexDirection: "column", // <-- add this!
      alignItems: "flex-start", // optional: aligns children to the left
      gap: "0.5rem", // optional: vertical spacing between items
    },
  },
}));




export const TagRoot = styled("div")(({
  theme
}) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  "& p": {
    fontSize: 11,
    fontWeight: 500,
    display: "inline-block",
    textDecoration: "underline"
  }
}));