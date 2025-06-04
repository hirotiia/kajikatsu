import { RenderGroupMembers } from '@/features/group/components/render-group-members';
import { checkPendingJoinRequest } from '@/lib/supabase/data/join-requests/select/check-pending-join-request';
import { createTRPCContext } from '@/trpc/init';
import { createCaller } from '@/trpc/routers/_app';

export const GroupMembers = async () => {
  const ctx = await createTRPCContext();
  const caller = createCaller(ctx);
  const user = await caller.userProfile.getUserProfile();

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
