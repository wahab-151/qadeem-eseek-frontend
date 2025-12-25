
// export const getUserCart = (build) => {
//   return build.query({
//     query: (search = "") => ({
//       url: `/api/cart?${search}`,
//       method: "GET",
//     }),
//   });
// };

export const getUserCart = (build) => {
  return build.query({
    query: (params = {}) => {
      const searchParams = new URLSearchParams(params).toString();
      return {
        url: `/api/cart${searchParams ? `?${searchParams}` : ""}`,
        method: "GET",
      };
    },
  });
};




export const addToCart = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: "/api/cart/add",
      method: "POST",
      body: payload,
    }),
  });
};



export const clearCart = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: "/api/cart/clear",
      method: "POST",
      body: payload,
    }),
  });
};

export const updateCart = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: "/api/cart/update",
      method: "PUT",
      body: {
        items: payload,
      }
    }),
  });
};


export const RemoveItemFromCart = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: "/api/cart/clear",
      method: "POST",
      body: payload,
    }),
  });
};