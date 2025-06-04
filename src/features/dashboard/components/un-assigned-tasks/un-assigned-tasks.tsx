import { Text } from '@/components/ui/text';
import { fetchTasks } from '@/lib/supabase/data/tasks/select/fetch-tasks';
import { createTRPCContext } from '@/trpc/init';
import { createCaller } from '@/trpc/routers/_app';

import { RenderRequestTasks } from './render-request-tasks';

export const UnAssignedTasks = async () => {
  const ctx = await createTRPCContext();
  const caller = createCaller(ctx);
  const user = await caller.userProfile.getUserProfile();

  if (!user) {
    return <Text>ユーザー情報の取得に失敗しました。</Text>;
  }

  if (!user.group) {
    return <Text>グループ内の未担当タスクが表示されます。</Text>;
  }

  const groupId = user.group.id;
  const resultTasks = await fetchTasks({
    groupId,
    assigneeId: null,
  });

  const initialTasks = resultTasks.data || [];
  return <RenderRequestTasks groupId={groupId} initialData={initialTasks} />;
};
