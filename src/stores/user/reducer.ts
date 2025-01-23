import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getUserData } from '@/lib/supabase/user/fetch-user-data';
import { UserState } from '@/types/user-state.types';

const initialState: UserState = {
  id: '',
  username: '',
  avatar_url: '',
  group: null,
};

/**
 * ユーザーデータを取得する非同期アクション
 */
export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (userId: string) => {
    const userData = await getUserData(userId);
    if (!userData) {
      throw new Error('ユーザーデータの取得に失敗しました。');
    }
    return userData;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, () => {});
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      // データ取得成功時に state を更新
      return action.payload;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      // データ取得失敗時のロジック（必要に応じて追加）
      console.error(action.error.message);
    });
  },
});

export default userSlice.reducer;
