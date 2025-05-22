import { FilterHistoryList } from './filter-history-list';
import { HistoryInputDate } from './history-input-date';

export const HistoryFilter = () => {
  const now = new Date();
  const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  return (
    <div className="mt-6">
      <HistoryInputDate initialYM={ym} />
      <FilterHistoryList />
    </div>
  );
};
