"use client";

import React from "react";
import Link from "next/link";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useEffect } from "react";
import useWebsiteInfo from "hooks/useWebsiteInfo";
import { useGetWebsiteInfoQuery } from "app/store/services";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";

const BANNER_IMAGE = "/assets/images/contact-hero.png";

const COLORS = {
  primary: "#FAE7AF",
  text: "#2C2416",
  border: "#E0E0E0",
  bgLight: "#FEFAF0",
  secondaryText: "#705D27",
};

export default function ContactUsPage() {
  const router = useRouter();
  const { state, dispatch } = useWebsiteInfo();
  const { data: websiteInfo } = useGetWebsiteInfoQuery();
  const contactInfo = state?.contact || {};

  useEffect(() => {
    if (websiteInfo?.data?.content) {
      const {
        description,
        aboutUs,
        shippingAndReturnPolicy,
        privacyPolicy,
        termsAndConditions,
        contact,
        socialLinks,
        bulkPurchasing,
      } = websiteInfo.data.content;

      dispatch({
        type: "SET_WEBSITE_INFO",
        payload: {
          description,
          aboutUs,
          shippingAndReturnPolicy,
          privacyPolicy,
          termsAndConditions,
          contact,
          socialLinks,
          bulkPurchasing,
        },
      });
    }
  }, [websiteInfo, dispatch]);

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      enqueueSnackbar("Please fill in Name, Email, and Message", {
        variant: "warning",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      enqueueSnackbar("Please enter a valid email address", {
        variant: "warning",
      });
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL || "https://qadeem.com"}/api/notify/contact-us`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      const result = await response.json();

      if (response.ok) {
        enqueueSnackbar(
          "Thank you for reaching out! We'll get back to you soon.",
          { variant: "success" },
        );
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        router.push("/");
      } else {
        enqueueSnackbar(result.error || "Failed to send message.", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar("Failed to send message. Please try again later.", {
        variant: "error",
      });
    }
  };

  return (
    <Box sx={{ bgcolor: "#fff", minHeight: "100vh", pb: 8 }}>
      {/* Hero Banner */}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: 200, md: 393, lg: 400 },
          width: "100%",
          backgroundImage: `url(${BANNER_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 8,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            color: "#fff",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              color: "#FEFAF0",
              fontSize: "52px",
              mb: 2,
              letterSpacing: 1,
            }}
          >
            Contact Us
          </Typography>
          <Breadcrumbs
            separator={
              <NavigateNextIcon fontSize="16px" sx={{ color: "#FEFAF0" }} />
            }
            aria-label="breadcrumb"
            sx={{
              justifyContent: "center",
              display: "flex",
              color: "#FEFAF0",
              "& .MuiBreadcrumbs-li": { color: "#FEFAF0" },
            }}
          >
            <Link
              href="/"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "1rem",
              }}
            >
              Home
            </Link>
            <Typography color="inherit" fontSize="1rem">
              Contact Us
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 8 }}>
          {/* Left Column: Contact Information */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "32px",
                  color: COLORS.text,
                  mb: 2,
                }}
              >
                Contact Information
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: COLORS.secondaryText,
                  mb: 4,
                }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit nulla
                adipiscing tincidunt interdum tellus du.
              </Typography>

              {/* Address */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: "16px",
                    color: COLORS.text,
                    mb: 1,
                  }}
                >
                  Address
                </Typography>
                <Box display="flex" alignItems="flex-start" gap={1}>
                  <LocationOnIcon
                    sx={{ color: COLORS.secondaryText, fontSize: 20 }}
                  />
                  <Typography
                    sx={{ fontSize: "14px", color: COLORS.secondaryText }}
                  >
                    {contactInfo?.address ||
                      "794 Mcallister St\nSan Francisco, 94102"}
                  </Typography>
                </Box>
              </Box>

              {/* Email */}
              {contactInfo?.email && (
                <Box sx={{ mb: 3 }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <EmailIcon
                      sx={{ color: COLORS.secondaryText, fontSize: 20 }}
                    />
                    <Typography
                      sx={{ fontSize: "14px", color: COLORS.secondaryText }}
                    >
                      {contactInfo.email}
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* Phone */}
              {contactInfo?.phone && (
                <Box sx={{ mb: 3 }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <PhoneIcon
                      sx={{ color: COLORS.secondaryText, fontSize: 20 }}
                    />
                    <Typography
                      sx={{ fontSize: "14px", color: COLORS.secondaryText }}
                    >
                      {contactInfo.phone}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>

          {/* Right Column: Contact Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "32px",
                  color: COLORS.text,
                  mb: 2,
                }}
              >
                Any Questions?
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: COLORS.secondaryText,
                  mb: 4,
                }}
              >
                Use the form below to get in touch with us.
              </Typography>

              <form onSubmit={handleSubmit}>
                {/* Name and Email Row */}
                <Box
                  display="grid"
                  gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
                  gap={{ xs: 0, sm: 3 }}
                >
                  <TextField
                    fullWidth
                    label="Your Full Name*"
                    value={formData.name}
                    onChange={handleChange("name")}
                    variant="outlined"
                    margin="normal"
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
                  <TextField
                    fullWidth
                    label="Write Your Email Here*"
                    type="email"
                    value={formData.email}
                    onChange={handleChange("email")}
                    variant="outlined"
                    margin="normal"
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
                </Box>

                {/* Phone Number */}
                <TextField
                  fullWidth
                  label="Phone number"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange("phone")}
                  variant="outlined"
                  margin="normal"
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

                {/* Subject */}
                <TextField
                  fullWidth
                  label="Write your subject here"
                  value={formData.subject}
                  onChange={handleChange("subject")}
                  variant="outlined"
                  margin="normal"
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

                {/* Message */}
                <TextField
                  fullWidth
                  label="Write your message here *"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleChange("message")}
                  variant="outlined"
                  margin="normal"
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
                    },
                  }}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: "#2B2118",
                    color: "#fff",
                    px: 6,
                    py: 1.5,
                    mt: 2,
                    textTransform: "none",
                    fontSize: "0.9rem",
                    borderRadius: 0,
                    "&:hover": {
                      bgcolor: "#1a130e",
                    },
                  }}
                >
                  Submit
                </Button>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
