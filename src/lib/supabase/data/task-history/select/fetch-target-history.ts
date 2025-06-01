import { createClient } from '@/lib/supabase/server';
import { FunctionReturn } from '@/types/supabase/database.types';
import { logErrorToSentry } from '@/utils/log-error-to-sentry';

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
  const { data: tasks, error } = await supabase.rpc(
    'get_task_history_by_month',
    {
      p_year: options.year,
      p_month: options.month,
    },
  );

  if (error) {
    logErrorToSentry(error, {
      location: 'fetchTaskHistoryByMonth',
      tags: {
        function: 'get_task_history_by_month',
        severity: 'auth',
      },
      extra: {
        year: options.year,
        month: options.month,
      },
    });

    throw new Error(error.message);
  }

  return tasks ?? [];
};
