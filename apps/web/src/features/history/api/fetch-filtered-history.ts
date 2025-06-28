import { LinkListItem } from '@/components/ui/list';
import { createTRPCContext } from '@/trpc/init';
import { createCaller } from '@/trpc/routers/_app';

import { formatForTaskHistoryList } from '../components/filter/utils/format-for-task-history-list';

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
  const ctx = await createTRPCContext();
  const caller = createCaller(ctx);
  const now = new Date();
  const [year, month] = query
    ? query.split('-').map(Number)
    : [now.getFullYear(), now.getMonth() + 1];
  const filteredItems = await caller.targetHistory.getTargetHistory({
    year,
    month,
  });

  const formattedItems = formatForTaskHistoryList(filteredItems);

  return formattedItems;
};
