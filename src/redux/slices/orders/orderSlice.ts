import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { OrderState } from "../../../types/OrderType";
import api from "../../../api";

const initialState: OrderState = {
  orders: [],
  error: null,
  isLoading: false,
  searchTerm: ''
}

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await api.get('/mock/e-commerce/orders.json');
  return response.data;
});

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    searchOrder: (state, action) => {
      state.searchTerm = action.payload;
    },
    sortOrders: (state, action) => {
      const sortMethod = action.payload;
      if (sortMethod == 'ascending') {
        state.orders.sort((a,b) => new Date(a.purchasedAt).getDate() - new Date(b.purchasedAt).getDate()); // Sort the dates of the orders in ascending order
      }
      else if (sortMethod == 'descending') {
        state.orders.sort((a,b) => new Date(b.purchasedAt).getDate() - new Date(a.purchasedAt).getDate()); // Sort the dates of the orders in descending order
      }
    },
  },
  extraReducers(builder) {
    builder
    .addCase(fetchOrders.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "ERROR!";
    })
  }
})

export const { searchOrder, sortOrders } = orderSlice.actions;
export default orderSlice.reducer;