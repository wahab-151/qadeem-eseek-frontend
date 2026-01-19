"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// MUI
import { Box, Container, Typography, Rating } from "@mui/material";
import QadeemButton from "components/QadeemButton";

// GLOBAL CUSTOM COMPONENTS
import { FormProvider, TextField } from "components/form-hook";

export default function ProductReviewFormSection({ productName = "Cloth" }) {
  const initialValues = {
    rating: 0,
    comment: "",
    date: new Date().toISOString(),
  };

  const validationSchema = yup.object().shape({
    rating: yup
      .number()
      .min(1, "Rating is required!")
      .required("Rating is required!"),
    comment: yup.string().required("Comment is required!"),
  });

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // FORM SUBMIT HANDLER
  const handleSubmitForm = handleSubmit((values) => {
    alert(JSON.stringify(values, null, 2));
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        sx={{
          fontSize: { xs: "24px", md: "28px" },
          fontWeight: 600,
        }}
      >
        Your review '
        <Typography
          variant="h3"
          component="span"
          sx={{
            fontSize: { xs: "24px", md: "28px" },
            color: "text.secondary",
            fontWeight: 600,
          }}
        >
          {productName}
        </Typography>
        '
      </Typography>

      <Typography
        variant="body2"
        sx={{
          mb: 3,
          color: "text.primary",
        }}
      >
        Your email address will not be published. Required fields are marked{" "}
        <Typography component="span" sx={{ color: "error.main" }}>
          *
        </Typography>
      </Typography>

      <FormProvider methods={methods} onSubmit={handleSubmitForm}>
        <Box mb={3}>
          <Typography
            variant="body1"
            sx={{
              mb: 1.5,
              fontWeight: 500,
              color: "text.primary",
            }}
          >
            Your rating
          </Typography>
          <Rating
            size="large"
            name="rating"
            value={watch("rating")}
            onChange={(_, value) =>
              setValue("rating", value || 0, {
                shouldValidate: true,
              })
            }
            sx={{
              "& .MuiRating-iconFilled": {
                color: "#FFC107",
              },
            }}
          />
        </Box>

        <Box mb={3}>
          <Typography
            variant="body1"
            sx={{
              mb: 1.5,
              fontWeight: 500,
              color: "text.primary",
            }}
          >
            Your review{" "}
            <Box component="span" sx={{ color: "error.main" }}>
              *
            </Box>
          </Typography>
          <TextField
            rows={8}
            multiline
            fullWidth
            name="comment"
            variant="outlined"
            placeholder="Write a review here..."
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <QadeemButton
            loading={isSubmitting}
            variant="contained"
            type="submit"
            sx={{
              minWidth: "120px",
              height: "48px",
            }}
          >
            Submit
          </QadeemButton>
        </Box>
      </FormProvider>
    </Container>
  );
}
