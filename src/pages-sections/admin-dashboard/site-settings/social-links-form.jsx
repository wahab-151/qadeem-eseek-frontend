// import { useForm } from "react-hook-form";

// // MUI
// import Grid from "@mui/material/Grid2";
// import Divider from "@mui/material/Divider";
// import Typography from "@mui/material/Typography";
// import LoadingButton from "@mui/lab/LoadingButton";

// // MUI ICON COMPONENTS
// import Twitter from "@mui/icons-material/Twitter";
// import YouTube from "@mui/icons-material/YouTube";
// import Facebook from "@mui/icons-material/Facebook";
// import Instagram from "@mui/icons-material/Instagram";

// // GLOBAL CUSTOM COMPONENTS
// import { FormProvider, TextField } from "components/form-hook";

// // CUSTOM ICON COMPONENTS
// import PlayStore from "icons/PlayStore";
// import AppleStore from "icons/AppleStore";
// export default function SocialLinksForm({contentData, uploadInfo, uploadInfoLoading, uploadInfoError}) {
//   const initialValues = {
//     facebook: contentData?.socialLinks?.facebook || "",
//     // twitter: contentData?.socialLinks?.twitter || "",
//     instagram: contentData?.socialLinks?.instagram || "",
//     tiktok: contentData?.socialLinks?.tiktok || "",
//     // linkedin: contentData?.socialLinks?.linkedin || "",
//     // youtube: contentData?.socialLinks?.youtube || "",
//     // play_store: contentData?.socialLinks?.playStore || "",
//     // app_store: contentData?.socialLinks?.appStore || ""
//   };
//   const methods = useForm({
//     defaultValues: initialValues
//   });
//   const {
//     handleSubmit,
//     formState: {
//       isSubmitting
//     }
//   } = methods;

  
// // FORM SUBMIT HANDLER
//   const handleSubmitForm = handleSubmit(values => {
//     alert(JSON.stringify(values, null, 2));
//   });
//   return <FormProvider methods={methods} onSubmit={handleSubmitForm}>
//       <Grid container spacing={3}>
//         <Grid size={12}>
//           <Typography variant="h4">Social Links</Typography>
//         </Grid>

//         <Grid size={{
//         md: 6,
//         xs: 12
//       }}>
//           <TextField fullWidth color="info" size="medium" name="facebook" label="Facebook" placeholder="https://example.com" slotProps={{
//           input: {
//             startAdornment: <Facebook fontSize="small" color="info" sx={{
//               mr: 1
//             }} />
//           }
//         }} />
//         </Grid>

//         <Grid size={{
//         md: 6,
//         xs: 12
//       }}>
//           <TextField fullWidth color="info" size="medium" name="twitter" label="Twitter" placeholder="https://example.com" slotProps={{
//           input: {
//             startAdornment: <Twitter fontSize="small" color="info" sx={{
//               mr: 1
//             }} />
//           }
//         }} />
//         </Grid>

//         <Grid size={{
//         md: 6,
//         xs: 12
//       }}>
//           <TextField fullWidth color="info" size="medium" name="instagram" label="Instagram" placeholder="https://example.com" slotProps={{
//           input: {
//             startAdornment: <Instagram fontSize="small" color="info" sx={{
//               mr: 1
//             }} />
//           }
//         }} />
//         </Grid>

//         <Grid size={{
//         md: 6,
//         xs: 12
//       }}>
//           <TextField fullWidth color="info" size="medium" name="youtube" label="Youtube" placeholder="https://example.com" slotProps={{
//           input: {
//             startAdornment: <YouTube fontSize="small" color="info" sx={{
//               mr: 1
//             }} />
//           }
//         }} />
//         </Grid>

//         <Grid size={12}>
//           <Divider />
//         </Grid>

//         <Grid size={12}>
//           <Typography variant="h4">App Links</Typography>
//         </Grid>

//         <Grid size={{
//         md: 6,
//         xs: 12
//       }}>
//           <TextField fullWidth color="info" size="medium" name="play_store" label="Play Store" placeholder="https://example.com" slotProps={{
//           input: {
//             startAdornment: <PlayStore fontSize="small" color="info" sx={{
//               mr: 1
//             }} />
//           }
//         }} />
//         </Grid>

//         <Grid size={{
//         md: 6,
//         xs: 12
//       }}>
//           <TextField fullWidth color="info" size="medium" name="app_store" label="App Store" placeholder="https://example.com" slotProps={{
//           input: {
//             startAdornment: <AppleStore fontSize="small" color="info" sx={{
//               mr: 1
//             }} />
//           }
//         }} />
//         </Grid>

//         <Grid size={12}>
//           <LoadingButton loading={isSubmitting} type="submit" color="info" variant="contained">
//             Save Changes
//           </LoadingButton>
//         </Grid>
//       </Grid>
//     </FormProvider>;
// }

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// MUI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

// ICONS
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import { useSnackbar } from "notistack";
import { CircularProgress } from "@mui/material";

// ✅ Validation Schema
const validationSchema = yup.object().shape({
  facebook: yup.string().url("Invalid URL").required("Facebook URL is required"),
  instagram: yup.string().url("Invalid URL").required("Instagram URL is required"),
  tiktok: yup.string().url("Invalid URL").required("TikTok URL is required"),
});

export default function SocialLinksForm({
  contentData,
  uploadInfo,
  uploadInfoLoading,
  uploadInfoError,
  websiteInfoLoading
}) {
  const { enqueueSnackbar } = useSnackbar();

  const initialValues = {
    facebook: contentData?.socialLinks?.facebook || "",
    instagram: contentData?.socialLinks?.instagram || "",
    // tiktok: contentData?.socialLinks?.tiktok || "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const handleSubmitForm = handleSubmit(async (values) => {
    const payload = {
      ...contentData,
      socialLinks: {
        facebook: values.facebook,
        instagram: values.instagram,
        // tiktok: values.tiktok,
      },
    };
    console.log("Payload:", payload);

      try {
      const result = await uploadInfo({ content: payload }).unwrap(); // ✅ important: unwrap to handle response or throw
if(uploadInfoError) {
        console.error("Error updating policies:", uploadInfoError);
        enqueueSnackbar("Update Error! Try Again", { variant: "error" });
        return;
      }
      enqueueSnackbar("Updated successfull!", { variant: "success" });
      console.log("Policies updated successfully");
    } catch (error) {
      console.error("Error updating policies:", error);
       enqueueSnackbar("Update Error! Try Again", { variant: "error" });
    }
  });

  return (
    <form onSubmit={handleSubmitForm}>
         {websiteInfoLoading ?    <Box className="flex items-center align-middle"><CircularProgress size={24} /> </Box> :
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4">Social Links</Typography>
        </Grid>

        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            label="Facebook"
            placeholder="https://example.com"
            {...register("facebook")}
            error={!!errors.facebook}
            helperText={errors.facebook?.message}
            InputProps={{
              startAdornment: <Facebook sx={{ mr: 1 }} fontSize="small" color="info" />,
            }}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            label="Instagram"
            placeholder="https://example.com"
            {...register("instagram")}
            error={!!errors.instagram}
            helperText={errors.instagram?.message}
            InputProps={{
              startAdornment: <Instagram sx={{ mr: 1 }} fontSize="small" color="info" />,
            }}
          />
        </Grid>

        {/* <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            label="TikTok"
            placeholder="https://example.com"
            {...register("tiktok")}
            error={!!errors.tiktok}
            helperText={errors.tiktok?.message}
            InputProps={{
              startAdornment: (
                // <img
                //   src="/icons/tiktok.svg"
                //   alt="TikTok"
                //   style={{ width: 20, height: 20, marginRight: 8 }}
                // />
              ),
            }}
          />
        </Grid> */}

        <Grid item xs={12}>
          <LoadingButton
            loading={isSubmitting}
            type="submit"
            color="info"
            variant="contained"
          >
            Save Changes
          </LoadingButton>
        </Grid>
      </Grid>}
    </form>
  );
}
