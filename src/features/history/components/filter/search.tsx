'use client';

import { useEffect, useState } from 'react';

import { YYYYMM } from '@/types/date.types';

type Props = {
  placeholder: YYYYMM;
};
export const Search = ({ placeholder }: Props) => {
  const now = new Date();
  const latestYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const [isMonthInputSupported, setIsMonthInputSupported] =
    useState<boolean>(true);

  useEffect(() => {
    const testInput = document.createElement('input');
    testInput.setAttribute('type', 'month');
    setIsMonthInputSupported(testInput.type === 'month');
  }, []);

  return (
    <div className="flex gap-3 border-b border-foreground pb-3">
      {isMonthInputSupported ? (
        <div className="flex items-center gap-2">
          <label htmlFor="month-input">年月:</label>
          <input
            id="month-input"
            type="month"
            value="2025-05"
            onChange={(e) => console.log(e.target.value)}
            className="rounded-md border border-muted p-1"
            aria-label="年と月を選択してください"
            min={`2024-01`}
            placeholder={placeholder}
            max={`${latestYear}-${currentMonth}`}
          />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <label htmlFor="month-text-input">年月 (YYYY-MM):</label>
          <input
            id="month-text-input"
            type="text"
            value="2025-4"
            onChange={(e) => console.log(e.target.value)}
            className="rounded-md border border-muted p-1"
            placeholder={placeholder}
            pattern="^\d{4}-([1-9]|0[1-9]|1[0-2])$"
            title="YYYY-MM形式で入力してください（例: 2024-01）"
            aria-label="年と月をYYYY-MM形式で入力してください"
          />
        </div>
      )}
    </div>
  );
};
