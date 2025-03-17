import { Metadata } from 'next';

import { Content } from '@/components/layouts/content/content';
import { Heading } from '@/components/ui/heading';
import { Pagination } from '@/components/ui/pagination';
import { Text } from '@/components/ui/text';
import { config } from '@/config/config';
import { HistoryList } from '@/features/history/components/history-list';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `履歴｜${config.APP_NAME}`,
  };
}

export default function TaskHistoryPage() {
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
      <HistoryList />
      <Pagination total={5} className="mt-6" />
    </Content>
  );
}
