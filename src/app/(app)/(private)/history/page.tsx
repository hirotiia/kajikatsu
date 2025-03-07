import { Metadata } from 'next';

import { Content } from '@/components/layouts/content/content';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { HistoryList } from '@/features/history/components/history-list';
import { getUserData } from '@/lib/supabase/data/users/get-user-data';
import { getUser } from '@/lib/supabase/user/user';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '履歴',
  };
}

export default async function TaskHistoryPage() {
  const { user, authError } = await getUser();

  if (!user || authError) {
    console.error('[getUserData] ユーザー情報の取得に失敗しました:', authError);
    return null;
  }

  const userData = await getUserData(user.id);

  if (!userData) {
    return <p>データが見つかりませんでした。</p>;
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
        を確認できます。
      </Text>
      <HistoryList />
    </Content>
  );
}
