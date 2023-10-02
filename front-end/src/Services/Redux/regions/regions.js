import { createSlice } from "@reduxjs/toolkit";

export const regionsSlice = createSlice({
  name: "regions",
  initialState: {
    regions: [],
  },
  reducers: {
    setRegions: (state, action) => {
      state.regions = action.payload;
    },
  },
});

export const { setRegions } = regionsSlice.actions;
export default regionsSlice.reducer;
