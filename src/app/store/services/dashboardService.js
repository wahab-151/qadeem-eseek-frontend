// Dashboard API Service
export const getDashboardStats = (build) => {
  return build.query({
    query: () => ({
      url: "/api/dashboard/stats",
      method: "GET",
    }),
    providesTags: ["DashboardStats"],
    keepUnusedDataFor: 300, // Cache for 5 minutes
  });
};

export const getRecentOrders = (build) => {
  return build.query({
    query: ({ page = 1, limit = 10 } = {}) => ({
      url: `/api/dashboard/orders?page=${page}&limit=${limit}`,
      method: "GET",
    }),
    providesTags: ["RecentOrders"],
    keepUnusedDataFor: 60, // Cache for 1 minute
  });
};

export const getReturnReplaceRequests = (build) => {
  return build.query({
    query: ({ page = 1, limit = 10 } = {}) => ({
      url: `/api/dashboard/requests?page=${page}&limit=${limit}`,
      method: "GET",
    }),
    providesTags: ["ReturnReplaceRequests"],
    keepUnusedDataFor: 60, // Cache for 1 minute
  });
};

export const getUsersProductOrders = (build) => {
  return build.query({
    query: ({ page = 1, limit = 10 } = {}) => ({
      url: `/api/dashboard/users-orders?page=${page}&limit=${limit}`,
      method: "GET",
    }),
    providesTags: ["UsersProductOrders"],
    keepUnusedDataFor: 300, // Cache for 5 minutes
  });
};

export const getProductSellingRanking = (build) => {
  return build.query({
    query: ({ page = 1, limit = 10 } = {}) => ({
      url: `/api/dashboard/product-ranking?page=${page}&limit=${limit}`,
      method: "GET",
    }),
    providesTags: ["ProductSellingRanking"],
    keepUnusedDataFor: 300, // Cache for 5 minutes
  });
};

export const getLowStockProducts = (build) => {
  return build.query({
    query: ({ page = 1, limit = 10, threshold = 10 } = {}) => ({
      url: `/api/dashboard/low-stock-products?page=${page}&limit=${limit}&threshold=${threshold}`,
      method: "GET",
    }),
    providesTags: ["LowStockProducts"],
    keepUnusedDataFor: 60, // Cache for 1 minute
  });
};

// Salesperson: customers assigned
export const getSalespersonCustomers = (build) => {
  return build.query({
    query: ({ page = 1, limit = 10, search = '' } = {}) => ({
      url: `/api/dashboard/salesperson/customers?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
      method: "GET",
    }),
    providesTags: ["SalespersonCustomers"],
    keepUnusedDataFor: 60,
  });
};

// Salesperson: orders grouped by user
export const getSalespersonOrdersByUser = (build) => {
  return build.query({
    query: ({ page = 1, limit = 10 } = {}) => ({
      url: `/api/dashboard/salesperson/orders-by-user?page=${page}&limit=${limit}`,
      method: "GET",
    }),
    providesTags: ["SalespersonOrdersByUser"],
    keepUnusedDataFor: 60,
  });
};
