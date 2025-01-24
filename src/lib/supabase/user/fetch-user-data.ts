import { createClient } from '@/lib/supabase/server';
import { UserState } from '@/types/user-state.types';

// TODO: 最終的にはユーザー情報の取得はこのファイルのみにする。
/**
 * 指定したユーザーIDに基づいてユーザーデータとグループ情報を取得する。
 * @param userId ユーザーID
 * @returns State 型に一致するオブジェクト
 */
export async function fetchUserData(userId: string): Promise<UserState | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('user_groups')
    .select(
      `
        users ( username, avatar_url ),
        group_id,
        groups ( name ),
        role_id,
        roles ( id, name )
      `,
    )
    .eq('user_id', userId)
    .single();

  if (error || !data) {
    // グループ未所属のユーザー情報を取得
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('username, avatar_url')
      .eq('id', userId)
      .single();

    // ユーザー情報も存在しない場合は null を返却
    if (userError || !userData) {
      return null;
    }

    return {
      username: userData?.username || '',
      avatar_url: userData?.avatar_url || null,
      group: null,
    };
  }

  return {
    username: data.users?.username || '',
    avatar_url: data.users?.avatar_url || null,
    group: data.group_id
      ? {
          id: data.group_id,
          name: data.groups?.name || '',
          role: {
            id: data.roles?.id || '',
            name:
              (data.roles?.name as 'viewer' | 'editor' | 'admin') || 'viewer',
          },
        }
      : null,
  };
}
