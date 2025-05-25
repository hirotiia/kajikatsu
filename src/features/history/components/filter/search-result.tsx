import { Box } from '@/components/ui/box';
import { LinkList } from '@/components/ui/list';
import { Text } from '@/components/ui/text';

import { fetchFilteredHistory } from '../../api/fetch-filtered-history';

type Props = {
  query?: string;
};
export const SearchResult = async ({ query }: Props) => {
  console.log(`SearchResult: ${query}`);
  const matchItems = await fetchFilteredHistory(query);

  return (
    <Box className="mt-6">
      {matchItems.length === 0 ? (
        <Text aria-live="polite">検索結果は見つかりませんでした。</Text>
      ) : (
        <div aria-live="polite" aria-atomic={true}>
          <Text>{matchItems.length}件の結果が見つかりました。</Text>
          <LinkList items={matchItems} className="mt-6" />
        </div>
      )}
    </Box>
  );
};
