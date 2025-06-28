import { Metadata } from 'next';
import { Suspense } from 'react';

import { Content } from '@/components/layouts/content/content';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { config } from '@/config/config';
import { InformationItems } from '@/features/information/components/information-items';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `お知らせ｜${config.APP_NAME}`,
  };
}

export default function InformationPage() {
  return (
    <Content>
      <Heading as="h1">お知らせ</Heading>
      <Text>
        このページでは、グループへの参加リクエストなどの通知を確認できます。
      </Text>
      <Box>
        <Suspense fallback={<Text>読み込み中です...</Text>}>
          <InformationItems />
        </Suspense>
      </Box>
    </Content>
  );
}
