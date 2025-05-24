'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

import { YYYYMM } from '@/types/date.types';

import { useMonthInputSupport } from './hook/use-month-input-support';

type Props = {
  placeholder: YYYYMM;
};
export const Search = ({ placeholder }: Props) => {
  const now = new Date();
  const latestYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [date, setDate] = useState(`${latestYear}-${currentMonth}`);
  const isMonthInputSupported = useMonthInputSupport();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    setDate(term);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-3 border-b border-foreground pb-3">
      {isMonthInputSupported ? (
        <div className="flex items-center gap-2">
          <label htmlFor="month-input">年月:</label>
          <input
            id="month-input"
            type="month"
            value={date}
            defaultValue={searchParams.get('query')?.toString()}
            onChange={changeHandler}
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
            value={date}
            defaultValue={searchParams.get('query')?.toString()}
            onChange={changeHandler}
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
