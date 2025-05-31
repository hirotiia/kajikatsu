import { configureStore } from '@reduxjs/toolkit';

import { reducer as notificationsReducer } from '@/stores/notifications';

export const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
