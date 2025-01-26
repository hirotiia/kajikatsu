import { createAsyncThunk, createSlice, Reducer } from '@reduxjs/toolkit';

import { fetchUserData } from '@/lib/supabase/user/fetch-user-data';
import { UserState } from '@/types/user-state.types';

export type UserStoreState = {
  data: UserState | null;
  loading: boolean;
  error: string | null;
};

const initialState: UserStoreState = {
  data: null,
  loading: false,
  error: null,
};

/**
 * ユーザーデータを取得する非同期アクション
 */
export const fetchAsyncUserData = createAsyncThunk(
  'user/fetchUserData',
  async (userId: string) => {
    const userData = await fetchUserData(userId);
    if (!userData) throw new Error('ユーザーデータの取得に失敗しました。');
    return userData;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncUserData.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.data = null;
    });
    builder.addCase(fetchAsyncUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(fetchAsyncUserData.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.error.message ?? 'ユーザー情報の取得中にエラーが発生しました。';
      state.data = null;
    });
  },
});

export default userSlice.reducer as Reducer<UserStoreState>;
