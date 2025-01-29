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

export const createRequestMembersTask = async (groupId: string) => {
  try {
    const { data, error } = await fetchGroupMembers(groupId);

    if (error) {
      throw new Error(error);
    }

    const groupMembers = data?.group_members ?? [];

    // 各メンバーの担当タスクをまとめて取得
    const memberTasksPromises = groupMembers.map(async (member) => {
      const tasksResult = await fetchTasksByUserId(member.user_id, {
        filterType: 'assignee',
        filterValue: null,
      });

      const tasks = tasksResult.data ?? [];

      const memberWithTasks: MemberWithTasks = {
        ...member,
        tasks,
      };

      return memberWithTasks;
    });

    // すべてのメンバーのタスク取得を並列で待機
    const membersWithTasks = await Promise.all(memberTasksPromises);

    const result: RequestMembersTasks = {
      members: membersWithTasks,
    };

    return {
      data: result,
      error: null,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : String(error ?? '不明なエラー');

    return {
      data: { members: [] },
      error: errorMessage,
    };
  }
};
