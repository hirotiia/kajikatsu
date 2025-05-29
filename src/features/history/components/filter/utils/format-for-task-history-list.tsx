import { LinkListItem } from '@/components/ui/list';
import { TaskHistoryByMonth } from '@/lib/supabase/data/task-history/select/fetch-target-history';

// TODO データをLinkListコンポーネントに渡すようにフォーマットする関数
export const formatForTaskHistoryList = (
  data: TaskHistoryByMonth,
): LinkListItem[] => {
  console.log(data);
  return [
    {
      key: 'dummy',
      updatedAt: 'dummy',
      title: 'dummy',
      link: 'dummy',
    },
  ];
};
