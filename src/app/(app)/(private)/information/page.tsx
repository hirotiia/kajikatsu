import { Content } from '@/components/layouts/content/content';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { JoinRequestList } from '@/features/information/components/join-request-list';
import { getUser } from '@/lib/supabase/user/user';

export default async function InformationPage() {
  const { user } = await getUser();

  return (
    <Content>
      <Heading as="h1">お知らせ</Heading>
      <Text>
        このページでは、グループへの参加リクエストなどの通知を確認できます。
      </Text>
      <Text spacing="none">
        自分が送ったリクエストの承認状況や、グループ管理者の場合は新しい参加リクエストをチェックできます。
      </Text>
      <Text spacing="none">
        グループの最新情報を見逃さないようにしましょう。
      </Text>
      <Box>{user?.id && <JoinRequestList userId={user?.id} />}</Box>
    </Content>
  );
}
