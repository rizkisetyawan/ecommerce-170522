/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    user: null,
    toko: null,
  },
  reducers: {
    updateAuth: (state, action) => {
      localStorage.setItem('token', action.payload);
      state.token = action.payload;
    },
    updateIdentity: (state, action) => {
      state.user = action.payload.user;
      state.toko = action.payload.toko;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    removeAuthIdentity: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.user = null;
      state.toko = null;
    },
  },
});

export const {
  updateAuth,
  updateIdentity,
  updateUser,
  removeAuthIdentity,
} = authSlice.actions;

export default authSlice.reducer;
