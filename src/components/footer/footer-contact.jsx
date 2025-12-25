// import { Fragment } from "react";
// import Typography from "@mui/material/Typography";

// // STYLED COMPONENTS
// import { Heading } from "./styles";


// // ==============================================================


// // ==============================================================

// export default function FooterContact({
//   email,
//   phone,
//   address,
//   color = "grey.500"
// }) {
//   return <Fragment>
//       <Heading>Contact Us</Heading>

//       <Typography variant="body1" sx={{
//       color,
//       py: 0.6
//     }}>
//         {address}
//       </Typography>

//       <Typography variant="body1" sx={{
//       color,
//       py: 0.6
//     }}>
//         Email: {email}
//       </Typography>

//       <Typography variant="body1" sx={{
//       color,
//       py: 0.6,
//       mb: 2
//     }}>
//         Phone: {phone}
//       </Typography>
//     </Fragment>;
// }



import { Fragment } from "react";
import Typography from "@mui/material/Typography";

// STYLED COMPONENTS
import { Heading } from "./styles";
import { useTheme } from "@mui/material";


// ==============================================================


// ==============================================================

export default function FooterContact({
  email,
  phone,
  address,
  color = "black"
}) {
  const theme=useTheme();
  return <Fragment >
      <Heading sx={{
          color:theme.palette.secondary.main
          // , marginTop:"30px"
        }}>Contact Us</Heading>

      <Typography variant="body1" sx={{
      color,
      py: 0.6
    }}>
        {address}
      </Typography>

      <Typography variant="body1" sx={{
      color,
      py: 0.6
    }}>
       <strong>Email: </strong> {email}
      </Typography>

      <Typography variant="body1" sx={{
      color,
      py: 0.6,
      mb: 2
    }}>
       <strong>Phone: </strong>   {phone}
      </Typography>
    </Fragment>;
}