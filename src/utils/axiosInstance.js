import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MockEndPoints } from "__server__";
import NProgress from "nprogress";


// Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL || "http://localhost:5000",

// Axios configuration options here
});

// Track active requests globally (client only)
if (typeof window !== "undefined") {
  if (typeof window.__axiosActiveRequests !== "number") window.__axiosActiveRequests = 0;
}

const startProgressIfNeeded = () => {
  if (typeof window === "undefined") return;
  if (NProgress.status == null) NProgress.start();
};

const finishProgressIfIdle = () => {
  if (typeof window === "undefined") return;
  const active = window.__axiosActiveRequests || 0;
  if (active <= 0) NProgress.done(true);
};

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      window.__axiosActiveRequests = (window.__axiosActiveRequests || 0) + 1;
    }
    startProgressIfNeeded();
    return config;
  },
  (error) => {
    if (typeof window !== "undefined") {
      window.__axiosActiveRequests = Math.max((window.__axiosActiveRequests || 1) - 1, 0);
    }
    NProgress.done(true);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (typeof window !== "undefined") {
      window.__axiosActiveRequests = Math.max((window.__axiosActiveRequests || 1) - 1, 0);
    }
    finishProgressIfIdle();
    return response;
  },
  (error) => {
    if (typeof window !== "undefined") {
      window.__axiosActiveRequests = Math.max((window.__axiosActiveRequests || 1) - 1, 0);
    }
    // Finish on API failure
    NProgress.done(true);
    return Promise.reject(error);
  }
);


// Remove following 2 lines if you don't want to use MockAdapter
export const Mock = new MockAdapter(axiosInstance);
MockEndPoints(Mock);
export default axiosInstance;