

// "use client";

// import Box from "@mui/material/Box";
// import LoadingButton from "@mui/lab/LoadingButton";
// import MenuItem from "@mui/material/MenuItem";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import ReCAPTCHA from "react-google-recaptcha";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";

// // GLOBAL CUSTOM COMPONENTS
// import { Checkbox, TextField, FormProvider } from "components/form-hook";

// // LOCAL CUSTOM COMPONENTS
// import EyeToggleButton from "../components/eye-toggle-button";
// import Label from "../components/label";
// import BoxLink from "../components/box-link";
// import usePasswordVisible from "../use-password-visible";
// import FlexBox from "components/flex-box/flex-box";
// import { getCaptchaToken } from "utils/captcha";

// import {
//   useDeleteImageMutation,
//   useUploadImageMutation,
//   useUserSignUpMutation,
// } from "../../../app/store/services/index";
// import { useSnackbar } from "notistack";
// import {
//   USERTYPE_CHAINSTORE,
//   USERTYPE_FRANCHISE,
//   USERTYPE_RETAILER,
//   USERTYPE_WHOLESALER,
// } from "utils/constants";
// import { Button, Card, IconButton, Select, styled, Typography } from "@mui/material";
// import UploadFileIcon from "@mui/icons-material/UploadFile";
// import CloseIcon from "@mui/icons-material/Close";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import {
//   addWatermark,
//   compressImage,
//   formatToTwoDecimals,
//   getAllDescendantIds,
// } from "utils/helpers";
// import { getFileType, uploadToS3 } from "utils/s3Helper";
// import { v4 as uuidv4 } from "uuid";
// import DropZone from "components/DropZone";
// import {
//   StyledClear,
//   UploadImageBox,
// } from "pages-sections/admin-dashboard/styles";
// import Image from "next/image";

// // import './envConfig.js'

// const businessTypes = [
//   USERTYPE_WHOLESALER,
//   USERTYPE_CHAINSTORE,
//   USERTYPE_FRANCHISE,
//   USERTYPE_RETAILER,
// ];

// const Wrapper = styled(Card)(({
//   theme
// }) => ({
//   margin: "auto",
//   padding: "3rem",
//   maxWidth: "630px",
//   textAlign: "center",
//   h1: {
//     marginTop: "1.5rem",
//     lineHeight: 1.1,
//     fontSize: 30,
//     fontWeight: 600
//   },
//   p: {
//     color: theme.palette.grey[800],
//     marginTop: "0.3rem"
//   }
// }));
// // const StyledButton = styled(Button)({
// //   marginTop: "2rem",
// //   padding: "11px 24px"
// // });



// export default function RegisterPageView({ onSuccess }) {
//   const { enqueueSnackbar } = useSnackbar();
//   const [imageProcessing, setImageProcessing] = useState(false);
//   const [files, setFiles] = useState([]);
//   const { visiblePassword, togglePasswordVisible } = usePasswordVisible();
//   const router = useRouter();
//   const [userSignup, { isLoading, error }] = useUserSignUpMutation();
//   const [
//     uploadImageHandle,
//     { isLoading: uploadingImage, error: uploadingImageError },
//   ] = useUploadImageMutation();

//   const [
//     deleteImageHandle,
//     { isLoading: deletingImage, error: deletingImageError },
//   ] = useDeleteImageMutation();

//   const inputProps = {
//     endAdornment: (
//       <EyeToggleButton show={visiblePassword} click={togglePasswordVisible} />
//     ),
//   };

//   const validationSchema = yup.object().shape({
//     firstName: yup.string().required("First Name is required"),
//     lastName: yup.string().required("Last Name is required"),
//     phone: yup.string().required("Contact Number is required"),
//     email: yup
//       .string()
//       .email("Invalid Email Address")
//       .required("Email is required"),
//     companyName: yup.string().required("Company Name is required"),
//     addressLine1: yup.string().required("Address Line 1 is required"),
//     addressLine2: yup.string(), // Optional
//     city: yup.string().required("City is required"),
//     state: yup.string().required("State is required"),
//     postalCode: yup.string().required("Postal Code is required"),
//     password: yup
//       .string()
//       .required("Password is required")
//       .min(6, "Password must be at least 6 characters")
//       .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
//       .matches(
//         /[a-zA-Z0-9]/,
//         "Password must contain at least one alphanumeric character"
//       ),
//     re_password: yup
//       .string()
//       .oneOf([yup.ref("password")], "Passwords must match")
//       .required("Please re-type password"),
//     businessType: yup.string().required("Business type is required"),
//     file: yup
//       .array()
//       .min(1, "At least one file is required")
//       .max(5, "You can upload up to 5 files")
//       .of(yup.string().url("Must be a valid file URL")),
//     agreeTermsAndConditions: yup
//       .bool()
//       .oneOf([true], "You have to agree with our Terms and Conditions!"),
//     gRecaptchaToken: yup.string().required("Captcha verification is required"),
//   });

//   function formatphone(value) {
//     if (!value) return value;

//     const phone = value.replace(/[^\d]/g, "");
//     const phoneLength = phone.length;

//     if (phoneLength < 4) return phone;
//     if (phoneLength < 7) return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
//     return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
//   }

//   const methods = useForm({
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       phone: "",
//       companyName: "",
//       addressLine1: "",
//       addressLine2: "",
//       city: "",
//       state: "",
//       postalCode: "",
//       password: "",
//       re_password: "",
//       businessType: USERTYPE_FRANCHISE || "Franchise",
//       file: [],
//       agreeTermsAndConditions: false,
//       gRecaptchaToken: "",
//     },
//     resolver: yupResolver(validationSchema),
//   });
//   // Change this line in your component
//   const {
//     handleSubmit: formSubmit,
//     control,
//     formState: { isSubmitting, errors }, // Destructure errors here
//     setError,
//     setValue,
//   } = methods;

//   const [registrationSuccessOpen, setRegistrationSuccessOpen] = useState(false);

//   useEffect(() => {
//     if (errors && Object.keys(errors).length > 0) {
//       Object.entries(errors).forEach(([field, errorObj]) => {
//         // Skip showing toast for addressLine2 since it's optional
//         if (field !== 'addressLine2') {
//           enqueueSnackbar(errorObj.message, { variant: "error" });
//         } 
//       });
//     }
//   }, [errors]);

//   const handleChangeDropZone = async (files) => {
//     setImageProcessing(true);
//     console.log("FILES RECEIVED:", files);
//     for (const file of files) {
//       if (!file) {
//         // console.error("No file selected.");
//         enqueueSnackbar("No file selected.", { variant: "error" });
//         continue;
//       }
//       if (file.size > 20 * 1024 * 1024) {
//         // console.error(${file.name} exceeds the maximum size of 20 MB.);
//         enqueueSnackbar(`${file.name} exceeds the maximum size of 20 MB.`, {
//           variant: "error",
//         });
//         continue;
//       }
//       try {
//         const uniqueId = uuidv4();
//         console.log("s3 starting for:", file.name);
//         const compressedFile = await compressImage(file);
//         const watermarkedImageUrl = await addWatermark(compressedFile, "");
//         const response = await fetch(watermarkedImageUrl);
//         const blob = await response.blob();
//         //     // Get S3 pre-signed URL
//         const s3data = await uploadImageHandle({
//           fileName: `${uniqueId}-${file.name}`,
//           fileType: file.type,
//         }).unwrap();
//         console.log("s3 done:", s3data);
//         //     // Upload using helper
//         const uploadedUrl = await uploadToS3({
//           url: s3data.url,
//           blob,
//           fileType: file.type,
//         });
//         if (uploadedUrl) {
//           const finalImageUrl = uploadedUrl.split("?")[0];
//           console.log("✅ Uploaded image URL:", finalImageUrl);
//           // Append to files preview list
//           setFiles((prevFiles) => [
//             ...prevFiles,
//             { name: file.name, preview: finalImageUrl },
//           ]);
//           // Optional: If you want to store all uploaded URLs
//           enqueueSnackbar("Image uploaded Successfully!", {
//             variant: "success",
//           });
//           // ✅ Append to react-hook-form `file` array
//           const currentFiles = methods.getValues("file") || [];
//           methods.setValue("file", [...currentFiles, finalImageUrl]);
//         } else {
//           console.log(`Image upload failed for: ${file.name}`, uploadedUrl);
//           enqueueSnackbar("Image upload failed!", { variant: "error" });
//         }
//       } catch (error) {
//         enqueueSnackbar("Image upload failed!", { variant: "error" });
//         console.error(`Image upload failed for: ${file.name}`, error);
//       }
//     }
//     setImageProcessing(false);
//   };

//   // HANDLE DELETE UPLOAD IMAGE
//   const handleFileDelete = (fileToDelete) => async () => {
//     // console.log("delete hit", fileToDelete);
//     setImageProcessing(true);
//     try {
//       // console.log("delete called", fileToDelete);
//       const fileDetails = getFileType(fileToDelete);
//       console.log("imageee", fileToDelete, fileDetails);
//       await deleteImageHandle({
//         fileName: fileDetails.fileName,
//         fileType: fileDetails.fileType,
//       });
//       setFiles((prevFiles) =>
//         prevFiles.filter(
//           (file) =>
//             file.name !== fileToDelete.name ||
//             file.preview !== fileToDelete.preview
//         )
//       );
//       methods.setValue("image", "");
//       enqueueSnackbar("Image Deleted!", { variant: "success" });
//       // console.log("delete", res);
//     } catch (err) {
//       enqueueSnackbar("Error while deleting the image!", { variant: "error" });
//       console.error("Image delete failed", err);
//     }
//     setImageProcessing(false);
//   };

//   // Rename your submission handler
//   const onSubmit = async (values) => {
//     try {
//       console.log("values", values);
//       if (!values.gRecaptchaToken) {
//         enqueueSnackbar("Please complete the reCAPTCHA", {
//           variant: "warning",
//         });
//         return;
//       }

//       const response = await userSignup({
//         registrationData: values,
//         captchaPayload: { token: values.gRecaptchaToken },
//       }).unwrap();

//       setRegistrationSuccessOpen(true);
      
//     } catch (error) {
//       console.error("Form submission failed:", error);
//       const msg =
//         error?.data?.message || "Form submission failed. Please try again!";
//       enqueueSnackbar(msg || "Signup failed!", { variant: "error" });
//     }
//   };

//   const handleDialogClose = () => {
//     setRegistrationSuccessOpen(false);
//     onSuccess?.();
//     router.push("/home");
//   };

//   return (
//     <>
//       <FormProvider methods={methods} onSubmit={formSubmit(onSubmit)}>
//         <Box
//           className="mb-1"
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             gap: 2,
//             width: "100%",
//           }}
//         >
//           <Box sx={{ flex: 1 }}>
//             <Label style={{ fontWeight: "bold" }}>First Name</Label>
//             <TextField
//               fullWidth
//               name="firstName"
//               size="small"
//               placeholder="Ralph"
//             />
//           </Box>
//           <Box sx={{ flex: 1 }}>
//             <Label sx={{ fontWeight: "bold" }}>Last Name</Label>
//             <TextField
//               fullWidth
//               name="lastName"
//               size="small"
//               placeholder="Awards"
//             />
//           </Box>
//         </Box>
//         <Box
//           className="mb-1"
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             gap: 2,
//             width: "100%",
//           }}
//         >
//           <Box sx={{ flex: 1 }}>
//             <Label>Phone Number</Label>
//             <Controller
//               name="phone"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   fullWidth
//                   size="small"
//                   type="text"
//                   placeholder="(242) 342-3423"
//                   onChange={(e) => {
//                     const rawValue = e.target.value
//                       .replace(/\D/g, "")
//                       .slice(0, 10); // Remove non-digits, max 10 digits
//                     const formattedValue = formatphone(rawValue);
//                     field.onChange(formattedValue);
//                   }}
//                   value={field.value}
//                 />
//               )}
//             />
//           </Box>
//           <Box sx={{ flex: 1 }}>
//             <Label>Email</Label>
//             <TextField
//               fullWidth
//               name="email"
//               size="small"
//               placeholder="example@email.com"
//             />
//           </Box>
//         </Box>
//         <Box
//           className="mb-1"
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             gap: 2,
//             width: "100%",
//           }}
//         >
//           <Box sx={{ flex: 1 }}>
//             <Label>Company Name</Label>
//             <TextField
//               fullWidth
//               name="companyName"
//               size="small"
//               placeholder="Your Company Name"
//             />
//           </Box>
//           <Box sx={{ flex: 1 }}>
//             <Label>Postal Code</Label>
//             <TextField
//               fullWidth
//               name="postalCode"
//               size="small"
//               placeholder="ZIP or Postal Code"
//             />
//           </Box>
//         </Box>

//         <Box
//           className="mb-1"
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             gap: 2,
//             width: "100%",
//           }}
//         >
//           <Box sx={{ flex: 1 }}>
//             <Label>Address Line 1</Label>
//             <TextField
//               fullWidth
//               name="addressLine1"
//               size="small"
//               placeholder="123 Main St"
//             />
//           </Box>
//           <Box sx={{ flex: 1 }}>
//             <Label>Address Line 2</Label>
//             <TextField
//               fullWidth
//               name="addressLine2"
//               size="small"
//               placeholder="Suite / Apt (Optional)"
//             />
//           </Box>
//         </Box>

//         <Box
//           className="mb-1"
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             gap: 2,
//             width: "100%",
//           }}
//         >
//           <Box sx={{ flex: 1 }}>
//             <Label>City</Label>
//             <TextField fullWidth name="city" size="small" placeholder="City" />
//           </Box>
//           <Box sx={{ flex: 1 }}>
//             <Label>State</Label>
//             <TextField fullWidth name="state" size="small" placeholder="State" />
//           </Box>
//         </Box>

//         <Box
//           className="mb-1"
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             gap: 2,
//             width: "100%",
//           }}
//         >
//           <Box sx={{ flex: 1 }}>
//             <Label>Password</Label>
//             <TextField
//               fullWidth
//               size="small"
//               name="password"
//               placeholder="*********"
//               type={visiblePassword ? "text" : "password"}
//               slotProps={{ input: inputProps }}
//             />
//           </Box>
//           <Box sx={{ flex: 1 }}>
//             <Label>Retype Password</Label>
//             <TextField
//               fullWidth
//               size="small"
//               name="re_password"
//               placeholder="*********"
//               type={visiblePassword ? "text" : "password"}
//               slotProps={{ input: inputProps }}
//             />
//           </Box>
//         </Box>

//         <Box sx={{ flex: 1 }}>
//           <Label>Business Type</Label>
//           <Select
//             sx={{ width: "50%" }}
//             name="businessType"
//             className="basic-dropdown"
//             {...methods.register("businessType")} // Connect to react-hook-form
//           >
//             {businessTypes.map((type) => (
//               <MenuItem key={type} value={type}>
//                 {type}
//               </MenuItem>
//             ))}
//           </Select>
//         </Box>

//         <Box className="mb-2, mt-2">
//           <Controller
//             name="file"
//             control={control}
//             render={({ field }) => (
//               <FlexBox flexDirection="column" mt={2} gap={1}>
//                 <Typography variant="subtitle1">
//                   Business License (Account will not be activated without proper
//                   Business License Submission)
//                 </Typography>

//                 <DropZone
//                   onChange={(files) => handleChangeDropZone(files)}
//                   processing={imageProcessing}
//                 />

//                 {files?.length > 0 && (
//                   <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
//                     {files.map((file, index) => (
//                       <UploadImageBox key={index}>
//                         <Box
//                           component="img"
//                           src={file.preview || URL.createObjectURL(file)}
//                           width="100%"
//                         />

//                         <StyledClear
//                           onClick={() => {
//                             console.log("delete hit", file);
//                             handleFileDelete(file)();
//                           }}
//                         />
//                       </UploadImageBox>
//                     ))}
//                   </FlexBox>
//                 )}
//               </FlexBox>
//             )}
//           />
//         </Box>

//         <div className="mb-1 mt-1">
//           <Label>reCAPTCHA</Label>
//           <Controller
//             name="gRecaptchaToken"
//             control={control}
//             rules={{ required: "Please complete the CAPTCHA" }}
//             render={({ field }) => (
//               <div>
//                 <ReCAPTCHA
//                   sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
//                   onChange={(token) => {
//                     console.log("ReCAPTCHA token set:", token);
//                     field.onChange(token); // sets the value in react-hook-form
//                   }}
//                 />
//                 {errors.gRecaptchaToken && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.gRecaptchaToken.message}
//                   </p>
//                 )}
//               </div>
//             )}
//           />
//         </div>

//         <div className="agreeTermsAndConditions">
//           <Checkbox
//             name="agreeTermsAndConditions"
//             size="small"
//             color="secondary"
//             label={
//               <FlexBox
//                 flexWrap="wrap"
//                 alignItems="center"
//                 justifyContent="flex-start"
//                 gap={1}
//               >
//                 <Box display={{ sm: "inline-block", xs: "none" }}>
//                   By signing up, you agree to
//                 </Box>
//                 <Box display={{ sm: "none", xs: "inline-block" }}>Accept Our</Box>
//                 <BoxLink title="Terms & Condition" href="/" />
//               </FlexBox>
//             }
//           />
//         </div>

//         <LoadingButton
//           fullWidth
//           size="large"
//           type="submit"
//           color="primary"
//           variant="contained"
//           loading={isSubmitting}
//         >
//           Create an Account
//         </LoadingButton>
//       </FormProvider>

//       <Dialog open={registrationSuccessOpen} onClose={handleDialogClose}>
//         <DialogTitle sx={{fontSize:"1.5rem", color: (theme) => theme.palette.primary.main, margin:"auto"}}>Registration Complete</DialogTitle>
//         <DialogContent>
//         <Wrapper>
//         <Image width={116} height={116} alt="complete" src="/assets/images/illustrations/party-popper.svg" />
//         {/* <h1>SignUp Successful!   </h1> */}
//            {/* <strong>{orderId} </strong> */}
//         <p>Your account will be activated shortly.You will be receiving confirmation email with order details.</p>

//       </Wrapper>
        
//         </DialogContent>
//         <DialogActions>
//           <Button 
//             onClick={handleDialogClose}
//             variant="contained"
//             color="primary"
//           >
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }


"use client";

import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import MenuItem from "@mui/material/MenuItem";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

// GLOBAL CUSTOM COMPONENTS
import { Checkbox, TextField, FormProvider } from "components/form-hook";

// LOCAL CUSTOM COMPONENTS
import EyeToggleButton from "../components/eye-toggle-button";
import Label from "../components/label";
import BoxLink from "../components/box-link";
import usePasswordVisible from "../use-password-visible";
import FlexBox from "components/flex-box/flex-box";
import { getCaptchaToken } from "utils/captcha";

import {
  useDeleteImageMutation,
  useUploadImageMutation,
  useUserSignUpMutation,
} from "../../../app/store/services/index";
import { useSnackbar } from "notistack";
import {
  USERTYPE_CHAINSTORE,
  USERTYPE_FRANCHISE,
  USERTYPE_RETAILER,
  USERTYPE_WHOLESALER,
} from "utils/constants";
import { Button, Card, IconButton, Select, styled, Typography } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  addWatermark,
  compressImage,
  formatToTwoDecimals,
  getAllDescendantIds,
} from "utils/helpers";
import { getFileType, uploadToS3 } from "utils/s3Helper";
import { v4 as uuidv4 } from "uuid";
import DropZone from "components/DropZone";
import {
  StyledClear,
  UploadImageBox,
} from "pages-sections/admin-dashboard/styles";
import Image from "next/image";

const businessTypes = [
  USERTYPE_WHOLESALER,
  USERTYPE_CHAINSTORE,
  USERTYPE_FRANCHISE,
  USERTYPE_RETAILER,
];

const Wrapper = styled(Card)(({ theme }) => ({
  margin: "auto",
  padding: "3rem",
  maxWidth: "630px",
  textAlign: "center",
  h1: {
    marginTop: "1.5rem",
    lineHeight: 1.1,
    fontSize: 30,
    fontWeight: 600
  },
  p: {
    color: theme.palette.grey[800],
    marginTop: "0.3rem"
  }
}));

export default function RegisterPageView({ onSuccess }) {
  const { enqueueSnackbar } = useSnackbar();
  const [imageProcessing, setImageProcessing] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [files, setFiles] = useState([]);
  const { visiblePassword, togglePasswordVisible } = usePasswordVisible();
  const router = useRouter();
  const [userSignup, { isLoading, error }] = useUserSignUpMutation();
  const [
    uploadImageHandle,
    { isLoading: uploadingImage, error: uploadingImageError },
  ] = useUploadImageMutation();

  const [
    deleteImageHandle,
    { isLoading: deletingImage, error: deletingImageError },
  ] = useDeleteImageMutation();

  const inputProps = {
    endAdornment: (
      <EyeToggleButton show={visiblePassword} click={togglePasswordVisible} />
    ),
  };

  const validationSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    phone: yup.string().required("Contact Number is required"),
    email: yup
      .string()
      .email("Invalid Email Address")
      .required("Email is required"),
    companyName: yup.string().required("Company Name is required"),
    addressLine1: yup.string().required("Address Line 1 is required"),
    addressLine2: yup.string(), // Optional
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    postalCode: yup.string().required("Postal Code is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(
        /[a-zA-Z0-9]/,
        "Password must contain at least one alphanumeric character"
      ),
    re_password: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Please re-type password"),
    businessType: yup.string().required("Business type is required"),
    file: yup
      .array()
      .min(1, "At least one file is required")
      .max(5, "You can upload up to 5 files")
      .of(yup.string().url("Must be a valid file URL")),
    agreeTermsAndConditions: yup
      .bool()
      .oneOf([true], "You have to agree with our Terms and Conditions!"),
    gRecaptchaToken: yup.string().required("Captcha verification is required"),
  });

  function formatphone(value) {
    if (!value) return value;

    const phone = value.replace(/[^\d]/g, "");
    const phoneLength = phone.length;

    if (phoneLength < 4) return phone;
    if (phoneLength < 7) return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
  }

  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      companyName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      password: "",
      re_password: "",
      businessType: USERTYPE_FRANCHISE || "Franchise",
      file: [],
      agreeTermsAndConditions: false,
      gRecaptchaToken: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const {
    handleSubmit: formSubmit,
    control,
    formState: { isSubmitting, errors },
    setError,
    setValue,
    getValues,
  } = methods;

  const [registrationSuccessOpen, setRegistrationSuccessOpen] = useState(false);

  useEffect(() => {
    if (errors && Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([field, errorObj]) => {
        // Skip showing toast for addressLine2 since it's optional
        if (field !== 'addressLine2') {
          enqueueSnackbar(errorObj.message, { variant: "error" });
        }
      });
    }
  }, [errors, enqueueSnackbar]);

  // Check if file is an image
  const isImageFile = (file) => {
    if (!file || !file.type) return false;
    return file.type.startsWith('image/');
  };

  // Check if file is a PDF
  const isPdfFile = (file) => {
    if (!file || !file.type) return false;
    return file.type === 'application/pdf';
  };

  const handleChangeDropZone = async (files) => {
    setImageProcessing(true);

    for (const file of files) {
      if (!file) {
        enqueueSnackbar("No file selected.", { variant: "error" });
        continue;
      }

      if (file.size > 20 * 1024 * 1024) {
        enqueueSnackbar(`${file.name} exceeds the maximum size of 20 MB.`, {
          variant: "error",
        });
        continue;
      }

      try {
        const uniqueId = uuidv4();

        // Handle PDF files differently - no compression or watermark
        if (isPdfFile(file)) {
          // Get S3 pre-signed URL for PDF
          const s3data = await uploadImageHandle({
            fileName:   `${uniqueId}-${file.name}`,
            fileType: file.type,
          }).unwrap();

          // Upload PDF directly without processing
          const uploadedUrl = await uploadToS3({
            url: s3data.url,
            file: file, // Pass the file directly
            fileType: file.type,
          });

          if (uploadedUrl) {
            const finalFileUrl = uploadedUrl.split("?")[0];
            setFiles((prevFiles) => [
              ...prevFiles,
              { name: file.name, preview: finalFileUrl, type: file.type },
            ]);

            // Append to react-hook-form file array
            const currentFiles = getValues("file") || [];
            setValue("file", [...currentFiles, finalFileUrl]);

            enqueueSnackbar("PDF uploaded successfully!", {
              variant: "success",
            });
          }
        }
        // Handle image files with compression and watermark
        else if (isImageFile(file)) {
          const compressedFile = await compressImage(file);
          const watermarkedImageUrl = await addWatermark(compressedFile, "");
          const response = await fetch(watermarkedImageUrl);
          const blob = await response.blob();

          // Get S3 pre-signed URL
          const s3data = await uploadImageHandle({
            fileName: `${uniqueId}-${file.name}`,
            fileType: file.type,
          }).unwrap();

          // Upload using helper
          const uploadedUrl = await uploadToS3({
            url: s3data.url,
            blob,
            fileType: file.type,
          });

          if (uploadedUrl) {
            const finalImageUrl = uploadedUrl.split("?")[0];
            setFiles((prevFiles) => [
              ...prevFiles,
              { name: file.name, preview: finalImageUrl, type: file.type },
            ]);

            // Append to react-hook-form file array
            const currentFiles = getValues("file") || [];
            setValue("file", [...currentFiles, finalImageUrl]);

            enqueueSnackbar("Image uploaded successfully!", {
              variant: "success",
            });
          }
        }
        // Handle other file types
        else {
          // Get S3 pre-signed URL
          const s3data = await uploadImageHandle({
            fileName: `${uniqueId}-${file.name}`,
            fileType: file.type,
          }).unwrap();

          // Upload using helper
          const uploadedUrl = await uploadToS3({
            url: s3data.url,
            file: file,
            fileType: file.type,
          });

          if (uploadedUrl) {
            const finalFileUrl = uploadedUrl.split("?")[0];
            setFiles((prevFiles) => [
              ...prevFiles,
              { name: file.name, preview: finalFileUrl, type: file.type },
            ]);

            // Append to react-hook-form file array
            const currentFiles = getValues("file") || [];
            setValue("file", [...currentFiles, finalFileUrl]);

            enqueueSnackbar("File uploaded successfully!", {
              variant: "success",
            });
          }
        }
      } catch (error) {
        enqueueSnackbar("File upload failed!", { variant: "error" });
        console.error(`File upload failed for: ${file.name}`, error);
      }
    }

    setImageProcessing(false);
  };

  const onSubmit = async (values) => {
    try {
      if (!values.gRecaptchaToken) {
        enqueueSnackbar("Please complete the reCAPTCHA", {
          variant: "warning",
        });
        return;
      }

      // Start loader on form submit
      try {
        if (typeof window !== 'undefined' && window.NProgress) {
          window.__navTriggerType = 'register-submit';
          window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
          window.__startTimeRef && (window.__startTimeRef.current = Date.now());
          window.NProgress.start();
        }
      } catch {}

      const response = await userSignup({
        registrationData: values,
        captchaPayload: { token: values.gRecaptchaToken },
      }).unwrap();

      setRegistrationSuccessOpen(true);

    } catch (error) {
      console.error("Form submission failed:", error);
      const msg =
        error?.data?.message || "Form submission failed. Please try again!";
      enqueueSnackbar(msg || "Signup failed!", { variant: "error" });
      // Stop loader on error
      try {
        if (typeof window !== 'undefined' && window.NProgress && window.NProgress.status !== null) {
          window.NProgress.done(true);
          window.__isNavigatingRef && (window.__isNavigatingRef.current = false);
        }
      } catch {}
    }
  };

  const handleDialogClose = () => {
    setRegistrationSuccessOpen(false);
    // Start loader on navigation
    try {
      if (typeof window !== 'undefined' && window.NProgress) {
        window.__navTriggerType = 'register-success';
        window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
        window.__startTimeRef && (window.__startTimeRef.current = Date.now());
        window.NProgress.start();
      }
    } catch {}
    onSuccess?.();
    router.push("/home");
  };

  const handleDelete = (file) => async () => {
    setProcessing(true);
    try {
      // Extract file name from URL
      const url = new URL(file.preview);
      const pathname = url.pathname;
      const fileName = pathname.substring(pathname.lastIndexOf('/') + 1);

      // Extract file extension to determine type
      const fileExtension = fileName.split('.').pop().toLowerCase();
      const fileType = fileExtension === 'pdf' ? 'application/pdf' : `image/${fileExtension}`;

      await deleteImageHandle({ fileName, fileType });

      setFiles((prev) => prev.filter((f) => f.preview !== file.preview));

      // Update form value
      const currentFiles = getValues("file") || [];
      setValue(
        "file",
        currentFiles.filter((url) => url !== file.preview),
        { shouldValidate: true }
      );

      enqueueSnackbar("File deleted!", { variant: "success" });
    } catch (err) {
      console.error("Delete error:", err);
      enqueueSnackbar(
        err?.data?.message || "Error deleting file",
        { variant: "error" }
      );
    }
    setProcessing(false);
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={formSubmit(onSubmit)}>
        <Box
          className="mb-1"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            width: "100%",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Label style={{ fontWeight: "bold" }}>First Name</Label>
            <TextField
              fullWidth
              name="firstName"
              size="small"
              placeholder="Ralph"
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Label sx={{ fontWeight: "bold" }}>Last Name</Label>
            <TextField
              fullWidth
              name="lastName"
              size="small"
              placeholder="Awards"
            />
          </Box>
        </Box>
        <Box
          className="mb-1"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            width: "100%",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Label>Phone Number</Label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  type="text"
                  placeholder="(242) 342-3423"
                  onChange={(e) => {
                    const rawValue = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10); // Remove non-digits, max 10 digits
                    const formattedValue = formatphone(rawValue);
                    field.onChange(formattedValue);
                  }}
                  value={field.value}
                />
              )}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Label>Email</Label>
            <TextField
              fullWidth
              name="email"
              size="small"
              placeholder="example@email.com"
            />
          </Box>
        </Box>
        <Box
          className="mb-1"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            width: "100%",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Label>Company Name</Label>
            <TextField
              fullWidth
              name="companyName" // FIXED: Added name attribute
              size="small"
              placeholder="Your Company Name"
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Label>Postal Code</Label>
            <TextField
              fullWidth
              name="postalCode"
              size="small"
              placeholder="ZIP or Postal Code"
            />
          </Box>
        </Box>

        <Box
          className="mb-1"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            width: "100%",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Label>Address Line 1</Label>
            <TextField
              fullWidth
              name="addressLine1"
              size="small"
              placeholder="123 Main St"
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Label>Address Line 2</Label>
            <TextField
              fullWidth
              name="addressLine2"
              size="small"
              placeholder="Suite / Apt (Optional)"
            />
          </Box>
        </Box>

        <Box
          className="mb-1"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            width: "100%",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Label>City</Label>
            <TextField fullWidth name="city" size="small" placeholder="City" />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Label>State</Label>
            <TextField
              fullWidth
              name="state" // FIXED: Added name attribute
              size="small"
              placeholder="State"
            />
          </Box>
        </Box>

        <Box
          className="mb-1"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            width: "100%",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Label>Password</Label>
            <TextField
              fullWidth
              size="small"
              name="password"
              placeholder="***"
              type={visiblePassword ? "text" : "password"}
              slotProps={{ input: inputProps }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Label>Retype Password</Label>
            <TextField
              fullWidth
              size="small"
              name="re_password"
              placeholder="***"
              type={visiblePassword ? "text" : "password"}
              slotProps={{ input: inputProps }}
            />
          </Box>
        </Box>

        <Box sx={{ flex: 1, mt: 2 }}>
          <Label>Business Type</Label>
          <Controller
            name="businessType"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                sx={{ width: "50%" }}
                className="basic-dropdown"
              >
                {businessTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </Box>

        <Box className="mb-2, mt-2">
          <Controller
            name="file"
            control={control}
            render={({ field }) => (
              <FlexBox flexDirection="column" mt={2} gap={1}>
                <Typography variant="subtitle1">
                  Business License (Account will not be activated without proper
                  Business License Submission)
                </Typography>

                <DropZone
                  onChange={(files) => handleChangeDropZone(files)}
                  processing={imageProcessing}
                />

                <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
                  {files.map((f, i) => {
                    const isImage = f.type?.startsWith('image/') ||
                      (f.preview?.match(/\.(jpe?g|gif|png)$/i));
                    const isPdf = f.type === 'application/pdf' ||
                      (f.preview?.match(/\.pdf$/i));

                    return (
                      <UploadImageBox key={i}>
                        {isImage ? (
                          <Box
                            component="img"
                            src={f.preview}
                            width={100}
                            height={100}
                            sx={{ objectFit: "cover" }}
                          />
                        ) : isPdf ? (
                          <Box
                            width={100}
                            height={100}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                              bgcolor: 'grey.100',
                              border: '1px solid grey.300'
                            }}
                          >
                            <Typography variant="body2">PDF</Typography>
                          </Box>
                        ) : (
                          <Box
                            width={100}
                            height={100}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                              bgcolor: 'grey.100',
                              border: '1px solid grey.300'
                            }}
                          >
                            <Typography variant="body2">File</Typography>
                          </Box>
                        )}
                        <StyledClear onClick={handleDelete(f)} />
                      </UploadImageBox>
                    );
                  })}
                </Box>
              </FlexBox>
            )}
          />
        </Box>

        <div className="mb-1 mt-1">
          <Label>reCAPTCHA</Label>
          <Controller
            name="gRecaptchaToken"
            control={control}
            rules={{ required: "Please complete the CAPTCHA" }}
            render={({ field }) => (
              <div>
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  onChange={(token) => {
                    field.onChange(token);
                  }}
                />
                {errors.gRecaptchaToken && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.gRecaptchaToken.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        <div className="agreeTermsAndConditions">
          <Checkbox
            name="agreeTermsAndConditions"
            size="small"
            color="secondary"
            label={
              <FlexBox
                flexWrap="wrap"
                alignItems="center"
                justifyContent="flex-start"
                gap={1}
              >
                <Box display={{ sm: "inline-block", xs: "none" }}>
                  By signing up, you agree to
                </Box>
                <Box display={{ sm: "none", xs: "inline-block" }}>Accept Our</Box>
                <BoxLink title="Terms & Condition" href="/" />
              </FlexBox>
            }
          />
        </div>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          color="primary"
          variant="contained"
          loading={isSubmitting}
        >
          Create an Account
        </LoadingButton>
      </FormProvider>

      <Dialog open={registrationSuccessOpen} onClose={handleDialogClose}>
        <DialogTitle sx={{ fontSize: "1.5rem", color: (theme) => theme.palette.primary.main, margin: "auto" }}>Registration Complete</DialogTitle>
        <DialogContent>
          <Wrapper>
            <Image width={116} height={116} alt="complete" src="/assets/images/illustrations/party-popper.svg" />
            <p>Your account will be activated shortly, and you will receive a confirmation email soon.</p>
          </Wrapper>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            variant="contained"
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

