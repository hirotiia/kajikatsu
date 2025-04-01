import { RenderMembersTasks } from '@/features/dashboard/components/render-members-tasks';
import { fetchTasks } from '@/lib/supabase/data/tasks/select/fetch-tasks';
import { fetchMembersId } from '@/lib/supabase/data/users/fetch-members-id';
import { fetchUserData } from '@/lib/supabase/user/fetch-user-data';
import { Task } from '@/types/task.types';

type MemberWithTasks = {
  user_id: string;
  username: string;
  avatar_url: string | null;
  role: string;
  tasks: Task[];
};

type DashboardAllMembersTasksProps = {
  groupId: string;
  className?: string;
};
export const DashboardAllMembersTasks = async ({
  groupId,
  className,
}: DashboardAllMembersTasksProps) => {
  const [groupTasksResult, groupMembersId] = await Promise.all([
    fetchTasks({ groupId }),
    fetchMembersId(groupId),
  ]);

  const groupTasks = groupTasksResult.data || [];

  const membersWithTasks: MemberWithTasks[] = await Promise.all(
    groupMembersId.map(async (userId) => {
      const userData = await fetchUserData(userId);

      if (!userData) {
        return {
          user_id: userId,
          username: '不明なユーザー',
          avatar_url: null,
          role: 'unknown',
          tasks: [],
        };
      }

      const userTasks = groupTasks.filter((task) => task.assigneeId === userId);

      return {
        user_id: userId,
        username: userData.username,
        avatar_url: userData.avatar_url,
        role: userData.group?.role.name || 'viewer',
        tasks: userTasks,
      };
    }),
  );

  return (
    <RenderMembersTasks
      groupId={groupId}
      className={className}
      initialState={membersWithTasks}
    />
  );
};
