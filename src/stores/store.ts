import { configureStore } from '@reduxjs/toolkit';

import { reducer as notificationsReducer } from '@/stores/notifications';
import { reducer as userReducer } from '@/stores/user';

export const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
