import { configureStore } from '@reduxjs/toolkit';
import authReducer from './sliceAuth';
import cartReducer from './sliceCart';

export default configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});
