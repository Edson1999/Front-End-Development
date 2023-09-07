import { configureStore } from '@reduxjs/toolkit';
import { drinkSlice } from '../slice/drinkSlice';

export const store = configureStore({
  reducer: {
    drinks: drinkSlice.reducer,
  },
});
