import { configureStore } from '@reduxjs/toolkit';

import { reducer } from '@/stores/ducks/notifications/reducer';

export const store = configureStore({
  reducer: {
    notifications: reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
