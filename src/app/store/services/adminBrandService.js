

export const getAllBrands = (build) => {
  return build.query({
    query: (search = "") => ({
      url: `/api/brands?search=${search}`,
      // url: "/api/brands",
      method: "GET",
      // params: search ? { search } : {},
    }),
  });
};

export const updateBrand = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: "/api/brands",
      method: "POST",
        body: payload,
    }),
  });
};

export const addBrand = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: "/api/brands",
      method: "POST",
        body: payload,
    }),
  });
};


export const deleteBrand = (build) => {
  return build.mutation({
    query: (payload) => ({
      url: "/api/brands",
      method: "DELETE",
        body: payload,
    }),
  });
};

// addbrand payload:
// {
    
//     "name": "Apple",
//     "title": "Apple Inc.",
//     "image": "https://example.com/images/apple.png",
//     "category": "6824df0f1ef7476d8218ae3e",
//     "isActive": true
//   }

// updatebrand
// {
//     "id":"68250faf38b856ab062fee90",
//     "name": "Apple",
//     "title": "Apple Inc.",
//     "image": "https://example.com/images/apple.png",
//     "category": "6824df0f1ef7476d8218ae3e",
//     "isActive": true
//   }

// getBrands response
// {
//     "success": true,
//     "message": "Brands retrieved successfully",
//     "data": {
//         "brands": [
//             {
//                 "_id": "68250faf38b856ab062fee90",
//                 "name": "Apple",
//                 "title": "Apple Inc.",
//                 "image": "https://example.com/images/apple.png",
//                 "isActive": true,
//                 "createdAt": "2025-05-14T21:48:31.373Z",
//                 "updatedAt": "2025-05-14T21:48:31.373Z",
//                 "__v": 0,
//                 "category": "6824df0f1ef7476d8218ae3e"
//             }
//         ],
//         "pagination": {
//             "totalItems": 1,
//             "totalPages": 1,
//             "currentPage": 1,
//             "pageSize": 10
//         }
//     }
// }
// addbrand payload:
// {
    
//     "name": "Apple",
//     "title": "Apple Inc.",
//     "image": "https://example.com/images/apple.png",
//     "category": "6824df0f1ef7476d8218ae3e",
//     "isActive": true
//   }

// updatebrand
// {
//     "id":"68250faf38b856ab062fee90",
//     "name": "Apple",
//     "title": "Apple Inc.",
//     "image": "https://example.com/images/apple.png",
//     "category": "6824df0f1ef7476d8218ae3e",
//     "isActive": true
//   }

// getBrands response
// {
//     "success": true,
//     "message": "Brands retrieved successfully",
//     "data": {
//         "brands": [
//             {
//                 "_id": "68250faf38b856ab062fee90",
//                 "name": "Apple",
//                 "title": "Apple Inc.",
//                 "image": "https://example.com/images/apple.png",
//                 "isActive": true,
//                 "createdAt": "2025-05-14T21:48:31.373Z",
//                 "updatedAt": "2025-05-14T21:48:31.373Z",
//                 "__v": 0,
//                 "category": "6824df0f1ef7476d8218ae3e"
//             }
//         ],
//         "pagination": {
//             "totalItems": 1,
//             "totalPages": 1,
//             "currentPage": 1,
//             "pageSize": 10
//         }
//     }
// }