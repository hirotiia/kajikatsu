import { NewsListItem } from '@/components/ui/list';

export const fetchFilteredHistory = async (
  query: string | undefined,
): Promise<NewsListItem[]> => {
  console.log(query);
  return [];
};
