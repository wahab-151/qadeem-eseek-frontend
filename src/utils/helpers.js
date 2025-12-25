import { EXCLUDED_CATEGORY_ID } from './constants';
import appSlice from 'app/store/services';

export const generateMetadata = (title) => ({
    title: `${title} - Wholesale & Retail Store with Personalized Pricing`,
    description: `SIFRA is a wholesale and retail e-commerce platform built with Next.js and React. Enjoy personalized pricing, exclusive discounts based on your profile, and bigger savings the more you shop. Perfect for bulk buyers, resellers, and smart shoppers.`,
    authors: [{
      name: "SIFRA",
      url: "https://www.sifrausa.com"
    }],
    keywords: [
      "wholesale e-commerce", 
      "retail store online", 
      "custom pricing shop", 
      "Next.js e-commerce", 
      "React e-commerce template", 
      "bulk discounts", 
      "profile-based discounts", 
      "multi-vendor platform", 
      "online wholesale shopping", 
      "personalized shopping experience"
    ]
  });
  
export function formatToTwoDecimals(value) {
  const num = parseFloat(value);
  if (isNaN(num)) return "";
  return num.toFixed(2);
}
// mega menu with category  category 3 and products
  // export function transformDataForMegaMenu(inputData) {
  //     // console.log(transformedData);
  //   // Create a map for quick lookup
  //   const map = {};
  //   inputData.forEach(item => {
  //     map[item._id] = {
  //       ...item,
  //       children: []
  //     };
  //   });
  //   // Build the tree
  //   const tree = [];
  //   inputData.forEach(item => {
  //     if (item.parentId) {
  //       if (map[item.parentId]) {
  //         map[item.parentId].children.push(map[item._id]);
  //       }
  //     } else {
  //       tree.push(map[item._id]);
  //     }
  //   });
  //   // Convert to desired format
  //   function convertNode(node) {
  //     const newNode = {
  //       title: node.title || node.name,
  //       icon: node.icon,
  //       url: node.url
  //     };
  //     if (node.hasChildren || node.children.length > 0) {
  //       newNode.child = node.children.map(convertNode);
  //       // Add model numbers as children if they exist and no other children
  //       if (node.modelNumbers && node.modelNumbers.length > 0 && newNode.child.length === 0) {
  //         newNode.child = node.modelNumbers.map(model => ({
  //           title: model,
  //           url: model.url,
  //           icon: model.icon
  //         }));
  //       }
  //     }
  //     return newNode;
  //   }
  //   return tree.map(convertNode);
  // }
  

//   export function transformDataForMegaMenu(inputData, productsData) {

//     console.log("dataaaa",inputData,productsData )
//   // Step 0: Validate input
//   if (!Array.isArray(inputData) || !Array.isArray(productsData)) {
//     console.warn("Invalid input to transformDataForMegaMenu", { inputData, productsData });
//     return [];
//   }
//   // Step 1: Map input categories by _id
//   const map = {};
//   inputData.forEach(item => {
//     if (!item?._id) return;
//     map[item._id] = {
//       ...item,
//       children: [],
//       products: [] // initialize product list
//     };
//   });
//   // Step 2: Build the tree structure
//   const tree = [];
//   inputData.forEach(item => {
//     if (!item?._id) return;
//     if (item.parentId && map[item.parentId]) {
//       map[item.parentId].children.push(map[item._id]);
//     } else {
//       tree.push(map[item._id]);
//     }
//   });
//   // Step 3: Insert each product into its corresponding subcategory
//   // console.log("productsData", productsData)
//   productsData.forEach(product => {
//     const categoryId = product?.subCategory;
//     if (categoryId && map[categoryId]) {
//       map[categoryId].products.push({
//         title: product.name || "No Title",
//         url: `/products/${product._id}`,
//         icon: product.images?.[0]?.preview || "",
//         level:product?.level,
//         id:product._id,
//         createdAt: product?.createdAt,

//       });
//     }
//   });
//   // Step 4: Recursively convert each node to menu format
//   function convertNode(node) {
//     const newNode = {
//       title: node.title || node.name,
//       icon: node.image || "",
//       url: node.url || "/home",
//       level:node?.level,
//       id:node?.id|| node?._id,
//       createdAt:node?.createdAt
//     };
//     const children = [];
//     // Add child categories recursively
//     if (node.children && node.children.length > 0) {
//       children.push(...node.children.map(convertNode));
//     }
//     // Add products directly under subcategory (if any)
//     if (node.products && node.products.length > 0) {
//       children.push(...node.products);
//     }
//     if (children.length > 0) {
//       newNode.child = children;
//     }
//     return newNode;
//   }
//   // Step 5: Convert and return final tree
//   return tree.map(convertNode);
// }


// megamenu with only products with level 4


// export function transformDataForMegaMenu(inputData, productsData) {
//   if (!Array.isArray(inputData) || !Array.isArray(productsData)) {
//     console.warn("Invalid input to transformDataForMegaMenu", { inputData, productsData });
//     return [];
//   }

//   // Step 1: Map input categories by _id
//   const map = {};
//   inputData.forEach(item => {
//     if (!item?._id) return;
//     map[item._id] = {
//       ...item,
//       children: []
//     };
//   });

//   // Step 2: Build the tree structure (without sorting top-level)
//   const tree = [];
//   inputData.forEach(item => {
//     if (!item?._id) return;
//     if (item.parentId && map[item.parentId]) {
//       map[item.parentId].children.push(map[item._id]);
//     } else {
//       tree.push(map[item._id]); // keep order as-is
//     }
//   });

//   // 🔄 Step 3: Sort children by createdAt (newest first), recursively
//   function sortChildrenRecursively(node) {
//     if (node.children && node.children.length > 0) {
//       node.children.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       node.children.forEach(sortChildrenRecursively);
//     }
//   }

//   // Sort children only, not top-level tree
//   tree.forEach(sortChildrenRecursively);

//   // Step 4: Convert each node
//   function convertNode(node) {
//     const newNode = {
//       title: node.title || node.name,
//       icon: node.image || "",
//       url: node.url || "/home",
//       level: node?.level,
//       id: node?.id || node?._id,
//       createdAt: node?.createdAt
//     };

//     if (node.children && node.children.length > 0) {
//       newNode.child = node.children.map(convertNode);
//     }

//     return newNode;
//   }
// console.log("treeee", tree.map(convertNode))
//   return tree.map(convertNode);
// }




export function transformDataForMegaMenu(inputData, productsData) {
  // Step 0: Validate input
  if (!Array.isArray(inputData) || !Array.isArray(productsData)) {
    console.warn("Invalid input to transformDataForMegaMenu", { inputData, productsData });
    return [];
  }

  // Step 1: Filter out excluded category
  const filteredInputData = inputData.filter(item => item._id !== EXCLUDED_CATEGORY_ID);

  // Step 2: Map input categories by _id
  const map = {};
  filteredInputData.forEach(item => {
    if (!item?._id) return;
    map[item._id] = {
      ...item,
      children: []
    };
  });

  // Step 3: Build the tree structure
  const tree = [];
  filteredInputData.forEach(item => {
    if (!item?._id) return;
    if (item.parentId && map[item.parentId]) {
      map[item.parentId].children.push(map[item._id]);
    } else {
      tree.push(map[item._id]);
    }
  });

  // Step 4: Sort children by createdAt (latest first)
  function sortChildrenRecursively(node) {
    if (node.children && node.children.length > 0) {
      node.children.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      node.children.forEach(sortChildrenRecursively);
    }
  }
  
  // Sort parent categories by createdAt (latest first)
  tree.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  tree.forEach(sortChildrenRecursively);

  // Step 5: Recursively convert each node to menu format (no products)
  function convertNode(node) {
    const newNode = {
      title: node.title || node.name,
      icon: node.image || "",
      url: node.url || "/home",
      level: node?.level,
      id: node?.id || node?._id,
      createdAt: node?.createdAt
    };

    if (node.children && node.children.length > 0) {
      newNode.child = node.children.map(convertNode);
    }

    return newNode;
  }

  // Step 6: Convert and return final tree
  return tree.map(convertNode);
}

export function transformDataForMegaMenuByDisplayOrder(inputData) {
  // Step 0: Validate input
  if (!Array.isArray(inputData)) {
    console.warn("Invalid input to transformDataForMegaMenuByDisplayOrder", { inputData });
    return [];
  }

  // Step 1: Filter out excluded category
  const filteredInputData = inputData.filter(item => item._id !== EXCLUDED_CATEGORY_ID);

  // Step 2: Map input categories by _id
  const map = {};
  filteredInputData.forEach(item => {
    if (!item?._id) return;
    map[item._id] = {
      ...item,
      children: []
    };
  });

  // Step 3: Build the tree structure
  const tree = [];
  filteredInputData.forEach(item => {
    if (!item?._id) return;
    if (item.parentId && map[item.parentId]) {
      map[item.parentId].children.push(map[item._id]);
    } else {
      tree.push(map[item._id]);
    }
  });

  // Step 4: Sort by displayOrder (ascending) instead of createdAt
  function sortChildrenByDisplayOrder(node) {
    if (node.children && node.children.length > 0) {
      node.children.sort((a, b) => (a.displayOrder || 1) - (b.displayOrder || 1));
      node.children.forEach(sortChildrenByDisplayOrder);
    }
  }
  
  // Sort parent categories by displayOrder (ascending)
  tree.sort((a, b) => (a.displayOrder || 1) - (b.displayOrder || 1));
  tree.forEach(sortChildrenByDisplayOrder);

  // Step 5: Recursively convert each node to menu format
  function convertNode(node) {
    const newNode = {
      title: node.title || node.name,
      icon: node.image || "",
      url: node.url || "/home",
      level: node?.level,
      id: node?.id || node?._id,
      displayOrder: node?.displayOrder
    };

    if (node.children && node.children.length > 0) {
      newNode.child = node.children.map(convertNode);
    }

    return newNode;
  }

  // Step 6: Convert and return final tree
  return tree.map(convertNode);
}

export function transformCategoriesForMegaMenu(inputData) {
  // Step 0: Validate input
  if (!Array.isArray(inputData)) {
    console.warn("Invalid input to transformCategoriesForMegaMenu", { inputData });
    return [];
  }

  // Step 1: Filter out excluded category and its children, and any soft-deleted categories
  const filteredInputData = inputData.filter(item => {
    // Exclude the deletedCategories parent
    if (item._id === EXCLUDED_CATEGORY_ID) return false;
    
    // Exclude children of deletedCategories
    if (item.parentId === EXCLUDED_CATEGORY_ID) return false;
    
    // Exclude soft-deleted categories
    if (item.isDeleted === true) return false;
    
    // Only include active categories
    // if (item.isActive === false) return false; // Commented out isActive check
    
    return true;
  });

  // Step 2: Map input categories by _id
  const map = {};
  filteredInputData.forEach(item => {
    if (!item?._id) return;
    map[item._id] = {
      ...item,
      children: []
    };
  });

  // Step 3: Build the tree structure
  const tree = [];
  filteredInputData.forEach(item => {
    if (!item?._id) return;
    if (item.parentId && map[item.parentId]) {
      map[item.parentId].children.push(map[item._id]);
    } else {
      tree.push(map[item._id]);
    }
  });

  // Step 4: Sort by displayOrder (ascending) instead of createdAt
  function sortChildrenByDisplayOrder(node) {
    if (node.children && node.children.length > 0) {
      node.children.sort((a, b) => (a.displayOrder || 1) - (b.displayOrder || 1));
      node.children.forEach(sortChildrenByDisplayOrder);
    }
  }
  
  // Sort parent categories by displayOrder (ascending)
  tree.sort((a, b) => (a.displayOrder || 1) - (b.displayOrder || 1));
  tree.forEach(sortChildrenByDisplayOrder);

  // Step 5: Recursively convert each node to menu format
  function convertNode(node) {
    const newNode = {
      title: node.title || node.name,
      icon: node.image || "",
      url: node.url || "/home",
      level: node?.level,
      id: node?.id || node?._id,
      displayOrder: node?.displayOrder
    };

    if (node.children && node.children.length > 0) {
      newNode.child = node.children.map(convertNode);
    }

    return newNode;
  }

  // Step 6: Convert and return final tree
  return tree.map(convertNode);
}

export function transformCategoriesForAdminTable(inputData) {
  // Step 0: Validate input
  if (!Array.isArray(inputData)) {
    console.warn("Invalid input to transformCategoriesForAdminTable", { inputData });
    return [];
  }

  // Step 1: Filter categories - keep deletedCategories parent and its children, filter out other soft-deleted
  const filteredInputData = inputData.filter(item => {
    // Always keep the deletedCategories parent
    if (item._id === EXCLUDED_CATEGORY_ID) return true;
    
    // Keep categories that are children of deletedCategories (these are the deleted categories)
    if (item.parentId === EXCLUDED_CATEGORY_ID) return true;
    
    // Filter out other soft-deleted categories
    return !item.isDeleted;
  });

  // Step 2: Map input categories by _id
  const map = {};
  filteredInputData.forEach(item => {
    if (!item?._id) return;
    map[item._id] = {
      ...item,
      children: []
    };
  });

  // Step 3: Build the tree structure
  const tree = [];
  filteredInputData.forEach(item => {
    if (!item?._id) return;
    if (item.parentId && map[item.parentId]) {
      map[item.parentId].children.push(map[item._id]);
    } else {
      tree.push(map[item._id]);
    }
  });

  // Step 4: Sort by displayOrder (ascending)
  function sortChildrenByDisplayOrder(node) {
    if (node.children && node.children.length > 0) {
      node.children.sort((a, b) => (a.displayOrder || 1) - (b.displayOrder || 1));
      node.children.forEach(sortChildrenByDisplayOrder);
    }
  }
  
  // Sort parent categories by displayOrder (ascending)
  tree.sort((a, b) => (a.displayOrder || 1) - (b.displayOrder || 1));
  tree.forEach(sortChildrenByDisplayOrder);

  // Step 5: Recursively convert each node to admin table format
  function convertNode(node) {
    const newNode = {
      ...node,
      childCategories: [] // Use childCategories for admin table consistency
    };

    if (node.children && node.children.length > 0) {
      newNode.childCategories = node.children.map(convertNode);
    }

    return newNode;
  }

  // Step 6: Convert and return final tree
  return tree.map(convertNode);
}

export function convertToCategoryListByDisplayOrder(inputData) {
  // Filter only level 1 categories (top-level categories), exclude deletedCategories, and sort by displayOrder
  const topLevelCategories = inputData
    ?.filter(item => item?.level === 1 && item?._id !== EXCLUDED_CATEGORY_ID)
    ?.sort((a, b) => (a.displayOrder || 1) - (b.displayOrder || 1))
    ?.map(item => ({
      title: item.title || item.name,
      value: item._id,
      icon: item.image || "",
      url: item.url || "/home"
    })) || [];

  // Add "All Categories" option at the beginning
  return [
    { title: "All Categories", value: "", icon: "", url: "/home" },
    ...topLevelCategories
  ];
}

export function convertToCategoryList(data) {
  // Filter only level 1 categories (top-level categories), exclude deletedCategories
  const topLevelCategories = data?.filter(item => item?.level === 1 && item?._id !== EXCLUDED_CATEGORY_ID);
  // Map to the desired structure
  const result = [
    {
      title: "All Categories",
      value: ""
    },
    ...topLevelCategories.map(category => ({
      title: category.title || category.name,
      value: category.slug || category.name.toLowerCase().replace(/\s+/g, '-')
    }))
  ];
  return result;
}




  //for search result --geting categories
export const extractCategoriesFromProducts = (products = []) => {
  const categoryMap = new Map();
  
  products.forEach((p) => {
    // Skip products from deletedCategories
    if (p?.category?._id === EXCLUDED_CATEGORY_ID || p?.subCategory === EXCLUDED_CATEGORY_ID) {
      return;
    }
    
    if (p?.category?._id && p?.category?.name) {
      categoryMap.set(p.category._id, {
        id: p.category._id,
        name: p.category.name,
      });
    }
  });
  
  return Array.from(categoryMap.values());
};

export const logoutUser = (router = null, userDispatch = null, cartDispatch = null, rtkQueryDispatch = null) => {
  // console.log("logout called")
  if (typeof window !== 'undefined') {
    // Save current page as last visited page (for next login)
    const currentPath = window.location.pathname;
    const currentSearch = window.location.search;
    const fullPath = currentPath + currentSearch;
    
    // Only save valid customer pages (not admin, not auth pages)
    const isValidPage = !currentPath.includes('/admin') && 
                        !currentPath.includes('/login') && 
                        !currentPath.includes('/register') &&
                        !currentPath.includes('/signup') &&
                        !currentPath.includes('/reset-password') &&
                        !currentPath.includes('/change-password') &&
                        currentPath !== '/';
    
    if (isValidPage) {
      try {
        localStorage.setItem('last-visited-page', fullPath);
        console.log('[Logout] Saved last visited page:', fullPath);
      } catch (err) {
        console.warn('[Logout] Failed to save last visited page:', err);
      }
    }

    // Clear contexts FIRST to ensure prices show as default immediately
    if (userDispatch) {
      userDispatch({ type: "LOGOUT" });
    }
    if (cartDispatch) {
      cartDispatch({ type: "CLEAR_CART" });
    }

    // Invalidate RTK Query cache for products to ensure fresh pricing data
    if (rtkQueryDispatch) {
      try {
        // Invalidate product-related caches to force refetch with default pricing
        rtkQueryDispatch(appSlice.util.invalidateTags(['Products', 'AdminProducts']));
      } catch (err) {
        console.warn('Failed to invalidate RTK Query cache on logout:', err);
      }
    }

    // Only clear auth-related localStorage items, not everything
    localStorage.removeItem("auth-token");
    localStorage.removeItem('auth-user-role');
    localStorage.removeItem('auth-user');
    // Clear cart from localStorage (source of truth)
    try { localStorage.removeItem('cart'); } catch {}
    // Note: We keep 'last-visited-page' for next login

    // Use Next.js router for faster navigation if provided
    if (router) {
      router.push('/home');
    } else {
      // Fallback to window.location.href if router not available
      window.location.href = '/home';
    }
  }
};

/**
 * Handle automatic logout when token expires (401 Unauthorized)
 * Clears all auth data from localStorage and sessionStorage, then redirects to home
 * This function is called automatically when a 401 token expiration error is detected
 */
export const handleUnauthorizedLogout = () => {
  if (typeof window === 'undefined') return;
  
  // Prevent multiple simultaneous logout attempts
  if (window.__isAutoLoggingOut) {
    console.log('[Auto Logout] Already processing logout, skipping...');
    return;
  }
  
  window.__isAutoLoggingOut = true;
  console.log('[Auto Logout] Token expired or unauthorized. Clearing session and redirecting to home...');
  
  // Clear all auth-related data from localStorage (same as manual logout)
  try {
    localStorage.removeItem("auth-token");
    localStorage.removeItem('auth-user-role');
    localStorage.removeItem('auth-user');
    localStorage.removeItem('cart'); // Clear cart data
    console.log('[Auto Logout] Cleared localStorage auth data');
  } catch (err) {
    console.warn('[Auto Logout] Error clearing localStorage:', err);
  }
  
  // Clear all auth-related data from sessionStorage
  try {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem('auth-user-role');
    sessionStorage.removeItem('auth-user');
    console.log('[Auto Logout] Cleared sessionStorage auth data');
  } catch (err) {
    console.warn('[Auto Logout] Error clearing sessionStorage:', err);
  }
  
  // Dispatch storage event to sync across tabs (if AuthContext is listening)
  // This helps sync logout state across multiple browser tabs
  try {
    const storageEvent = new StorageEvent('storage', {
      key: 'auth-token',
      oldValue: null,
      newValue: null,
      storageArea: localStorage,
    });
    window.dispatchEvent(storageEvent);
  } catch (err) {
    // Ignore if dispatchEvent fails (some browsers may not support it)
  }
  
  // Redirect to home page (same as manual logout)
  console.log('[Auto Logout] Redirecting to home page');
  
  // Use window.location.href for a full page reload to ensure clean state
  // This ensures all React state is reset and user sees home page as guest
  setTimeout(() => {
    window.location.href = '/home';
    // Reset flag after redirect (though page will reload anyway)
    window.__isAutoLoggingOut = false;
  }, 50);
};

/**
 * Navigate to login page with return URL
 * @param {string} returnUrl - URL to return to after successful login
 * @param {Object} productData - Optional product data for cart operations
 */
export const navigateToLogin = (returnUrl = null, productData = null) => {
  if (typeof window === 'undefined') return;
  
  const params = new URLSearchParams();
  
  if (returnUrl) {
    params.set('returnTo', returnUrl);
  }
  
  if (productData) {
    params.set('id', productData.id);
    params.set('qty', productData.qty || 1);
    params.set('category', productData.category || '');
  }
  
  const loginUrl = `/login${params.toString() ? `?${params.toString()}` : ''}`;
  window.location.href = loginUrl;
};
export const compressImage = (file, quality = 0.7, maxWidth = 1000) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    const reader = new FileReader();
    reader.onload = (event) => {
      image.src = event.target.result;
    };
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const scaleFactor = Math.min(maxWidth / image.width, 1);
      canvas.width = image.width * scaleFactor;
      canvas.height = image.height * scaleFactor;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            reject(new Error("Compression failed"));
          }
        },
        file.type,
        quality
      );
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
// utils/addWatermark.js
export const addWatermark = (file, watermarkText = "sifraatl.com") =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    const image = new Image();
    reader.onload = (event) => {
      image.src = event.target.result;
    };
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0);
      // Add watermark
      const fontSize = canvas.width * 0.03;
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.textAlign = "right";
      ctx.fillText(watermarkText, canvas.width - 20, canvas.height - 20);
      canvas.toBlob((blob) => {
        if (blob) {
          const watermarkedUrl = URL.createObjectURL(blob);
          resolve(watermarkedUrl);
        } else {
          reject(new Error("Watermarking failed"));
        }
      }, file.type);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  


export const getAllDescendantIds = (categories, parentId) => {
  const directChildren = categories.filter(cat => {
    return cat.parentId && (cat.parentId._id === parentId || cat.parentId === parentId);
  });

  const childrenIds = directChildren.map(child => child._id);

  const nestedDescendants = childrenIds.flatMap(id =>
    getAllDescendantIds(categories, id)
  );

  return [...childrenIds, ...nestedDescendants];
}


export const findCategoryById = (categories, id) => {
  for (const category of categories) {
    if (category.id === id) return category;

    if (category.child && category.child.length > 0) {
      const found = findCategoryById(category.child, id);
      if (found) return found;
    }
  }
  return null;
};


// export const findBreadcrumbPath = (menu, targetId) => {
//   for (const item of menu) {
//     if (item.id === targetId) return [item];
//     if (item.child) {
//       const path = findBreadcrumbPath(item.child, targetId);
//       if (path.length) return [item, ...path];
//     }
//   }
//   return [];
// };

/**
 * Core recursive search – unchanged logic, just cached per menu
 */
const _findPath = (
  menu,
  targetId,
  cache
) => {
  // Hit cache
  const cached = cache.get(targetId);
  if (cached !== undefined) return cached;

  for (const item of menu) {
    if (item.id === targetId) {
      cache.set(targetId, [item]);
      return [item];
    }
    if (item.child?.length) {
      const subPath = _findPath(item.child, targetId, cache);
      if (subPath.length) {
        const fullPath = [item, ...subPath];
        cache.set(targetId, fullPath);
        return fullPath;
      }
    }
  }

  cache.set(targetId, []);
  return [];
};

/**
 * Exported function – pure, cache-aware
 */
export const findBreadcrumbPath = (menu, targetId) => {
  if (!menu?.length || targetId == null) return [];

  // Create a cache bound to this exact menu instance
  const cache = new Map();
  return _findPath(menu, targetId, cache);
};


export const formatTime = (time)=>{

const formatedTime= new Date(time).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    })
return formatedTime;
  }

export const getShippingCost = (method, amount) => {
  const amt = Number(amount) || 0;
  if (amt <= 0) return 0;

  const key = String(method || "").toLowerCase().replace(/\s+/g, "");
  const isGround = [
    "ground",
    "upsground",
    "groundups",
    "groundshipping",
    "standard"
  ].includes(key);
  const isOvernight = [
    "overnight",
    "overnite",
    "upsovernight",
    "upsovernite",
    "nextday"
  ].includes(key);

  if (isGround) {
    if (amt <= 50) return 10;
    if (amt <= 250) return 20;
    if (amt <= 499) return 30;
    const increments = Math.floor((amt - 500) / 150) + 1;
    return 30 + increments * 10;
  }

  if (isOvernight) {
    if (amt <= 50) return 20;
    if (amt <= 250) return 30;
    if (amt <= 499) return 40;
    const increments = Math.floor((amt - 500) / 150) + 1;
    return 40 + increments * 15;
  }

  return 0;
};