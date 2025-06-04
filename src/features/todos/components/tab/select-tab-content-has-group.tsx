import { GroupUserTab } from '@/features/todos/components/tab/group-user-tab';
import { UserTab } from '@/features/todos/components/tab/user-tab';
import { createTRPCContext } from '@/trpc/init';
import { createCaller } from '@/trpc/routers/_app';

export const SelectTabContentHasGroup = async () => {
  const ctx = await createTRPCContext();
  const caller = createCaller(ctx);
  const user = await caller.userProfile.getUserProfile();

  if (!user) {
    return <p>ユーザー情報を取得できませんでした。</p>;
  }

  const hasGroup: boolean = !!user?.group;

  return hasGroup ? (
    <GroupUserTab userId={user.userId} groupId={user.group?.id ?? ''} />
  ) : (
    <UserTab userId={user.userId} />
  );
};
