import { fetchTasksByUserId } from '@/lib/supabase/data/tasks/select/fetch-tasks-by-user-id';
import { fetchGroupMembers } from '@/lib/supabase/data/users/fetch-group-members';
import { Task } from '@/types/task.types';

export type MemberWithTasks = {
  user_id: string;
  username: string;
  avatar_url: string;
  role: string;
  tasks: Task[];
};

export type RequestMembersTasks = {
  members: MemberWithTasks[];
};

export const createRequestMembersTask = async (
  groupId: string,
): Promise<RequestMembersTasks> => {
  try {
    const { data: groupData, error: groupError } =
      await fetchGroupMembers(groupId);

    if (groupError) {
      throw new Error(groupError);
    }

    const groupMembers = groupData?.group_members ?? [];

    // 各メンバーの担当タスクをまとめて取得
    const memberTasksPromises = groupMembers.map(async (member) => {
      const { data: tasks, error: taskError } = await fetchTasksByUserId(
        member.user_id,
        {
          filterType: 'assignee',
          filterValue: null,
        },
      );

      if (taskError) {
        throw new Error(taskError);
      }

      return {
        ...member,
        tasks: tasks ?? [],
      };
    });

    const membersWithTasks = await Promise.all(memberTasksPromises);

    return {
      members: membersWithTasks,
    };
  } catch (error: any) {
    console.error(error);
    return { members: [] };
  }
};
