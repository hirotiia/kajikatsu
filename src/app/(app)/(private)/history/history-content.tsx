import { Pagination } from '@/components/ui/pagination';
import { HistoryList } from '@/features/history/components/history-list';

export const HistoryContent = () => {
  return (
    <>
      <HistoryList />
      <Pagination total={5} className="mt-6" />
    </>
  );
};
