import { createClient } from '@/lib/supabase/server';
import { FunctionReturn } from '@/types/supabase/database.types';
import { logErrorToSentry } from '@/utils/log-error-to-sentry';

export type UserProfile = FunctionReturn<'get_user_profile'>;

/**
 * 指定したユーザーIDに基づいてユーザーデータとグループ情報を取得する。
 * userId が指定されていない場合は、現在ログイン中のユーザーIDを利用する。
 * @param userId ユーザーID(任意)
 * @returns State 型に一致するオブジェクト
 */
export async function fetchUserProfileRpc(): Promise<UserProfile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc('get_user_profile', {});

  if (error) {
    logErrorToSentry(error, {
      location: 'fetchUserProfileRpc',
      tags: {
        function: 'get_user_profile',
        severity: 'auth',
      },
    });

    throw new Error(error.message);
  }

  return data;
}
