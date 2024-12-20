import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';
import { getUser } from '@/lib/supabase/user/user';

/**
 * ユーザーが所属するグループ名と、そのグループに所属するメンバー一覧を取得し、JSONで返すAPIハンドラー。
 * 成功時:
 *   {
 *     "group_name": string | null,
 *     "group_members": Array<{
 *        "username": string;
 *        "avatar_url": string;
 *        "role": string;
 *     }>
 *   }
 * エラー時には、HTTPステータスコードとエラーメッセージを含むJSONを返す。
 */

type GroupMember = {
  username: string;
  avatar_url: string;
  role: string;
};

export type GroupResponse = {
  group_name: string | null;
  group_members: GroupMember[];
};

export async function GET() {
  const supabase = await createClient();
  const { user, authError } = await getUser();

  if (authError || !user) {
    return NextResponse.json(
      { error: 'User not authenticated' },
      { status: 401 },
    );
  }

  // 現在のユーザーが所属するグループIDを取得
  const { data: userGroupData, error: userGroupError } = await supabase
    .from('user_groups')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (userGroupError || !userGroupData) {
    return NextResponse.json(
      { error: 'ユーザーのグループ情報の取得に失敗しました' },
      { status: 500 },
    );
  }

  const { group_id } = userGroupData;

  // 同じグループ内の全メンバーと役割、グループ名を取得
  const { data: groupMembersData, error: groupMembersError } = await supabase
    .from('user_groups')
    .select(`user_id, users(username, avatar_url), roles(name), groups(name)`)
    .eq('group_id', group_id);

  if (groupMembersError || !groupMembersData) {
    return NextResponse.json(
      { error: 'グループメンバーの取得に失敗しました。' },
      { status: 500 },
    );
  }

  // グループ名（全メンバー共通のため先頭要素から取得）
  const groupName = groupMembersData[0]?.groups?.name;

  // メンバー情報を整形
  const members = groupMembersData.map((member: any) => ({
    username: member.users.username,
    avatar_url: member.users.avatar_url,
    role: member.roles.name,
  }));

  return NextResponse.json({ group_name: groupName, group_members: members });
}
