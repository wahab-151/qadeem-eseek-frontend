import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import {
  setSelectedVideo,
  setVideoModalOpen,
  setVideoFilters,
  setVideoPagination,
  clearVideoFilters,
} from "app/store/slices/videoSlice";

export const useVideoManagement = () => {
  const dispatch = useDispatch();
  const videoState = useSelector((state) => state.video);

  const selectVideo = useCallback((video) => {
    dispatch(setSelectedVideo(video));
  }, [dispatch]);

  const openVideoModal = useCallback((video = null) => {
    if (video) {
      dispatch(setSelectedVideo(video));
    }
    dispatch(setVideoModalOpen(true));
  }, [dispatch]);

  const closeVideoModal = useCallback(() => {
    dispatch(setVideoModalOpen(false));
    dispatch(setSelectedVideo(null));
  }, [dispatch]);

  const updateFilters = useCallback((filters) => {
    dispatch(setVideoFilters(filters));
  }, [dispatch]);

  const updatePagination = useCallback((pagination) => {
    dispatch(setVideoPagination(pagination));
  }, [dispatch]);

  const clearFilters = useCallback(() => {
    dispatch(clearVideoFilters());
  }, [dispatch]);

  return {
    // State
    selectedVideo: videoState.selectedVideo,
    isVideoModalOpen: videoState.isVideoModalOpen,
    videoFilters: videoState.videoFilters,
    videoPagination: videoState.videoPagination,
    
    // Actions
    selectVideo,
    openVideoModal,
    closeVideoModal,
    updateFilters,
    updatePagination,
    clearFilters,
  };
};
