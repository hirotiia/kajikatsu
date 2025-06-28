import { createClient } from '@/lib/supabase/server';
import { Result } from '@/types/result.types';

import { getUser } from '../../user/user';

/**
 * 指定されたユーザーIDに基づいてユーザープロファイルを取得する関数
 */
export type UserProfile = {
  id: string;
  username: string | null;
  avatar_url: string | null;
};

export const getUserProfile = async (): Promise<Result<UserProfile>> => {
  const supabase = await createClient();

  try {
    const { user, authError } = await getUser();

    if (authError || !user) {
      throw new Error('ユーザーが認証されていません。');
    }

    const { data, error } = await supabase
      .from('users')
      .select('id, username, avatar_url')
      .eq('id', user.id)
      .single();

    if (error || !data) {
      throw new Error('ユーザーデータを取得できませんでした。');
    }

    const userProfile: UserProfile = {
      id: data.id,
      username: data.username,
      avatar_url: data.avatar_url,
    };

    return { data: userProfile, error: null };
  } catch (error) {
    let errorMessage = '予期しないエラーが発生しました。';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return { data: null, error: errorMessage };
  }
};
