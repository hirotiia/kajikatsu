import { fetchTasksByUserIdClient } from '@/lib/supabase/data/tasks/select/fetch-tasks-by-user-id-client';
import { fetchGroupMembersClient } from '@/lib/supabase/data/users/fetch-group-members-client';
import { Task } from '@/types/task.types';

export type MemberWithTasks = {
  user_id: string;
  username: string;
  avatar_url: string;
  role: string;
  tasks: Task[];
};

export type GroupMembersTasks = {
  members: MemberWithTasks[];
};

export const createGroupMembersTaskClient = async (groupId: string) => {
  try {
    const { data, error } = await fetchGroupMembersClient(groupId);

    if (error) {
      throw new Error(error);
    }

    const groupMembers = data?.group_members ?? [];

    // 各メンバーの担当タスクをまとめて取得
    const memberTasksPromises = groupMembers.map(async (member) => {
      const tasksResult = await fetchTasksByUserIdClient(member.user_id, {
        filterType: 'assignee',
        filterValue: member.user_id,
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

    const result: GroupMembersTasks = {
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
