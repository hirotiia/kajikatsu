import { createRequestMembersTask } from '@/features/dashboard/api/create-request-members-task';
import { RenderRequestTasks } from '@/features/dashboard/components/render-request-tasks';

type DashboardRequestTasksProps = {
  groupId: string;
};
export const DashboardRequestTasks = async ({
  groupId,
}: DashboardRequestTasksProps) => {
  const initialTasks = await createRequestMembersTask(groupId);
  return <RenderRequestTasks groupId={groupId} initialData={initialTasks} />;
};
