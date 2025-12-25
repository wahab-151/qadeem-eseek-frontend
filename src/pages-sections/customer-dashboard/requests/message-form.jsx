"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// MUI
import LoadingButton from "@mui/lab/LoadingButton";

// GLOBAL CUSTOM COMPONENTS
import { FormProvider, TextField } from "components/form-hook";
export default function MessageForm() {
  const initialValues = {
    message: ""
  };
  const validationSchema = yup.object().shape({
    message: yup.string().required("Message is required")
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
      <TextField rows={8} fullWidth multiline name="message" placeholder="Write your message here..." sx={{
      mb: 2
    }} />

      <LoadingButton loading={isSubmitting} type="submit" color="primary" variant="contained">
        Post message
      </LoadingButton>
    </FormProvider>;
}