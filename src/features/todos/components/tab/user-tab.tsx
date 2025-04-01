import { fetchStatus } from '@/lib/supabase/data/statuses/select/fetch-status';
import { fetchTasks } from '@/lib/supabase/data/tasks/select/fetch-tasks';

import { ClientUserTab } from './client-user-tab';

type UserTabProps = {
  userId: string;
};

export const UserTab = async ({ userId }: UserTabProps) => {
  const [tasksResult, statusList] = await Promise.all([
    fetchTasks({
      createdBy: userId,
      groupId: null,
    }),
    fetchStatus(),
  ]);

  const { data: tasksData } = tasksResult;

  return (
    <ClientUserTab
      userId={userId}
      initialTasks={tasksData ?? []}
      statusList={statusList}
    />
  );
};
