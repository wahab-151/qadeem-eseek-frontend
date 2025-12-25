import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedVideo: null,
  isVideoModalOpen: false,
  videoFilters: {
    search: "",
    category: "",
    isActive: null,
    sortBy: "order",
    sortOrder: "asc",
  },
  videoPagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setSelectedVideo: (state, action) => {
      state.selectedVideo = action.payload;
    },
    setVideoModalOpen: (state, action) => {
      state.isVideoModalOpen = action.payload;
    },
    setVideoFilters: (state, action) => {
      state.videoFilters = { ...state.videoFilters, ...action.payload };
    },
    setVideoPagination: (state, action) => {
      state.videoPagination = { ...state.videoPagination, ...action.payload };
    },
    clearVideoFilters: (state) => {
      state.videoFilters = initialState.videoFilters;
    },
    resetVideoState: (state) => {
      return initialState;
    },
  },
});

export const {
  setSelectedVideo,
  setVideoModalOpen,
  setVideoFilters,
  setVideoPagination,
  clearVideoFilters,
  resetVideoState,
} = videoSlice.actions;

export default videoSlice.reducer;
