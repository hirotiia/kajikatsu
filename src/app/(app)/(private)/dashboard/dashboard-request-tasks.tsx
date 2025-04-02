import { RenderRequestTasks } from '@/features/dashboard/components/render-request-tasks';
import { fetchTasks } from '@/lib/supabase/data/tasks/select/fetch-tasks';

type DashboardRequestTasksProps = {
  groupId: string;
};
export const DashboardRequestTasks = async ({
  groupId,
}: DashboardRequestTasksProps) => {
  const resultTasks = await fetchTasks({
    groupId,
    assigneeId: null,
  });

  const initialTasks = resultTasks.data || [];
  return <RenderRequestTasks groupId={groupId} initialData={initialTasks} />;
};
