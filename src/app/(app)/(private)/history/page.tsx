import { Box } from 'lucide-react';
import { Suspense } from 'react';

import { Content } from '@/components/layouts/content/content';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Search, SearchResult } from '@/features/history/components/filter';

type Props = {
  searchParams: Promise<{
    query?: string;
  }>;
};

export default async function HistoryPage(props: Props) {
  const searchParams = await props.searchParams;
  const query = searchParams.query || '';

  return (
    <Content>
      <Heading as="h1">
        <ruby>
          履歴<rp>（</rp>
          <rt>りれき</rt>
          <rp>）</rp>
        </ruby>
      </Heading>
      <Text>
        このページでは、おしごとの
        <ruby>
          作成<rp>（</rp>
          <rt>さくせい</rt>
          <rp>）</rp>
        </ruby>
        、
        <ruby>
          更新<rp>（</rp>
          <rt>こうしん</rt>
          <rp>）</rp>
        </ruby>
        、
        <ruby>
          削除<rp>（</rp>
          <rt>さくじょ</rt>
          <rp>）</rp>
        </ruby>
        などの
        <ruby>
          履歴<rp>（</rp>
          <rt>りれき</rt>
          <rp>）</rp>
        </ruby>
        を確認できます。
      </Text>
      <Heading>絞り込み</Heading>
      <div className="mt-6">
        <Search placeholder="2025-05" />
        <Suspense
          fallback={
            <Box className="mt-6">
              <Text>読み込み中です...</Text>
            </Box>
          }
        >
          <SearchResult query={query} />
        </Suspense>
      </div>
    </Content>
  );
}
