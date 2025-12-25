import { GlobalStyles } from "@mui/material";
import styled from "@mui/material/styles/styled";
import { SnackbarProvider as NotistackProvider } from "notistack";
import React from "react";


// STYLED COMPONENT
// const Provider = styled(NotistackProvider)(({
//   theme
// }) => ({
//   "&.SnackbarContent-root.SnackbarItem-contentRoot": {
//     boxShadow: theme.shadows[2],
//     color: theme.palette.common.black,
//     background: theme.palette.common.white,
//     fontFamily: theme.typography.fontFamily
//   },
//   "&.SnackbarItem-variantSuccess .MuiSvgIcon-root": {
//     color: theme.palette.success.main
//   },
//   "&.SnackbarItem-variantError .MuiSvgIcon-root": {
//     color: theme.palette.error.main
//   }
// }));
const Provider = styled(NotistackProvider, {
  shouldForwardProp: (prop) => prop !== 'PaperProps',
})(({ theme }) => ({
  //  Z-index for the snackbar container
  zIndex: 10000,

  "&.SnackbarContent-root.SnackbarItem-contentRoot": {
    boxShadow: theme.shadows[2],
    color: theme.palette.common.black,
    background: theme.palette.common.white,
    fontFamily: theme.typography.fontFamily,
  },
  "&.SnackbarItem-variantSuccess .MuiSvgIcon-root": {
    color: theme.palette.success.main,
  },
  "&.SnackbarItem-variantError .MuiSvgIcon-root": {
    color: theme.palette.error.main,
  },
}));
export default function SnackbarProvider({
  children
}) {
  return <React.Fragment>
  <GlobalStyles styles={{
    '[id^="notistack-snackbar"]': {
      zIndex: 11000,
    },
  }} />
  <Provider maxSnack={4} autoHideDuration={2000} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
    {children}
  </Provider>
</React.Fragment>
  // return <Provider maxSnack={4} autoHideDuration={2000} anchorOrigin={{
  //   vertical: "bottom",
  //   horizontal: "right"
  // }}>
  //     {children}
  //   </Provider>;
}