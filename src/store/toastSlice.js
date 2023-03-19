import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toasts: [],
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {},
});

export default toastSlice.reducer;
