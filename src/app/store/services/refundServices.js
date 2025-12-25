
export const getAllRequestsAdmin = (build) => {
    return build.query({
      query: (search = "") => ({
        url: `/api/requests?${search}`,
        method: "GET",
      }),
    });
  };


  export const refundOrder = (build) => {
    return build.mutation({
      query: (payload) => ({
        url: "/api/requests/refund/all",
        method: "POST",
        body: payload,
      }),
    });
  };

//refund single product request
  export const refundProduct = (build) => {
    return build.mutation({
      query: (payload) => ({
        url: "/api/requests/refund/",
        method: "POST",
        body: payload,
      }),
    });
  };


//replace single product request
    export const replacesProduct = (build) => {
    return build.mutation({
      query: (payload) => ({
        url: "/api/requests/repalce/",
        method: "POST",
        body: payload,
      }),
    });
  };
  
//refund full order request
export const acceptRefund = (build) => {
    return build.mutation({
      query: (payload) => ({
        url: `/api/requests/refund/order`,
        method: "POST",
        body: payload,
      }),
    });
  };

//reject full order request
export const rejectRefund = (build) => {
    return build.mutation({
      query: (payload) => ({
        url: `/api/requests/refund/${payload.orderId}/reject`,
        method: "POST",
        body: payload,
      }),
    });
  };


export const getRequestsById = (build) => {
    return build.query({
      query: (id) => ({
        url: `/api/requests/${id}`,
        method: "GET",
      }),
    });
  }
  
   export const acceptRequest = (build) => {
    return build.mutation({
      query: (payload) => ({
        url: "/api/requests/accept",
        method: "POST",
        body: payload,
      }),
    });
  };

     export const rejectRequest = (build) => {
    return build.mutation({
      query: (payload) => ({
        url: "/api/requests/reject",
        method: "POST",
        body: payload,
      }),
    });
  };

//   export const getUserRequests = (build) => {
//   return build.query({
//     query: ({user}) => ({
//       url: `/api/requests/customer`,
//       method: "GET",
//         // body: user
//     }),
//   });
// }

export const getUserRequests = (build) => {
  return build.query({
    query: ({ userId, page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc" }) => ({
      url: `/api/requests/customer`,
      method: "GET",
      params: {
        userId,
        page,
        limit,
        sortBy,
        sortOrder,
      },
    }),
  });
};
