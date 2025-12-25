import { useForm } from "react-hook-form";
import { useEffect } from "react";
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
  promotionalTitle: yup.string().nullable(),
  promotionalLabel: yup.string().nullable(),
});

const PromotionalDetailsForm = ({
  contentData,
  uploadInfo,
  uploadInfoLoading,
  uploadInfoError,
  websiteInfoLoading
}) => {
  const { enqueueSnackbar } = useSnackbar();
  
  const initialValues = {
    promotionalTitle: contentData?.promotionalDetails?.title || contentData?.tickerTitle || "",
    promotionalLabel: contentData?.promotionalDetails?.label || contentData?.tickeLable || "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  // Keep form in sync when contentData changes (e.g., after fetch)
  useEffect(() => {
    reset({
      promotionalTitle: contentData?.promotionalDetails?.title || contentData?.tickerTitle || "",
      promotionalLabel: contentData?.promotionalDetails?.label || contentData?.tickeLable || "",
    });
  }, [contentData, reset]);

  // ✅ Form Submit Handler
  const handleSubmitForm = handleSubmit(async (values) => {
    const payload = {
      ...contentData, // full previous state
      promotionalDetails: {
        title: values.promotionalTitle,
        label: values.promotionalLabel,
      },
    };

    try {
      const result = await uploadInfo({ content: payload }).unwrap();
      if (uploadInfoError) {
        console.error("Error updating promotional details:", uploadInfoError);
        enqueueSnackbar("Update Error! Try Again", { variant: "error" });
        return;
      }
      enqueueSnackbar("Promotional details updated successfully!", { variant: "success" });
      console.log("Promotional details updated successfully");
    } catch (error) {
      console.error("Error updating promotional details:", error);
      enqueueSnackbar("Update Error! Try Again", { variant: "error" });
    }
  });

  return (
    <form onSubmit={handleSubmitForm}>
      {websiteInfoLoading ? (
        <Box className="flex items-center align-middle">
          <CircularProgress size={24} />
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ mb: 2 }}>
              <h3>Promotional Details</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>
                Configure promotional messages to display in the topbar. These will be shown to promote sales and special offers.
              </p>
            </Box>
          </Grid>

          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Promotional Label"
              placeholder="e.g., SALE, OFFER, NEW"
              {...register("promotionalLabel")}
              error={!!errors.promotionalLabel}
              helperText={errors.promotionalLabel?.message || "Short promotional label (e.g., SALE, OFFER)"}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Promotional Title"
              placeholder="e.g., 50% Off All Items This Week!"
              {...register("promotionalTitle")}
              error={!!errors.promotionalTitle}
              helperText={errors.promotionalTitle?.message || "Main promotional message"}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
              <h4>Preview:</h4>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {watch("promotionalLabel") && (
                  <Box
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                  >
                    {watch("promotionalLabel")}
                  </Box>
                )}
                {watch("promotionalTitle") && (
                  <Box sx={{ color: 'primary.main', fontWeight: 'medium' }}>
                    {watch("promotionalTitle")}
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <LoadingButton
              loading={isSubmitting}
              type="submit"
              variant="contained"
              color="primary"
            >
              Save Promotional Details
            </LoadingButton>
          </Grid>
        </Grid>
      )}
    </form>
  );
};

export default PromotionalDetailsForm;
