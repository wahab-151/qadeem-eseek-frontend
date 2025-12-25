import { cache } from "react";
import axios from "utils/axiosInstance";
const getAllProductReviews = cache(async () => {
  const response = await axios.get("/api/vendor/product-reviews");
  return response.data;
});
const getAllRefundRequests = cache(async () => {
  const response = await axios.get("/api/vendor/refund-requests");
  return response.data;
});
const getAllPayoutRequests = cache(async () => {
  const response = await axios.get("/api/vendor/payout-requests");
  return response.data;
});
const vendorApi = {
  getAllProductReviews,
  getAllRefundRequests,
  getAllPayoutRequests
};

export default vendorApi;