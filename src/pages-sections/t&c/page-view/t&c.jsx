'use client';

import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Grid,
  Paper,
  Divider,
  CircularProgress,
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReplayIcon from '@mui/icons-material/Replay';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';
import useWebsiteInfo from 'hooks/useWebsiteInfo';


const TermsView = () => {
  const { state: websiteInfo } = useWebsiteInfo();
  console.log(" websiteInfo?.termsConditionsPolicy",websiteInfo,  websiteInfo?.termsAndConditions);
  const phone = websiteInfo?.contact?.phone || '(000) 000-0000';
const termsHTML = websiteInfo?.termsAndConditions?.html;
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
      <Typography variant="h3" gutterBottom fontWeight="bold" color="primary.main">
        Legal Notices
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

      {/* Static service boxes, only replace phone number below */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: "center", borderRadius: "10px" }}>
            <LocalShippingIcon fontSize="large" color="primary" />
            <Typography variant="subtitle1">Free Shipping</Typography>
            <Typography variant="body2">On all orders over $499</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: "center", borderRadius: "10px" }}>
            <ReplayIcon fontSize="large" color="primary" />
            <Typography variant="subtitle1">30-Day Returns</Typography>
            <Typography variant="body2">If goods have problems</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: "center", borderRadius: "10px" }}>
            <LockIcon fontSize="large" color="primary" />
            <Typography variant="subtitle1">Secure Payment</Typography>
            <Typography variant="body2">100% secure payment</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: "center", borderRadius: "10px" }}>
            <PhoneIcon fontSize="large" color="primary" />
            <Typography variant="subtitle1">Call Now</Typography>
            <Typography variant="body2">{phone}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
    </>)} </>
  );
};

export default TermsView;