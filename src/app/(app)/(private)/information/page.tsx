import { Metadata } from 'next';

import { Content } from '@/components/layouts/content/content';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { config } from '@/config/config';
import { JoinRequestList } from '@/features/information/components/join-request-list';
import { getUser } from '@/lib/supabase/user/user';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `お知らせ｜${config.APP_NAME}`,
  };
}

export default async function InformationPage() {
  const { user } = await getUser();

  return (
    <Content>
      <Heading as="h1">お知らせ</Heading>
      <Text>
        このページでは、グループへの参加リクエストなどの通知を確認できます。
      </Text>
      <Box>{user?.id && <JoinRequestList userId={user?.id} />}</Box>
    </Content>
  );
}
