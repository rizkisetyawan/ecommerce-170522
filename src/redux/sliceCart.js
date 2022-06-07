/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    count: 0,
  },
  reducers: {
    addCount: (state) => {
      state.count += 1;
    },
    reduceCount: (state) => {
      state.count -= 1;
    },
  },
});

export const { addCount, reduceCount } = cartSlice.actions;

export default cartSlice.reducer;
