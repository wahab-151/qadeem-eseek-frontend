

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import clsx from "clsx";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import debounce from "lodash/debounce";

// MUI
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";

// GLOBAL CUSTOM COMPONENTS

import MuiTextField from "@mui/material/TextField";
import MuiAutocomplete from "@mui/material/Autocomplete";
import MuiCheckbox from "@mui/material/Checkbox";

// DUMMY CUSTOM DATA
import countryList from "data/countryList";

// STYLED COMPONENT
import { CardRoot, FormWrapper } from "./styles";
import { Card, CircularProgress, IconButton, useTheme } from "@mui/material";
import Image from "next/image";
import useUser from "hooks/useUser";
import useCart from "hooks/useCart";
import { getShippingCost } from "utils/helpers";

const shippingMethods = [
  { id: "ground", label: "UPS Ground" },
  { id: "overnight", label: "UPS Overnight" },
];

// Custom Inputs
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
          margin="normal"
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};

const Autocomplete = ({ name, label, options }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref }, fieldState }) => (
        <MuiAutocomplete
          options={options}
          value={value}
          onChange={(_, val) => onChange(val)}
          renderInput={(params) => (
            <MuiTextField
              {...params}
              label={label}
              fullWidth
              margin="normal"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              inputRef={ref}
            />
          )}
        />
      )}
    />
  );
};

const Checkbox = ({ name, label }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={<MuiCheckbox {...field} checked={!!field.value} />}
          label={label}
        />
      )}
    />
  );
};

// Phone Validation Regex
const phoneRegex = /^(\+?\d{1,4}[\s-]?)?(\(?\d{3}\)?[\s-]?)?\d{3}[\s-]?\d{4}$/;

// Schema
// const validationSchema = yup.object().shape({
//   shipping_name: yup.string().required("Name is required"),
//   shipping_email: yup
//     .string()
//     .email("Invalid email")
//     .required("Email is required"),
//   shipping_contact: yup
//     .string()
//     .matches(phoneRegex, "Invalid phone number")
//     .max(15)
//     .required("Phone is required"),
//   shipping_zip: yup.string().required("Zip is required"),
//   shipping_country: yup.mixed().required("Country is required"),
//   shipping_address1: yup.string().required("Address is required"),
//   same_as_shipping: yup.boolean(),
//   shipping_method: yup.string().required("Shipping method is required"),
//   billing_contact: yup
//     .string()
//     .matches(phoneRegex, "Invalid phone number")
//     .max(15),
// });
const validationSchema = yup.object().shape({
  shipping_name: yup.string().required("Name is required"),
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
  shipping_state: yup.string().required("State is required"),
  shipping_address1: yup.string().required("Address is required"),
  shipping_country: yup.mixed().required("Country is required"),
  shipping_method: yup.string().required("Shipping method is required"),

  same_as_shipping: yup.boolean(),

  billing_name: yup.string().when("same_as_shipping", {
    is: false,
    then: (schema) => schema.required("Billing name is required"),
  }),
  billing_email: yup.string().when("same_as_shipping", {
    is: false,
    then: (schema) =>
      schema.email("Invalid email").required("Billing email is required"),
  }),
  billing_contact: yup.string().when("same_as_shipping", {
    is: false,
    then: (schema) =>
      schema
        .matches(phoneRegex, "Invalid phone number")
        .max(15)
        .required("Phone is required"),
  }),
  billing_zip: yup.string().when("same_as_shipping", {
    is: false,
    then: (schema) => schema.required("Billing zip is required"),
  }),
  billing_state: yup.string().when("same_as_shipping", {
    is: false,
    then: (schema) => schema.required("Billing state is required"),
  }),
  billing_address1: yup.string().when("same_as_shipping", {
    is: false,
    then: (schema) => schema.required("Billing address is required"),
  }),
  billing_country: yup.mixed().when("same_as_shipping", {
    is: false,
    then: (schema) => schema.required("Billing country is required"),
  }),
});



export default function CheckoutForm({
  setSelectedShippingMethod,
  selectedShippingMethod,
  onFormChange,
  checkoutData
}) {
  const router = useRouter();
  const { state } = useUser();
  const { state: cartState } = useCart();
  // console.log("user state", state);
  const theme = useTheme();


  // Calculate subtotal from cart - memoized to prevent recalculation on every render
  const subTotal = useMemo(() => {
    return cartState?.cart?.reduce((acc, item) => acc + (item?.price || 0) * (item?.qty || 0), 0) || 0;
  }, [cartState?.cart]);
  // console.log("CheckoutSummary",cartState?.cart, selectedShippingMethod, subTotal);
  // Shipping cost logic moved to utils/helpers.getShippingCost

  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  // const [sameAsShipping, setSameAsShipping] = useState(true);

  const initialValues = {
    shipping_zip: "",
    shipping_name: "",
    shipping_email: "",
    shipping_contact: "",
    shipping_company: "",
    shipping_address1: "",
    shipping_address2: "",
    shipping_country: { label: "United States", value: "US" },
    shipping_state: "",
    same_as_shipping: true,
    shipping_method: selectedShippingMethod,
    billing_zip: "",
    billing_name: "",
    billing_email: "",
    billing_contact: "",
    billing_company: "",
    billing_address1: "",
    billing_address2: "",
    billing_country: { label: "United States", value: "US" },
    billing_state: "",
  };

  const methods = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
    mode: "onSubmit"
    // mode: "onTouched", // or "onChange"onTouched
  });

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = methods;

  const sameAsShipping = watch("same_as_shipping");




  useEffect(() => {
    if (!showNewAddressForm && state?.user) {
      reset({
        shipping_name: `${state.user.firstName || ""} ${state.user.lastName || ""}`,
        shipping_email: state.user.email || "",
        shipping_contact: state.user.phone || "",
        shipping_company: state.user.companyName || "",
        shipping_address1: state.user.addressLine1 || "",
        shipping_address2: state.user.addressLine2 || "",
        shipping_zip: state.user.postalCode || "",
        shipping_state: state.user.state || "",
        billing_name: `${state.user.firstName || ""} ${state.user.lastName || ""}`,
        billing_email: state.user.email || "",
        billing_contact: state.user.phone || "",
        billing_company: state.user.companyName || "",
        billing_address1: state.user.addressLine1 || "",
        billing_address2: state.user.addressLine2 || "",
        billing_zip: state.user.postalCode || "",
        billing_state: state.user.state || "",
        shipping_country: { label: "United States", value: "US" },
        billing_country: { label: "United States", value: "US" },
        same_as_shipping: true,
        shipping_method: selectedShippingMethod,
      });
    }
  }, [state?.user, reset, showNewAddressForm]);


  // Clear the form when showing new address form
  useEffect(() => {
    if (showNewAddressForm) {
      reset({
        shipping_name: "",
        shipping_email: "",
        shipping_contact: "",
        shipping_company: "",
        shipping_address1: "",
        shipping_address2: "",
        shipping_zip: "",
        shipping_state: "",
        billing_name: "",
        billing_email: "",
        billing_contact: "",
        billing_company: "",
        billing_address1: "",
        billing_address2: "",
        billing_zip: "",
        billing_state: "",

        shipping_country: null,
        billing_country: null,
        same_as_shipping: false,
        shipping_method: selectedShippingMethod,
      });
    }
  }, [showNewAddressForm, reset]);




  // Debounce form changes to prevent excessive re-renders
  const debouncedOnFormChange = useRef(
    debounce((values) => {
      onFormChange?.(values);
    }, 300)
  ).current;

  useEffect(() => {
    // Subscribe to form changes with debouncing
    const sub = watch((values) => {
      debouncedOnFormChange(values);
    });
    return () => {
      sub.unsubscribe();
      debouncedOnFormChange.cancel();
    };
  }, [watch, debouncedOnFormChange]);




  useEffect(() => {
    const storedMethod = localStorage.getItem("shipping-method");
    if (storedMethod) {
      setSelectedShippingMethod(storedMethod);
      setValue("shipping_method", storedMethod);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Watch shipping fields in a single call to reduce re-renders
  const shippingFields = watch([
    "shipping_name",
    "shipping_email",
    "shipping_contact",
    "shipping_company",
    "shipping_address1",
    "shipping_address2",
    "shipping_zip",
    "shipping_country",
    "shipping_state",
  ]);

  // Sync billing fields with shipping when same_as_shipping is true
  useEffect(() => {
    if (!sameAsShipping) return;

    const [
      shippingName,
      shippingEmail,
      shippingContact,
      shippingCompany,
      shippingAddress1,
      shippingAddress2,
      shippingZip,
      shippingCountry,
      shippingState,
    ] = shippingFields;

    setValue("billing_name", shippingName, { shouldValidate: false });
    setValue("billing_email", shippingEmail, { shouldValidate: false });
    setValue("billing_contact", shippingContact, { shouldValidate: false });
    setValue("billing_company", shippingCompany, { shouldValidate: false });
    setValue("billing_address1", shippingAddress1, { shouldValidate: false });
    setValue("billing_address2", shippingAddress2, { shouldValidate: false });
    setValue("billing_zip", shippingZip, { shouldValidate: false });
    setValue("billing_country", shippingCountry, { shouldValidate: false });
    setValue("billing_state", shippingState, { shouldValidate: false });
  }, [sameAsShipping, shippingFields, setValue]);

  const handleChange = (e) => {
    const id = e.target.value;
    setSelectedShippingMethod(id);
    setValue("shipping_method", id);
    localStorage.setItem("shipping-method", id);
  };


  const [isSubmittingLocal, setIsSubmittingLocal] = useState(false);

  const handleSubmitForm = handleSubmit(
    (values) => {
      if (isSubmittingLocal) return;
      setIsSubmittingLocal(true);
      console.log("Submit initiated", values);
      sessionStorage.setItem(
        "checkout-shipping",
        JSON.stringify({
          shipping_name: values.shipping_name,
          shipping_contact: values.shipping_contact,
          shipping_address1: values.shipping_address1,
          shipping_address2: values.shipping_address2,
          shipping_zip: values.shipping_zip,
          shipping_country: values.shipping_country?.label,
          company: values.shipping_company,
          shippingMethod: values.shipping_method,
          shipping_state: values.shipping_state,
        })
      );

      if (!values.same_as_shipping) {
        sessionStorage.setItem(
          "checkout-billing",
          JSON.stringify({
            fullName: values.billing_name,
            phone: values.billing_contact,
            addressLine1: values.billing_address1,
            addressLine2: values.billing_address2,
            postalCode: values.billing_zip,
            country: values.billing_country?.label,
            company: values.billing_company,
            state: values.billing_state,
          })
        );
      } else {
        sessionStorage.setItem(
          "checkout-billing",
          sessionStorage.getItem("checkout-shipping")
        );
      }
      console.log("submit hit", values);
      if (typeof window !== 'undefined' && window.NProgress) {
        window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
        window.__startTimeRef && (window.__startTimeRef.current = Date.now());
        window.NProgress.start();
      }
      router.push("/payment");
    },
    (err) => {
      console.warn("Validation failed:", err);
      setIsSubmittingLocal(false);
    }
  );



  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmitForm}>
        <Typography
          variant="h6"
          sx={{
            px: 2,
            py: 1,
            mt: 3,
            bgcolor: "#F3F5F9",
            color: "text.primary",
            borderRadius: 8,
            fontSize: "1.20rem",
            fontWeight: "bold",
            display: "flex", // Add flex display
            alignItems: "center", // Center vertically
            gap: 1, // Optional: space between icon and text
          }}
        >
          <LocationOnIcon fontSize="small" /> Shipping Address
        </Typography>
        <Card
          sx={{ p: 3, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)", mt: 2 }}
        >
          {!showNewAddressForm ? (
            <Box>
              {/* Header row: Button right, card left */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                mb={2}
              >
                {/* Address Card */}
                <Card
                  sx={{
                    mt: 4,
                    p: 2,
                    border: "2px solid #1976d2",
                    position: "relative",
                    width: "100%",
                    maxWidth: 350,
                  }}
                  onClick={() => setShowNewAddressForm(true)}
                >
                  {/* Check Icon Toggle */}
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: "#1976d2", // icon color only
                      backgroundColor: "transparent",
                      "&:hover": {
                        backgroundColor: "transparent", // no hover background
                        color: "#1565c0", // optional hover color change
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation(); // prevent card click bubbling
                      setShowNewAddressForm(true);
                    }}
                  >
                    <CheckCircleIcon />
                  </IconButton>

                  {/* Address Info */}

                  {!state?.user ? (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      py={4}
                    >
                      <CircularProgress color="primary" />
                    </Box>
                  ) : (
                    <>
                      {/* Address Info */}
                      <Typography fontWeight="bold">
                        {state.user.firstName + " " + state.user.lastName}
                      </Typography>
                      <Typography>{state.user.companyName}</Typography>
                      <Typography>{state.user.addressLine1},</Typography>
                      <Typography>{state.user.addressLine2},</Typography>
                      <Typography>
                        {state.user.city}, {state.user.state},{" "}
                        {state.user.postalCode},
                      </Typography>
                      <Typography>United States</Typography>
                      <Typography>T: {state.user.phone}</Typography>
                    </>
                  )}
                </Card>

                {/* New Address Button */}
                <Button
                  variant="contained"
                  onClick={() => setShowNewAddressForm(true)}
                  startIcon={<AddIcon />}
                  sx={{
                    ml: 1,
                    height: "40px",
                    backgroundColor: theme.palette.secondary.main,
                    color: "#fff",
                    borderRadius: "20px",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                >
                  New Address
                </Button>
              </Box>
            </Box>
          ) : (
            <Box>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mb: 2 }} // margin bottom
                onClick={() => setShowNewAddressForm(false)}
              >
                Use Default Address
              </Button>
              <Box>
                <TextField label="Full Name" name="shipping_name" />
                <TextField label="Phone Number" name="shipping_contact" />
                <TextField
                  type="email"
                  label="Email Address"
                  name="shipping_email"
                />
                <TextField label="Company" name="shipping_company" />
                <TextField label="Address 1" name="shipping_address1" />
                <TextField label="Address 2" name="shipping_address2" />
                <Autocomplete
                  label="Country"
                  name="shipping_country"
                  options={countryList}
                />
                <TextField label="Zip Code" name="shipping_zip" />

                <TextField label="State" name="shipping_state" />

              </Box>

              <Checkbox
                name="same_as_shipping"
                label="My billing and shipping address are the same"
                className={clsx({ "mb-1": !sameAsShipping })}
              />

              <Box style={{ display: sameAsShipping ? "none" : "block" }}>
                <Typography variant="h6">Billing Address</Typography>
                <Box>
                  <TextField label="Full Name" name="billing_name" />
                  <TextField label="Phone Number" name="billing_contact" />
                  <TextField label="Email Address" name="billing_email" />
                  <TextField label="Company" name="billing_company" />
                  <TextField label="Address 1" name="billing_address1" />
                  <TextField label="Address 2" name="billing_address2" />
                  <Autocomplete
                    label="Country"
                    name="billing_country"
                    options={countryList}
                  />
                  <TextField label="Zip Code" name="billing_zip" />

                  <TextField label="State" name="billing_state" />

                </Box>
              </Box>
            </Box>
          )}
        </Card>
        <Typography
          variant="h6"
          sx={{
            px: 2,
            py: 1,
            mt: 3,
            bgcolor: "#F3F5F9",
            color: "text.primary",
            borderRadius: 8,
            fontSize: "1.20rem",
            fontWeight: "bold",
            display: "flex", // Add flex display
            alignItems: "center", // Center vertically
            gap: 1, // Optional: space between icon and text
          }}
        >
          <LocalShippingIcon fontSize="small" />
          Shipping Methods
        </Typography>

        <Card
          sx={{ p: 3, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)", mt: 2 }}
        >
          <Box
            sx={{
              display: "inline-block",
              p: "12px", // internal white space
              border: "2px solid #2196f3", // blue border
              borderRadius: "16px", // rounded corners
              backgroundColor: "#fff", // white background
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)", // subtle shadow
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 4px 16px rgba(0,0,0,0.15)", // optional hover effect
              },
            }}
          >
            <Image
              src="/assets/images/payment-methods/ups.png"
              alt="UPS logo"
              width={64}
              height={64}
              style={{
                objectFit: "contain",
                display: "block",
              }}
            />
          </Box>
          <FormControl fullWidth>


            {/* <RadioGroup
              {...register("shipping_method")}
              value={watch("shipping_method")}
              onChange={(e) => {
                const value = e.target.value;
                console.log("valueeeee", value)
                setSelectedShippingMethod(value);
                setValue("shipping_method", value);
                localStorage.setItem("shipping-method", value);
              }}
            >
              {shippingMethods?.map((method) => {
                const isSelected = watch("shipping_method") === method.id;
                const priceValue = getShippingCost(method.id, subTotal);
                const formattedPrice = priceValue === 0 ? "Free" : `$${priceValue}`;

                return (
                  <Box
                    key={method.id}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={1}
                    py={1.5}
                    px={2}
                    mb={1}
                    borderRadius={2}
                    border="1px solid"
                    borderColor={isSelected ? "primary.main" : "grey.300"}
                    bgcolor={isSelected ? "primary.light" : "background.paper"}
                    sx={{
                      cursor: "pointer",
                      transition: "border-color 0.2s, background-color 0.2s",
                    }}
                  >
                    <FormControlLabel
                      value={method.id}
                      control={<Radio />}
                      label={method.label}
                      sx={{ flex: 1, m: 0 }}
                    />
                    <Typography fontWeight="bold">{formattedPrice}</Typography>
                  </Box>
                );
              })}
            </RadioGroup> */}
            <RadioGroup
              value={watch("shipping_method")}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedShippingMethod(value);
                setValue("shipping_method", value, { shouldValidate: true });
                localStorage.setItem("shipping-method", value);
              }}
            >
              {shippingMethods?.map((method) => {
                const isSelected = watch("shipping_method") === method.id;
                const priceValue = getShippingCost(method.id, subTotal);
                const formattedPrice = priceValue === 0 ? "Free" : `$${priceValue}`;

                return (
                  <Box
                    key={method.id}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={1}
                    py={1.5}
                    px={2}
                    mb={1}
                    borderRadius={2}
                    border="1px solid"
                    borderColor={isSelected ? "primary.main" : "grey.300"}
                    bgcolor={isSelected ? "primary.light" : "background.paper"}
                    sx={{
                      cursor: "pointer",
                      transition: "border-color 0.2s, background-color 0.2s",
                    }}
                  >
                    <FormControlLabel
                      value={method.id}
                      control={<Radio />}
                      label={method.label}
                      sx={{ flex: 1, m: 0 }}
                    />
                    <Typography fontWeight="bold">{formattedPrice}</Typography>
                  </Box>
                );
              })}
            </RadioGroup>

          </FormControl>

        </Card>

        <Box mt={3} textAlign="right">
          <Button type="submit" variant="contained" color="primary" disabled={isSubmittingLocal}
            sx={{
              px: 3,
              borderRadius: 10,
              color: "white",
              fontWeight: "bold",
              bgcolor: "#5576FA",
              "&:hover": { bgcolor: "#405EDB" },
            }}>
            {isSubmittingLocal ? "Processing..." : "Proceed to Review & Payment"}
          </Button>
        </Box>
      </form>
    </FormProvider>
  )
}