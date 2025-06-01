import { createAsyncThunk, createSlice, Reducer } from '@reduxjs/toolkit';

import {
  fetchUserProfileClientRpc,
  UserProfile,
} from '@/lib/supabase/user/fetch-user-profile-client-rpc';

export type UserStoreState = {
  data: UserProfile | null;
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
  'user/fetchUserProfileClientRpc',
  async () => {
    const userData = await fetchUserProfileClientRpc();
    if (!userData) throw new Error('ユーザーデータの取得に失敗しました。');
    return userData;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateAvatarUrl: (state, action) => {
      if (state.data) {
        state.data.avatar_url = action.payload;
      }
    },
  },
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

export const { updateAvatarUrl } = userSlice.actions;
export default userSlice.reducer as Reducer<UserStoreState>;
