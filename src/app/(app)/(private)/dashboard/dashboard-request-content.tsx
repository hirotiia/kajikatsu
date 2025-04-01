import { createRequestMembersTask } from '@/features/dashboard/api/create-request-members-task';
import { RenderRequestTasks } from '@/features/dashboard/components/render-request-tasks';

type DashboardRequestContentProps = {
  groupId: string;
  className?: string;
};
export const DashboardRequestContent = async ({
  groupId,
  className,
}: DashboardRequestContentProps) => {
  const initialTasks = await createRequestMembersTask(groupId);
  return (
    <RenderRequestTasks
      className={className}
      groupId={groupId}
      initialData={initialTasks}
    />
  );
};
