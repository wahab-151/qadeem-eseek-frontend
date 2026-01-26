'use client';

import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  CircularProgress,
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReplayIcon from '@mui/icons-material/Replay';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import useWebsiteInfo from 'hooks/useWebsiteInfo';
import { useEffect, useState } from 'react';

const AboutUsView = ({ content }) => {
  const { state: websiteInfo } = useWebsiteInfo();

  const phone = websiteInfo?.contact?.phone || '(000) 000-0000';
  const termsHTML = websiteInfo?.aboutUs?.html;
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
      <Box flexGrow={1} display="flex" justifyContent="center" alignItems="center"><CircularProgress size={24}/></Box>
    ) : 
      <>
      <Box sx={{ px: 4, py: 6, maxWidth: '1200px', mx: 'auto' }}>
        <Typography variant="h4" color="primary" gutterBottom fontWeight="bold">
          About QADEEM
        </Typography>

        <Box
          sx={{
            '& h1, & h2, & h3, & h4, & h5, & h6': {
              color: 'secondary.main',
              fontWeight: 'bold',
              mt: 3,
              mb: 2,
            },
            '& p': {
              mb: 2,
              color: 'text.primary',
             fontSize: '1rem',
              lineHeight: 1.6,
            },
            '& ul': {
              pl: 3,
              mb: 2,
            },
            '& li': {
              mb: 1,
              fontSize: '0.95rem',
              color: 'text.secondary',
            },
            '& strong': {
              fontWeight: 'bold',
            },
            '& a': {
              color: 'primary.main',
              textDecoration: 'underline',
            },
          }}
          dangerouslySetInnerHTML={{ __html: termsHTML }}
        />
      </Box>
  <Divider sx={{ mb: 4, mx: 'auto', maxWidth: '1200px' }} />

      <Box sx={{ px: 4, maxWidth: '1200px', mx: 'auto' }}>
        <Typography variant="h5" fontWeight="bold" color="secondary" gutterBottom>
          Visit Our Mobile Parts & Accessories Store
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOnIcon sx={{ mr: 1 }} color="primary" />
          <Typography>{websiteInfo?.contact?.address}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <PhoneIcon sx={{ mr: 1 }} color="primary" />
          <Typography>{phone}</Typography>
        </Box>
      </Box>
       <Divider sx={{ mb: 4, mx: 'auto', maxWidth: '1200px' }} />
      <Grid container spacing={2} sx={{ mb: 4, px: 4, maxWidth: '1200px', mx: 'auto' }}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', borderRadius: '10px' }}>
            <LocalShippingIcon fontSize="large" color="primary" />
            <Typography variant="subtitle1">Free Shipping</Typography>
            <Typography variant="body2">On all orders over $499</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', borderRadius: '10px' }}>
            <ReplayIcon fontSize="large" color="primary" />
            <Typography variant="subtitle1">30-Day Returns</Typography>
            <Typography variant="body2">If goods have problems</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', borderRadius: '10px' }}>
            <LockIcon fontSize="large" color="primary" />
            <Typography variant="subtitle1">Secure Payment</Typography>
            <Typography variant="body2">100% secure payment</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', borderRadius: '10px' }}>
            <PhoneIcon fontSize="large" color="primary" />
            <Typography variant="subtitle1">Call Now</Typography>
            <Typography variant="body2">{phone}</Typography>
          </Paper>
        </Grid>
      </Grid>

    </> }
    </>
  );
};

export default AboutUsView;
