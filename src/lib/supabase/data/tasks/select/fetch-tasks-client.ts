import { createClient } from '@/lib/supabase/client';
import { Result } from '@/types/result.types';
import { Task } from '@/types/task.types';

type FilterOptions = {
  createdBy?: string;
  assigneeId?: string | null;
  groupId?: string | null;
  statusId?: string;
  includeDeleted?: boolean;
  orderBy?: {
    column: 'created_at' | 'updated_at' | 'expires_at' | 'title';
    direction: 'asc' | 'desc';
  };
};

/**
 * タスク一覧をフィルタリングして取得する関数
 *
 * @param options フィルタリングオプション
 * @returns `Promise<Result<Task[]>>`
 */
export const fetchTasks = async (
  options: FilterOptions = {},
): Promise<Result<Task[]>> => {
  try {
    const supabase = createClient();

    let query = supabase.from('tasks').select(`
        id,
        title,
        description,
        status_id,
        created_at,
        updated_at,
        expires_at,
        is_deleted,
        group_id,
        assignee_id,
        created_by,
        statuses (
          status_name
        )
      `);

    if (!options.includeDeleted) {
      query = query.eq('is_deleted', false);
    }

    if (options.createdBy !== undefined) {
      query = query.eq('created_by', options.createdBy);
    }

    if (options.assigneeId !== undefined) {
      if (options.assigneeId === null) {
        query = query.is('assignee_id', null);
      } else {
        query = query.eq('assignee_id', options.assigneeId);
      }
    }

    if (options.groupId !== undefined) {
      if (options.groupId === null) {
        query = query.is('group_id', null);
      } else {
        query = query.eq('group_id', options.groupId);
      }
    }

    if (options.statusId !== undefined) {
      query = query.eq('status_id', options.statusId);
    }

    if (options.orderBy) {
      query = query.order(options.orderBy.column, {
        ascending: options.orderBy.direction === 'asc',
      });
    } else {
      query = query.order('updated_at', { ascending: false });
    }

    const { data, error } = await query;

    if (error) {
      return {
        data: null,
        error: error.message,
      };
    }

    if (!data || data.length === 0) {
      return {
        data: [],
        error: null,
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
      groupId: row.group_id ?? null,
      assigneeId: row.assignee_id ?? null,
      createdBy: row.created_by,
    }));

    return {
      data: tasks,
      error: null,
    };
  } catch (err: any) {
    return {
      data: null,
      error: err.message ?? 'Unknown error occurred while fetching tasks.',
    };
  }
};
