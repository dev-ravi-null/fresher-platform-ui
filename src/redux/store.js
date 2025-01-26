import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import fresherDetailsReducer from './fresherDetailsSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    fresherDetails: fresherDetailsReducer,
  },
});
