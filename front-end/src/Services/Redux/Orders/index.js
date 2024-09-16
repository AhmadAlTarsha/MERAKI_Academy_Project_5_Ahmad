import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addOrderAPI } from "../../APIS/Orders/AddOrder";
import { GetOrdersByUserId } from "../../APIS/Orders/GetOrders";
import { UpdateOrderStatus } from "../../APIS/Orders/UpdateOrder";

export const addOrder = createAsyncThunk("user/order", async (payload) => {
  return await addOrderAPI(payload);
});

export const UpdateOrder = createAsyncThunk(
  "user/order/update",
  async (payload) => {
    return await UpdateOrderStatus(payload?.id, payload?.status);
  }
);

export const GetOrdersCustomer = createAsyncThunk(
  "customer/orders",
  async (payload) => {
    return await GetOrdersByUserId(
      payload.limit,
      payload.offset,
      payload.status
    );
  }
);

export const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    order: {},
    errorMessage: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, (state) => {
        state.errorMessage = {
          error: false,
          message: "",
        };
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.errorMessage = {
          error: false,
          message: "Order Added Success",
          action: action.payload,
        };
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.errorMessage = {
          error: false,
          message: action.error,
        };
      });

    builder
      .addCase(GetOrdersCustomer.pending, (state) => {
        state.errorMessage = {
          error: false,
          message: "",
        };
      })
      .addCase(GetOrdersCustomer.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(GetOrdersCustomer.rejected, (state, action) => {
        state.errorMessage = {
          error: true,
          message: action.error,
        };
      });

    builder
      .addCase(UpdateOrder.pending, (state) => {
        state.errorMessage = {
          error: false,
          message: "",
        };
      })
      .addCase(UpdateOrder.fulfilled, (state, action) => {
        state.errorMessage = {
          error: false,
          message: "Order Updated",
          message2: action.payload,
        };
      })
      .addCase(UpdateOrder.rejected, (state, action) => {
        state.errorMessage = {
          error: true,
          message: "Something went wrong",
        };
      });
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
  },
});

export const { setOrders, setOrder } = orderSlice.actions;
export default orderSlice.reducer;
