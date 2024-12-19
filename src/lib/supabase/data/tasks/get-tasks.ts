import { createClient } from '@/lib/supabase/server';
import { Tables } from '@/types/supabase/database.types';

import { getGroup } from '../../group/group';

type Task = Tables<'tasks'>;

type GroupedTasks = {
  assigneeId: string;
  tasks: Task[];
}[];

type GetTasksResult = {
  data?: GroupedTasks | Task[];
  error?: any;
};

/**
 * タスク一覧を取得する関数
 *
 * ユーザーのIDとグループ情報を取得し、
 * グループに所属している場合は全メンバーのタスクを担当者ごとに分類。
 * グループに所属していない場合はユーザーが作成したタスクを返す。
 *
 * @returns {Promise<GetTasksResult>} 整形済みのタスク一覧データ
 */
export const getTasks = async (): Promise<GetTasksResult> => {
  const supabase = await createClient();

  // グループ情報を取得
  const { group, error: groupError } = await getGroup();

  if (groupError || !group) {
    return { error: 'ユーザー情報の取得に失敗しました。' };
  }

  const userId = group[0].user_id;
  const groupId = group[0].group_id;

  try {
    if (groupId) {
      // グループに関連するタスクを取得
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('group_id', groupId)
        .eq('is_deleted', false);

      if (error) {
        return { error: 'グループのタスク一覧の取得に失敗しました。' };
      }

      if (!data) {
        return { data: [] };
      }

      // assignee_idごとに分類
      const groupedTasks = data.reduce(
        (acc: Record<string, Task[]>, task: Task) => {
          const assigneeId = task.assignee_id || '';
          if (!acc[assigneeId]) {
            acc[assigneeId] = [];
          }
          acc[assigneeId].push(task);
          return acc;
        },
        {},
      );

      const formattedData = Object.entries(groupedTasks).map(
        ([assigneeId, tasks]) => ({
          assigneeId,
          tasks,
        }),
      );

      return { data: formattedData };
    } else {
      // ユーザーが作成したタスクを取得
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('created_by', userId)
        .eq('is_deleted', false);

      if (error) {
        return { error: 'タスク一覧の取得に失敗しました。' };
      }

      return { data: data ?? [] };
    }
  } catch (error) {
    return { error };
  }
};
