import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoading: false,
  },
  reducers: {
    // Set user when logging in
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // Set loading state
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    // Logout user
    logout: (state) => {
      state.user = null; // Clear user data
      localStorage.removeItem("authToken"); // Remove token from localStorage
    },
  },
});

export const { setUser, setLoading, logout } = userSlice.actions;
export default userSlice.reducer;
