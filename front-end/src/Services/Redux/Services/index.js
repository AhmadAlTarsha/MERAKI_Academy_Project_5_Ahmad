import { createSlice } from "@reduxjs/toolkit";

export const servicetSlice = createSlice({
  name: "services",
  initialState: {
    services: [],
    service: {},
  },
  reducers: {
    setServices: (state, action) => {
      state.services = action.payload;
    },
    setService: (state, action) => {
      console.log("SERVICE PAYLOAD ===> ", action.payload);
      state.service = action.payload;
    },
  },
});

export const { setServices, setService } = servicetSlice.actions;
export default servicetSlice.reducer;
