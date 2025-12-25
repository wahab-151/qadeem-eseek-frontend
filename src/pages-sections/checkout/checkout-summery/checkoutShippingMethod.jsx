"use client";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import PlaceIcon from "@mui/icons-material/Place";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import PhoneIcon from "@mui/icons-material/Phone";
import useCart from "hooks/useCart";
import ApartmentIcon from "@mui/icons-material/Apartment"; // building icon
import { useEffect } from "react";

// export default function CheckoutShippingMethod({ selectedShippingMethod, setSelectedShippingMethod }) {
//     // const {
//     //     state
//     // } = useCart();

//       // Load saved method on component mount
//   useEffect(() => {

//     const storedMethod = sessionStorage.getItem("shippingMethod");
//     if (storedMethod) {
//       const storeditem = sessionStorage.setItem("shippingMethod", "");
//       setSelectedShippingMethod(storeditem);
//     }
//   }, []);

//   // console.log(selectedShippingMethod);
//     return <Card sx={{ p: 3, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)" }}>

//         <Typography>
//             {selectedShippingMethod === ""
//       ? "No shipping method selected"
//       : selectedShippingMethod.charAt(0).toUpperCase() + selectedShippingMethod.slice(1)}
//         </Typography>
//     </Card>

// }

export default function CheckoutShippingMethod({
  selectedShippingMethod,
  setSelectedShippingMethod,
}) {
  // console.log("selected", selectedShippingMethod)
  // useEffect(() => {
  //   const storedMethod = sessionStorage.getItem("shippingMethod");

  //   if (storedMethod) {
  //     setSelectedShippingMethod(storedMethod);
  //   } else {
  //     setSelectedShippingMethod(""); // default fallback if nothing saved
  //   }
  // }, [setSelectedShippingMethod]);

  return (
    <Card sx={{ p: 3, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)" }}>
      <Typography>
        {!selectedShippingMethod
          ? "No shipping method selected"
          : selectedShippingMethod.charAt(0).toUpperCase() +
            selectedShippingMethod.slice(1)}
            
      </Typography>
    </Card>
  );
}
