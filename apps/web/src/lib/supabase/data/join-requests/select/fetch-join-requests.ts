import { createClient } from '@/lib/supabase/client';
import { toJstString } from '@/utils/to-jst-string';

/**
 * 指定したユーザーが「owner」権限を持つグループのうち、
 * status が pending の参加リクエストを取得します。
 *
 * @param userId - 対象ユーザーのID
 * @returns 該当する参加リクエストの配列。該当がない場合は空配列を返します。
 */
export const fetchJoinRequests = async (userId: string) => {
  const supabase = createClient();

  // roles テーブルから「owner」ロールのIDを取得
  const { data: role, error: roleError } = await supabase
    .from('roles')
    .select('id')
    .eq('name', 'owner')
    .single();

  if (roleError || !role) {
    throw new Error('「owner」権限のロールID取得に失敗しました。');
  }

  // user_groups から、指定ユーザーが「owner」権限を持つグループを特定
  const { data: userGroup, error: userGroupError } = await supabase
    .from('user_groups')
    .select('group_id')
    .eq('user_id', userId)
    .eq('role_id', role.id)
    .maybeSingle();

  if (userGroupError) {
    throw new Error(userGroupError.message);
  }

  // 該当するグループがない場合は空配列を返却
  if (!userGroup) {
    return [];
  }

  // join_requests テーブルから該当グループかつ status が pending のリクエストを取得
  const { data: joinRequests, error: joinRequestsError } = await supabase
    .from('join_requests')
    .select(
      `id,
       invitation_id,
       user_id,
       requested_at,
       status,
       group_invitations (
         group_id,
         expires_at,
         groups ( name )
       ),
       users ( username )`,
    )
    .eq('group_invitations.group_id', userGroup.group_id)
    .eq('status', 'pending');

  if (joinRequestsError || !joinRequests) {
    throw new Error(
      joinRequestsError?.message ?? '参加リクエストの取得に失敗しました。',
    );
  }

  const nowJst = new Date(toJstString(new Date().toISOString()));

  // 有効期限を確認
  const validRequests = joinRequests.filter((request) => {
    const expiresAt = request.group_invitations?.expires_at;
    if (!expiresAt) return true;

    const expiresAtJst = new Date(toJstString(expiresAt));

    return expiresAtJst.getTime() > nowJst.getTime();
  });

  return validRequests;
};
