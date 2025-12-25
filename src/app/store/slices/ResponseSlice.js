import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const responseSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setResponse: (state, action) => {
      if (JSON.stringify(state.value) === JSON.stringify(action.payload)) {
        return; // Avoid redundant state updates
      }
      // console.log("Reducer triggered with action:", action);
      state.value = action.payload;
    },
    clearResponse: (state) => {
      state.value = {}; // Clear the state
    },
  },
});

export const { setResponse, clearResponse } = responseSlice.actions;

export default responseSlice.reducer;
