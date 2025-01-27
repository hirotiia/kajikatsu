import { Content } from '@/components/layouts/content/content';
import { Heading } from '@/components/ui/heading';
import { RenderUserProfile } from '@/features/settings/render-user-profile';

export default async function SettingPage() {
  // const supabase = await createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // const userId = user?.id ?? null;
  return (
    <Content bg="secondary">
      <Heading as="h1" className="mb-12 mt-4">
        設定
      </Heading>

      <p className="text-primary-foreground">
        アプリのカテゴリやプロフィールをカスタマイズできる設定画面です。
      </p>
      <p className="text-primary-foreground">
        使いやすいように、必要な項目を調整してください。
      </p>

      <Heading as="h2" className="mb-12 mt-10">
        プロフィール
      </Heading>

      <RenderUserProfile />
    </Content>
  );
}
