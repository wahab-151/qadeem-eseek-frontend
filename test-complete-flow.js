import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create a test API instance
const testApi = createApi({
  reducerPath: 'testApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers, { getState }) => {
      // Add auth headers
      headers.set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODI3NWZhYzRhZTU4YTExOGM2NDI4MjgiLCJmaXJzdE5hbWUiOiJBZG1pbiIsImxhc3ROYW1lIjoiIiwiZW1haWwiOiJlc2Vla2dvdXNhQGdtYWlsLmNvbSIsInBob25lIjoiKzkyMzAwMTIzNDU2NyIsImNvbXBhbnlOYW1lIjoiQmFpZyBFbnRlcnByaXNlcyIsInBvc3RhbENvZGUiOiIxNTEwMCIsImFkZHJlc3NMaW5lMSI6IkhvdXNlICMxMjMsIE1haW4gU3RyZWV0IiwiYWRkcmVzc0xpbmUyIjoiTmVhciBHaWxnaXQgUml2ZXIiLCJjaXR5IjoiR2lsZ2l0Iiwic3RhdGUiOiJHaWxnaXQtQmFsdGlzdGFuIiwiYnVzaW5lc3NUeXBlIjoiUmV0YWlsIiwicm9sZSI6IkFkbWluIiwiYnVzaW5lc3NMaWNlbnNlVXJsIjoiaHR0cHM6Ly9leGFtcGxlLmNvbS9saWNlbnNlcy93YWhhYi1saWNlbnNlLnBkZiIsImFncmVlVGVybXNBbmRDb25kaXRpb25zIjp0cnVlLCJ2ZXJmaWVkIjoiYXBwcm92ZWQiLCJpYXQiOjE3NTkyNTkyNTMsImV4cCI6MTc1OTg2NDA1M30.SK4D1sdgk-oRJIqbcb2pxYuyjuBEzWZhjq_OQubvsbA');
      headers.set('x-user-role', 'Admin');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Product endpoints
    getProducts: builder.query({
      query: (params = {}) => ({
        url: '/products',
        method: 'GET',
        params,
      }),
    }),
    getMostSoldProducts: builder.query({
      query: () => ({
        url: '/products',
        method: 'GET',
        params: { mostSold: true, limit: 10 },
      }),
    }),
    getMostPopularProducts: builder.query({
      query: () => ({
        url: '/products',
        method: 'GET',
        params: { mostPopular: true, limit: 10 },
      }),
    }),
    searchProducts: builder.query({
      query: (searchTerm) => ({
        url: '/products',
        method: 'GET',
        params: { search: searchTerm },
      }),
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
    }),
    updateProduct: builder.mutation({
      query: (payload) => ({
        url: '/products',
        method: 'PUT',
        body: payload,
      }),
    }),
    exportProductsCsv: builder.mutation({
      query: ({ categoryId, tag } = {}) => {
        const params = {};
        if (categoryId) params.categoryId = categoryId;
        if (tag) params.tag = tag;
        return {
          url: '/products/export',
          method: 'GET',
          params,
        };
      },
    }),
    bulkUploadProducts: builder.mutation({
      query: (formData) => ({
        url: '/products/bulk-upload',
        method: 'POST',
        body: formData,
      }),
    }),
    
    // Cart endpoints
    getCart: builder.query({
      query: () => ({
        url: '/cart',
        method: 'GET',
      }),
    }),
    addToCart: builder.mutation({
      query: (payload) => ({
        url: '/cart/add',
        method: 'POST',
        body: payload,
      }),
    }),
    updateCart: builder.mutation({
      query: (payload) => ({
        url: '/cart/update',
        method: 'PUT',
        body: payload,
      }),
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: '/cart/clear',
        method: 'POST',
      }),
    }),
    
    // Order endpoints
    getAllOrders: builder.query({
      query: () => ({
        url: '/orders',
        method: 'GET',
      }),
    }),
    placeOrder: builder.mutation({
      query: (payload) => ({
        url: '/orders',
        method: 'POST',
        body: payload,
      }),
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status, trackingId }) => ({
        url: `/orders/${orderId}`,
        method: 'PUT',
        body: { status, trackingId },
      }),
    }),
    
    // User endpoints
    getUserProfile: builder.query({
      query: () => ({
        url: '/users/profile',
        method: 'GET',
      }),
    }),
  }),
});

// Test functions
const testCompleteFlow = async () => {
  console.log('🚀 Starting Complete Flow Test...\n');
  
  try {
    // Step 1: Get most sold products
    console.log('1️⃣ Testing Most Sold Products...');
    const mostSoldResult = await testApi.endpoints.getMostSoldProducts.initiate();
    console.log('Most Sold Products:', mostSoldResult.data?.data?.products?.length || 0, 'found');
    
    // Step 2: Get most popular products
    console.log('\n2️⃣ Testing Most Popular Products...');
    const mostPopularResult = await testApi.endpoints.getMostPopularProducts.initiate();
    console.log('Most Popular Products:', mostPopularResult.data?.data?.products?.length || 0, 'found');
    
    // Step 3: Search for products
    console.log('\n3️⃣ Testing Product Search...');
    const searchResult = await testApi.endpoints.searchProducts.initiate('test');
    console.log('Search Results for "test":', searchResult.data?.data?.products?.length || 0, 'found');
    
    // Step 4: Get cart
    console.log('\n4️⃣ Testing Cart...');
    const cartResult = await testApi.endpoints.getCart.initiate();
    console.log('Cart Items:', cartResult.data?.data?.items?.length || 0);
    
    // Step 5: Get user profile
    console.log('\n5️⃣ Testing User Profile...');
    const profileResult = await testApi.endpoints.getUserProfile.initiate();
    console.log('User Profile:', profileResult.data?.data?.firstName || 'Not found');
    
    // Step 6: Get orders
    console.log('\n6️⃣ Testing Orders...');
    const ordersResult = await testApi.endpoints.getAllOrders.initiate();
    console.log('Orders:', ordersResult.data?.data?.orders?.length || 0, 'found');
    
    console.log('\n✅ Basic API tests completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
};

// Export for use
export { testApi, testCompleteFlow };

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testCompleteFlow();
}
