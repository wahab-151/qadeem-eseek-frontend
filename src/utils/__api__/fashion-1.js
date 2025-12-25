import { cache } from "react";
import axios from "utils/axiosInstance";
const getFlashDeals = cache(async () => {
  const response = await axios.get("/api/fashion-1/products?tag=flash");
  return response.data;
});
const getNewArrivals = cache(async () => {
  const response = await axios.get("/api/fashion-1/products?tag=new");
  return response.data;
});
const getTrendingItems = cache(async () => {
  const response = await axios.get("/api/fashion-1/products?tag=trending");
  return response.data;
});
const getServiceList = cache(async () => {
  const response = await axios.get("/api/fashion-1/service-list");
  return response.data;
});
const getHotDealList = cache(async () => {
  const response = await axios.get("/api/fashion-1/hot-deals");
  return response.data;
});
const fashion1Api = {
  getFlashDeals,
  getNewArrivals,
  getServiceList,
  getHotDealList,
  getTrendingItems
};

export default fashion1Api;