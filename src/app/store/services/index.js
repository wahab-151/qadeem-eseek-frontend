import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../helpers/intercepter";
import {
  getProfile,
  updateUserProfile,
  userChangePassword,
  userLogin,
  userResetPassword,
  userSignUp,
} from "./authService";
import {
  addCategory,
  addSubCategory,
  deleteCategory,
  updateCategory,
  getCategoriesPaginated,
} from "./adminCategoriesService";
import { deleteImage, uploadImage, deleteImageCompletely } from "./s3Service";
import {
  addBrand,
  deleteBrand,
  getAllBrands,
  updateBrand,
} from "./adminBrandService";
import {
  addProduct,
  deleteProduct,
  getAllProductsAdmin,
  updateProduct,
  bulkUploadProducts,
  exportProductsCsv,
  updateProductsDisplayOrder,
  getCategoryProductCount,
} from "./adminProductsService";
import { getMegaMenuCategories, listAllCategories, getAdminCategories } from "./categoriesService";
import {
  getAllProducts,
  getProductById,
  getSpecialProducts,
} from "./productsService";
import {
  addToCart,
  clearCart,
  getUserCart,
  RemoveItemFromCart,
  updateCart,
} from "./cartService";
import {
  acceptOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
  orderTrackingId,
  placeOrder,
  updateOrder,
  updateOrderStatus,
} from "./orderServices";
import {
  acceptRefund,
 
  acceptRequest,
 
  getAllRequestsAdmin,

  getRequestsById,

  getUserRequests,

  refundOrder,
  refundProduct,
  rejectRefund,
  rejectRequest,
  replacesProduct,
} from "./refundServices";
import {
  approveCustomer,
  assignCustomerToSalesPerson,
  getAllCustomers,
  getSalesPersons,
  getUserPaymentMethod,
  rejectCustomer,
  updateUserType,
} from "./customerService";
import { updateWebsiteInfo, getWebsiteInfo } from "./websiteInfoService";
import { addTag, getAllTags, getTagsAdmin, updateTag, deleteTag, getFeaturedTags } from "./tagsService";
import { subscribeRestock } from "./notifyService";
import { 
  getDashboardStats, 
  getRecentOrders, 
  getReturnReplaceRequests, 
  getUsersProductOrders, 
  getProductSellingRanking,
  getLowStockProducts,
  getSalespersonCustomers,
  getSalespersonOrdersByUser
} from "./dashboardService";
import {
  getAllVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
  updateVideoOrder,
  toggleVideoStatus,
  getPublicVideos,
} from "./videoService";
import {
  getBlogCategories,
  getBlogTags,
  getAllBlogs,
  getBlogById,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from "./blogService";
const appSlice = createApi({
  reducerPath: "app",
  baseQuery: (() => {
    return axiosBaseQuery();
  })(),
  tagTypes: ["getAllUserProfile", "Categories", "AdminCategories", "Videos", "PublicVideos", "Blogs", "BlogCategories", "BlogTags", "Products", "AdminProducts", "DashboardStats", "RecentOrders", "ReturnReplaceRequests", "UsersProductOrders", "ProductSellingRanking", "LowStockProducts", "SalespersonCustomers", "SalespersonOrdersByUser", "Tags", "FeaturedTags"],
  // Add caching and performance optimizations
  keepUnusedDataFor: 300, // Keep unused data for 5 minutes
  // Avoid automatic refetches to prevent duplicate API hits
  refetchOnMountOrArgChange: false,
  refetchOnFocus: false,
  refetchOnReconnect: false,
  endpoints: (build) => ({
    //website info & policies
    getWebsiteInfo: getWebsiteInfo(build),
    updateWebsiteInfo: updateWebsiteInfo(build),

    //user flow
    userSignUp: userSignUp(build),
    userLogin: userLogin(build),
    updateUserProfile: updateUserProfile(build),
    userResetPassword: userResetPassword(build),  // to send otp via email
    userChangePassword:userChangePassword(build), //to set new password
    
    getProfile : getProfile(build),
    
    
    
    // admin categories
    // addSubCategory: addSubCategory(build),
    addCategory: addCategory(build),
    deleteCategory: deleteCategory(build),
    updateCategory: updateCategory(build),
    //categories
    getMegaMenuCategories: getMegaMenuCategories(build),
    listAllCategories: listAllCategories(build),
    getAdminCategories: getAdminCategories(build),
    getCategoriesPaginated: getCategoriesPaginated(build),
    //s3
    uploadImage: uploadImage(build),
    deleteImage: deleteImage(build),
    deleteImageCompletely: deleteImageCompletely(build),
    //brands
    getAllBrands: getAllBrands(build),
    addBrand: addBrand(build),
    updateBrand: updateBrand(build),
    deleteBrand: deleteBrand(build),
    // admin products
    addProduct: addProduct(build),
    updateProduct: updateProduct(build),
    deleteProduct: deleteProduct(build),
    getAllProductsAdmin: getAllProductsAdmin(build),
    bulkUploadProducts: bulkUploadProducts(build),
    exportProductsCsv: exportProductsCsv(build),
    updateProductsDisplayOrder: updateProductsDisplayOrder(build),
    getCategoryProductCount: getCategoryProductCount(build),
    //products
    getAllProducts: getAllProducts(build),
    getProductById: getProductById(build),
    getSpecialProducts: getSpecialProducts(build), //featured, most popular, most sold
    //cart
    getUserCart: getUserCart(build),
    addToCart: addToCart(build),
    clearCart: clearCart(build),
    RemoveItemFromCart: RemoveItemFromCart(build),
    updateCart: updateCart(build),
    //orders
    getAllOrders: getAllOrders(build),
    getOrderById: getOrderById(build),
    placeOrder: placeOrder(build),
    updateOrder: updateOrder(build),
    acceptOrder: acceptOrder(build),
    updateOrderStatus: updateOrderStatus(build),
    deleteOrder: deleteOrder(build),
    orderTrackingId: orderTrackingId(build),
    //refunds
    getAllRequestsAdmin: getAllRequestsAdmin(build),
    refundOrder: refundOrder(build),
    refundProduct: refundProduct(build),
    acceptRefund: acceptRefund(build),
    rejectRefund: rejectRefund(build),
    getRequestsById: getRequestsById(build),
    replacesProduct: replacesProduct(build),
//accept/reject request
acceptRequest:acceptRequest(build),
rejectRequest:rejectRequest(build),
getUserRequests:getUserRequests(build),


    //tags
    getAllTags:getAllTags(build),
    addTag:addTag(build),
    getTagsAdmin: getTagsAdmin(build),
    updateTag: updateTag(build),
    deleteTag: deleteTag(build),
    getFeaturedTags: getFeaturedTags(build),
    //notify
    subscribeRestock: subscribeRestock(build),

    //dashboard
    getDashboardStats: getDashboardStats(build),
    getRecentOrders: getRecentOrders(build),
    getReturnReplaceRequests: getReturnReplaceRequests(build),
    getUsersProductOrders: getUsersProductOrders(build),
    getProductSellingRanking: getProductSellingRanking(build),
    getLowStockProducts: getLowStockProducts(build),
    getSalespersonCustomers: getSalespersonCustomers(build),
    getSalespersonOrdersByUser: getSalespersonOrdersByUser(build),

    //customers
    approveCustomer: approveCustomer(build),
    rejectCustomer: rejectCustomer(build),
    updateUserType: updateUserType(build),
    getAllCustomers: getAllCustomers(build),
    getUserPaymentMethod: getUserPaymentMethod(build),
    assignCustomerToSalesPerson: assignCustomerToSalesPerson(build),
    getSalesPersons: getSalesPersons(build),

    //videos
    getAllVideos: getAllVideos(build),
    getVideoById: getVideoById(build),
    createVideo: createVideo(build),
    updateVideo: updateVideo(build),
    deleteVideo: deleteVideo(build),
    updateVideoOrder: updateVideoOrder(build),
    toggleVideoStatus: toggleVideoStatus(build),
    getPublicVideos: getPublicVideos(build),
    
    //blogs
    getBlogCategories: getBlogCategories(build),
    getBlogTags: getBlogTags(build),
    getAllBlogs: getAllBlogs(build),
    getBlogById: getBlogById(build),
    getBlogBySlug: getBlogBySlug(build),
    createBlog: createBlog(build),
    updateBlog: updateBlog(build),
    deleteBlog: deleteBlog(build),
  }),
});
export default appSlice;
export const {
  //website info & policies
  useGetWebsiteInfoQuery,
  useUpdateWebsiteInfoMutation,

  //user
  useUserSignUpMutation,
  useUserLoginMutation,
  useUpdateUserProfileMutation,
  useUserResetPasswordMutation,
  useUserChangePasswordMutation,
  useGetProfileQuery,
  //admin categories
  useAddCategoryMutation,
  // useAddSubCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  //categories
  useListAllCategoriesQuery,
  useGetMegaMenuCategoriesQuery,
  useGetAdminCategoriesQuery,
  useGetCategoriesPaginatedQuery,
  //s3
  useUploadImageMutation,
  useDeleteImageMutation,
  useDeleteImageCompletelyMutation,
  //brands
  useGetAllBrandsQuery,
  useAddBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  //admin products
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAllProductsAdminQuery,
  useBulkUploadProductsMutation,
  useExportProductsCsvMutation,
  useUpdateProductsDisplayOrderMutation,
  useGetCategoryProductCountQuery,
  //products
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetSpecialProductsQuery,
  //cart
  useGetUserCartQuery,
  useAddToCartMutation,
  useClearCartMutation,
  useRemoveItemFromCartMutation,
  useUpdateCartMutation,
  //orders
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  usePlaceOrderMutation,
  useUpdateOrderMutation,
  useAcceptOrderMutation,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
  useOrderTrackingIdMutation,

  //refunds

  useGetAllRequestsAdminQuery,
  useRefundOrderMutation,
  useRefundProductMutation,
  useAcceptRefundMutation,
  useRejectRefundMutation,
  useGetRequestsByIdQuery,
  useReplacesProductMutation,

  //accept/reject request
useAcceptRequestMutation, 
useRejectRequestMutation,
useGetUserRequestsQuery,

//tags
useAddTagMutation,
useGetAllTagsQuery,
useGetTagsAdminQuery,
useUpdateTagMutation,
useDeleteTagMutation,
useGetFeaturedTagsQuery,
//notify
useSubscribeRestockMutation,

//dashboard
useGetDashboardStatsQuery,
useGetRecentOrdersQuery,
useGetReturnReplaceRequestsQuery,
useGetUsersProductOrdersQuery,
useGetProductSellingRankingQuery,
useGetLowStockProductsQuery,
useGetSalespersonCustomersQuery,
useGetSalespersonOrdersByUserQuery,

//customers
  useApproveCustomerMutation,
  useRejectCustomerMutation,
  useUpdateUserTypeMutation,
  useGetAllCustomersQuery,
  useGetUserPaymentMethodQuery,
  useAssignCustomerToSalesPersonMutation,
  useGetSalesPersonsQuery,

  //videos
  useGetAllVideosQuery,
  useGetVideoByIdQuery,
  useCreateVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
  useUpdateVideoOrderMutation,
  useToggleVideoStatusMutation,
  useGetPublicVideosQuery,
  
  //blogs
  useGetBlogCategoriesQuery,
  useGetBlogTagsQuery,
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useGetBlogBySlugQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = appSlice;
