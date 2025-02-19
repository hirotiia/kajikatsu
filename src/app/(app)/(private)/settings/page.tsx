import { redirect } from 'next/navigation';

import { Content } from '@/components/layouts/content/content';
import { Heading } from '@/components/ui/heading';
import { RenderUserProfile } from '@/features/settings/render-user-profile';
import { createClient } from '@/lib/supabase/server';
import { fetchUserData } from '@/lib/supabase/user/fetch-user-data';

export default async function SettingPage() {
  const supabase = await createClient();
  const { data: userResult, error: authError } = await supabase.auth.getUser();
  const user = userResult?.user;

  if (!user || authError) {
    redirect('/login');
  }

  const userState = await fetchUserData(user.id);

  if (!userState) {
    return (
      <Content>
        <Heading as="h1" className="mb-6 md:mb-12">
          設定
        </Heading>
        <p>ユーザー情報を取得できませんでした。</p>
      </Content>
    );
  }

  const { username, avatar_url } = userState;

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

      <RenderUserProfile username={username} avatarUrl={avatar_url} />
    </Content>
  );
}
