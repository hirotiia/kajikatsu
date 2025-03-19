import { Metadata } from 'next';

import { Content } from '@/components/layouts/content/content';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { config } from '@/config/config';
import { HistoryList } from '@/features/history/components/history-list';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `履歴｜${config.APP_NAME} - Page ${resolvedParams.page}`,
  };
}

type HistoryPageProps = {
  params: Promise<{ page: string }>;
};

export default async function HistoryDetailPage({ params }: HistoryPageProps) {
  const resolvedParams = await params;

  return (
    <Content>
      <Heading as="h1">
        <ruby>
          履歴詳細<rp>（</rp>
          <rt>りれきしょうさい</rt>
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
        の
        <ruby>
          詳細<rp>（</rp>
          <rt>しょうさい</rt>
          <rp>）</rp>
        </ruby>
        を確認できます。
      </Text>
      <Box>
        <HistoryList historyId={resolvedParams.page} />
      </Box>
    </Content>
  );
}
