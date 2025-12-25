
export const getAllProductsAdmin = (build) => {
  return build.query({
    query: ({
      search,
      page,
      limit,
      sortBy,
      sortOrder,
      mostSold,
      mostPopular,
      category,
      tag
    } = {}) => {
      const params = {};

      if (search) params.search = search;
      if (page) params.page = page;
      if (limit) params.limit = limit;
      if (sortBy) params.sort = sortBy;
      if (sortOrder) params.order = sortOrder;
      if (category) params.category = category;
      if (tag) params.tag = tag;

      if (mostSold) params.mostSold = mostSold;
      if (mostPopular) params.mostPopular = mostPopular;
      return {
        url: `/api/products/admin`,
        method: "GET",
        params,
      };
    },
    serializeQueryArgs: ({ queryArgs }) => {
      const { search, page, limit, sortBy, sortOrder, mostSold, mostPopular, category, tag } = queryArgs;
      return {
        search: search || '',
        page: page || 1,
        limit: limit || 10,
        sortBy: sortBy || 'createdAt',
        sortOrder: sortOrder || 'desc',
        mostSold: mostSold || false,
        mostPopular: mostPopular || false,
        category: category || '',
        tag: tag || '',
      };
    },
  });
};

export const updateProduct = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: "/api/products",
      method: "PUT",
      body: payload,
    }),
  });
};

export const updateProductsDisplayOrder = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: "/api/products/display-order",
      method: "PATCH",
      body: payload,
    }),
  });
};

export const getCategoryProductCount = (build) => {
  return build.query({
    query: ({ categoryId, subCategoryId }) => {
      const params = new URLSearchParams();
      params.set("categoryId", categoryId);
      if (subCategoryId) {
        params.set("subCategoryId", subCategoryId);
      }
      return {
        url: `/api/products/category-count?${params.toString()}`,
        method: "GET",
      };
    },
  });
};

// export const addProduct = (build) => {
//   return build.mutation({
//     query: (payload) => ({
//       url: "/api/products",
//       method: "POST",
//       body: payload,
//     }),
//   });
// };
export const addProduct = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: "/api/products",
      method: "POST",
      body: payload,
    }),
    transformResponse: (response) => {
      if (response?.success) {
        return response.data; // This is what `.unwrap()` will return
      }
      throw new Error(response?.message || "Unknown error");
    },
  });
};

export const deleteProduct = (build) => {
  return build.mutation({
    query: (id) => ({
      url: `/api/products`,
      method: "DELETE",
      body:{"id":id}
    }),
  });
};


export const bulkUploadProducts = (build) => {
  return build.mutation({
    query: (formData) => ({
      url: "/api/products/bulk-upload",
      method: "POST",
      body: formData,
      // Let the browser set Content-Type with boundary
      headers: {},
    }),
    transformResponse: (response) => {
      if (response?.success) return response.data;
      throw new Error(response?.message || "Bulk upload failed");
    },
  });
};

export const exportProductsCsv = (build) => {
  return build.mutation({
    query: ({ categoryId, tag, search } = {}) => {
      const params = {};
      if (categoryId) params.categoryId = categoryId;
      if (tag) params.tag = tag;
      if (search) params.search = search;
      return {
        url: "/api/products/export",
        method: "GET",
        params,
        ResponseType: "blob",
      };
    },
    transformResponse: (response) => response,
  });
};

