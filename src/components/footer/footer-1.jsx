
// // // MUI
// // import Box from "@mui/material/Box";
// // import Grid from "@mui/material/Grid2";
// // import Container from "@mui/material/Container";


// // // ==============================================================


// // // ==============================================================

// // export default function Footer1({
// //   children
// // }) {
// //   return <Box component="footer" bgcolor="#222935" mb={{
// //     sm: 0,
// //     xs: 7
// //   }}>
// //       <Container sx={{
// //       color: "white",
// //       overflow: "hidden",
// //       py: {
// //         sm: 10,
// //         xs: 4
// //       }
// //     }}>
// //         <Grid container spacing={3}>
// //           {children}
// //         </Grid>
// //       </Container>
// //     </Box>;
// // }
// // Footer1.Brand = function ({
// //   children
// // }) {
// //   return <Grid size={{
// //     lg: 4,
// //     sm: 6,
// //     xs: 12
// //   }}>{children}</Grid>;
// // };
// // Footer1.Widget1 = function ({
// //   children
// // }) {
// //   return <Grid size={{
// //     lg: 2,
// //     sm: 6,
// //     xs: 12
// //   }}>{children}</Grid>;
// // };
// // Footer1.Widget2 = function ({
// //   children
// // }) {
// //   return <Grid size={{
// //     lg: 3,
// //     sm: 6,
// //     xs: 12
// //   }}>{children}</Grid>;
// // };
// // Footer1.Contact = function ({
// //   children
// // }) {
// //   return <Grid size={{
// //     lg: 3,
// //     sm: 6,
// //     xs: 12
// //   }}>{children}</Grid>;
// // };



// // MUI
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid2";
// import Container from "@mui/material/Container";
// import { Card, useTheme } from "@mui/material";


// // ==============================================================


// // ==============================================================

// export default function Footer1({
//   children
// }) {


//   const theme=useTheme()
//   return <Card component="footer" 
//   // borderTop={`2px solid red`}
//   bgcolor="#ffffffff"  
//   //   mb={{
//   //   sm: 0,
//   //   xs: 7,
  
//   // }}
//   >
//       <Container sx={{
//       color: "black",
//       overflow: "hidden",
//       // py: 2
//     }}>
//         <Grid container spacing={3}>
//           {children}
//         </Grid>
//       </Container>
//     </Card>;
// }
// Footer1.Brand = function ({
//   children
// }) {
//   return <Grid size={{
//     lg: 4,
//     sm: 6,
//     xs: 12,
   
//   }}>{children}</Grid>;
// };
// Footer1.Widget1 = function ({
//   children
// }) {
//   return <Grid size={{
//     lg: 2,
//     sm: 6,
//     xs: 12
//   }}>{children}</Grid>;
// };
// Footer1.Widget2 = function ({
//   children
// }) {
//   return <Grid size={{
//     lg: 3,
//     sm: 6,
//     xs: 12
//   }}>{children}</Grid>;
// };
// Footer1.Contact = function ({
//   children
// }) {
//   return <Grid  size={{
//     lg: 3,
//     sm: 6,
//     xs: 12
//   }}>{children}</Grid>;
// };

// Footer1.Brand.displayName = 'Footer1.Brand';
// Footer1.Widget1.displayName = 'Footer1.Widget1';
// Footer1.Widget2.displayName = 'Footer1.Widget2';
// Footer1.Contact.displayName = 'Footer1.Contact';
// MUI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";     // ✅ stable Grid
import Container from "@mui/material/Container";
import { Card, useTheme } from "@mui/material";

export default function Footer1({ children }) {
  const theme = useTheme();

  return (
    <Card
      component="footer"
      sx={{
        backgroundColor: "#FEFAF0", // Light beige background
        mb: { sm: 0 },
        borderTop: `2px solid ${theme.palette.divider}`,
        width: "100%",
        maxWidth: "100%",
        overflowX: "hidden",
      }}
    >
      <Container
        sx={{
          color: "black",
          overflow: "hidden",
          pt: { xs: 4, sm: 10 },
          px: { xs: 2, sm: 3 },
          maxWidth: "100%",
        }}
      >
        <Grid container spacing={3}>
          {children}
        </Grid>
      </Container>
    </Card>
  );
}

Footer1.Brand = function Brand({ children }) {
  return (
    <Grid item lg={4} sm={6} xs={12}>
      {children}
    </Grid>
  );
};

Footer1.Widget1 = function Widget1({ children }) {
  return (
    <Grid item lg={2} sm={6} xs={12}>
      {children}
    </Grid>
  );
};

Footer1.Widget2 = function Widget2({ children }) {
  return (
    <Grid item lg={3} sm={6} xs={12}>
      {children}
    </Grid>
  );
};

Footer1.Contact = function Contact({ children }) {
  return (
    <Grid item lg={3} sm={6} xs={12}>
      {children}
    </Grid>
  );
};

// Display names
Footer1.Brand.displayName = "Footer1.Brand";
Footer1.Widget1.displayName = "Footer1.Widget1";
Footer1.Widget2.displayName = "Footer1.Widget2";
Footer1.Contact.displayName = "Footer1.Contact";
