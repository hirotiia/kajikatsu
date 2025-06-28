import { Text } from '@/components/ui/text';
import { GroupUserTab } from '@/features/todos/components/tab/group-user-tab';
import { UserTab } from '@/features/todos/components/tab/user-tab';
import { createTRPCContext } from '@/trpc/init';
import { createCaller } from '@/trpc/routers/_app';

// import { TodoTab } from '../todo-tab';

export const SelectTabContentHasGroup = async () => {
  const ctx = await createTRPCContext();
  const caller = createCaller(ctx);
  const user = await caller.userProfile.getUserProfile();

  if (!user) {
    return <Text>ユーザー情報を取得できませんでした。</Text>;
  }

  const hasGroup: boolean = !!user?.group;

  return hasGroup ? (
    <>
      <GroupUserTab userId={user.userId} groupId={user.group?.id ?? ''} />
      {/* <TodoTab /> */}
    </>
  ) : (
    <UserTab userId={user.userId} />
  );
};
