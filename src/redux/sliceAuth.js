/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
  },
  reducers: {
    updateAuth: (state, action) => {
      localStorage.setItem('token', action.payload);
      state.token = action.payload;
    },
    remmoveAuth: () => {
      localStorage.removeItem('token');
    },
  },
});

export const { updateAuth, remmoveAuth } = authSlice.actions;

export default authSlice.reducer;
