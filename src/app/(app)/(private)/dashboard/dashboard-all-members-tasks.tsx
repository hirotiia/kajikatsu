import { createGroupMembersTask } from '@/features/dashboard/api/create-group-members-task';
import { RenderMembersTasks } from '@/features/dashboard/components/render-members-tasks';

type DashboardAllMembersTasksProps = {
  groupId: string;
  className?: string;
};
export const DashboardAllMembersTasks = async ({
  groupId,
  className,
}: DashboardAllMembersTasksProps) => {
  const initialTasks = await createGroupMembersTask(groupId);

  return (
    <RenderMembersTasks
      groupId={groupId}
      className={className}
      initialState={initialTasks}
    />
  );
};
