import { createRequestMembersTask } from '@/features/dashboard/api/create-request-members-task';
import { RenderRequestTasks } from '@/features/dashboard/components/render-request-tasks';

type DashboardRequestTasksProps = {
  groupId: string;
  className?: string;
};
export const DashboardRequestTasks = async ({
  groupId,
  className,
}: DashboardRequestTasksProps) => {
  const initialTasks = await createRequestMembersTask(groupId);
  return (
    <RenderRequestTasks
      className={className}
      groupId={groupId}
      initialData={initialTasks}
    />
  );
};
