'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { TextField, Button, InputAdornment, IconButton, Typography, Stack } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { enqueueSnackbar } from 'notistack';
import { useUserChangePasswordMutation } from 'app/store/services';
import { LoadingButton } from '@mui/lab';



const validationSchema = yup.object({
  newPassword: yup
    .string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Must contain an uppercase letter')
    .matches(/[a-z]/, 'Must contain a lowercase letter')
    .matches(/[0-9]/, 'Must contain a number'),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your password'),
});

export default function ChangePasswordForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const otp = searchParams.get('otp') || '';
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);



  
     const [changePasswordHandler, { isLoading, error }] = useUserChangePasswordMutation();

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    register,
  } = methods;

  const onSubmit = async (values) => {
    const payload = {
      email,
      otp,
      newPassword: values.newPassword,
    };

    try {
     
     const res= await changePasswordHandler(payload);
      console.log('Submitting payload:', res);
        if (res?.data?.success === true){
        enqueueSnackbar("Password changed successfully", { variant: "success" });
        // Start loader on navigation to login
        try {
          if (typeof window !== 'undefined' && window.NProgress) {
            window.__navTriggerType = 'change-password-success';
            window.__isNavigatingRef && (window.__isNavigatingRef.current = true);
            window.__startTimeRef && (window.__startTimeRef.current = Date.now());
            window.NProgress.start();
          }
        } catch {}
         router.push('/login');
        }else enqueueSnackbar(res.error?.data?.message, { variant: "error" });
    
     
    } catch (error) {
      enqueueSnackbar(error?.message || 'Failed to change password', {
        variant: 'error',
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-4">
       <Typography
               variant="h3"
               sx={{
                 mb: 3,
                 textAlign: "center",
               }}
             >Change Password</Typography>
 <Stack spacing={2}>
        <TextField
          label="New Password"
          fullWidth
          type={showPassword ? 'text' : 'password'}
          {...register('newPassword')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Confirm New Password"
          fullWidth
          type={showPassword ? 'text' : 'password'}
          {...register('confirmNewPassword')}
        />
 <LoadingButton
            fullWidth
            type="submit"
            color="primary"
            variant="contained"
            loading={isSubmitting}
          >
           Change Password
          </LoadingButton>
      
        </Stack>
      </form>
    </FormProvider>
  );
}
