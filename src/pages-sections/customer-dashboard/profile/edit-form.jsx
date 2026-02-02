"use client";
import React, { useState, useEffect, useRef } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Card, CircularProgress, Grid, Typography } from "@mui/material";
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
import QadeemButton from "components/QadeemButton";
const schema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  displayName: yup.string().required("Required"),
  email: yup.string().email().required("Required"),
  oldPassword: yup.string(),
  newPassword: yup.string(),
  repeatNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
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
      displayName: "",
      email: "",
      oldPassword: "",
      newPassword: "",
      repeatNewPassword: "",
    },
    resolver: yupResolver(schema),
  });
  const didResetRef = useRef(false);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    getValues,
    setValue,
  } = methods;
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
          type: url.match(/\.(jpe?g|gif|png)$/i)
            ? "image/*"
            : "application/pdf",
        })),
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
          { variant: "error" },
        );
        continue;
      }
      try {
        const uniqueId = uuidv4();
        let blob;
        if (file.type.startsWith("image/")) {
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
          setFiles((prev) => [
            ...prev,
            {
              name: file.name,
              preview: cleanUrl,
              type: file.type,
            },
          ]);
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
      const fileType = file.type || "image/jpeg";

      console.log("Deleting file:", {
        fullFileName,
        fileName,
        fileType,
        originalFile: file,
        url: file.preview,
      });

      // Call the delete API with the full filename
      await deleteImageHandle({
        fileName,
        fileType,
      });

      // Remove from local state
      setFiles((prev) => prev.filter((f) => f.preview !== file.preview));

      // Remove from form values
      methods.setValue(
        "files",
        methods.getValues("files").filter((url) => url !== file.preview),
      );

      enqueueSnackbar("File deleted!", { variant: "success" });
    } catch (err) {
      console.error("Error deleting file:", err);
      // Show more specific error message if available
      const errorMessage =
        err?.data?.error || err?.data?.message || "Error deleting file";
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
    setProcessing(false);
  };

  useEffect(() => {
    const user = profileData?.data?.user;
    if (user && !didResetRef.current) {
      methods.reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        displayName: user.displayName || "",
        email: user.email || "",
        oldPassword: "",
        newPassword: "",
        repeatNewPassword: "",
      });
      didResetRef.current = true;
    }
  }, [profileData]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateUserProfile({
        userId,
        ...data,
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
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "700",
              mb: 3,
              fontSize: "18px",
              color: "#1c1c1c",
            }}
          >
            Account Details
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ mb: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: "700",
                    color: "#1c1c1c",
                    textTransform: "uppercase",
                  }}
                >
                  First Name *
                </Typography>
              </Box>
              <TextField
                fullWidth
                name="firstName"
                placeholder="First name"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "0px",
                    height: "45px",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mb: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: "700",
                    color: "#1c1c1c",
                    textTransform: "uppercase",
                  }}
                >
                  Last Name *
                </Typography>
              </Box>
              <TextField
                fullWidth
                name="lastName"
                placeholder="Last name"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "0px",
                    height: "45px",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mb: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: "700",
                    color: "#1c1c1c",
                    textTransform: "uppercase",
                  }}
                >
                  Display Name *
                </Typography>
              </Box>
              <TextField
                fullWidth
                name="displayName"
                placeholder="Display name"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "0px",
                    height: "45px",
                  },
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  color: "grey.600",
                  mt: 0.5,
                  fontStyle: "italic",
                }}
              >
                This will be how your name will be displayed in the account
                section and in reviews
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mb: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: "700",
                    color: "#1c1c1c",
                    textTransform: "uppercase",
                  }}
                >
                  Email *
                </Typography>
              </Box>
              <TextField
                fullWidth
                name="email"
                type="email"
                placeholder="Email"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "0px",
                    height: "45px",
                  },
                }}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "700",
              mb: 3,
              fontSize: "18px",
              color: "#1c1c1c",
            }}
          >
            Password
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ mb: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: "700",
                    color: "#1c1c1c",
                    textTransform: "uppercase",
                  }}
                >
                  Old Password
                </Typography>
              </Box>
              <TextField
                fullWidth
                name="oldPassword"
                type="password"
                placeholder="Old password"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "0px",
                    height: "45px",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mb: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: "700",
                    color: "#1c1c1c",
                    textTransform: "uppercase",
                  }}
                >
                  New Password
                </Typography>
              </Box>
              <TextField
                fullWidth
                name="newPassword"
                type="password"
                placeholder="New password"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "0px",
                    height: "45px",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mb: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: "700",
                    color: "#1c1c1c",
                    textTransform: "uppercase",
                  }}
                >
                  Repeat New Password
                </Typography>
              </Box>
              <TextField
                fullWidth
                name="repeatNewPassword"
                type="password"
                placeholder="Repeat new password"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "0px",
                    height: "45px",
                  },
                }}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 5 }}>
          <QadeemButton
            type="submit"
            loading={isSubmitting}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "14px",
              fontWeight: "700",
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Save Changes
          </QadeemButton>
        </Box>
      </form>
    </FormProvider>
  );
}
