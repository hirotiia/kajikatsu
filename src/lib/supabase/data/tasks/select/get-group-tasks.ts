import { getGroup } from '@/lib/supabase/group/group';
import { createClient } from '@/lib/supabase/server';
import { Result } from '@/types/result.types';
import { Tables } from '@/types/supabase/database.types';

type Task = Tables<'tasks'>;

type GroupTasks = {
  assigneeId: string;
  tasks: Task[];
}[];

export type SelectGroupTasksResult = Result<GroupTasks>;

/**
 * グループに所属する全メンバーのタスクを取得し、担当者ごとに分類する関数
 */
export const getGroupTasks = async (): Promise<SelectGroupTasksResult> => {
  const supabase = await createClient();

  try {
    // グループ情報を取得
    const { group, error: groupError } = await getGroup();

    if (groupError || !group) {
      throw new Error('グループ情報の取得に失敗しました。');
    }

    const groupId = group[0].group_id;

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('group_id', groupId)
      .eq('is_deleted', false);

    if (error || !data) {
      throw new Error('グループのタスク一覧の取得に失敗しました。');
    }

    // assignee_idごとに分類
    const groupTasks = data.reduce<Record<string, Task[]>>((acc, task) => {
      const assigneeId = task.assignee_id || '';
      if (!acc[assigneeId]) {
        acc[assigneeId] = [];
      }
      acc[assigneeId].push(task);
      return acc;
    }, {});

    // フォーマット
    const formattedData: GroupTasks = Object.entries(groupTasks).map(
      ([assigneeId, tasks]) => ({
        assigneeId,
        tasks,
      }),
    );

    return { data: formattedData, error: null };
  } catch (error) {
    let errorMessage = '予期しないエラーが発生しました。';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { data: [], error: errorMessage };
  }
};
