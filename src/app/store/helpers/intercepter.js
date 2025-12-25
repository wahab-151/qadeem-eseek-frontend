

import axios from "axios";
import i18n from "i18next";
import { USERTYPE_FRANCHISE } from "utils/constants";
import { getSession } from "next-auth/react";
import NProgress from "nprogress";
import { handleUnauthorizedLogout } from "utils/helpers";

// Track if we're already handling a 401 to prevent multiple redirects
let isHandling401 = false;

export const axiosBaseQuery =
  () =>
    async ({
      url = "",
      method = "GET",
      body = null,
      params,
      AxiosHeaders = {},
      ResponseType = "json",
    } = {}) => {
      // Define BASE_URL outside try-catch so it's accessible in both blocks
      const BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL || 'http://localhost:5000';
      
      try {
        if (typeof window !== "undefined") {
          window.__axiosActiveRequests = (window.__axiosActiveRequests || 0) + 1;
          if (NProgress.status == null) NProgress.start();
        }

        let token = localStorage.getItem("auth-token") || "";
        let role = localStorage.getItem("auth-user-role") || USERTYPE_FRANCHISE; // default role

        if (typeof window !== "undefined") {
          // Try to get token with retry logic for timing issues
          token = localStorage.getItem("auth-token") || "";
          role = localStorage.getItem("auth-user-role") || USERTYPE_FRANCHISE;
          
          // If token is empty but we're making an authenticated request, wait briefly and retry
          if (!token && (url.includes("/api/cart") || url.includes("/api/users") || url.includes("/api/orders") || url.includes("/api/tags") || url.includes("/api/videos") || url.includes("/api/products/admin") || url.includes("/api/categories/admin"))) {
            // Wait 50ms and try again - this handles race conditions during login
            await new Promise(resolve => setTimeout(resolve, 50));
            token = localStorage.getItem("auth-token") || "";
          }
        }

        const fullUrl = `${BASE_URL}${url}`;
        
        const result = await axios({
          url: fullUrl,
          method,
          data: body,
          params,
          headers: {
            "x-access-token": token,
            "x-user-role": role,
            "Accept-Language": i18n?.language || "en",
            ...AxiosHeaders,
          },
          responseType: ResponseType,
          // Add timeout and performance optimizations
          timeout: 30000, // 30 second timeout
          maxRedirects: 3,
          // Enable request/response compression
          decompress: true,
        });

        return { data: result.data };
      } catch (error) {
        // Enhanced error logging with request details
        const fullUrl = `${BASE_URL}${url}`;
        const isNetworkError = error?.code === 'ERR_NETWORK' || error?.message === 'Network Error';
        
        if (isNetworkError) {
          console.error(":fire: axiosBaseQuery Network Error:", {
            message: error.message,
            code: error.code,
            url: fullUrl,
            method: method,
            baseUrl: BASE_URL,
            endpoint: url,
            timestamp: new Date().toISOString(),
          });
          console.error(":fire: Possible causes:", {
            serverNotRunning: "Backend server may not be running",
            wrongUrl: `Check if BASE_URL (${BASE_URL}) is correct`,
            corsIssue: "Check CORS configuration on backend",
            networkIssue: "Check network connectivity",
          });
        } else {
          console.error(":fire: axiosBaseQuery caught error:", {
            error,
            url: fullUrl,
            method: method,
            statusCode: error?.response?.status,
            errorData: error?.response?.data,
          });
        }
        
        const statusCode = error?.response?.status || (isNetworkError ? 0 : 500);
        const errorData = error?.response?.data || error.message || "Unknown error";
        
        // Don't handle 401 for network errors - they're connectivity issues, not auth issues
        // Handle 401 Unauthorized - Only auto-logout for token expiration/invalid token
        if (statusCode === 401 && !isNetworkError && typeof window !== "undefined") {
          // Extract error message from response
          const errorMessage = errorData?.message || errorData?.error || (typeof errorData === 'string' ? errorData : '');
          const errorMessageLower = typeof errorMessage === 'string' ? errorMessage.toLowerCase() : '';
          
          // Debug logging
          console.log('[axiosBaseQuery] 401 Error Details:', {
            statusCode,
            errorData,
            errorMessage,
            errorMessageLower,
            url: fullUrl,
            isHandling401,
          });
          
          // Check if it's a token-related error (expired/invalid token)
          // Be more lenient - if message contains token/auth keywords OR if no specific message (default to token issue)
          const hasTokenErrorMessage = errorMessageLower && errorMessageLower.length > 0;
          const isTokenExpired = 
            !hasTokenErrorMessage || // If no error message, assume token issue
            errorMessageLower.includes('token expired') || 
            errorMessageLower.includes('your token expired') ||
            errorMessageLower.includes('invalid token') ||
            errorMessageLower.includes('authentication failed') ||
            errorMessageLower.includes('authentication token missing') ||
            errorMessageLower.includes('unauthorized');
          
          // Check if it's an account verification issue (should NOT auto-logout)
          const isAccountVerificationIssue = 
            errorMessageLower.includes('account not verified') ||
            errorMessageLower.includes('admin approval') ||
            errorMessageLower.includes('wait for admin');
          
          console.log('[axiosBaseQuery] 401 Analysis:', {
            isTokenExpired,
            isAccountVerificationIssue,
            isHandling401,
            willAutoLogout: isTokenExpired && !isAccountVerificationIssue && !isHandling401,
          });
          
          // Only auto-logout if it's a token-related error AND not an account verification issue
          // If it's a 401 and not an account verification issue, treat it as token expiration
          if (isTokenExpired && !isAccountVerificationIssue && !isHandling401) {
            // Check if this is during initial page load (first few seconds)
            // Delay auto-logout slightly to allow initial queries to complete
            const isInitialLoad = typeof window !== 'undefined' && 
                                 (!window.__pageLoadTime || (Date.now() - window.__pageLoadTime) < 2000);
            
            if (isInitialLoad && !window.__pageLoadTime) {
              window.__pageLoadTime = Date.now();
            }
            
            isHandling401 = true;
            console.log('[axiosBaseQuery] 401 detected - Token expired/invalid. Auto-logging out...', {
              url: fullUrl,
              isInitialLoad,
            });
            
            // Clear progress bar
            if (window.__axiosActiveRequests) {
              window.__axiosActiveRequests = 0;
            }
            NProgress.done(true);
            
            // Use setTimeout to allow error to propagate first, then logout
            // Delay longer on initial load to allow queries to start
            const logoutDelay = isInitialLoad ? 500 : 100;
            
            setTimeout(() => {
              console.log('[axiosBaseQuery] Calling handleUnauthorizedLogout...');
              handleUnauthorizedLogout();
              // Reset flag after a delay to allow for redirect
              setTimeout(() => {
                isHandling401 = false;
                console.log('[axiosBaseQuery] Reset isHandling401 flag');
              }, 2000);
            }, logoutDelay);
          } else if (isAccountVerificationIssue) {
            // Log but don't auto-logout for account verification issues
            console.log('[axiosBaseQuery] 401 detected - Account verification issue. Not auto-logging out.');
          } else if (isHandling401) {
            console.log('[axiosBaseQuery] 401 detected but already handling logout, skipping...');
          } else {
            console.warn('[axiosBaseQuery] 401 detected but not recognized as token expiration. Error message:', errorMessage);
          }
        }
        
        return {
          error: {
            status: statusCode,
            data: errorData,
          },
        };
      } finally {
        if (typeof window !== "undefined") {
          window.__axiosActiveRequests = Math.max((window.__axiosActiveRequests || 1) - 1, 0);
          if ((window.__axiosActiveRequests || 0) <= 0) {
            NProgress.done(true);
          }
        }
      }
    };


