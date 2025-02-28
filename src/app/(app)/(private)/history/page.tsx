import { Content } from '@/components/layouts/content/content';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { TaskHistoryPageClient } from '@/features/history/components/task-history-page-client';
import { getUserData } from '@/lib/supabase/data/users/get-user-data';
import { getUser } from '@/lib/supabase/user/user';

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
      <Heading as="h1">履歴</Heading>
      <Text>
        このページでは、タスクの作成、編集、削除などの履歴を確認できます。
      </Text>
      <Text spacing="none">
        誰がどのタスクにどんな変更を加えたのかが一覧で表示されるため、作業の流れを把握しやすくなります。
      </Text>
      <TaskHistoryPageClient userData={userData} />
    </Content>
  );
}
