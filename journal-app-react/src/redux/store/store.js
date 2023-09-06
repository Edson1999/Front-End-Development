import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../slice/auth';
import { journalSlice } from '../slice/journal';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    journal: journalSlice.reducer,
  },
});
