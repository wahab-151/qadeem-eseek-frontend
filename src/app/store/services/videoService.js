// Video Service for RTK Query

export const getAllVideos = (build) => {
  return build.query({
    query: ({ 
      search, 
      page, 
      limit, 
      sortBy, 
      sortOrder, 
      category,
      isActive 
    } = {}) => {
      const params = {};
      
      if (search) params.search = search;
      if (page) params.page = page;
      if (limit) params.limit = limit;
      if (sortBy) params.sortBy = sortBy;
      if (sortOrder) params.sortOrder = sortOrder;
      if (category) params.category = category;
      if (isActive !== undefined) params.isActive = isActive;
      
      return {
        url: `/api/videos`,
        method: "GET",
        params,
      };
    },
    providesTags: ["Videos"],
  });
};

export const getVideoById = (build) => {
  return build.query({
    query: (id) => ({
      url: `/api/videos/${id}`,
      method: "GET",
    }),
    providesTags: (result, error, id) => [{ type: "Videos", id }],
  });
};

export const createVideo = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: "/api/videos",
      method: "POST",
      body: payload,
    }),
    transformResponse: (response) => {
      if (response?.success) {
        return response.data;
      }
      throw new Error(response?.message || "Failed to create video");
    },
    invalidatesTags: ["Videos"],
  });
};

export const updateVideo = (build) => {
  return build.mutation({
    query: ({ id, ...payload }) => ({
      url: `/api/videos/${id}`,
      method: "PUT",
      body: payload,
    }),
    transformResponse: (response) => {
      if (response?.success) {
        return response.data;
      }
      throw new Error(response?.message || "Failed to update video");
    },
    invalidatesTags: (result, error, { id }) => [
      { type: "Videos", id },
      "Videos"
    ],
  });
};

export const deleteVideo = (build) => {
  return build.mutation({
    query: (id) => ({
      url: `/api/videos/${id}`,
      method: "DELETE",
    }),
    transformResponse: (response) => {
      if (response?.success) {
        return response.data;
      }
      throw new Error(response?.message || "Failed to delete video");
    },
    invalidatesTags: (result, error, id) => [
      { type: "Videos", id },
      "Videos"
    ],
  });
};

export const updateVideoOrder = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: "/api/videos/order",
      method: "PUT",
      body: payload,
    }),
    transformResponse: (response) => {
      if (response?.success) {
        return response.data;
      }
      throw new Error(response?.message || "Failed to update video order");
    },
    invalidatesTags: ["Videos"],
  });
};

export const toggleVideoStatus = (build) => {
  return build.mutation({
    query: ({ id, isActive }) => ({
      url: `/api/videos/${id}/toggle-status`,
      method: "PATCH",
      body: { isActive },
    }),
    transformResponse: (response) => {
      if (response?.success) {
        return response.data;
      }
      throw new Error(response?.message || "Failed to toggle video status");
    },
    invalidatesTags: (result, error, { id }) => [
      { type: "Videos", id },
      "Videos"
    ],
  });
};

// Get videos for public display (homepage)
export const getPublicVideos = (build) => {
  return build.query({
    query: ({ limit = 2, category } = {}) => {
      const params = { limit };
      if (category) params.category = category;
      
      return {
        url: `/api/videos/public`,
        method: "GET",
        params,
      };
    },
    providesTags: ["PublicVideos"],
  });
};

// Increment video views
export const incrementVideoViews = (build) => {
  return build.mutation({
    query: (id) => ({
      url: `/api/videos/${id}/view`,
      method: "POST",
    }),
    invalidatesTags: (result, error, id) => [
      { type: "Videos", id },
      "PublicVideos"
    ],
  });
};
