import { RenderGroupMembers } from '@/features/group/components/render-group-members';
import { checkPendingJoinRequest } from '@/lib/supabase/data/join-requests/select/check-pending-join-request';
import { fetchUserProfileRpc } from '@/lib/supabase/user/fetch-user-profile-rpc';

export const GroupMembers = async () => {
  const user = await fetchUserProfileRpc();

  if (!user) {
    return <h2>ユーザー情報を取得できませんでした。</h2>;
  }

  const hasPendingRequest = await checkPendingJoinRequest(user.userId);

  if (hasPendingRequest) {
    return <h2>リクエスト申請中です。</h2>;
  }
  const groupId = user.group?.id ?? null;
  return (
    <>
      {groupId ? (
        <RenderGroupMembers groupId={groupId} />
      ) : (
        <p>メンバーはいません。</p>
      )}
    </>
  );
};
