import { configureStore } from '@reduxjs/toolkit'

import productsReducer from './slices/products/productSlice'
import categoriesReducer from './slices/categories/categorySlice';
import userReducer from './slices/users/userSlice';
import orderReducer from './slices/orders/orderSlice';
import singleProductReducer from './slices/products/singleProductSlice';
import cartReducer from './slices/cart/cartSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    users: userReducer,
    orders: orderReducer,
    singleProduct: singleProductReducer,
    cart: cartReducer,
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch