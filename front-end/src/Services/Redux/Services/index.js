import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getSerivce,
  getServicesOnUser,
} from "../../APIS/Services/Get_Services";

export const getUserServices = createAsyncThunk(
  "user/services",
  async (payload) => {
    return await getServicesOnUser(payload.limit, payload.offset);
  }
);

export const getUserService = createAsyncThunk(
  "user/service",
  async (payload) => {
    return await getSerivce(payload.id);
  }
);

export const servicetSlice = createSlice({
  name: "services",
  initialState: {
    services: [],
    service: {},
    errorMessage: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserServices.pending, (state) => {
        state.errorMessage = {
          error: false,
          message: "",
        };
      })
      .addCase(getUserServices.fulfilled, (state, action) => {
        state.errorMessage = {
          error: false,
          message: "",
        };
        state.services = action.payload;
      })
      .addCase(getUserServices.rejected, (state, action) => {
        state.errorMessage = {
          error: true,
          message: action.error,
        };
      });

    builder
      .addCase(getUserService.pending, (state) => {
        state.errorMessage = {
          error: false,
          message: "",
        };
      })
      .addCase(getUserService.fulfilled, (state, action) => {
        state.errorMessage = {
          error: false,
          message: "",
        };
        state.service = action.payload;
      })
      .addCase(getUserService.rejected, (state, action) => {
        state.errorMessage = {
          error: true,
          message: action.error,
        };
      });
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
