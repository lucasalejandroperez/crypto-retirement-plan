import { configureStore } from '@reduxjs/toolkit';
import web3Slice from './slices/web3Slice';
import plansSlice from './slices/plansSlice';

export const store = configureStore({
  reducer: {
    web3: web3Slice,
    plans: plansSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
