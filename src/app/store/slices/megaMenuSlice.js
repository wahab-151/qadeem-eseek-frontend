import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: []
};

const userCategoriesSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { setUserCategories } = userCategoriesSlice.actions;
export default userCategoriesSlice.reducer;
