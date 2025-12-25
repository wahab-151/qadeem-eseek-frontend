export const getMegaMenuCategories = (build) => {

    return build.query({
        query: () => ({
            url: "/api/categories",
            method: "GET",
        }),
        providesTags: (result) => {
            if (!result?.data) return [{ type: "Categories", id: "LIST" }];
            const ids = result.data.map((c) => ({ type: "Categories", id: c._id }));
            return [{ type: "Categories", id: "LIST" }, ...ids];
        },
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
            try {
                const { data } = await queryFulfilled;
                // console.log("dissssss", data);
                // dispatch(setUserCategories(data?.categories || []));
            } catch (error) {
                console.log("Failed to fetch categories:", error.message);
                console.error("Failed to fetch categories:", error.message);
            }
        },
    });
};

export const getAdminCategories = (build) => {
    return build.query({
        query: () => ({
            url: "/api/categories/admin",
            method: "GET",
        }),
        providesTags: (result) => {
            if (!result?.data) return [{ type: "AdminCategories", id: "LIST" }];
            const ids = result.data.map((c) => ({ type: "AdminCategories", id: c._id }));
            return [{ type: "AdminCategories", id: "LIST" }, ...ids];
        },
    });
};

export const listAllCategories = (build) => {
  return build.query({
    query: ({
      search,
      page,
      limit,
      sortBy,
      sortOrder,
    } = {}) => {
      const params = {};

      if (search) params.search = search;
      if (page) params.page = page;
      if (limit) params.limit = limit;
      if (sortBy) params.sortBy = sortBy;
      if (sortOrder) params.sortOrder = sortOrder;

      return {
        url: `/api/categories/all`,
        method: "GET",
        params,
      };
    },
    providesTags: (result) => {
      if (!result?.data?.categories) return [{ type: "Categories", id: "LIST" }];
      const ids = result.data.categories.map((c) => ({ type: "Categories", id: c._id }));
      return [{ type: "Categories", id: "LIST" }, ...ids];
    },
  });
};

export const getcategoryProductCount = (build) => {
  return build.query({
    query: (search = "") => ({
      url: `/api/categories/product/count`,
      method: "GET",
    }),
  });
};


// export const getMainCategories = (build) => {
//   export const getMainCategories = (build) => {
//     query: (search = "") => ({
//       url: `/api/categories/product/count`,
//       method: "GET",
//     }),
//   });
// };