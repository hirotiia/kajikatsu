import { createClient } from '@/lib/supabase/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId || typeof userId !== 'string') {
    return new Response(JSON.stringify({ error: 'Invalid user ID' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const supabase = await createClient();
  const { data: role } = await supabase
    .from('roles')
    .select('id')
    .eq('name', 'owner')
    .single();

  const role_id = role?.id;

  if (!role_id) {
    return new Response(
      JSON.stringify({ error: 'グループ内の権限の取得に失敗しました。' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  // 現在のユーザーの所属グループで`owner`の権限を持つグループを取得
  const { data: userGroup, error: userGroupError } = await supabase
    .from('user_groups')
    .select('group_id')
    .eq('user_id', userId)
    .eq('role_id', role_id)
    .single();

  if (userGroupError || !userGroup) {
    return new Response(
      JSON.stringify({
        error:
          userGroupError?.message ||
          'The user does not belong to any group as owner',
      }),
      {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  const { group_id } = userGroup;

  // 参加リクエストを取得
  const { data: joinRequests, error: joinRequestError } = await supabase
    .from('join_requests')
    .select(
      `id,invitation_id,user_id,requested_at,status,group_invitations (group_id,groups (name)), users (username)`,
    )
    .eq('group_invitations.group_id', group_id)
    .eq('status', 'pending');

  if (joinRequestError || !joinRequests) {
    return new Response(
      JSON.stringify({
        error: joinRequestError?.message || 'Failed to fetch join requests',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }

  return new Response(JSON.stringify(joinRequests), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
