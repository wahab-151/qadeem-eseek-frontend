// import { configureStore } from '@reduxjs/toolkit'
// import authReducer from "./slices/authSlice"
// import intercepter from "./helpers/intercepter"
// import appSlice from './services/index';

// // export const store = configureStore({
// //   reducer: {
// //     auth: authReducer,
// //   },
// // })

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     [appSlice.reducerPath]: appSlice.reducer, // ✅ RTK Query reducer
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(appSlice.middleware), // ✅ RTK Query middleware
// });

import {
  configureStore,
  combineReducers,
  createAction,
  current,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import appSlice from "./services/index";


import ResponseSlice from "./slices/ResponseSlice";
import { userSlice } from "./slices/userSlice";
import videoSlice from "./slices/videoSlice";
// import signInOrSignUp from "./slices/SignInSignUpSlice";
// import adminCategoriesSlice from "./slices/AdminCategoriesSlice";

// Define an action to handle persist/REHYDRATE with non-serializable data
const removeErrorFromRehydrate = createAction(
  "persist/removeErrorFromRehydrate"
);


const rootReducer = (state, action) => {
  if (action.type === removeErrorFromRehydrate.type) {
    return {
      ...state,
      err: undefined,
    };
  }



  return combineReducers({
    // currentUser: currentUserSlice,
    // signInOrSignUp: signInOrSignUp,
        user: userSlice,
    response: ResponseSlice,
    video: videoSlice,
    [appSlice.reducerPath]: appSlice.reducer,
  //  adminCategories: adminCategoriesSlice,
  
  })(state, action);
};




export const store = configureStore({
  reducer: rootReducer,
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check as it's handled manually
    }).concat(appSlice.middleware),
});

setupListeners(store.dispatch);
