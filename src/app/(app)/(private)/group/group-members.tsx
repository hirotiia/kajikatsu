import { RenderGroupMembers } from '@/features/group/components/render-group-members';
import { checkPendingJoinRequest } from '@/lib/supabase/data/join-requests/select/check-pending-join-request';
import { fetchUserData } from '@/lib/supabase/user/fetch-user-data';
import { getUser } from '@/lib/supabase/user/user';
import { UserState } from '@/types/user-state.types';

export const GroupMembers = async () => {
  const { user } = await getUser();

  if (!user) {
    return <p>ユーザー情報が取得できませんでした。</p>;
  }

  const userState: UserState | null = await fetchUserData(user.id);

  if (!userState) {
    return <h2>ユーザー情報を取得できませんでした。</h2>;
  }

  const hasPendingRequest = await checkPendingJoinRequest(user.id);

  if (hasPendingRequest) {
    return <h2>リクエスト申請中です。</h2>;
  }
  const groupId = userState.group?.id ?? null;
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
