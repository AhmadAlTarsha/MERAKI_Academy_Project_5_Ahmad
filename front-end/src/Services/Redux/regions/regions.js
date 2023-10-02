import { createSlice } from "@reduxjs/toolkit";

export const regionsSlice = createSlice({
  name: "regions",
  initialState: {
    regions: [],
  },
  reducers: {
    setregions: (state, action) => {
        console.log(action.payload);
      state.regions = action.payload;
    },
  },
});

export const { setregions } = regionsSlice.actions;
export default regionsSlice.reducer;
