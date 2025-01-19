import { createClient } from '@/lib/supabase/client';
import { Task } from '@/types/task.types';

/**
 * ログインユーザーが作成したタスクを取得するための関数
 */
export const getMyTasks = async (
  userId: string,
): Promise<{ data: Task[]; error: string | null }> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('tasks')
    .select(
      `
        id,
        title,
        description,
        expires_at,
        created_at,
        updated_at,
        statuses!inner (
          id,
          status_name
        )
      `,
    )
    .eq('created_by', userId)
    .eq('is_deleted', false);

  if (error) {
    return { data: [], error: error.message };
  }

  const tasks: Task[] =
    data?.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      statusId: task.statuses?.id ?? null,
      statusName: task.statuses?.status_name ?? null,
      createdAt: task.created_at,
      updatedAt: task.updated_at,
      expiresAt: task.expires_at,
    })) ?? [];

  return {
    data: tasks,
    error: null,
  };
};
