"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";

// MUI
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";

// GLOBAL CUSTOM COMPONENTS
import { FormProvider, TextField } from "components/form-hook";
import QadeemButton from "components/QadeemButton";
import axiosInstance from "utils/axiosInstance";

export default function AddressForm({ address }) {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const initialValues = {
    title: address?.title || "",
    phone: address?.phone || "",
    street: address?.street || "",
    city: address?.city || "",
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    street: yup.string().required("Address is required"),
    phone: yup.string().required("Phone is required"),
    city: yup.string().required("City is required"),
  });

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // FORM SUBMIT HANDLER
  const handleSubmitForm = handleSubmit(async (values) => {
    try {
      const isEdit = !!address?.id;
      const url = isEdit
        ? `/api/address/update/${address.id}`
        : "/api/address/create";

      const response = await axiosInstance[isEdit ? "put" : "post"](
        url,
        values,
      );

      if (response.status === 200 || response.status === 201) {
        enqueueSnackbar(
          `Address ${isEdit ? "updated" : "added"} successfully`,
          { variant: "success" },
        );
        router.push("/address");
        setTimeout(() => {
          router.refresh();
        }, 100);
      }
    } catch (error) {
      console.error("Form Submit Error:", error);
      enqueueSnackbar(error.response?.data?.message || "Something went wrong", {
        variant: "error",
      });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={handleSubmitForm}>
      <Box>
        <Grid container spacing={3}>
          <Grid size={{ md: 6, xs: 12 }}>
            <TextField
              fullWidth
              name="title"
              label="Address Title"
              placeholder="e.g. Home, Office"
              InputProps={{
                sx: {
                  height: "52px",
                  display: "flex",
                  alignItems: "center",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0,
                  "& fieldset": {
                    borderColor: "primary.main",
                  },
                  "&:hover fieldset": {
                    borderColor: "primary.dark",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#705D27",
                  "&.Mui-focused": {
                    color: "primary.main",
                  },
                  "&:not(.MuiInputLabel-shrink)": {
                    transform: "translate(14px, 14px) scale(1)",
                  },
                },
              }}
            />
          </Grid>

          <Grid size={{ md: 6, xs: 12 }}>
            <TextField
              fullWidth
              name="phone"
              label="Phone Number"
              placeholder="e.g. +1234567890"
              InputProps={{
                sx: {
                  height: "52px",
                  display: "flex",
                  alignItems: "center",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0,
                  "& fieldset": {
                    borderColor: "primary.main",
                  },
                  "&:hover fieldset": {
                    borderColor: "primary.dark",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#705D27",
                  "&.Mui-focused": {
                    color: "primary.main",
                  },
                  "&:not(.MuiInputLabel-shrink)": {
                    transform: "translate(14px, 14px) scale(1)",
                  },
                },
              }}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              fullWidth
              name="street"
              label="Street Address"
              placeholder="e.g. 123 Main St, Apt 4"
              InputProps={{
                sx: {
                  height: "52px",
                  display: "flex",
                  alignItems: "center",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0,
                  "& fieldset": {
                    borderColor: "primary.main",
                  },
                  "&:hover fieldset": {
                    borderColor: "primary.dark",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#705D27",
                  "&.Mui-focused": {
                    color: "primary.main",
                  },
                  "&:not(.MuiInputLabel-shrink)": {
                    transform: "translate(14px, 14px) scale(1)",
                  },
                },
              }}
            />
          </Grid>

          <Grid size={{ md: 6, xs: 12 }}>
            <TextField
              fullWidth
              name="city"
              label="City"
              placeholder="e.g. New York"
              InputProps={{
                sx: {
                  height: "52px",
                  display: "flex",
                  alignItems: "center",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0,
                  "& fieldset": {
                    borderColor: "primary.main",
                  },
                  "&:hover fieldset": {
                    borderColor: "primary.dark",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#705D27",
                  "&.Mui-focused": {
                    color: "primary.main",
                  },
                  "&:not(.MuiInputLabel-shrink)": {
                    transform: "translate(14px, 14px) scale(1)",
                  },
                },
              }}
            />
          </Grid>

          <Grid size={12} mt={2}>
            <QadeemButton
              type="submit"
              loading={isSubmitting}
              sx={{ px: 4, py: 1.5, width: { xs: "100%", sm: "auto" } }}
            >
              {address?.id ? "Save Changes" : "Create Address"}
            </QadeemButton>
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
}
