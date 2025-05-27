import { LinkListItem } from '@/components/ui/list';
import { fetchTasksHistory } from '@/lib/supabase/data/task-history/select/fetch-tasks-history';

import { formatForTaskHistoryList } from '../components/filter/utils/format-for-task-history-list';

// TODO: 対象の履歴データを取得してくる
/**
 * リクエストに応じた履歴データを取得する
 * 取得したデータはIDで表示されるので、わかりやすく加工する（主キーをユーザー名に置き換えるなど）
 * 履歴リストとして表示する
 * @param query 2025-5などの年月
 * @returns LinkListItem[]
 */
export const fetchFilteredHistory = async (
  query: string | undefined,
): Promise<LinkListItem[]> => {
  const now = new Date();
  const [year, month] = query
    ? query.split('-').map(Number)
    : [now.getFullYear(), now.getMonth() + 1];
  const data = await fetchTasksHistory({ year, month });
  const formattedData = formatForTaskHistoryList(data);
  console.log(`formattedData: ${formattedData}`);
  return [];
};
