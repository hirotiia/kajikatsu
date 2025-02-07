import { Content } from '@/components/layouts/content/content';
import { Heading } from '@/components/ui/heading';
import { RenderUserProfile } from '@/features/settings/render-user-profile';

export default async function SettingPage() {
  return (
    <Content bg="secondary">
      <Heading as="h1" className="mb-6 md:mb-12" variant="normal">
        設定
      </Heading>

      <p className="text-background">
        アプリのカテゴリやプロフィールをカスタマイズできる設定画面です。
      </p>
      <p className="text-background">
        使いやすいように、必要な項目を調整してください。
      </p>

      <Heading as="h2" className="mb-6 mt-3 md:mb-12" variant="normal">
        プロフィール
      </Heading>

      <RenderUserProfile />
    </Content>
  );
}
