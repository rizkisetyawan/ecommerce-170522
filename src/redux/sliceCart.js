/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    count: 0,
    data: [],
  },
  reducers: {
    addCount: (state) => {
      state.count += 1;
    },
    reduceCount: (state) => {
      state.count -= 1;
    },
    initCart: (state, action) => {
      state.data = action.payload;
    },
    addCart: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const {
  addCount,
  reduceCount,
  addCart,
  initCart,
} = cartSlice.actions;

export default cartSlice.reducer;
