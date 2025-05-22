import { cookies } from 'next/headers';

import { NewsList } from '@/components/ui/list';
import { Text } from '@/components/ui/text';
import { fetchTaskHistoryByYearMonth } from '@/lib/supabase/data/task-history/select/fetch-task-history-by-year-month';

export const FilterHistoryList = async () => {
  const cookieStore = await cookies();
  const now = new Date();
  const year = Number(
    cookieStore.get('filter_year')?.value ?? now.getFullYear(),
  );
  const month = Number(
    cookieStore.get('filter_month')?.value ?? now.getMonth() + 1,
  );

  const items = await fetchTaskHistoryByYearMonth({ year, month });

  return (
    <div className="mt-6">
      {items.length === 0 ? (
        <Text>検索結果は見つかりませんでした。</Text>
      ) : (
        <NewsList items={items} />
      )}
    </div>
  );
};
