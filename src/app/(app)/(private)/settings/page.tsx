import { redirect } from 'next/navigation';

import { Content } from '@/components/layouts/content/content';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { RenderUserProfile } from '@/features/settings/render-user-profile';
import { createClient } from '@/lib/supabase/server';

export default async function SettingPage() {
  const supabase = await createClient();
  const { data: userResult, error: authError } = await supabase.auth.getUser();
  const user = userResult?.user;

  if (!user || authError) {
    redirect('/login');
  }

  return (
    <Content>
      <Heading as="h1">設定</Heading>
      <Text>アプリのプロフィールをカスタマイズできる画面です。</Text>
      <Text spacing="none">使いやすいように調整してください。</Text>
      <Heading as="h2">プロフィール</Heading>
      <RenderUserProfile />
    </Content>
  );
}
