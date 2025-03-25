import { fetchStatus } from '@/lib/supabase/data/statuses/select/fetch-status';
import { fetchTasksByUserId } from '@/lib/supabase/data/tasks/select/fetch-tasks-by-user-id';

import { ClientUserTab } from './client-user-tab';

type UserTabProps = {
  userId: string;
};

export const UserTab = async ({ userId }: UserTabProps) => {
  const [tasksResult, statusList] = await Promise.all([
    fetchTasksByUserId(userId, {
      filterType: 'assignee',
      filterValue: userId,
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
