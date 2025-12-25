"use client";

import { Box, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useEffect } from "react";
import { useSnackbar } from "notistack";

export default function PoliciesForm({
  contentData,
  policiesData = {},
  uploadInfo,
  uploadInfoLoading,
  uploadInfoError,
  websiteInfoLoading
}) {

   const { enqueueSnackbar } = useSnackbar();
  const defaultValues = {
    about_us: policiesData?.aboutUs?.html || "",
    privacy_policy: policiesData?.privacyPolicy?.html || "",
    // refund_policy: policiesData?.refundPolicy?.html || "",
    shipping_policy: policiesData?.shippingAndReturnPolicy?.html || "",
    terms_of_service: policiesData?.termsAndConditions?.html || "",
    bulk_purchase_policy: policiesData?.bulkPurchasing?.html || "",
  };

  const methods = useForm({ defaultValues });

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
    reset,
  } = methods;

  // useEffect(() => {
  //   if (Object.keys(policiesData).length > 0) {

  //   }
  // }, [policiesData]);

  const handleSubmitForm = handleSubmit(async (values) => {
    const payload = {
      ...contentData, // full previous state
      aboutUs: { html: values.about_us },
      privacyPolicy: { html: values.privacy_policy },
      // refundPolicy: { html: values.refund_policy },
      shippingAndReturnPolicy: { html: values.shipping_policy },
      termsAndConditions: { html: values.terms_of_service },
      bulkPurchasing: { html: values.bulk_purchase_policy },
    };

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

  const fields = [
    { name: "about_us", label: "About Us" },
    { name: "privacy_policy", label: "Privacy Policy" },
    // { name: "refund_policy", label: "Refund Policy" },
    { name: "shipping_policy", label: "Shipping & Return Policy" },
    { name: "terms_of_service", label: "Terms & Conditions" },
    { name: "bulk_purchase_policy", label: "Bulk Purchase Policy" },
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmitForm}>
           {websiteInfoLoading ?    <Box className="flex items-center align-middle"><CircularProgress size={24} /> </Box> :
        <Grid container spacing={3}>
          {fields.map(({ name, label }) => (
            <Grid item xs={12} key={name}>
              <Typography variant="h6" gutterBottom>
                {label}
              </Typography>
              <Controller
                name={name}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={label}
                    fullWidth
                    multiline
                    minRows={6}
                    maxRows={Infinity}
                    variant="outlined"
                    placeholder="Enter HTML content here..."
                  />
                )}
              />
            </Grid>
          ))}

          <Grid item xs={12} md={4} >
            <LoadingButton
              loading={isSubmitting || uploadInfoLoading}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Save Policies
            </LoadingButton>
          </Grid>
        </Grid>
}
      </form>
    </FormProvider>
  );
}
