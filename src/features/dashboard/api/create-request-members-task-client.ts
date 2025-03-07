'use client';

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

export type RequestMembersTasks = {
  members: MemberWithTasks[];
};

export const createRequestMembersTaskClient = async (groupId: string) => {
  try {
    const { data } = await fetchGroupMembersClient(groupId);

    const groupMembers = data?.group_members ?? [];

    // 各メンバーの担当タスクをまとめて取得
    const memberTasksPromises = groupMembers.map(async (member) => {
      const tasksResult = await fetchTasksByUserIdClient(member.user_id, {
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
  } catch (error: any) {
    return {
      data: { members: [] },
      error: error.message,
    };
  }
};
