import { Content } from '@/components/layouts/content/content';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { NewsList } from '@/components/ui/list';
import { Text } from '@/components/ui/text';

export default async function HistoryPage() {
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
      <Box>
        <NewsList
          items={[
            {
              key: '1111',
              avatarUrl: '',
              date: '2025-03-04',
              title: 'タイトルタイトルタイトルタイトルタイトル',
              link: '/history/1',
            },
            {
              key: '2222',
              avatarUrl: '',
              date: '2025-03-04',
              title: 'タイトルタイトルタイトルタイトルタイトル',
              link: '/history/1',
            },
            {
              key: '3333',
              avatarUrl: '',
              date: '2025-03-04',
              title: 'タイトルタイトルタイトルタイトルタイトル',
              link: '/history/1',
            },
          ]}
          className="mt-6"
        />
      </Box>
    </Content>
  );
}
