"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// MUI
import Grid from "@mui/material/Grid2";
import LoadingButton from "@mui/lab/LoadingButton";

// GLOBAL CUSTOM COMPONENTS
import { FormProvider, TextField } from "components/form-hook";

// CUSTOM DATA MODEL


// =============================================================


// =============================================================

export default function AddressForm({
  address
}) {
  const initialValues = {
    name: address.title || "",
    contact: address.phone || "",
    address: address.street || ""
  };
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    address: yup.string().required("Address is required"),
    contact: yup.string().required("Contact is required")
  });
  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema)
  });
  const {
    handleSubmit,
    formState: {
      isSubmitting
    }
  } = methods;

  
// FORM SUBMIT HANDLER
  const handleSubmitForm = handleSubmit(values => {
    alert(JSON.stringify(values, null, 2));
  });
  return <FormProvider methods={methods} onSubmit={handleSubmitForm}>
      <Grid container spacing={3}>
        <Grid size={{
        md: 6,
        xs: 12
      }}>
          <TextField fullWidth name="name" label="Name" />
        </Grid>

        <Grid size={{
        md: 6,
        xs: 12
      }}>
          <TextField fullWidth name="address" label="Address Line" />
        </Grid>

        <Grid size={{
        md: 6,
        xs: 12
      }}>
          <TextField fullWidth label="Phone" name="contact" />
        </Grid>

        <Grid size={12}>
          <LoadingButton type="submit" variant="contained" color="primary" loading={isSubmitting}>
            Save Changes
          </LoadingButton>
        </Grid>
      </Grid>
    </FormProvider>;
}