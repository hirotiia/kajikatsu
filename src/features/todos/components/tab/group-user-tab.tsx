import { fetchStatus } from '@/lib/supabase/data/statuses/select/fetch-status';
import { fetchTasks } from '@/lib/supabase/data/tasks/select/fetch-tasks';
import { fetchGroupMembers } from '@/lib/supabase/data/users/fetch-group-members';

import { ClientGroupUserTab } from './client-group-user-tab';

type GroupUserTabProps = {
  userId: string;
  groupId: string;
};

export const GroupUserTab = async ({ userId, groupId }: GroupUserTabProps) => {
  const [tasksResult, groupMembersResult, statusList] = await Promise.all([
    fetchTasks({
      groupId,
      assigneeId: userId,
    }),
    fetchGroupMembers(groupId),
    fetchStatus(),
  ]);

  const { data: tasksData } = tasksResult;
  const { data: groupMembersData } = groupMembersResult;

  const groupMembers = groupMembersData?.group_members ?? [];

  return (
    <>
      <ClientGroupUserTab
        userId={userId}
        initialTasks={tasksData ?? []}
        statusList={statusList}
        groupMembers={groupMembers}
        groupId={groupId}
      />
    </>
  );
};
