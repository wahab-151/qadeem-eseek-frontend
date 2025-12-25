"use client";
import React, { useState, useEffect, useRef } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LoadingButton } from "@mui/lab";
import { TextField as MuiTextField } from "@mui/material";
import { TextField } from "components/form-hook";
import DropZone from "components/DropZone";
import useUser from "hooks/useUser";
import { notFound } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { uploadToS3, getFileType } from "utils/s3Helper";
import { compressImage, addWatermark } from "utils/helpers";
import {
  useDeleteImageMutation,
  useGetProfileQuery,
  useUpdateUserProfileMutation,
  useUploadImageMutation,
} from "app/store/services";
import {
  StyledClear,
  UploadImageBox,
} from "pages-sections/admin-dashboard/styles";
import { enqueueSnackbar } from "notistack";
const schema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email().required("Required"),
  phone: yup.string().required("Required"),
  companyName: yup.string().required("Required"),
  postalCode: yup.string().required("Required"),
  addressLine1: yup.string().required("Required"),
  addressLine2: yup.string(),
  city: yup.string().required("Required"),
  state: yup.string().required("Required"),
});


export default function ProfileEditForm() {
  const { state } = useUser();
  const userId = state?.user?.id;
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const { data: profileData, isLoading, error } = useGetProfileQuery();
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [uploadImageHandle] = useUploadImageMutation();
  const [deleteImageHandle] = useDeleteImageMutation();
  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      companyName: "",
      postalCode: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      files: [],
    },
    resolver: yupResolver(schema),
  });
  const didResetRef = useRef(false);
  const { control, handleSubmit, formState: { isSubmitting }, getValues, setValue } = methods;
  useEffect(() => {
    const user = profileData?.data?.user;
    if (user && !didResetRef.current) {
      const fileUrls = user.file || [];
      methods.reset({
        ...user,
        files: fileUrls,
      });
      setFiles(
        fileUrls.map((url, i) => ({
          name: `existing-${i}`,
          preview: url,
          type: url.match(/\.(jpe?g|gif|png)$/i) ? 'image/*' : 'application/pdf'
        }))
      );
      didResetRef.current = true;
    }
  }, [profileData]);
  const handleChangeDropZone = async (incoming) => {
    setProcessing(true);
    for (const file of incoming) {
      if (!file || file.size > 20 * 1024 * 1024) {
        enqueueSnackbar(
          file ? `${file.name} exceeds 20MB` : "No file selected",
          { variant: "error" }
        );
        continue;
      }
      try {
        const uniqueId = uuidv4();
        let blob;
        if (file.type.startsWith('image/')) {
          const compressedFile = await compressImage(file);
          const watermarkedUrl = await addWatermark(compressedFile, "");
          const response = await fetch(watermarkedUrl);
          blob = await response.blob();
        } else {
          blob = file;
        }
        const s3data = await uploadImageHandle({
          fileName: `${uniqueId}-${file.name}`,
          fileType: file.type,
        }).unwrap();
        const uploadedUrl = await uploadToS3({
          url: s3data.url,
          blob,
          fileType: file.type,
        });
        if (uploadedUrl) {
          const cleanUrl = uploadedUrl.split("?")[0];
          setFiles((prev) => [...prev, {
            name: file.name,
            preview: cleanUrl,
            type: file.type
          }]);
          methods.setValue("files", [
            ...(methods.getValues("files") || []),
            cleanUrl,
          ]);
          enqueueSnackbar("File uploaded successfully!", {
            variant: "success",
          });
        } else {
          enqueueSnackbar("File upload failed!", { variant: "error" });
        }
      } catch (err) {
        console.error(err);
        enqueueSnackbar("Upload failed", { variant: "error" });
      }
    }
    setProcessing(false);
  };
  const handleDelete = (file) => async () => {
    setProcessing(true);
    try {
      // Extract the filename from the URL
      // The URL structure is: https://bucket.s3.region.amazonaws.com/timestamp-filename
      const url = new URL(file.preview);
      const pathname = url.pathname;
      
      // Remove leading slash and get the full filename (including timestamp)
      const fullFileName = pathname.substring(1);
      
      // The backend has an issue with key construction, so let's try sending the full filename
      // This might work if the backend is flexible enough
      const fileName = fullFileName;
      
      // Determine file type from the file object or URL extension
      const fileType = file.type || 'image/jpeg';
      
      console.log("Deleting file:", { 
        fullFileName,
        fileName, 
        fileType, 
        originalFile: file,
        url: file.preview 
      });
      
      // Call the delete API with the full filename
      await deleteImageHandle({ 
        fileName, 
        fileType 
      });
      
      // Remove from local state
      setFiles((prev) =>
        prev.filter((f) => f.preview !== file.preview)
      );
      
      // Remove from form values
      methods.setValue(
        "files",
        methods.getValues("files").filter((url) => url !== file.preview)
      );
      
      enqueueSnackbar("File deleted!", { variant: "success" });
    } catch (err) {
      console.error("Error deleting file:", err);
      // Show more specific error message if available
      const errorMessage = err?.data?.error || err?.data?.message || "Error deleting file";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
    setProcessing(false);
  };



  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!data.files || data.files.length === 0) {
        enqueueSnackbar("Files are required", { variant: "error" });
        return;
      }
      const res = await updateUserProfile({
        userId,
        ...data,
        file: data.files,
      });
      if (res?.data?.success === true) {
        enqueueSnackbar("Profile updated", { variant: "success" });
      } else {
        enqueueSnackbar("Update failed", { variant: "error" });
      }
    } catch (err) {
      enqueueSnackbar("Something went wrong!", { variant: "error" });
      console.error(err);
    }
  });
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" py={10}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <TextField fullWidth name="firstName" label="First Name" />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField fullWidth name="lastName" label="Last Name" />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              name="email"
              type="email"
              label="Email"
              disabled
              sx={{
                "& .MuiInputBase-input.Mui-disabled": {
                  color: "black", // input text color
                },
                "& .MuiInputLabel-root.Mui-disabled": {
                  color: "black", // label color
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(0, 0, 0, 0.23)", // optional: visible border
                },
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField fullWidth label="Phone" name="phone" />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField fullWidth name="companyName" label="Company Name" />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField fullWidth name="postalCode" label="Postal Code" />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField fullWidth name="addressLine1" label="Address Line 1" />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField fullWidth name="addressLine2" label="Address Line 2" />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField fullWidth name="city" label="City" />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField fullWidth name="state" label="State" />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" gutterBottom>
              Documents (Images and PDFs)
            </Typography>
            <DropZone onChange={handleChangeDropZone} processing={processing} />
            <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
              {files.map((f, i) => {
                const isImage = f.type?.startsWith('image/') ||
                  (f.preview?.match(/\.(jpe?g|gif|png)$/i));
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
                        <Typography variant="body2">PDF</Typography>
                      </Box>
                    )}
                    <StyledClear onClick={() => handleDelete(f)()} />
                  </UploadImageBox>
                );
              })}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              color="secondary"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.primary.main,
                },
              }}
            >
              Save Changes
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}
