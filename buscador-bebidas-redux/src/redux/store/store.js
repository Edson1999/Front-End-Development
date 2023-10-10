import { configureStore } from '@reduxjs/toolkit';
import { drinkSlice } from '../slice/drinkSlice';

/* This code is creating a Redux store using the `configureStore` function from the `@reduxjs/toolkit`
library. The store is configured with a single reducer called `drinks`, which is the reducer
exported from the `drinkSlice` module. The resulting store is then exported as `store`. */
export const store = configureStore({
  reducer: {
    drinks: drinkSlice.reducer,
  },
});
