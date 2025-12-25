



export const getWebsiteInfo = (build) => {
  return build.query({
    query: (search = "") => ({
      url: `/api/webInfo/`,
      method: "GET",
    }),
  });
};



export const updateWebsiteInfo = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: "/api/webInfo/",
      method: "POST",
      body: payload,
    }),
  });
};


