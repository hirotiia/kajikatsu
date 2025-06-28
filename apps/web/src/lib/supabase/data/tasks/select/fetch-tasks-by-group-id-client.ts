import { createClient } from '@/lib/supabase/client';
import { Result } from '@/types/result.types';
import { Task } from '@/types/task.types';

/**
 * 指定したグループ ID が持つタスク一覧を取得する関数
 *
 * @param groupId グループID（UUID）
 * @returns `Promise<Result<Task[]>>`
 */
export async function fetchTasksByGroupIdClient(
  groupId: string,
): Promise<Result<Task[]>> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('tasks')
      .select(
        `
          id,
          title,
          description,
          status_id,
          created_at,
          updated_at,
          expires_at,
          is_deleted,
          assignee_id,
          statuses (status_name)
        `,
      )
      .eq('group_id', groupId)
      .eq('is_deleted', false);
    if (error) {
      return {
        data: null,
        error: error.message,
      };
    }

    if (!data) {
      return {
        data: null,
        error: '該当するデータがありませんでした。',
      };
    }

    // 取得データを Task 型にマッピング
    const tasks: Task[] = data.map((row: any) => ({
      id: row.id,
      title: row.title,
      description: row.description ?? null,
      statusId: row.status_id ?? null,
      statusName: row.statuses?.status_name ?? null,
      createdAt: row.created_at ?? null,
      updatedAt: row.updated_at ?? null,
      expiresAt: row.expires_at ?? null,
      assigneeId: row.assignee_id ?? null,
    }));

    return {
      data: tasks,
      error: null,
    };
  } catch (err: any) {
    return {
      data: null,
      error: err.message ?? 'Unknown error.',
    };
  }
}
