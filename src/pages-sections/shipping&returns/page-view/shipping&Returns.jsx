"use client";

import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Paper, Divider, Card, CardContent, CircularProgress, Container } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReplayIcon from "@mui/icons-material/Replay";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import useWebsiteInfo from "hooks/useWebsiteInfo";
const team = [
  { name: 'Ashiq Dobani', title: 'Accessories Manager' },
  { name: 'Mithun Dave', title: 'Parts Manager' },
  { name: 'Anir Rehmani', title: 'General Manager' },
];

const ShippinInfo = () => {
   const { state: websiteInfo } = useWebsiteInfo();
    // console.log(" websiteInfo?.termsConditionsPolicy",websiteInfo,  websiteInfo?.termsAndConditions);
    const phone = websiteInfo?.contact?.phone || '(000) 000-0000';
  const termsHTML = websiteInfo?.shippingAndReturnPolicy?.html;
    const [loading, setLoading] =useState(true);
  
    useEffect(() => {
      if (termsHTML) {
        setLoading(false);
      }
    }
    , [termsHTML]);
  
    return (
      <>
      {loading ? (
        <Box flexGrow={1} display="flex" justifyContent="center" 
        alignItems="center"><CircularProgress size={24}/></Box>
      ) : (
        <>
      <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom color="primary" fontWeight="bold">
        LCD Screen Replacement & Return Policy – SIFRA
      </Typography>

      <Box  sx={{ mt:4,
             "& h1, & h2, & h3, & h4, & h5, & h6": {
               color: "secondary.main",
               fontWeight: "bold",
               marginBottom: 2,
               // Add any other styles you want to mimic Typography h3 here
               fontSize: (theme) => theme.typography.h3.fontSize,
               lineHeight: (theme) => theme.typography.h3.lineHeight,
             },
             "& p": {
               marginBottom: 2,
               fontSize: (theme) => theme.typography.body1.fontSize,
               lineHeight: (theme) => theme.typography.body1.lineHeight,
             },
           }}>
             {/* Inject dynamic HTML content for terms & conditions */}
             <div dangerouslySetInnerHTML={{ __html: termsHTML }} />
           </Box>
     
      <Divider sx={{ my: 4 }} />

      <Typography variant="h3" color="secondary"
        gutterBottom
        fontWeight="bold"
        sx={{
          width: '100%',
          textAlign: 'center',
          mx: 'auto',
          mb:'10px'
        }}
        >
        Why Shop with Us?
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: "center", borderRadius:"10px" }}>
            <LocalShippingIcon fontSize="large" color="primary" />
            <Typography variant="subtitle1">Free Shipping</Typography>
            <Typography variant="body2">On all orders over $499</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: "center" , borderRadius:"10px"}}>
            <ReplayIcon fontSize="large" color="primary" />
            <Typography variant="subtitle1">30-Day Returns</Typography>
            <Typography variant="body2">If goods have problems</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: "center", borderRadius:"10px" }}>
            <LockIcon fontSize="large" color="primary" />
            <Typography variant="subtitle1">Secure Payment</Typography>
            <Typography variant="body2">100% secure payment</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: "center", borderRadius:"10px" }}>
            <PhoneIcon fontSize="large" color="primary"/>
            <Typography variant="subtitle1">Call Now</Typography>
            <Typography variant="body2">{phone}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ mb: 4 }} />

      <Typography variant="h5" fontWeight="bold" color="secondary" gutterBottom>
        Visit Our Mobile Parts & Accessories Store
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <LocationOnIcon sx={{ mr: 1 }} color="primary" />
        <Typography>{websiteInfo?.contact?.address}</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <PhoneIcon sx={{ mr: 1 }} color="primary" />
        <Typography>{phone}</Typography>
      </Box>

      <Typography variant="subtitle1" color="secondary" fontWeight="medium" sx={{ mt: 2 }}>
        <strong>Meet Our Team:</strong>
      </Typography>
       <Grid container spacing={3} sx={{ mt: 2 }}>
              {team.map((member, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card elevation={3}>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">
                        {member.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {member.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
      
    </Container>
    </>)}
    </>
  );
};

export default ShippinInfo;
