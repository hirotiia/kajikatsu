import { createClient } from '@/lib/supabase/client';
import { Result } from '@/types/result.types';
import { Task } from '@/types/task.types';

type FetchTasksOption = {
  filterType: 'assignee' | 'creator';
  filterValue: string | null;
};
/**
 * 指定したユーザーIDが担当者のタスク一覧を取得する関数
 *
 * @param userId ユーザーID（UUID）
 * @param options フィルタ・オプション
 * @returns `Promise<Result<Task[]>>`
 */
export async function fetchTasksByUserIdClient(
  userId: string,
  options: FetchTasksOption,
): Promise<Result<Task[]>> {
  try {
    const supabase = createClient();

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
        if (options.filterValue) {
          query = query.eq('created_by', options.filterValue);
        } else {
          return {
            data: [],
            error: null,
          };
        }
        break;
      case 'assignee':
        if (options.filterValue) {
          query = query.eq('assignee_id', options.filterValue);
        } else {
          // 引数にわたってきたユーザーが作成したタスクのうち、担当者が指定されていないタスクを取得する
          query = query.eq('created_by', userId);
          query = query.is('assignee_id', null);
        }
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
