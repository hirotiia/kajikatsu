import * as Sentry from '@sentry/nextjs';

import { FunctionReturn } from '@/types/supabase/database.types';
import { TRPCContext } from '@/types/trpc';

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
  ctx: Pick<TRPCContext, 'supabase'>,
  options: FilterOption,
): Promise<FilteredItems> => {
  const { supabase } = ctx;
  const { data: tasks, error } = await supabase.rpc(
    'get_task_history_by_month',
    {
      p_year: options.year,
      p_month: options.month,
    },
  );

  if (error) {
    Sentry.captureException(error, {
      extra: {
        location: 'fetchTargetHistory',
        timestamp: new Date().toISOString(),
        year: options.year,
        month: options.month,
      },
      tags: {
        function: 'get_task_history_by_month',
        severity: 'auth',
      },
    });

    throw new Error(error.message);
  }

  return tasks ?? [];
};
