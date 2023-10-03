import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    order: {},
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

export const { setOrders, setOrder } =
  orderSlice.actions;
export default orderSlice.reducer;
