import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("auth-token");
    if (token) {
      // Backend expects x-access-token; keep Authorization if any consumers rely on it
      config.headers["x-access-token"] = token;
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const videoAPI = {
  // Get all videos
  getVideos: async () => {
    try {
      const response = await api.get("/admin/videos");
      return response.data;
    } catch (error) {
      console.error("Error fetching videos:", error);
      throw error;
    }
  },

  // Get video by ID
  getVideoById: async (id) => {
    try {
      const response = await api.get(`/admin/videos/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching video:", error);
      throw error;
    }
  },

  // Create new video
  createVideo: async (videoData) => {
    try {
      const response = await api.post("/admin/videos", videoData);
      return response.data;
    } catch (error) {
      console.error("Error creating video:", error);
      throw error;
    }
  },

  // Update video
  updateVideo: async (id, videoData) => {
    try {
      const response = await api.put(`/admin/videos/${id}`, videoData);
      return response.data;
    } catch (error) {
      console.error("Error updating video:", error);
      throw error;
    }
  },

  // Delete video
  deleteVideo: async (id) => {
    try {
      const response = await api.delete(`/admin/videos/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting video:", error);
      throw error;
    }
  },

  // Update video order/position
  updateVideoOrder: async (videoIds) => {
    try {
      const response = await api.put("/admin/videos/order", { videoIds });
      return response.data;
    } catch (error) {
      console.error("Error updating video order:", error);
      throw error;
    }
  },
};

export default videoAPI;
