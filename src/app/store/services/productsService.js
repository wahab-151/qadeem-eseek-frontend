
// export const getAllProducts = (build) => {
//   return build.query({
//     query: ({
//       search,
//       page,
//       // limit,
//       sortBy,
//       sortOrder,
//       featured,
//       mostSold,
//       mostPopular
//     } = {}) => {
//       const params = {};

//       if (search) params.search = search;
//       if (page) params.page = page;
//       // if (limit) params.limit = limit;
//       if (sortBy) params.sortBy = sortBy;
//       if (sortOrder) params.sortOrder = sortOrder;
//       if (featured) params.featured = featured;
//       if (mostSold) params.mostSold = mostSold;
//       if (mostPopular) params.mostPopular = mostPopular;
//       // console.log("params",params)
//       return {
//         url: `/api/products`,
//         method: "GET",
//         params,
//       };
//     },
//   });
// };



export const getAllProducts = (build) => {
  return build.query({
    query: ({
      search,
      page = 1,
      sort = "createdAt",
      order = "desc",
      featured,
      mostSold,
      mostPopular,
      category,
      brand,          // can be single string or array of strings
      price,          // [min, max]
      published,
      tag,
      brands,         // array from activeFilters
      others          // array from activeFilters
    } = {}) => {
      const params = new URLSearchParams();

      if (search) params.set("search", search);
      if (page) params.set("page", page);
      if (sort) params.set("sort", sort);
      if (order) params.set("order", order);
      if (featured) params.set("featured", featured);
      if (mostSold) params.set("mostSold", mostSold);
      if (mostPopular) params.set("mostPopular", mostPopular);
      if (category) params.set("category", category);
      if (published) params.set("published", published);
      if (tag) params.set("tag", tag);

      // Handle brands from activeFilters (array)
      if (brands && Array.isArray(brands) && brands.length > 0) {
        brands.forEach((b) => params.append("brand", b));
      } else if (brand) {
        // Fallback to single brand param
        if (Array.isArray(brand)) {
          brand.forEach((b) => params.append("brand", b));
        } else {
          params.set("brand", brand);
        }
      }

      if (price?.length === 2) {
        params.set("minPrice", price[0]);
        params.set("maxPrice", price[1]);
      }

      return {
        url: `/api/products?${params.toString()}`,
        method: "GET",
      };
    },
    // RTK Query automatically deduplicates requests with identical serialized args
    // The default serialization handles object comparison properly
    keepUnusedDataFor: 60, // Keep data for 1 minute to help with deduplication
  });
};

export const getSpecialProducts = (build) => {
  return build.query({
    query: ( ) => {
      // console.log("SPECIALLLLL PRODUCTS CALLED");
      // const searchParams = new URLSearchParams(params).toString();
      return {
        url: `/api/products/special`,
        method: "GET",
      };
    },
  });
};



export const getProductById = (build) => {
  return build.query({
    query: (id) => ({
      url: `/api/products/${id}`,
      method: "GET",
    }),
    providesTags: (result, error, id) => [{ type: "Products", id }],
  });
};

// Admin Products Service with optimized caching
export const getAllProductsAdmin = (build) => {
  return build.query({
    query: ({
      search,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
      category,
      brand,
      minPrice,
      maxPrice,
      published,
      featured,
      mostSold,
      mostPopular,
      tag
    } = {}) => {
      const params = new URLSearchParams();
      
      if (search) params.set("search", search);
      if (page) params.set("page", page);
      if (limit) params.set("limit", limit);
      if (sortBy) params.set("sort", sortBy);
      if (sortOrder) params.set("order", sortOrder);
      if (category) params.set("category", category);
      if (brand) params.set("brand", brand);
      if (minPrice) params.set("minPrice", minPrice);
      if (maxPrice) params.set("maxPrice", maxPrice);
      if (published !== undefined) params.set("published", published);
      if (featured) params.set("featured", featured);
      if (mostSold) params.set("mostSold", mostSold);
      if (mostPopular) params.set("mostPopular", mostPopular);
      if (tag) params.set("tag", tag);

      return {
        url: `/api/products/admin?${params.toString()}`,
        method: "GET",
      };
    },
    providesTags: (result) => 
      result?.data?.products 
        ? [
            ...result.data.products.map(({ _id }) => ({ type: "AdminProducts", id: _id })),
            { type: "AdminProducts", id: "LIST" }
          ]
        : [{ type: "AdminProducts", id: "LIST" }],
    // Cache for 5 minutes
    keepUnusedDataFor: 300,
  });
};

// Bulk upload products
export const bulkUploadProducts = (build) => {
  return build.mutation({
    query: (formData) => ({
      url: "/api/products/bulk-upload",
      method: "POST",
      body: formData,
      AxiosHeaders: {
        "Content-Type": "multipart/form-data",
      },
    }),
    invalidatesTags: [{ type: "AdminProducts", id: "LIST" }],
  });
};

// Export products CSV
export const exportProductsCsv = (build) => {
  return build.mutation({
    query: ({ categoryId, tag, search } = {}) => {
      const params = new URLSearchParams();
      if (categoryId) params.set("categoryId", categoryId);
      if (tag) params.set("tag", tag);
      if (search) params.set("search", search);
      
      return {
        url: `/api/products/export?${params.toString()}`,
        method: "GET",
        ResponseType: "blob",
      };
    },
  });
};

// Update products display order
export const updateProductsDisplayOrder = (build) => {
  return build.mutation({
    query: (updates) => ({
      url: "/api/products/display-order",
      method: "PUT",
      body: updates,
    }),
    invalidatesTags: [{ type: "AdminProducts", id: "LIST" }],
  });
};