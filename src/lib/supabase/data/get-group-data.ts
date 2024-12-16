import { createClient } from '@/lib/supabase/server';

/**
 * ユーザーが所属するグループ名と、そのグループに所属するメンバー一覧を取得し、JSONで返すAPIハンドラー。
 * 成功時:
 *   {
 *     "group_name": string | null,
 *     "group_members": Array<{
 *        "user_id": string;
 *        "username": string;
 *        "avatar_url": string;
 *        "role": string;
 *     }>
 *   }
 * エラー時には、HTTPステータスコードとエラーメッセージを含むJSONを返す。
 */

export type GroupMember = {
  user_id: string;
  username: string;
  avatar_url: string;
  role: string;
};

export type GroupResponse = {
  group_name: string | null;
  group_members: GroupMember[];
};

export async function getGroupData(userId: string): Promise<GroupResponse> {
  const supabase = await createClient();

  // ユーザーのグループID取得
  const { data: userGroupData, error: userGroupError } = await supabase
    .from('user_groups')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (userGroupError || !userGroupData) {
    throw new Error('ユーザーのグループ情報の取得に失敗しました');
  }

  const { group_id } = userGroupData;

  // 同グループのメンバー一覧取得
  const { data: groupMembersData, error: groupMembersError } = await supabase
    .from('user_groups')
    .select(`user_id, users(username, avatar_url), roles(name), groups(name)`)
    .eq('group_id', group_id);

  if (groupMembersError || !groupMembersData || groupMembersData.length === 0) {
    throw new Error('グループメンバーの取得に失敗しました');
  }

  // グループ名
  const groupName = groupMembersData[0]?.groups?.name ?? null;

  // メンバー情報整形
  const members = groupMembersData.map((member: any) => ({
    user_id: member.user_id,
    username: member.users.username,
    avatar_url: member.users.avatar_url,
    role: member.roles.name,
  }));

  return { group_name: groupName, group_members: members };
}
