import { createClient } from '@/lib/supabase/server';
import { fetchUserData } from '@/lib/supabase/user/fetch-user-data';
import { FunctionReturn } from '@/types/supabase/database.types';

export type FilteredItems = FunctionReturn<'get_task_history_by_month'>;

// 検索用のフィルター条件を定義する型
type FilterOption = {
  year: number;
  month: number;
};

/**
 * ユーザーに紐づく履歴データ（get_task_history_by_month）を取得する関数
 * - Supabase の RPC（ストアドプロシージャ）を実行してデータを取得
 *
 * @param options - 検索フィルター用オプション
 * @returns タスク履歴の配列
 */
export const fetchTargetHistory = async (
  options: FilterOption,
): Promise<FilteredItems> => {
  const supabase = await createClient();
  const user = await fetchUserData();

  if (!user) {
    throw new Error('ログイン状態が確認できません。再度ログインしてください。');
  }

  const { data: tasks, error } = await supabase.rpc(
    'get_task_history_by_month',
    {
      p_user_id: user.userId,
      p_year: options.year,
      p_month: options.month,
    },
  );

  if (error) {
    console.error('[fetchTargetHistory] 履歴取得失敗', {
      userId: user.userId,
      params: options,
      error,
    });

    throw new Error(
      'タスク履歴の取得に失敗しました。時間をおいて再試行してください。',
    );
  }

  return tasks ?? [];
};
