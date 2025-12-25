// "use client";

// import { createContext, useReducer, useMemo } from "react";

// // ======================== Initial Data =========================

// const INITIAL_CATEGORY_STATE = {
//   categoriesList: [],
//   megaMenuList:[],
//   loading: false,
// };

// // ========================== Reducer ============================

// const reducer = (state, action) => {
//   switch (action.type) {
//      case "SET_MEGAMENU_LIST":
//       return { ...state, megaMenuList: action.payload };
//     case "SET_MAIN_CATEGORIES_LIST":
//       return { ...state, categoriesList: action.payload };
//     case "SET_MEGAMENU_CATEGORIES_LOADING":
//       return { ...state, loading: action.payload };
//     default:
//       return state;
//   }
// };

// // ========================= Context =============================

// export const CategoryContext = createContext({});

// // ======================== Provider =============================

// export default function CategoryMegaMenuProvider({ children }) {
//   const [state, dispatch] = useReducer(reducer, INITIAL_CATEGORY_STATE);

//   const contextValue = useMemo(() => ({ state, dispatch }), [state]);

//   return (
//     <CategoryContext.Provider value={contextValue}>
//       {children}
//     </CategoryContext.Provider>
//   );
// }
"use client";

import { createContext, useReducer, useMemo } from "react";

// ======================== Initial Data =========================

const INITIAL_CATEGORY_STATE = {
  categoriesList: [],
  megaMenuList:[],
  loading: false,
};

// ========================== Reducer ============================

const reducer = (state, action) => {
  switch (action.type) {
     case "SET_MEGAMENU_LIST":
      return { ...state, megaMenuList: action.payload };
    case "SET_MAIN_CATEGORIES_LIST":
      return { ...state, categoriesList: action.payload };
    case "SET_MEGAMENU_CATEGORIES_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

// ========================= Context =============================

export const CategoryContext = createContext({});

// ======================== Provider =============================

export default function CategoryMegaMenuProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_CATEGORY_STATE);

  const contextValue = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <CategoryContext.Provider value={contextValue}>
      {children}
    </CategoryContext.Provider>
  );
}
