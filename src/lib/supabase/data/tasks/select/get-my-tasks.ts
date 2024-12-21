/**
 * ユーザーが作成したタスクを一覧で取得する関数
 */

import { createClient } from '@/lib/supabase/server';
import { getUser } from '@/lib/supabase/user/user';
import { Result } from '@/types/result.types';
import { Tables } from '@/types/supabase/database.types';

export type Task = Tables<'tasks'>;

export type TasksResponse = Result<Task[]>;

export const getMyTasks = async (): Promise<TasksResponse> => {
  const supabase = await createClient();

  try {
    const { user, authError } = await getUser();

    if (authError || !user) {
      throw new Error('ユーザーが認証されていません。');
    }

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('created_by', user.id)
      .eq('is_deleted', false);

    if (error) {
      throw new Error('タスク一覧の取得に失敗しました。');
    }

    return { data: data ?? [], error: null };
  } catch (error) {
    let errorMessage = '予期しないエラーが発生しました。';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return { data: [], error: errorMessage };
  }
};
