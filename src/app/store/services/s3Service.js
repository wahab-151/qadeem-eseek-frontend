export const uploadImage = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: "/api/s3/upload",
      method: "POST",
      body: payload,
    }),
  });
};

export const deleteImage = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: "/api/s3/delete",
      method: "DELETE",
      body: payload,
    }),
  });
};

export const deleteImageCompletely = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: "/api/s3/delete-completely",
      method: "DELETE",
      body: payload,
    }),
  });
};