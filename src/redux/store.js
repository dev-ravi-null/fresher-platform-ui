import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';  // Import combineReducers
import authReducer from './authSlice';
import fresherDetailsReducer from './fresherDetailsSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default to localStorage

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'fresherDetails'], // Specify which reducers to persist
};

// Combine your reducers
const rootReducer = combineReducers({
  auth: authReducer,
  fresherDetails: fresherDetailsReducer,
});

// Wrap your combined reducers with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
