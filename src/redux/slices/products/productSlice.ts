import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ProductState } from '../../../types/ProductType'
import api from '../../../api'

const initialState: ProductState = {
  products: [],
  error: null,
  isLoading: false,
  searchTerm: '',
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await api.get('/mock/e-commerce/products.json');
  return response.data;
});

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.searchTerm = action.payload;
    },
    sortProducts: (state, action) => {
      const sortMethod = action.payload;
      if (sortMethod == 'AtoZ') {
        state.products.sort((a,b) => a.name.localeCompare(b.name)); // Sort the names of the products in ascending order
      }
      else if (sortMethod == 'ZtoA') {
        state.products.sort((a,b) => b.name.localeCompare(a.name)); // Sort the names of the products in descending order
      }
      else if(sortMethod == 'lowToHigh') {
        state.products.sort((a,b) => a.price - b.price); // Sort the prices of the products in ascending order
      }
      else if(sortMethod == 'highToLow') {
        state.products.sort((a,b) => b.price - a.price); // Sort the prices of the products in descending order
      }
    },
    addProduct: (state, action) => { // Not completed yet
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const { id, name, image, description, categories, variants, sizes, price } = action.payload;
      const foundProduct = state.products.find((product) => product.id == id);
      if (foundProduct) {
        foundProduct.name = name;
        foundProduct.image = image;
        foundProduct.description = description;
        foundProduct.categories = categories;
        foundProduct.variants = variants;
        foundProduct.sizes = sizes;
        foundProduct.price = price;
      }
    },
    deleteProduct: (state, action) => {
      const filterProducts = state.products.filter((product) => product.id !== action.payload);
      state.products = filterProducts;
    },
  },
  extraReducers(builder) {
    builder
    .addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "ERROR!";
    })
  }
})

export const { searchProduct, sortProducts, addProduct, updateProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;