import { createClient } from '@/lib/supabase/server';
import { Result } from '@/types/result.types';
import { Task } from '@/types/task.types';

type FetchTasksOption = {
  // 「対象ユーザーを何として扱うか」
  // 'assignee' -> "担当者"として
  // 'creator'  -> "作成者"として
  // などのパターンを追加したければ増やすことができる
  filterType: 'assignee' | 'creator';
};
/**
 * 指定したユーザーIDが担当者のタスク一覧を取得する関数
 *
 * @param userId ユーザーID（UUID）
 * @param options フィルタ・オプション
 * @returns `Promise<Result<Task[]>>`
 */
export async function fetchManagerTasksByUserId(
  userId: string,
  options: FetchTasksOption,
): Promise<Result<Task[]>> {
  try {
    const supabase = await createClient();

    let query = supabase
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
          statuses (
            status_name
          )
        `,
      )
      .eq('is_deleted', false);

    switch (options.filterType) {
      case 'creator':
        query = query.eq('created_by', userId);
        break;
      case 'assignee':
        query = query.eq('assignee_id', userId);
        break;
      default:
    }

    const { data, error } = await query;

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
