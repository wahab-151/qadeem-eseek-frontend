


//get all categories with childs
// export const listAllCategories = (build) => {
//   return build.query({
//     query: (search = "") => ({
//       url: `/api/categories/all?search=${search}`,
//       method: "GET",
//     }),
//   });
// };

// Get paginated categories with search for public listing page
export const getCategoriesPaginated = (build) => {
  return build.query({
    query: ({ page = 1, limit = 12, search = "", level = 1, sortBy = "displayOrder", sortOrder = "asc" } = {}) => ({
      url: `/api/categories/paginated?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}&level=${level}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
      method: "GET",
    }),
    providesTags: (result) =>
      result?.data?.categories
        ? [
            ...result.data.categories.map(({ _id }) => ({ type: "Categories", id: _id })),
            { type: "Categories", id: "LIST" },
          ]
        : [{ type: "Categories", id: "LIST" }],
  });
};


export const addSubCategory = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: "/api/products/addsubcategory",
      method: "POST",
      body: payload,
    }),
    invalidatesTags: [{ type: "Categories", id: "LIST" }],
  });
};
export const addCategory = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: "/api/categories",
      method: "POST",
      body: payload,
    }),
    invalidatesTags: [{ type: "Categories", id: "LIST" }],
  });
};
export const updateCategory = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: "/api/categories",
      method: "PUT",
      body: payload,
    }),
    invalidatesTags: (result, error, arg) => [
      { type: "Categories", id: "LIST" },
      ...(arg?.id ? [{ type: "Categories", id: arg.id }] : []),
    ],
  });
};
export const deleteCategory = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: "/api/categories",
      method: "DELETE",
      body: payload,
    }),
    invalidatesTags: (result, error, arg) => [
      { type: "Categories", id: "LIST" },
      ...(arg?.id ? [{ type: "Categories", id: arg.id }] : []),
    ],
  });
};
