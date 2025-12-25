


//get all categories with childs
// export const listAllCategories = (build) => {
//   return build.query({
//     query: (search = "") => ({
//       url: `/api/categories/all?search=${search}`,
//       method: "GET",
//     }),
//   });
// };




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
