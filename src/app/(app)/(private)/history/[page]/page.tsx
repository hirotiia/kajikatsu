import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Content } from '@/components/layouts/content/content';
import { Heading } from '@/components/ui/heading';
import { Pagination } from '@/components/ui/pagination';
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

// 静的生成するページを指定
export function generateStaticParams() {
  return Array.from({ length: 5 }, (_, i) => ({
    page: String(i + 1),
  }));
}

type HistoryPageProps = {
  params: Promise<{ page: string }>;
};

export default async function HistoryDetailPage({ params }: HistoryPageProps) {
  const resolvedParams = await params;
  const currentPage = parseInt(resolvedParams.page, 10);

  if (isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

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
        の
        <ruby>
          詳細<rp>（</rp>
          <rt>しょうさい</rt>
          <rp>）</rp>
        </ruby>
        を確認できます。
      </Text>
      <HistoryList />
      <Pagination total={5} className="mt-6" currentPage={currentPage} />
    </Content>
  );
}
