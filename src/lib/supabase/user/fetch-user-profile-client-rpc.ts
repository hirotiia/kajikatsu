import * as Sentry from '@sentry/nextjs';

import { createClient } from '@/lib/supabase/client';
import { FunctionReturn } from '@/types/supabase/database.types';

export type UserProfile = FunctionReturn<'get_user_profile'>;

/**
 * 指定したユーザーIDに基づいてユーザーデータとグループ情報を取得する。
 * userId が指定されていない場合は、現在ログイン中のユーザーIDを利用する。
 * @param userId ユーザーID(任意)
 * @returns State 型に一致するオブジェクト
 */
export async function fetchUserProfileClientRpc(): Promise<UserProfile | null> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc('get_user_profile', {});

  if (error) {
    Sentry.captureException(error, {
      extra: {
        location: 'fetchUserProfileRpc',
        timestamp: new Date().toISOString(),
      },
      tags: {
        function: 'get_user_profile',
        severity: 'auth',
      },
    });

    throw new Error(error.message);
  }

  return data;
}
