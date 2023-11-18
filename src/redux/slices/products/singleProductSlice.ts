import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { singleProductState } from '../../../types/SingleProductType';
import api from '../../../api'
import { Product } from '../../../types/ProductType';

const initialState: singleProductState = {
  product: null,
  error: null,
  isLoading: false,
}

export const fetchSingleProduct = createAsyncThunk('singleProduct/fetchSingleProduct', async (id: number) => {
  const response = await api.get('/mock/e-commerce/products.json');
  const products = response.data;
  
  const product = products.find((product: Product) => product.id === id);
  return product;
});

export const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(fetchSingleProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.product = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchSingleProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "ERROR!";
    })
  }
})

export default singleProductSlice.reducer;