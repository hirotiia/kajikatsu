import { Tables } from '@/types/supabase/database.types';

/**
 * 新しい履歴を配列に追加 & ソートし、結果を返す純粋関数
 */
export function addAndSortHistory(
  currentHistory: Tables<'task_history'>[],
  newHistory: Tables<'task_history'>,
): Tables<'task_history'>[] {
  const updated = [newHistory, ...currentHistory];
  // changed_at は string | null なので null チェック
  updated.sort((a, b) => {
    // 可能であれば null を考慮して安全に比較
    const aTime = a.changed_at || '1970-01-01T00:00:00Z';
    const bTime = b.changed_at || '1970-01-01T00:00:00Z';
    return bTime.localeCompare(aTime); // 新しいものを上に
  });
  return updated;
}

/**
 * 表示用にフォーマットする例
 */
export function formatHistoryItem(item: Tables<'task_history'>) {
  return {
    displayTime: item.changed_at
      ? new Date(item.changed_at).toLocaleString()
      : 'N/A',
    displayAction: `Action ID: ${item.action_id}`,
  };
}
