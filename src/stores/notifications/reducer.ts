import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

export type Notification = {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  status: number;
  message?: string;
};

type State = Notification[];

const initialState: State = [];

export const notification = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    add(state, action: PayloadAction<Omit<Notification, 'id'>>) {
      // ミュータブルな操作がImmerというライブラリでイミュータブルに操作できる
      state.push({
        ...action.payload,
        id: nanoid(),
      });
    },
    remove(state, action: PayloadAction<{ id: string }>) {
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});
