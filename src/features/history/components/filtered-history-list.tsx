'use client';

import { useState, useEffect, useMemo, ChangeEvent, useCallback } from 'react';

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
  const currentMonth = now.getMonth() + 1;

  const [year, setYear] = useState<number>(latestYear);
  const [month, setMonth] = useState<number>(currentMonth);
  const [monthInputValue, setMonthInputValue] = useState<string>(
    `${latestYear}-${String(currentMonth).padStart(2, '0')}`,
  );
  const [isMonthInputSupported, setIsMonthInputSupported] =
    useState<boolean>(true);

  // 初回レンダリング時にmonthタイプのサポート状況を確認
  useEffect(() => {
    const testInput = document.createElement('input');
    testInput.setAttribute('type', 'month');
    setIsMonthInputSupported(testInput.type === 'month');
  }, []);

  // month型inputの値が変更された時のハンドラー
  const handleMonthInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setMonthInputValue(value);

      // YYYY-MM形式から年と月を抽出
      if (value) {
        const [yearStr, monthStr] = value.split('-');
        const yearNum = parseInt(yearStr, 10);
        const monthNum = parseInt(monthStr, 10);

        if (!isNaN(yearNum) && !isNaN(monthNum)) {
          setYear(yearNum);
          setMonth(monthNum);
        }
      }
    },
    [],
  );

  // テキスト入力の場合のハンドラー
  const handleTextInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setMonthInputValue(value);

      // 正規表現でYYYY-MM形式をチェック
      const regex = /^(\d{4})-(\d{1,2})$/;
      const match = value.match(regex);

      if (match) {
        const yearNum = parseInt(match[1], 10);
        const monthNum = parseInt(match[2], 10);

        if (
          yearNum >= 2024 &&
          yearNum <= latestYear &&
          monthNum >= 1 &&
          monthNum <= 12
        ) {
          setYear(yearNum);
          setMonth(monthNum);
        }
      }
    },
    [latestYear],
  );

  const filteredItems = useMemo(() => {
    return filterNewsItemsByYearMonth(historyListItems, year, month);
  }, [historyListItems, year, month]);

  return (
    <div className="mt-6">
      <div className="flex gap-3 border-b border-foreground pb-3">
        {isMonthInputSupported ? (
          // monthタイプがサポートされている場合
          <div className="flex items-center gap-2">
            <label htmlFor="month-input">年月:</label>
            <input
              id="month-input"
              type="month"
              value={monthInputValue}
              onChange={handleMonthInputChange}
              className="rounded-md border border-muted p-1"
              aria-label="年と月を選択してください"
              min={`2024-01`}
              max={`${latestYear}-12`}
            />
          </div>
        ) : (
          // monthタイプがサポートされていない場合
          <div className="flex items-center gap-2">
            <label htmlFor="month-text-input">年月 (YYYY-MM):</label>
            <input
              id="month-text-input"
              type="text"
              value={monthInputValue}
              onChange={handleTextInputChange}
              className="rounded-md border border-muted p-1"
              placeholder="YYYY-MM"
              pattern="^\d{4}-([1-9]|0[1-9]|1[0-2])$"
              title="YYYY-MM形式で入力してください（例: 2024-01）"
              aria-label="年と月をYYYY-MM形式で入力してください"
            />
          </div>
        )}
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
