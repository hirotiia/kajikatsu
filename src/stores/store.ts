import { configureStore } from '@reduxjs/toolkit';

import { reducer } from '@/stores/notifications';

export const store = configureStore({
  reducer: {
    notifications: reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
