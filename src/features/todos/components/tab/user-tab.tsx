import { fetchStatus } from '@/lib/supabase/data/statuses/select/fetch-status';
import { fetchTasksByUserId } from '@/lib/supabase/data/tasks/select/fetch-tasks-by-user-id';

import { ClientUserTab } from './client-user-tab';

type UserTab = {
  userId: string;
};

export const UserTab = async ({ userId }: UserTab) => {
  const { data: tasks } = await fetchTasksByUserId(userId, {
    filterType: 'assignee',
    filterValue: userId,
  });

  const initialTasks = tasks ?? [];

  const statusList = await fetchStatus();

  return (
    <ClientUserTab
      userId={userId}
      initialTasks={initialTasks}
      statusList={statusList}
    />
  );
};
