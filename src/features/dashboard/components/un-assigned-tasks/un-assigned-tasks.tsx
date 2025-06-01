import { Text } from '@/components/ui/text';
import { fetchTasks } from '@/lib/supabase/data/tasks/select/fetch-tasks';
import { fetchUserProfileRpc } from '@/lib/supabase/user/fetch-user-profile-rpc';

import { RenderRequestTasks } from './render-request-tasks';

export const UnAssignedTasks = async () => {
  const user = await fetchUserProfileRpc();

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
