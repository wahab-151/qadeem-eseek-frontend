

export const approveCustomer = (build) => {
    return build.mutation({
      query: (payload) => ({
        url: "/api/users/approve",
        method: "PUT",
        body: payload,
      }),
    });
  };


  export const rejectCustomer = (build) => {
    return build.mutation({
      query: (payload) => ({
        url: "/api/users/reject",
        method: "PUT",
        body: payload,
      }),
    });
  };



  export const updateUserType = (build) => {
    return build.mutation({
      query: (payload) => ({
        url: "/api/users/update/role",
        method: "PUT",
        body: payload,
      }),
    });
  }



  
export const getAllCustomers = (build) => {
  return build.query({
    query: (params = {}) => {
      const queryString = new URLSearchParams(params).toString();
      return {
        url: `/api/users/all?${queryString}`,
        method: "GET",
      };
    },
  });
};


export const getUserPaymentMethod = (build) => {
  return build.query({
    query: () => ({
      url: "/api/users/payment-methods",
      method: "GET",
    }),
  });
};

export const assignCustomerToSalesPerson = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: "/api/users/assign-customer",
      method: "POST",
      body: payload,
    }),
  });
};

export const getSalesPersons = (build) => {
  return build.query({
    query: () => ({
      url: "/api/users/sales-persons",
      method: "GET",
    }),
  });
};