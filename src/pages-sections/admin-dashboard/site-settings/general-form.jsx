import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// MUI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSnackbar } from "notistack";
import { CircularProgress } from "@mui/material";

// ✅ Validation Schema
const validationSchema = yup.object().shape({
  description: yup.string().required("Description is required"),
  phone: yup.string().required("Phone is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  address: yup.string().required("Address is required"),
  tickerTitle: yup.string().nullable(),
  tickeLable: yup.string().nullable(),
});
const GeneralForm = ({
   contentData,
  description = "",
  contact = {},
  uploadInfo,
  uploadInfoLoading,
  uploadInfoError,
  websiteInfoLoading
}) => {
    const { enqueueSnackbar } = useSnackbar();
  const initialValues = {
    description: description || "",
    phone: contact?.phone || "",
    email: contact?.email || "",
    address: contact?.address || "",
    tickerTitle: contentData?.tickerTitle || "",
    tickeLable: contentData?.tickeLable || "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  // ✅ Form Submit Handler
  const handleSubmitForm = handleSubmit(async (values) => {
    const payload = {
  ...contentData, // full previous state
  description: values.description,
  contact: {
    phone: values.phone,
    email: values.email,
    address: values.address,
  },
  tickerTitle: values.tickerTitle,
  tickeLable: values.tickeLable,
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

  return (
    <form onSubmit={handleSubmitForm}>
         {websiteInfoLoading ?    <Box className="flex items-center align-middle"><CircularProgress size={24} /> </Box> :
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </Grid>

        <Grid item md={4} xs={12}>
          <TextField
            fullWidth
            label="Phone"
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        </Grid>

        <Grid item md={4} xs={12}>
          <TextField
            fullWidth
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>

        <Grid item md={4} xs={12}>
          <TextField
            fullWidth
            label="Address"
            {...register("address")}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            label="Ticker Title"
            {...register("tickerTitle")}
            error={!!errors.tickerTitle}
            helperText={errors.tickerTitle?.message}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            label="Ticker Label"
            {...register("tickeLable")}
            error={!!errors.tickeLable}
            helperText={errors.tickeLable?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <LoadingButton
            loading={isSubmitting}
            type="submit"
            variant="contained"
            color="primary"
          >
            Save Changes
          </LoadingButton>
        </Grid>
      </Grid>}
    </form>
  );
};

export default GeneralForm;