import { createSlice } from "@reduxjs/toolkit";

export const rolesSlice = createSlice({
  name: "roles",
  initialState: {
    roles: ["ahmad"],
  },
  reducers: {
    setroles: (state, action) => {
        action.payload.shift()
       
      state.roles = action.payload;
    },
  },
});

export const { setroles } = rolesSlice.actions;
export default rolesSlice.reducer;