import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';

import cartReducer from './Slices/cartSlice';
import bookmarksReducer from './Slices/bookmarkSlice';
import authReducer from './Slices/authSlice';
import foodReducer from './Slices/foodSlice';

// Configure persistence for auth reducer
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'isAuthenticated'] // only persist these fields
};

// Combine all reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  bookmarks: bookmarksReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  food: foodReducer,
});

// Create the store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Create the persistor
export const persistor = persistStore(store);