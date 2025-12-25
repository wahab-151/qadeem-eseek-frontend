import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};


export const userSlice = createSlice({
  name: "setUser",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action?.payload?.result;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
