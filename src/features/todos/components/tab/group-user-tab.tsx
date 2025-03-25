import { fetchStatus } from '@/lib/supabase/data/statuses/select/fetch-status';
import { fetchTasksByUserId } from '@/lib/supabase/data/tasks/select/fetch-tasks-by-user-id';
import { fetchGroupMembers } from '@/lib/supabase/data/users/fetch-group-members';

import { ClientGroupUserTab } from './client-group-user-tab';

type GroupUserTabProps = {
  userId: string;
  groupId: string;
};

export const GroupUserTab = async ({ userId, groupId }: GroupUserTabProps) => {
  const [tasksResult, groupMembersResult, statusList] = await Promise.all([
    fetchTasksByUserId(userId, {
      filterType: 'assignee',
      filterValue: userId,
    }),
    groupId
      ? fetchGroupMembers(groupId)
      : Promise.resolve({ data: { group_members: [] }, error: null }),
    fetchStatus(),
  ]);

  const { data: tasksData } = tasksResult;
  const { data: groupMembersData } = groupMembersResult;

  const groupMembers = groupId ? (groupMembersData?.group_members ?? []) : null;

  return (
    <ClientGroupUserTab
      userId={userId}
      initialTasks={tasksData ?? []}
      statusList={statusList}
      groupMembers={groupMembers}
      groupId={groupId}
    />
  );
};
