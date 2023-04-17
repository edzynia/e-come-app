import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getFromLocalStorage } from '../../utils/getFromLocalStorage';
import { calcTotatCount, calcTotatPrice } from '../../utils/calcTotat';
import { CartItem, CartSliceState } from '../types';

const { items, totalCount, totalPrice } = getFromLocalStorage();

const initialState: CartSliceState = {
  totalPrice,
  totalCount,
  items,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotatPrice(state.items);
      state.totalCount = calcTotatCount(state.items);
    },

    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = calcTotatPrice(state.items);
      state.totalCount = calcTotatCount(state.items);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },

    minusItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem && findItem.count > 0) {
        findItem.count--;
      }
      state.totalPrice = calcTotatPrice(state.items);
      state.totalCount = calcTotatCount(state.items);
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
