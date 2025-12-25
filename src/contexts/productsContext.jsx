// "use client";

// import { createContext, useMemo, useReducer } from "react";

// // ======================== Initial Data =========================

// const INITIAL_PRODUCTS_STATE = {
//   products: [],
//   mostSold: [],
//   mostPopular: [],
//   featured: [],
//   loading: {
//     products: false,
//     mostSold: false,
//     mostPopular: false,
//   },
//   pagination:{}
// };

// // ========================== Reducer ============================

// const reducer = (state, action) => {
//   //   switch (action.type) {
//   //     case "SET_PRODUCTS":
//   //       return { ...state, products: action.payload };
//   //     case "SET_MOST_SOLD":
//   //       return { ...state, mostSoldProducts: action.payload };
//   //     case "SET_MOST_POPULAR":
//   //       return { ...state, mostPopularProducts: action.payload };
//   //     default:
//   //       return state;
//   //   }

//   switch (action.type) {
//     case "SET_PRODUCTS":
//       return { ...state, products: action.payload };
//     case "SET_MOST_SOLD":
//       return { ...state, mostSold: action.payload };
//     case "SET_MOST_POPULAR":
//       return { ...state, mostPopular: action.payload };
//     case "SET_FEATURED":
//       return { ...state, featured: action.payload };
//     case "PAGINATION":
//        return { ...state, pagination: action.payload };
    
//       case "SET_LOADING":
//       return {
//         ...state,
//         loading: { ...state.loading, ...action.payload },
//       };
//     default:
//       return state;
//   }
// };

// // ========================= Context =============================

// export const ProductContext = createContext({});

// // ======================== Provider =============================

// export default function ProductProvider({ children }) {
//   const [state, dispatch] = useReducer(reducer, INITIAL_PRODUCTS_STATE);

//   const contextValue = useMemo(
//     () => ({
//       state,
//       dispatch,
//     }),
//     [state, dispatch]
//   );

//   return (
//     <ProductContext.Provider value={contextValue}>
//       {children}
//     </ProductContext.Provider>
//   );
// }
"use client";

import { createContext, useContext, useMemo, useReducer } from "react";

const INITIAL_PRODUCTS_STATE = {
  products: [],
  mostSold: [],
  mostPopular: [],
  featured: [],
  loading: {
    products: false,
    mostSold: false,
    mostPopular: false,
  },
  pagination: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "SET_MOST_SOLD":
      return { ...state, mostSold: action.payload };
    case "SET_MOST_POPULAR":
      return { ...state, mostPopular: action.payload };
    case "SET_FEATURED":
      return { ...state, featured: action.payload };
    case "PAGINATION":
      return { ...state, pagination: action.payload };
    case "SET_LOADING":
      return {
        ...state,
        loading: { ...state.loading, ...action.payload },
      };
    default:
      return state;
  }
};

export const ProductContext = createContext({});

export default function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_PRODUCTS_STATE);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
}

// Optional hook
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within ProductProvider");
  return context;
};