"use client";

import { usePathname, useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function SimpleStepper() {
  const pathname = usePathname();
  const router = useRouter();

  const handleStepClick = (step) => {
    if (step === "shipping") router.push("/checkout");
    if (step === "review") router.push("/payment");
  };

  const isShipping = pathname === "/cart" || pathname === "/checkout";
  const isReview = pathname === "/payment" || pathname === "/orders";

  return (
    <Box
      display="flex"
      justifyContent="left"
      alignItems="center"
      mb={4}
      sx={{
        flexWrap: 'wrap',
        gap: { xs: 0.5, md: 0 }
      }}
    >
      <Typography
        onClick={() => handleStepClick("shipping")}
        sx={{
          cursor: "pointer",
          fontWeight: isShipping ? "bold" : "normal",
          fontSize: { xs: "0.875rem", md: "1rem" },
          mx: { xs: 0.5, md: 1 },
        }}
      >
        Shipping
      </Typography>

      <Typography fontSize={{ xs: "0.875rem", md: "1rem" }}>&gt;</Typography>

      <Typography
        onClick={() => handleStepClick("review")}
        sx={{
          cursor: "pointer",
          fontWeight: isReview ? "bold" : "normal",
          fontSize: { xs: "0.875rem", md: "1rem" },
          mx: { xs: 0.5, md: 1 },
          whiteSpace: { xs: "nowrap", md: "normal" }
        }}
      >
        Review & Payments
      </Typography>
    </Box>
  );
}








// "use client";

// import { Fragment, useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";

// // MUI
// import Box from "@mui/material/Box";
// import Chip from "@mui/material/Chip";
// import styled from "@mui/material/styles/styled";


// // STYLED COMPONENT
// const StyledRoot = styled("div")(({
//   theme
// }) => ({
//   display: "flex",
//   flexWrap: "wrap",
//   alignItems: "center",
//   justifyContent: "center",
//   marginBottom: theme.spacing(3),
//   [theme.breakpoints.down("sm")]: {
//     display: "none"
//   }
// }));
// const StyledChip = styled(Chip, {
//   shouldForwardProp: prop => prop !== "active"
// })(({
//   theme,
//   active
// }) => ({
//   fontSize: "14px",
//   fontWeight: "500",
//   marginBlock: "4px",
//   padding: "0.5rem 1rem",
//   color: theme.palette.primary.main,
//   backgroundColor: theme.palette.primary.light,
//   "&:hover:not(:disabled)": {
//     color: theme.palette.primary.contrastText,
//     backgroundColor: theme.palette.primary.main
//   },
//   ...(active && {
//     color: theme.palette.primary.contrastText,
//     backgroundColor: theme.palette.primary.main
//   })
// }));
// const STEPPER_LIST = [{
//   title: "Cart",
//   disabled: false
// }, {
//   title: "Details",
//   disabled: false
// }, {
//   title: "Payment",
//   disabled: false
// }, {
//   title: "Review",
//   disabled: true
// }];
// export default function Steppers() {
//   const [selectedStep, setSelectedStep] = useState(0);
//   const router = useRouter();
//   const pathname = usePathname();
//   const handleStepChange = step => {
//     const routes = ["/cart", "/checkout", "/payment", "/orders"];
//     if (routes[step]) router.push(routes[step]);
//   };
//   useEffect(() => {
//     const pathToStep = {
//       "/cart": 0,
//       "/orders": 3,
//       "/payment": 2,
//       "/checkout": 1
//     };
//     setSelectedStep(pathToStep[pathname] || 0);
//   }, [pathname]);
//   return <StyledRoot>
//       {STEPPER_LIST.map((step, ind) => <Fragment key={step.title}>
//           <StyledChip disabled={step.disabled} active={ind <= selectedStep} label={`${ind + 1}. ${step.title}`} onClick={() => handleStepChange(ind)} />

//           {ind < STEPPER_LIST.length - 1 && <Box width="50px" height="4px" bgcolor={ind < selectedStep ? "primary.main" : "primary.light"} />}
//         </Fragment>)}
//     </StyledRoot>;
// }