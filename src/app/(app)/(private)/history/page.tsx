import { Content } from '@/components/layouts/content/content';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';

import { HistoryContent } from './history-content';

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
      <Heading>絞り込み</Heading>
      <HistoryContent />
    </Content>
  );
}
