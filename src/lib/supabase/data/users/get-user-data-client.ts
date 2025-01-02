import { createClient } from '@/lib/supabase/client';

export type UserData = {
  userId: string;
  userName: string | null;
  userAvatarUrl: string | null;
  groupId?: string | null;
  groupName?: string | null;
};

/**
 * 指定したユーザーIDに対して:
 * - usersテーブル (username, avatar_url)
 * - groupsテーブル (name)
 * を結合し、ユーザーが所属するグループ情報をまとめて返却する。
 */
export async function getUserDataClient(
  userId: string,
): Promise<UserData | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('user_groups')
    .select(
      `
        user_id,
        users ( username, avatar_url ),
        group_id,
        groups ( name )
      `,
    )
    .eq('user_id', userId)
    .single();

  if (error || !data) {
    console.error('[getUserData] error:', error);
    return null;
  }

  return {
    userId: data.user_id,
    userName: data.users?.username ?? null,
    userAvatarUrl: data.users?.avatar_url ?? null,
    groupId: data.group_id ?? null,
    groupName: data.groups?.name ?? null,
  };
}
