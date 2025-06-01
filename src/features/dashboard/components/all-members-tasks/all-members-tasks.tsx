import { Text } from '@/components/ui/text';
import { fetchTasks } from '@/lib/supabase/data/tasks/select/fetch-tasks';
import { fetchMembersId } from '@/lib/supabase/data/users/fetch-members-id';
import { fetchUserData } from '@/lib/supabase/user/fetch-user-data';
import { fetchUserProfileRpc } from '@/lib/supabase/user/fetch-user-profile-rpc';
import { Task } from '@/types/task.types';

import { RenderMembersTasks } from './render-members-tasks';

type MemberWithTasks = {
  user_id: string;
  username: string;
  avatar_url: string | null;
  role: string;
  tasks: Task[];
};

export const AllMembersTasks = async () => {
  const user = await fetchUserProfileRpc();

  if (!user) {
    return <Text>ユーザー情報の取得に失敗しました。</Text>;
  }

  if (!user.group) {
    return <Text>グループ内の未担当タスクが表示されます。</Text>;
  }

  const groupId = user?.group.id;
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
      className="mt-6"
      initialState={membersWithTasks}
    />
  );
};
