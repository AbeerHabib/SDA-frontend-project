import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { CategoryState } from '../../../types/CategoryType'
import api from '../../../api'

const initialState: CategoryState = {
  categories: [],
  error: null,
  isLoading: false,
  searchTerm: ''
}

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await api.get('/mock/e-commerce/categories.json');
  return response.data;
});

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    searchCategory: (state, action) => {
      state.searchTerm = action.payload;
    },
    sortCategories: (state, action) => {
      const sortMethod = action.payload;
      if (sortMethod == 'AtoZ') {
        state.categories.sort((a,b) => a.name.localeCompare(b.name)); // Sort the categories name in ascending order
      }
      else if (sortMethod == 'ZtoA') {
        state.categories.sort((a,b) => b.name.localeCompare(a.name)); // Sort the categories name in descending order
      }
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    updateCategory: (state, action) => {
      const { id, name } = action.payload;
      const foundCategory = state.categories.find((category) => category.id == id);
      if (foundCategory) {
        foundCategory.name = name;
      }
    },
    deleteCategory: (state, action) => {
      const filterCategories = state.categories.filter((category) => category.id !== action.payload);
      state.categories = filterCategories;
    }
  },
  extraReducers(builder) {
    builder
    .addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    })
    .addCase(fetchCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "ERROR!";
    })
  }
})

export const { searchCategory, sortCategories, addCategory, updateCategory, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;