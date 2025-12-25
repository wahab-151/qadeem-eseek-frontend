import { cache } from "react";
import axios from "../axiosInstance";

// CUSTOM DATA MODEL

const getLayoutData = cache(async () => {
  // const response = await axios.get("/api/layout");
  // return response.data;
  return {}; // Return empty object to prevent blocking
});
const layoutApi = {
  getLayoutData
};

export default layoutApi;