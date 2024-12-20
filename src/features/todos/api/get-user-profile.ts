import useSWR from 'swr';

import { UserProfile } from '@/lib/supabase/data/users/get-user-profile';
import { Result } from '@/types/result.types';

/**
 * クライアントサイドで呼び出すためのユーザープロファイル取得関数
 * サーバーサイドAPIエンドポイントを介してデータを取得します。
 */

const fetcher = async (url: string): Promise<Result<UserProfile>> => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        data: null,
        error: result.error || 'プロフィールの取得に失敗しました。',
      };
    }

    return { data: result.data, error: null };
  } catch (error) {
    let errorMessage = '予期しないエラーが発生しました。';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { data: null, error: errorMessage };
  }
};

export const useUserProfile = () => {
  const { data, error } = useSWR<Result<UserProfile>>(
    '/api/user/profile',
    fetcher,
  );

  return {
    profile: data?.data,
    isLoading: !error && !data,
    isError: error || data?.error,
  };
};
