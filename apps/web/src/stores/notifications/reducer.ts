import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

import { NotificationType } from '@/types/notification/notification.types';

type State = NotificationType[];

const initialState: State = [];

export const notification = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    add(state, action: PayloadAction<Omit<NotificationType, 'id'>>) {
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
