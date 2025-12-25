"use client";

// import styled from "@mui/material/styles/styled";
import { styled, keyframes } from "@mui/material/styles";

// export const StyledRoot = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "space-between",
//   width: '100%',
//   backgroundColor: theme.palette.background.paper, // Ensures contrast with shadow
//   borderRadius: 20,
 
//   overflow: 'hidden',
//   transition: "box-shadow 0.3s ease",

//   ".title": {
//     fontSize: 50,
//     marginTop: 0,
//     lineHeight: 1.2,
//     marginBottom: "1.35rem"
//   },

//   ".description": {
//     marginBottom: theme.spacing(2.7),
//     color: theme.palette.secondary.main
//   },

//   ".button-link": {
//     height: 44,
//     borderRadius: 8
//   },

//   ".img-wrapper": {
//     height: 400,
//     display: "flex",
//     marginInline: "auto",
//     position: "relative",
//     borderRadius: 12,
//     overflow: "hidden",
//     img: {
//       objectFit: "contain"
//     }
//   },

//   [theme.breakpoints.up("sm")]: {
//     ".grid-item": {
//       minHeight: 424,
//       display: "flex",
//       alignItems: "baseline",
//       flexDirection: "column",
//       justifyContent: "center"
//     }
//   },

//   [theme.breakpoints.down("sm")]: {
//     flexDirection: "column",
//     padding: theme.spacing(2),
//     ".title": {
//       fontSize: 32
//     }
//   },

//   [theme.breakpoints.down("xs")]: {
//     ".title": {
//       fontSize: 20
//     },
//     ".title + *": {
//       fontSize: 14
//     },
//     ".button-link": {
//       height: 36,
//       padding: "0 1.5rem",
//       fontSize: 13
//     }
//   },
// //   "&:hover": {
// //   boxShadow: "0 12px 35px rgba(0, 0, 0, 0.15)"
// // }
// }));




// Title animated gradient

import { Box } from "@mui/material";

// Text gradient animation
export const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Floating button animation
export const floatButton = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(0px);
  }
`;

export const StyledRoot = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  backgroundColor: theme.palette.background.paper,
  borderRadius: 20,
  overflow: "hidden",
  transition: "box-shadow 0.3s ease",
// border:'1px solid red',
  ".title": {
    fontSize: 50,
    marginTop: 0,
    lineHeight: 1.2,
    marginBottom: "1.35rem",
    background: "linear-gradient(270deg,rgb(14, 45, 129),rgb(16, 91, 167),rgb(26, 36, 97))",
    backgroundSize: "600% 600%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: `${gradientAnimation} 6s ease infinite`,
  },

  ".description": {
    fontWeight: 500,
    fontSize: "1.2em",
    marginBottom: theme.spacing(2.7),
    background: "linear-gradient(90deg,rgb(18, 26, 77) 0%,rgb(134, 22, 41) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  ".button-link": {
    height: 44,
    borderRadius: 8,
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    animation: `${floatButton} 3.2s ease-in-out infinite`,
    transition: "background 0.3s ease",
  },

  ".img-wrapper": {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    // gridTemplateRows: "auto auto",
    gap: "16px",
    padding: "1rem",
    justifyItems: "center",
    alignItems: "center",
    // borderRadius: 12,

    "& img:nth-of-type(1)": {
      gridColumn: "1",
      maxWidth: "300px",
    },
    "& img:nth-of-type(2)": {
      gridColumn: "2",
      maxWidth: "300px",
    },
    "& img:nth-of-type(3)": {
      gridColumn: "1 / 3",
      justifySelf: "center",
      maxWidth: "300px",
    },

    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto auto auto",
      "& img": {
        gridColumn: "1 / 2 !important",
        justifySelf: "center",
        maxWidth: "80%",
      },
    },
  },

  ".multi-img": {
    borderRadius: 12,
    width: "auto",
    maxWidth: "100%",
    height: "auto",
    objectFit: "contain",
    transition: "transform 0.4s ease",
maxHeight:'220px',
    "&:hover": {
      transform: "scale(1.05)",
    },
  },

  [theme.breakpoints.up("sm")]: {
    ".grid-item": {
      maxHeight: 424,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      paddingInline: theme.spacing(4),
      textAlign: "left",
    },
  },

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    padding: theme.spacing(2),
    ".title": {
      fontSize: 32,
    },
  },

  [theme.breakpoints.down("xs")]: {
    ".title": {
      fontSize: 20,
    },
    ".title + *": {
      fontSize: 14,
    },
    ".button-link": {
      height: 36,
      padding: "0 1.5rem",
      fontSize: 13,
    },
  },
[theme.breakpoints.down("lg")]: {
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",

  "& > .MuiGrid-root": {
    // this targets the Grid container
    justifyContent: "center",
    textAlign: "center",
  },

  ".grid-item": {
    marginInline: "auto",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    paddingInline: theme.spacing(2),
  },
  ".imagesDiv": {
    marginInline: "auto",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    paddingInline: theme.spacing(2),
  },
},
}));
