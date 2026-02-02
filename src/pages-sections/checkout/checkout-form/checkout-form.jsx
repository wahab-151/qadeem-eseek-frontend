"use client";

import { useRouter } from "next/navigation";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState, useMemo, useRef } from "react";
import debounce from "lodash/debounce";

// MUI
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

// GLOBAL CUSTOM COMPONENTS
import MuiTextField from "@mui/material/TextField";
import MuiCheckbox from "@mui/material/Checkbox";

// DUMMY CUSTOM DATA
import countryList from "data/countryList";

import useUser from "hooks/useUser";
import useCart from "hooks/useCart";
import { getShippingCost } from "utils/helpers";

// City data for dropdown
const cityList = [
  { label: "Karachi", value: "karachi" },
  { label: "Lahore", value: "lahore" },
  { label: "Islamabad", value: "islamabad" },
  { label: "Rawalpindi", value: "rawalpindi" },
  { label: "Faisalabad", value: "faisalabad" },
  { label: "Multan", value: "multan" },
  { label: "Peshawar", value: "peshawar" },
  { label: "Quetta", value: "quetta" },
];

// Payment methods
const paymentMethods = [
  { label: "Visa Card", value: "visa" },
  { label: "Master Card", value: "mastercard" },
  { label: "Cash on Delivery", value: "cod" },
];

// Custom Text Field Component - Original styling
const TextField = ({ name, ...props }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <MuiTextField
          {...field}
          {...props}
          fullWidth
          variant="outlined"
          margin="normal"
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
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
                borderColor: "#ccc",
              },
              "&:hover fieldset": {
                borderColor: "#999",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#000",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#705D27",
              "&.Mui-focused": {
                color: "#000",
              },
              "&:not(.MuiInputLabel-shrink)": {
                transform: "translate(14px, 14px) scale(1)",
              },
            },
          }}
        />
      )}
    />
  );
};

// Select Field Component for dropdowns - Original styling
const SelectField = ({ name, label, options, ...props }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl fullWidth margin="normal" error={!!fieldState.error}>
          <InputLabel
            sx={{
              color: "#705D27",
              "&.Mui-focused": {
                color: "#000",
              },
            }}
          >
            {label}
          </InputLabel>
          <Select
            {...field}
            {...props}
            label={label}
            sx={{
              borderRadius: 0,
              height: "52px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ccc",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#999",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#000",
              },
            }}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {fieldState.error && (
            <Typography
              variant="caption"
              color="error"
              sx={{ mt: 0.5, ml: 1.5 }}
            >
              {fieldState.error.message}
            </Typography>
          )}
        </FormControl>
      )}
    />
  );
};

// Checkbox component
const Checkbox = ({ name, label, className }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          className={className}
          control={
            <MuiCheckbox
              {...field}
              checked={!!field.value}
              style={{ color: "#000" }}
            />
          }
          label={label}
        />
      )}
    />
  );
};

// Phone Validation Regex
const phoneRegex = /^(\+?\d{1,4}[\s-]?)?(\(?\d{3}\)?[\s-]?)?\d{3}[\s-]?\d{4}$/;

const validationSchema = yup.object().shape({
  shipping_name: yup.string().required("First name is required"),
  shipping_company: yup.string().required("Last name is required"),
  shipping_email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  shipping_contact: yup
    .string()
    .matches(phoneRegex, "Invalid phone number")
    .max(15)
    .required("Phone is required"),
  shipping_zip: yup.string().required("Zip is required"),
  shipping_address1: yup.string().required("Address is required"),
  billing_country_select: yup.string().required("Country is required"),
  billing_city_select: yup.string().required("City is required"),
  same_as_shipping: yup.boolean(),
  payment_method: yup.string(),
  card_number: yup.string(),
  card_expiry: yup.string(),
  card_cvc: yup.string(),
  remember_details: yup.boolean(),
});

export default function CheckoutForm({
  setSelectedShippingMethod,
  selectedShippingMethod,
  onFormChange,
  checkoutData,
}) {
  const router = useRouter();
  const { state } = useUser();
  const { state: cartState } = useCart();

  // Calculate subtotal from cart
  const subTotal = useMemo(() => {
    return (
      cartState?.cart?.reduce(
        (acc, item) => acc + (item?.price || 0) * (item?.qty || 0),
        0,
      ) || 0
    );
  }, [cartState?.cart]);

  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  const initialValues = {
    shipping_zip: "",
    shipping_name: "",
    shipping_company: "",
    shipping_email: "",
    shipping_contact: "",
    shipping_address1: "",
    billing_country_select: "",
    billing_city_select: "",
    same_as_shipping: true,
    payment_method: "visa",
    card_number: "",
    card_expiry: "",
    card_cvc: "",
    remember_details: false,
  };

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
  });

  const { watch, handleSubmit, setValue, reset } = methods;

  const sameAsShipping = watch("same_as_shipping");

  useEffect(() => {
    if (!showNewAddressForm && state?.user) {
      reset({
        shipping_name: state.user.firstName || "",
        shipping_company: state.user.lastName || "",
        shipping_email: state.user.email || "",
        shipping_contact: state.user.phone || "",
        shipping_address1: state.user.addressLine1 || "",
        shipping_zip: state.user.postalCode || "",
        billing_country_select: "US",
        billing_city_select: "",
        same_as_shipping: true,
        payment_method: "visa",
        card_number: "",
        card_expiry: "",
        card_cvc: "",
        remember_details: false,
      });
    }
  }, [state?.user, reset, showNewAddressForm]);

  // Clear the form when showing new address form
  useEffect(() => {
    if (showNewAddressForm) {
      reset({
        shipping_name: "",
        shipping_company: "",
        shipping_email: "",
        shipping_contact: "",
        shipping_address1: "",
        shipping_zip: "",
        billing_country_select: "",
        billing_city_select: "",
        same_as_shipping: true,
        payment_method: "visa",
        card_number: "",
        card_expiry: "",
        card_cvc: "",
        remember_details: false,
      });
    }
  }, [showNewAddressForm, reset]);

  // Debounce form changes
  const debouncedOnFormChange = useRef(
    debounce((values) => {
      onFormChange?.(values);
    }, 300),
  ).current;

  useEffect(() => {
    const sub = watch((values) => {
      debouncedOnFormChange(values);
    });
    return () => {
      sub.unsubscribe();
      debouncedOnFormChange.cancel();
    };
  }, [watch, debouncedOnFormChange]);

  const [isSubmittingLocal, setIsSubmittingLocal] = useState(false);

  const handleSubmitForm = handleSubmit(
    (values) => {
      if (isSubmittingLocal) return;
      setIsSubmittingLocal(true);

      sessionStorage.setItem(
        "checkout-shipping",
        JSON.stringify({
          shipping_name: values.shipping_name + " " + values.shipping_company,
          shipping_contact: values.shipping_contact,
          shipping_address1: values.shipping_address1,
          shipping_zip: values.shipping_zip,
          shipping_country: values.billing_country_select,
          shipping_city: values.billing_city_select,
        }),
      );

      sessionStorage.setItem(
        "checkout-billing",
        JSON.stringify({
          fullName: values.shipping_name + " " + values.shipping_company,
          phone: values.shipping_contact,
          addressLine1: values.shipping_address1,
          postalCode: values.shipping_zip,
          country: values.billing_country_select,
          city: values.billing_city_select,
        }),
      );

      if (typeof window !== "undefined" && window.NProgress) {
        window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
        window.__startTimeRef && (window.__startTimeRef.current = Date.now());
        window.NProgress.start();
      }
      router.push("/payment");
    },
    (err) => {
      console.warn("Validation failed:", err);
      setIsSubmittingLocal(false);
    },
  );

  return (
    <FormProvider {...methods}>
      <form id="checkout-form" onSubmit={handleSubmitForm}>
        {/* Payment Information Header */}
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: "32px",
            color: "#271E03",
            mb: 4,
          }}
        >
          Payment Information
          <Box
            component="span"
            sx={{
              fontSize: "14px",
              color: "#705D27",
              ml: 2,
              verticalAlign: "middle",
            }}
          >
            Personal information will be secured and encripted
          </Box>
        </Typography>

        {/* Billing Address Section */}
        <Box mb={6}>
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "18px",
              color: "#271E03",
              borderBottom: "2px solid #271E03",
              pb: 1,
              mb: 3,
              width: "fit-content",
            }}
          >
            Billing Address
          </Typography>

          {/* New/Saved Address Toggle */}
          {!showNewAddressForm && state?.user ? (
            <Box
              sx={{
                border: "1px solid #ccc",
                p: 3,
                mb: 3,
                position: "relative",
              }}
            >
              <Typography fontWeight="bold">
                {state.user.firstName + " " + state.user.lastName}
              </Typography>
              <Typography>{state.user.addressLine1}</Typography>
              <Typography>
                {state.user.city}, {state.user.state}
              </Typography>
              <Typography>
                {state.user.postalCode}, {state.user.country}
              </Typography>

              <Button
                variant="outlined"
                size="small"
                onClick={() => setShowNewAddressForm(true)}
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  textTransform: "none",
                  color: "#666",
                  borderRadius: 0,
                }}
              >
                Change
              </Button>
            </Box>
          ) : (
            <Box>
              {state?.user && (
                <Button
                  variant="outlined"
                  onClick={() => setShowNewAddressForm(false)}
                  sx={{
                    textTransform: "none",
                    color: "#666",
                    mb: 2,
                    borderRadius: 0,
                  }}
                >
                  Cancel and use saved address
                </Button>
              )}
              {/* Form Fields - 2 Column Layout */}
              <Box
                display="grid"
                gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
                gap={3}
              >
                <TextField label="First Name*" name="shipping_name" />
                <TextField label="Last Name*" name="shipping_company" />
              </Box>

              <Box
                display="grid"
                gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
                gap={3}
              >
                <SelectField
                  name="billing_country_select"
                  label="Country"
                  options={countryList.map((c) => ({
                    label: c.label,
                    value: c.value,
                  }))}
                />
                <SelectField
                  name="billing_city_select"
                  label="City"
                  options={cityList}
                />
              </Box>

              <TextField label="Address" name="shipping_address1" />
              <TextField label="Email Address" name="shipping_email" />

              <Box
                display="grid"
                gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
                gap={3}
              >
                <TextField label="Zip Code*" name="shipping_zip" />
                <TextField label="Phone Number*" name="shipping_contact" />
              </Box>
            </Box>
          )}
        </Box>

        {/* Payment Method Section */}
        <Box mb={4}>
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "18px",
              color: "#271E03",
              borderBottom: "2px solid #271E03",
              pb: 1,
              mb: 3,
              width: "fit-content",
            }}
          >
            Payment Method
          </Typography>

          <SelectField
            name="payment_method"
            label="Visa Card"
            options={paymentMethods}
          />

          <TextField label="Card Number" name="card_number" />

          <Box
            display="grid"
            gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
            gap={3}
          >
            <TextField label="Expire Date" name="card_expiry" />
            <TextField label="CVC" name="card_cvc" />
          </Box>

          {/* Remember my details checkbox */}
          <Box mt={2}>
            <Checkbox
              name="remember_details"
              label="Remember my details for later use"
            />
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
}
