import { notFound } from 'next/navigation';

import { AssignButton } from '@/components/ui/button';
import { Cards } from '@/components/ui/card';
import { fetchTasksByUserId } from '@/lib/supabase/data/tasks/select/fetch-tasks-by-user-id';
import { fetchGroupMembers } from '@/lib/supabase/data/users/fetch-group-members';

type RenderRequestTasksProps = {
  className?: string;
  groupId: string;
};

export const RenderRequestTasks = async ({
  className,
  groupId,
}: RenderRequestTasksProps) => {
  const { data: groupResult, error: groupError } =
    await fetchGroupMembers(groupId);
  if (groupError || !groupResult) {
    return notFound();
  }

  const groupMembers = groupResult.group_members;

  const allTasks = [];
  for (const member of groupMembers) {
    const { data: tasks, error: tasksError } = await fetchTasksByUserId(
      member.user_id,
      { filterType: 'assignee', filterValue: null },
    );
    if (tasksError) {
      console.error(tasksError);
      continue;
    }
    if (tasks) {
      allTasks.push(...tasks);
    }
  }

  if (allTasks.length === 0) {
    return <p>現在、担当者がいないおしごとはありません。</p>;
  }

  const items = allTasks.map((task) => ({
    id: task.id,
    title: task.title,
    description: task.description,
    expiresAt: task.expiresAt,
    statusName: task.statusName,
  }));

  const renderActions = (item: (typeof items)[number]) => {
    return [<AssignButton key="assign" taskId={item.id} />];
  };

  return (
    <Cards items={items} className={className} renderActions={renderActions} />
  );
};
