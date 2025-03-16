import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Content } from '@/components/layouts/content/content';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { config } from '@/config/config';
import { RenderUserProfile } from '@/features/settings/render-user-profile';
import { createClient } from '@/lib/supabase/server';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `設定｜${config.APP_NAME}`,
  };
}

export default async function SettingPage() {
  const supabase = await createClient();
  const { data: userResult, error: authError } = await supabase.auth.getUser();
  const user = userResult?.user;

  if (!user || authError) {
    redirect('/login');
  }

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
