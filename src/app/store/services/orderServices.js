import payments from "utils/__api__/payments";

export const getAllOrders = (build) => {
  return build.query({
    query: (params = {}) => {
      const query = new URLSearchParams();

      if (params.search) query.set("search", params.search);
      if (params.page) query.set("page", params.page.toString());
      if (params.limit) query.set("limit", params.limit.toString());
      if (params.sortBy) query.set("sortBy", params.sortBy);
      if (params.sortOrder) query.set("sortOrder", params.sortOrder);

      return {
        url: `/api/orders?${query.toString()}`,
        method: "GET",
      };
    },
  });
};


export const getOrderById = (build) => {
  return build.query({
    query: (id) => ({
      url: `/api/orders/${id}`,
      method: "GET",
    }),
  });
};




export const placeOrder = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: "/api/orders/",
      method: "POST",
      body: payload,
    }),
  });
};



export const updateOrder = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: "/api/orders/",
      method: "PUT",
      body: payload,
    }),
  });
};

export const acceptOrder = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: "/api/orders/accept",
      method: "PUT",
      body: payload,
    }),
  });
};


export const updateOrderStatus = (build) => {
  return build.mutation({
    query: ({ id, payload }) => ({
      url: `/api/orders/${id}/status`,
      method: "PUT",
      body: payload,
    }),
  });
};

export const deleteOrder = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: `/api/orders/delete`,
      method: "DELETE",
      body: payload,
    }),
  });
}

export const orderTrackingId = (build) => {
  return build.mutation({
    query: ( payload) => ({
      url: `/api/orders/tracking-id`,
      method: "PUT",
      body: payload,
    }),
  });
}


