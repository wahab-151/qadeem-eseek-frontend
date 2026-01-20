import { cache } from "react";
import axios from "utils/axiosInstance";
const getFeaturedCategories = cache(async () => {
  const response = await axios.get("/api/categories");
  return response.data;
});
const getMostViewedList = cache(async () => {
  const response = await axios.get("/api/home/products?tag=most-viewed");
  return response.data;
});
const getSaleBanner = cache(async () => {
  const response = await axios.get("/api/home/sale-banners");
  return response.data;
});
const getBlogLists = cache(async () => {
  const response = await axios.get("/api/home/blog-lists");
  return response.data;
});
const getTopPicksList = cache(async () => {
  const response = await axios.get("/api/home/products?tag=top-picks");
  return response.data;
});
const getTestimonials = cache(async () => {
  const response = await axios.get("/api/home/testimonials");
  return response.data;
});
const homeApi = {
  getBlogLists,
  getSaleBanner,
  getTopPicksList,
  getMostViewedList,
  getFeaturedCategories,
  getTestimonials
};

export default homeApi;