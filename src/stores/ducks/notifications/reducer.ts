import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

export type Notification = {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
};

type State = Notification[];

const initialState: State = [];

const notification = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    add(state, action: PayloadAction<Omit<Notification, 'id'>>) {
      state.push({
        ...action.payload,
        id: nanoid(),
      });
    },
    remove(state, action: PayloadAction<{ id: string }>) {
      state.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { add, remove } = notification.actions;
export const { reducer } = notification;
