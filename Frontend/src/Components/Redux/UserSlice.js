import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null, // Store user object directly
  reducers: {
    setUser: (state, action) => action.payload, // Store user directly
    logout: () => null, // Reset state on logout
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
