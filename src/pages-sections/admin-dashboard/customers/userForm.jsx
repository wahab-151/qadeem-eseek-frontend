
// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Select,
//   MenuItem,
//   Modal,
//   IconButton,
//   Button,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import Image from "next/image";
// import { FormProvider, useForm } from "react-hook-form";

// const businessTypes = ["Retailer", "Wholesale", "ChainStore", "Customer"];

// const UserForm = ({ customer, onSuccess }) => {
//   const methods = useForm();
//   const { reset } = methods;

//   // Modal state for image carousel
//   const [open, setOpen] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleOpen = (idx) => {
//     setCurrentIndex(idx);
//     setOpen(true);
//   };
//   const handleClose = () => setOpen(false);

//   const nextImage = () =>
//     setCurrentIndex((currentIndex + 1) % (customer?.file?.length || 1));
//   const prevImage = () =>
//     setCurrentIndex(
//       (currentIndex - 1 + (customer?.file?.length || 1)) %
//         (customer?.file?.length || 1)
//     );

//   // Disabled input style for all inputs
//   const disabledProps = {
//     disabled: true,
//   };

//   const disabledInputSx = {
//     "& .MuiInputBase-input.Mui-disabled": {
//       WebkitTextFillColor: "#000",
//       color: "#000",
//       opacity: 1,
//     },
//     "& .MuiInputLabel-root.Mui-disabled": {
//       color: "#666",
//     },
//   };

//   return (
//     <FormProvider {...methods}>
//       <Box component="form" sx={{ width: "100%" }}>
//         {/* First Name & Last Name */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             gap: 2,
//           }}
//         >
//           <TextField
//             label="First Name"
//             fullWidth
//             size="small"
//             value={customer?.firstName || ""}
//             {...disabledProps}
//             sx={[disabledInputSx, { marginTop: "8px" }]}
//             InputLabelProps={{ shrink: true }}
//           />
//           <TextField
//             label="Last Name"
//             fullWidth
//             size="small"
//             value={customer?.lastName || ""}
//             {...disabledProps}
//             sx={[disabledInputSx, { marginTop: "8px" }]}
//             InputLabelProps={{ shrink: true }}
//           />
//         </Box>

//         {/* Phone & Email */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             gap: 2,
//             mt: 2,
//           }}
//         >
//           <TextField
//             label="Phone"
//             fullWidth
//             size="small"
//             value={customer?.phone || ""}
//             {...disabledProps}
//             sx={disabledInputSx}
//           />
//           <TextField
//             label="Email"
//             fullWidth
//             size="small"
//             value={customer?.email || ""}
//             {...disabledProps}
//             sx={disabledInputSx}
//           />
//         </Box>

//         {/* Company & Postal Code */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             gap: 2,
//             mt: 2,
//           }}
//         >
//           <TextField
//             label="Company Name"
//             fullWidth
//             size="small"
//             value={customer?.companyName || ""}
//             {...disabledProps}
//             sx={disabledInputSx}
//           />
//           <TextField
//             label="Postal Code"
//             fullWidth
//             size="small"
//             value={customer?.postalCode || ""}
//             {...disabledProps}
//             sx={disabledInputSx}
//           />
//         </Box>

//         {/* Address */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             gap: 2,
//             mt: 2,
//           }}
//         >
//           <TextField
//             label="Address Line 1"
//             fullWidth
//             size="small"
//             value={customer?.addressLine1 || ""}
//             {...disabledProps}
//             sx={disabledInputSx}
//           />
//           <TextField
//             label="Address Line 2"
//             fullWidth
//             size="small"
//             value={customer?.addressLine2 || ""}
//             {...disabledProps}
//             sx={disabledInputSx}
//           />
//         </Box>

//         {/* City & State */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             gap: 2,
//             mt: 2,
//           }}
//         >
//           <TextField
//             label="City"
//             fullWidth
//             size="small"
//             value={customer?.city || ""}
//             {...disabledProps}
//             sx={disabledInputSx}
//           />
//           <TextField
//             label="State"
//             fullWidth
//             size="small"
//             value={customer?.state || ""}
//             {...disabledProps}
//             sx={disabledInputSx}
//           />
//         </Box>

//         {/* Business Type */}
//         <Box sx={{ mt: 2 }}>
//           <Typography variant="subtitle2" sx={{ mb: 1 }}>
//             Business Type
//           </Typography>
//           <Select
//     fullWidth
//     value={customer?.businessType || ""}
//     disabled
//     sx={{
//       '&.Mui-disabled': {
//         color: '#000', // Selected value
//       },
//       '& .MuiSelect-outlined.Mui-disabled': {
//         WebkitTextFillColor: '#000 !important', // for Safari
//       },
//       '& .MuiOutlinedInput-notchedOutline': {
//         borderColor: '#ccc', // Optional: subtle border color
//       },
//     }}
//   >
//             {businessTypes.map((type) => (
//               <MenuItem key={type} value={type}>
//                 {type}
//               </MenuItem>
//             ))}
//           </Select>
//         </Box>

//         {/* Uploaded Files */}
//         <Box sx={{ mt: 2 }}>
//           <Typography variant="subtitle2">Business License</Typography>
//           {customer?.file?.length > 0 ? (
//             customer.file.map((imgUrl, idx) => (
//               <Box
//                 key={idx}
//                 onClick={() => handleOpen(idx)}
//                 sx={{
//                   width: 100,
//                   height: 100,
//                   position: "relative",
//                   borderRadius: 1,
//                   overflow: "hidden",
//                   border: "1px solid #ccc",
//                   cursor: "pointer",
//                   marginBottom: "4px",
//                 }}
//               >
//                 <Image
//                   src={imgUrl}
//                   alt={`Image ${idx + 1}`}
//                   fill
//                   style={{ objectFit: "cover" }}
//                 />
//               </Box>
//             ))
//           ) : (
//             <Typography variant="body2" color="text.secondary">
//               No files uploaded
//             </Typography>
//           )}
//         </Box>
//       </Box>

//       {/* Fullscreen Modal */}
//       <Modal open={open} onClose={handleClose}>
//         <Box
//           sx={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100vw",
//             height: "100vh",
//             bgcolor: "rgba(0,0,0,0.9)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 9999,
//           }}
//         >
//           {/* Close Button */}
//           <IconButton
//             onClick={handleClose}
//             sx={{
//               position: "absolute",
//               top: 20,
//               right: 20,
//               color: "primary",
//             }}
//           >
//             <CloseIcon />
//           </IconButton>

//           {/* Prev Button */}
//           <IconButton
//             onClick={prevImage}
//             sx={{
//               position: "absolute",
//               left: 30,
//               color: "#fff",
//             }}
//           >
//             <ArrowBackIosNewIcon fontSize="large" />
//           </IconButton>

//           {/* Image Display */}
//           <Box sx={{ maxWidth: "90%", maxHeight: "90%", position: "relative" }}>
//             <Image
//               src={customer?.file[currentIndex]}
//               alt={`Preview ${currentIndex + 1}`}
//               fill
//               style={{ objectFit: "contain" }}
//             />
//           </Box>

//           {/* Next Button */}
//           <IconButton
//             onClick={nextImage}
//             sx={{
//               position: "absolute",
//               right: 30,
//               color: "#fff",
//             }}
//           >
//             <ArrowForwardIosIcon fontSize="large" />
//           </IconButton>
//         </Box>
//       </Modal>
//       <Button
//         variant="contained"
//         color="secondary"
//         width="300px"
//         sx={{ mt: 3 }}
//         onClick={onSuccess}
//       >
//         Close
//       </Button>
//     </FormProvider>
//   );
// };

// export default UserForm;
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Modal,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
const businessTypes = ["Retailer", "Wholesale", "ChainStore", "Customer"];
// Supported image extensions
const imageExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".bmp",
  ".webp",
  ".svg",
];
const isImageFile = (url) => {
  const lowerUrl = url.toLowerCase();
  return imageExtensions.some((ext) => lowerUrl.endsWith(ext));
};
const UserForm = ({ customer, onSuccess }) => {
  const methods = useForm();
  const { reset } = methods;
  // Modal state for file viewer
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleOpen = (idx) => {
    setCurrentIndex(idx);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const nextFile = () =>
    setCurrentIndex((currentIndex + 1) % (customer?.file?.length || 1));
  const prevFile = () =>
    setCurrentIndex(
      (currentIndex - 1 + (customer?.file?.length || 1)) %
      (customer?.file?.length || 1)
    );
  // Disabled input style for all inputs
  const disabledProps = {
    disabled: true,
  };
  const disabledInputSx = {
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#000",
      color: "#000",
      opacity: 1,
    },
    "& .MuiInputLabel-root.Mui-disabled": {
      color: "#666",
    },
  };
  return (
    <FormProvider {...methods}>
      <Box component="form" sx={{ width: "100%" }}>
        {/* First Name & Last Name */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
          }}
        >
          <TextField
            label="First Name"
            fullWidth
            size="small"
            value={customer?.firstName || ""}
            {...disabledProps}
            sx={[disabledInputSx, { marginTop: "8px" }]}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Last Name"
            fullWidth
            size="small"
            value={customer?.lastName || ""}
            {...disabledProps}
            sx={[disabledInputSx, { marginTop: "8px" }]}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        {/* Phone & Email */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            mt: 2,
          }}
        >
          <TextField
            label="Phone"
            fullWidth
            size="small"
            value={customer?.phone || ""}
            {...disabledProps}
            sx={disabledInputSx}
          />
          <TextField
            label="Email"
            fullWidth
            size="small"
            value={customer?.email || ""}
            {...disabledProps}
            sx={disabledInputSx}
          />
        </Box>
        {/* Company & Postal Code */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            mt: 2,
          }}
        >
          <TextField
            label="Company Name"
            fullWidth
            size="small"
            value={customer?.companyName || ""}
            {...disabledProps}
            sx={disabledInputSx}
          />
          <TextField
            label="Postal Code"
            fullWidth
            size="small"
            value={customer?.postalCode || ""}
            {...disabledProps}
            sx={disabledInputSx}
          />
        </Box>
        {/* Address */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            mt: 2,
          }}
        >
          <TextField
            label="Address Line 1"
            fullWidth
            size="small"
            value={customer?.addressLine1 || ""}
            {...disabledProps}
            sx={disabledInputSx}
          />
          <TextField
            label="Address Line 2"
            fullWidth
            size="small"
            value={customer?.addressLine2 || ""}
            {...disabledProps}
            sx={disabledInputSx}
          />
        </Box>
        {/* City & State */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            mt: 2,
          }}
        >
          <TextField
            label="City"
            fullWidth
            size="small"
            value={customer?.city || ""}
            {...disabledProps}
            sx={disabledInputSx}
          />
          <TextField
            label="State"
            fullWidth
            size="small"
            value={customer?.state || ""}
            {...disabledProps}
            sx={disabledInputSx}
          />
        </Box>
        {/* Business Type */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Business Type
          </Typography>
          <Select
            fullWidth
            value={customer?.businessType || ""}
            disabled
            sx={{
              "&.Mui-disabled": {
                color: "#000",
              },
              "& .MuiSelect-outlined.Mui-disabled": {
                WebkitTextFillColor: "#000 !important",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ccc",
              },
            }}
          >
            {businessTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </Box>
        {/* Uploaded Files */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Business License</Typography>
          {customer?.file?.length > 0 ? (
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              {customer.file.map((fileUrl, idx) => (
                <Box
                  key={idx}
                  onClick={() => handleOpen(idx)}
                  sx={{
                    width: 100,
                    height: 100,
                    position: "relative",
                    borderRadius: 1,
                    overflow: "hidden",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#F5F5F5",
                  }}
                >
                  {isImageFile(fileUrl) ? (
                    <Image
                      src={fileUrl}
                      alt={`File ${idx + 1}`}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <>
                      <PictureAsPdfIcon sx={{ fontSize: 48, color: "red" }} />
                      <Typography
                        variant="caption"
                        sx={{
                          position: "absolute",
                          bottom: 4,
                          background: "rgba(0,0,0,0.5)",
                          color: "white",
                          px: 1,
                          borderRadius: 1,
                        }}
                      >
                        PDF
                      </Typography>
                    </>
                  )}
                </Box>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No files uploaded
            </Typography>
          )}
        </Box>
      </Box>
      {/* Fullscreen Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            bgcolor: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 20,
              right: 20,
              color: "primary",
            }}
          >
            <CloseIcon />
          </IconButton>
          {/* Prev Button */}
          <IconButton
            onClick={prevFile}
            sx={{
              position: "absolute",
              left: 30,
              color: "#fff",
            }}
          >
            <ArrowBackIosNewIcon fontSize="large" />
          </IconButton>
          {/* File Display */}
          <Box
            sx={{
              maxWidth: "90%",
              maxHeight: "90%",
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isImageFile(customer?.file[currentIndex]) ? (
              <Image
                src={customer?.file[currentIndex]}
                alt={`Preview ${currentIndex + 1}`}
                fill
                style={{ objectFit: "contain" }}
              />
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  bgcolor: "white",
                  borderRadius: 1,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <iframe
                  src={customer?.file[currentIndex]}
                  width="100%"
                  height="100%"
                  style={{ border: "none" }}
                />
              </Box>
            )}
          </Box>
          {/* Next Button */}
          <IconButton
            onClick={nextFile}
            sx={{
              position: "absolute",
              right: 30,
              color: "#fff",
            }}
          >
            <ArrowForwardIosIcon fontSize="large" />
          </IconButton>
        </Box>
      </Modal>
      <Button
        variant="contained"
        color="secondary"
        width="300px"
        sx={{ mt: 3 }}
        onClick={onSuccess}
      >
        Close
      </Button>
    </FormProvider>
  );
};
export default UserForm;