import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Slices/cartSlice';
import bookmarksReducer from './Slices/bookmarkSlice';
import authReducer from './Slices/authSlice';
import foodReducer from './Slices/foodSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    bookmarks: bookmarksReducer,
    auth: authReducer,
    food: foodReducer,
  },
});