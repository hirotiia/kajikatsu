import { redirect } from 'next/navigation';

import { Content } from '@/components/layouts/content/content';
import { Heading } from '@/components/ui/heading';
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
      <Heading as="h1" className="mb-6 md:mb-10">
        設定
      </Heading>

      <p>
        アプリのカテゴリやプロフィールをカスタマイズできる設定画面です。使いやすいように調整してください。
      </p>

      <Heading as="h2" className="my-6 md:mb-3">
        プロフィール
      </Heading>

      <RenderUserProfile />
    </Content>
  );
}
