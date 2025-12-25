"use client";

import React from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import useWebsiteInfo from "hooks/useWebsiteInfo";
import { useGetWebsiteInfoQuery } from "app/store/services";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";

export default function ContactUsPage() {
  const theme = useTheme();
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
    message: "",
  });

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      enqueueSnackbar("Please fill in Name, Email, and Message", { variant: "warning" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      enqueueSnackbar("Please enter a valid email address", { variant: "warning" });
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL || 'https://server.sifraatl.com'}/api/notify/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok) {
        enqueueSnackbar("Thank you for reaching out! We'll get back to you soon.", { variant: "success" });
        setFormData({ name: "", email: "", phone: "", message: "" });
        router.push("/home");
      } else {
        enqueueSnackbar(result.error || "Failed to send message.", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Failed to send message. Please try again later.", { variant: "error" });
    }
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", my: 6 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Box sx={{ p: 3, bgcolor: "#fff", borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 , color: theme.palette.secondary.main, textAlign: "center" }}>

              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
              We usually respond within 1 business day.
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField fullWidth placeholder="Enter Your Name" value={formData.name} onChange={handleChange("name")} sx={{ mb: 2 }} />
              <TextField fullWidth placeholder="Enter Your Email" type="email" value={formData.email} onChange={handleChange("email")} sx={{ mb: 2 }} />
              <TextField fullWidth placeholder="Enter Your Phone Number" type="tel" value={formData.phone} onChange={handleChange("phone")} sx={{ mb: 2 }} />
              <TextField fullWidth placeholder="Enter Your Message" multiline rows={4} value={formData.message} onChange={handleChange("message")} sx={{ mb: 2 }} />
              <Button type="submit" variant="contained" onHover={{ backgroundColor: theme.palette.secondary.main , color: "#fff"  }} sx={{ backgroundColor: theme.palette.primary.main , color: "#fff"  }}>
                Submit
              </Button>
            </form>
          </Box>
        </Grid>

        <Grid item xs={12} md={5}>
          <Box sx={{ p: 3, bgcolor: "#fff", borderRadius: 2, boxShadow: 1, height: "100%" }}>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 , color: theme.palette.secondary.main, textAlign: "center" }}>
              Get in touch
            </Typography>
            {contactInfo?.email ? (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ color: "text.secondary" , fontWeight: 700 }}>Email</Typography>
                <Typography variant="body1">{contactInfo.email}</Typography>
              </Box>
            ) : null}
            {contactInfo?.phone ? (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ color: "text.secondary" , fontWeight: 700 }}>Phone</Typography>
                <Typography variant="body1">{contactInfo.phone}</Typography>
              </Box>
            ) : null}
            {contactInfo?.address ? (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ color: "text.secondary" , fontWeight: 700 }}>Address</Typography>
                <Typography variant="body1">{contactInfo.address}</Typography>
              </Box>
            ) : null}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}


