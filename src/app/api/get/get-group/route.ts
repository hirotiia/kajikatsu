import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';
import { getUser } from '@/lib/supabase/user/user';

export async function GET() {
  const supabase = await createClient();
  const { user, authError } = await getUser();

  if (authError || !user) {
    return NextResponse.json(
      { error: 'User not authenticated' },
      { status: 401 },
    );
  }

  // ユーザーのグループ情報を取得
  const { data: userGroupData, error: userGroupError } = await supabase
    .from('user_groups')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (userGroupError || !userGroupData) {
    return NextResponse.json(
      { error: 'Failed to fetch user group data' },
      { status: 500 },
    );
  }

  const { group_id } = userGroupData;

  // 同じグループのメンバーと権限を取得
  const { data: groupMembersData, error: groupMembersError } = await supabase
    .from('user_groups')
    .select(`user_id, users(username, avatar_url), roles(name), groups(name)`)
    .eq('group_id', group_id);

  if (groupMembersError || !groupMembersData) {
    return NextResponse.json(
      { error: 'Failed to fetch group members data' },
      { status: 500 },
    );
  }

  const groupName = groupMembersData[0]?.groups?.name;

  // 整形
  const members = groupMembersData.map((member: any) => ({
    username: member.users.username,
    avatar_url: member.users.avatar_url,
    role: member.roles.name,
  }));

  return NextResponse.json({ group_name: groupName, group_members: members });
}
