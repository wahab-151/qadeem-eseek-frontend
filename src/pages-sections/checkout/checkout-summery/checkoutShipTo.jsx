// "use client";

// import Card from "@mui/material/Card";
// import Stack from "@mui/material/Stack";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import PlaceIcon from "@mui/icons-material/Place";
// import PersonIcon from "@mui/icons-material/Person";
// import DescriptionIcon from "@mui/icons-material/Description";
// import PhoneIcon from "@mui/icons-material/Phone";
// import useCart from "hooks/useCart";
// import ApartmentIcon from "@mui/icons-material/Apartment"; // building icon

// export default function CheckoutShipTo({checkoutData}) {
//     const {
//         state
//     } = useCart();
//     return <Card sx={{ p: 3, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)" }}>

//         <Stack spacing={2}>
//             {/* Address Line */}
//             <Stack direction="row" alignItems="center" spacing={1}>
//                 <ApartmentIcon fontSize="small" color="primary" />
//                 <Typography variant="body1">
//                     {state?.shippingAddress?.addressLine1 || "Address Line 1"}
//                 </Typography>
//             </Stack>

//             {/* Person Name */}
//             <Stack direction="row" alignItems="center" spacing={1}>
//                 <PersonIcon fontSize="small" color="primary" />
//                 <Typography variant="body1">
//                     {state?.shippingAddress?.fullName || "Full Name"}
//                 </Typography>
//             </Stack>

//             {/* Full Address */}
//             <Stack direction="row" alignItems="flex-start" spacing={1}>
//                 <PlaceIcon fontSize="small" color="primary" sx={{ mt: 0.5 }} />
//                 <Typography variant="body1">
//                     {state?.shippingAddress?.addressLine2 && (
//                         <>
//                             {state.shippingAddress.addressLine2}
//                             <br />
//                         </>
//                     )}
//                     {state?.shippingAddress?.city}, {state?.shippingAddress?.postalCode}
//                     <br />
//                     {state?.shippingAddress?.country}
//                 </Typography>
//             </Stack>

//             {/* Phone Number */}
//             <Stack direction="row" alignItems="center" spacing={1}>
//                 <PhoneIcon fontSize="small" color="primary" />
//                 <Typography variant="body1">
//                     {state?.shippingAddress?.phone || "(N/A)"}
//                 </Typography>
//             </Stack>
//         </Stack>
//     </Card>

// }
import { Card, Stack, Typography } from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PersonIcon from "@mui/icons-material/Person";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";

export default function CheckoutShipTo({ checkoutData }) {
  // console.log("checkoutdata",checkoutData)
  if (!checkoutData) {
    return (
      <Typography variant="body2" sx={{ p: 2, fontStyle: "italic" }}>
        Shipping information not available.
      </Typography>
    );
  }

  const {
    shipping_name,
    shipping_contact,
    shipping_address1,
    shipping_address2,
    shipping_zip,
    shipping_country,
    shipping_state

  } = checkoutData;

  const fullName = shipping_name;
  const phone = shipping_contact;
  const addressLine1 = shipping_address1;
  const addressLine2 = shipping_address2;
  const postalCode = shipping_zip;
  const stateName = shipping_state;
  const country = shipping_country?.label || shipping_country;

  return (
    <Card sx={{ p: 3, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)" }}>
      <Stack spacing={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <PersonIcon fontSize="small" color="primary" />
          <Typography variant="body1">{fullName}</Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <ApartmentIcon fontSize="small" color="primary" />
          <Typography variant="body1">{addressLine1}</Typography>
        </Stack>



        <Stack direction="row" alignItems="flex-start" spacing={1}>
          <PlaceIcon fontSize="small" color="primary" sx={{ mt: 0.5 }} />
          <Typography variant="body1">
            {addressLine2 && (
              <>
                {addressLine2}
                <br />
              </>
            )}
            {stateName},  {postalCode}
            <br />
            {country}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <PhoneIcon fontSize="small" color="primary" />
          <Typography variant="body1">{phone}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
