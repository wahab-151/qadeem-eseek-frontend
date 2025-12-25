// Notify service for restock notifications

export const subscribeRestock = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: "/api/notify/subscribe",
      method: "POST",
      body: payload,
    }),
  });
};
