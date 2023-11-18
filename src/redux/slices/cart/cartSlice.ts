import { createSlice } from '@reduxjs/toolkit'

import { CartState } from '../../../types/CartType';

const data = localStorage.getItem('cart') !== null ? JSON.parse(String(localStorage.getItem('cart'))) : [];

const initialState: CartState = {
  cartItems: data,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
    },
  }
})

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;