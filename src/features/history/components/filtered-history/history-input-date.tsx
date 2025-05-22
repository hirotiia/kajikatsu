'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { setFilterMonth } from '../../api/set-filter-month';

export const HistoryInputDate = ({ initialYM }: { initialYM: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [y, m] = e.target.value.split('-');
    startTransition(() => {
      setFilterMonth({ year: Number(y), month: Number(m) });
      router.refresh();
    });
  };

  return (
    <div className="flex gap-3 border-b border-foreground pb-3">
      <label htmlFor="month-input">年月：</label>
      <input
        type="yyyymm"
        name="yyyymm"
        defaultValue={initialYM}
        onChange={handleChange}
        id="month-input"
        disabled={isPending}
      />
    </div>
  );
};
