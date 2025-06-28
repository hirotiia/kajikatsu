import { LinkListItem } from '@/components/ui/list';
import { FilteredItems } from '@/lib/supabase/data/task-history/select/fetch-target-history';

// データをLinkListコンポーネントに渡すようにフォーマットする関数
export const formatForTaskHistoryList = (
  items: FilteredItems,
): LinkListItem[] => {
  return items.map((item) => ({
    key: item.history_id,
    avatarUrl: item.changed_by_avatar_url,
    updatedAt: item.changed_at,
    title: item.action_description,
    link: `/history/${item.history_id}`,
  }));
};
