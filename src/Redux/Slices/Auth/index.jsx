import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { api } from "../../AuthRtkQueryApi";

// Initial state for the authentication slice
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
};

// Create the authentication slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      // Clear user data and set isAuthenticated to false on logout
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    setLoading: (state, action) => {
      const { payload } = action;
      if (typeof payload === "boolean") {
        state.loading = payload;
      }
      // Optionally, you can add additional logic here if needed
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload: { user, access } }) => {
        state.user = user;
        state.token = access;
        state.isAuthenticated = true;
      }
    );
  },
});

// Extract and export the reducer and actions from the slice
export const { logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
