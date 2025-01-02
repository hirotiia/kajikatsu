import { createClient } from '@/lib/supabase/server';

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
export async function getUserData(userId: string): Promise<UserData | null> {
  const supabase = await createClient();

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
    const { data: userData } = await supabase
      .from('users')
      .select(
        `
          username,
          avatar_url
        `,
      )
      .eq('id', userId)
      .single();

    return {
      userId: userId,
      userName: userData?.username ?? null,
      userAvatarUrl: userData?.avatar_url ?? null,
      groupId: null,
      groupName: null,
    };
  }

  return {
    userId: data.user_id,
    userName: data.users?.username ?? null,
    userAvatarUrl: data.users?.avatar_url ?? null,
    groupId: data.group_id ?? null,
    groupName: data.groups?.name ?? null,
  };
}
