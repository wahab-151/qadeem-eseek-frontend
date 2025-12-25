export const addTag = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: "/api/tags",
      method: "POST",
      body: payload,
    }),
    invalidatesTags: ["Tags", "FeaturedTags"],
  });
};

export const getAllTags = (build) => {
  return build.query({
    query: () => ({
      url: `/api/tags`,
      method: "GET",
    }),
    providesTags: ["Tags"],
  });
};

export const getTagsAdmin = (build) => {
  return build.query({
    query: (params = {}) => ({
      url: `/api/tags/admin`,
      method: "GET",
      params,
    }),
    providesTags: ["Tags"],
    // Reduce cache time for admin tags to ensure immediate updates
    keepUnusedDataFor: 30, // 30 seconds instead of 5 minutes
  });
};

export const updateTag = (build) => {
  return build.mutation({
    query: ({ id, ...payload }) => ({
      url: `/api/tags/${id}`,
      method: "PUT",
      body: payload,
    }),
    invalidatesTags: ["Tags", "FeaturedTags", "Products", "AdminProducts"],
  });
};

export const deleteTag = (build) => {
  return build.mutation({
    query: (id) => ({
      url: `/api/tags/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["Tags", "FeaturedTags", "Products", "AdminProducts"],
  });
};

export const getFeaturedTags = (build) => {
  return build.query({
    query: (params = {}) => ({
      url: `/api/tags/featured`,
      method: "GET",
      params,
    }),
    providesTags: ["FeaturedTags"],
  });
};

