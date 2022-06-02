import { configureStore } from '@reduxjs/toolkit';
import authReducer from './sliceAuth';

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
