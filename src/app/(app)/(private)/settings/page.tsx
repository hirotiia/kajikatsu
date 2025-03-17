import { Metadata } from 'next';

import { Content } from '@/components/layouts/content/content';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { config } from '@/config/config';
import { RenderUserProfile } from '@/features/settings/render-user-profile';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `設定｜${config.APP_NAME}`,
  };
}

export default async function SettingPage() {
  return (
    <Content>
      <Heading as="h1">
        <ruby>
          設定<rp>（</rp>
          <rt>せってい</rt>
          <rp>）</rp>
        </ruby>
      </Heading>
      <Text>プロフィールを自分の好きな画像に変更できます。</Text>
      <Heading as="h2">プロフィール</Heading>
      <Box className="grid gap-3">
        <RenderUserProfile />
      </Box>
    </Content>
  );
}
