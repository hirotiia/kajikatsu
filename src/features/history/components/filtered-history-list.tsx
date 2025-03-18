'use client';

import { useState, useMemo, ChangeEvent, useCallback } from 'react';

import { Box } from '@/components/ui/box';
import { NewsList, NewsListItem } from '@/components/ui/list';
import { Text } from '@/components/ui/text';

type FilteredHistoryListProps = {
  historyListItems: NewsListItem[];
};

/**
 * 年月でフィルタリングする純粋関数。
 * @param items - 全Newsデータ
 * @param year - 絞り込みたい「年」
 * @param month - 絞り込みたい「月」
 * @returns フィルタリングされたNewsデータ
 */
function filterNewsItemsByYearMonth(
  items: NewsListItem[],
  year: number,
  month: number,
): NewsListItem[] {
  return items.filter((item) => {
    const date = new Date(item.updatedAt);
    return date.getFullYear() === year && date.getMonth() + 1 === month;
  });
}

export const FilteredHistoryList = ({
  historyListItems = [],
}: FilteredHistoryListProps) => {
  const now = new Date();
  const latestYear = now.getFullYear();
  const [year, setYear] = useState<number>(latestYear);
  const [month, setMonth] = useState<number>(now.getMonth() + 1);

  const handleYearChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setYear(value);
  }, []);

  const handleMonthChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 1 && value <= 12) {
      setMonth(value);
    }
  }, []);

  const filteredItems = useMemo(() => {
    return filterNewsItemsByYearMonth(historyListItems, year, month);
  }, [historyListItems, year, month]);

  return (
    <div className="mt-6">
      <div className="flex gap-3 border-b border-foreground pb-3">
        <div className="flex flex-row-reverse items-center gap-1">
          <label htmlFor="year-input" className="mr-2">
            年
          </label>
          <input
            id="year-input"
            type="number"
            value={year}
            onChange={handleYearChange}
            className="w-[100px] rounded-md border border-muted p-1"
            aria-label="年を選択してください"
            min="2024"
            max={latestYear}
          />
        </div>
        <div className="flex flex-row-reverse items-center gap-1">
          <label htmlFor="month-input" className="mr-2">
            月
          </label>
          <input
            id="month-input"
            type="number"
            value={month}
            onChange={handleMonthChange}
            className="w-[50px] rounded-md border border-muted p-1"
            aria-label="月を選択してください"
            min="1"
            max="12"
          />
        </div>
      </div>

      <Box className="mt-6">
        {filteredItems.length === 0 ? (
          <Text aria-live="polite">検索結果は見つかりませんでした。</Text>
        ) : (
          <div aria-live="polite" aria-atomic={true}>
            <Text>{filteredItems.length}件の結果が見つかりました。</Text>
            <NewsList items={filteredItems} className="mt-6" />
          </div>
        )}
      </Box>
    </div>
  );
};
