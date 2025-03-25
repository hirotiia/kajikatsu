import { fetchStatus } from '@/lib/supabase/data/statuses/select/fetch-status';
import { fetchTasksByUserId } from '@/lib/supabase/data/tasks/select/fetch-tasks-by-user-id';
import { fetchGroupMembers } from '@/lib/supabase/data/users/fetch-group-members';

import { ClientUserTab } from './client-user-tab';

type GroupUserTabProps = {
  userId: string;
  groupId: string;
};

export const GroupUserTab = async ({ userId, groupId }: GroupUserTabProps) => {
  const [tasksResult, groupMembersResult] = await Promise.all([
    fetchTasksByUserId(userId, {
      filterType: 'assignee',
      filterValue: userId,
    }),
    groupId
      ? fetchGroupMembers(groupId)
      : Promise.resolve({ data: { group_members: [] }, error: null }),
  ]);

  const initialTasks = tasksResult.data ?? [];
  const groupMembers = groupId
    ? (groupMembersResult.data?.group_members ?? [])
    : null;

  const statusList = await fetchStatus();

  return (
    <ClientUserTab
      userId={userId}
      initialTasks={initialTasks}
      statusList={statusList}
      groupMembers={groupMembers}
      groupId={groupId}
    />
  );
};
