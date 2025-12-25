
// 'use client'
// import { useEffect, useState } from "react";
// import Card from "@mui/material/Card";
// import TextField from "@mui/material/TextField";

// export default function ShippingAddress({
//   address = {},           // expects object like { addressLine1, addressLine2, ... }
//   note = "Please deliver ASAP.",
//   setAddress,
//   setNote,
// }) {

//   console.log("props data==>", address, note);
//   const [addressString, setAddressString] = useState("");

//   // Sync string state with object input when component mounts or updates
// useEffect(() => {
//   const formatted = [
//     address?.addressLine1 || "",
//     address?.addressLine2 || "",
//     address?.postalCode || "",
//     address?.country || "",
//   ].join("\n");
//   setAddressString(formatted);
// }, [address]);

//   const handleAddressChange = (e) => {
//     const value = e.target.value;
//     setAddressString(value);

//     const [line1, line2, postal, country] = value.split("\n");
//     setAddress({
//       addressLine1: line1 || "",
//       addressLine2: line2 || "",
//       postalCode: postal || "",
//       country: country || "",
//     });
//   };

//   const handleNoteChange = (e) => {
//     setNote(e.target.value);
//   };

//   return (
//     <Card sx={{ px: 3, py: 4 }}>
//       <TextField
//         rows={5}
//         multiline
//         fullWidth
//         color="info"
//         variant="outlined"
//         label="Shipping Address"
//         value={addressString}
//         onChange={handleAddressChange}
//         sx={{ mb: 4 }}
//       />

//       <TextField
//         rows={5}
//         multiline
//         fullWidth
//         color="info"
//         variant="outlined"
//         label="Customer’s Note"
//         value={note}
//         onChange={handleNoteChange}
//       />
//     </Card>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';

const commonTextFieldSx = {
  mb: 2,
  '& .MuiInputBase-input.Mui-disabled': {
    WebkitTextFillColor: 'black',
    color: 'black',
  },
  '& .MuiInputLabel-root.Mui-disabled': {
    color: 'black',
  },
};

export default function ShippingAddress({
  address = {},
  note = 'Please deliver ASAP.',
  setAddress,
  setNote,
  orderStatus
}) {
  const [localAddress, setLocalAddress] = useState({
    fullName: '',
    contact: '',
    addressLine1: '',
    addressLine2: '',
    postalCode: '',
    country: '',
  });

  const [localNote, setLocalNote] = useState(note);

  // Map shipping_* fields to normalized form fields
  useEffect(() => {
    setLocalAddress({
      fullName: address?.shipping_name || '',
      contact: address?.shipping_contact || '',
      addressLine1: address?.shipping_address1 || '',
      addressLine2: address?.shipping_address2 || '',
      postalCode: address?.shipping_zip || '',
      country: address?.shipping_country || '',
    });

    setLocalNote(note || '');
  }, [address, note]);

  // Update individual fields and sync with parent
  const handleChange = (field) => (e) => {
    const updated = {
      ...localAddress,
      [field]: e.target.value,
    };
    setLocalAddress(updated);
    setAddress(updated); // <-- normalized fields (not shipping_* anymore)
  };

  const handleNoteChange = (e) => {
    const updatedNote = e.target.value;
    setLocalNote(updatedNote);
    setNote(updatedNote);
  };

  return (
    <Card sx={{ px: 3, py: 4 }} className="bg-white shadow-md rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <TextField
          label="Full Name"
                 disabled ={orderStatus !== "Pending"}
          variant="outlined"
       sx={commonTextFieldSx}
          fullWidth
          color="info"
          value={localAddress.fullName}
          onChange={handleChange('fullName')}
        />
        <TextField
          label="Contact Number"
          variant="outlined"
                   disabled ={orderStatus !== "Pending"}
          fullWidth
      sx={commonTextFieldSx}
          color="info"
          value={localAddress.contact}
          onChange={handleChange('contact')}
        />
        <TextField
          label="Address Line 1"
                   disabled ={orderStatus !== "Pending"}
          variant="outlined"
          fullWidth
         
   sx={commonTextFieldSx}
          color="info"
          value={localAddress.addressLine1}
          onChange={handleChange('addressLine1')}
        />
        <TextField
          label="Address Line 2"
          variant="outlined"
          fullWidth
     sx={commonTextFieldSx}
                    disabled ={orderStatus !== "Pending"}
          color="info"
          value={localAddress.addressLine2}
          onChange={handleChange('addressLine2')}
        />
        <TextField
          label="Postal Code"
          variant="outlined"
          fullWidth
        sx={commonTextFieldSx}
          color="info"
                   disabled ={orderStatus !== "Pending"}
          value={localAddress.postalCode}
          onChange={handleChange('postalCode')}
        />
        <TextField
          label="Country"
          variant="outlined"
          fullWidth
         sx={commonTextFieldSx}
                    disabled ={orderStatus !== "Pending"}
          color="info"
          value={localAddress.country}
          onChange={handleChange('country')}
        />
      </div>

      <TextField
        label="Customer's Note"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        sx={commonTextFieldSx}
        color="info"
                 disabled ={orderStatus !== "Pending"}
        value={localNote}
        onChange={handleNoteChange}
      />
    </Card>
  );
}
