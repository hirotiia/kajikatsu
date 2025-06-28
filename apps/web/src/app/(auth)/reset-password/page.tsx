import Link from 'next/link';

import { Divider } from '@/components/ui/divider';
import { Heading } from '@/components/ui/heading';
import { SocialLoginButtons } from '@/components/ui/social-button';
import { Text } from '@/components/ui/text';
import { config } from '@/config/config';
import { ResetPasswordForm } from '@/features/reset-password/components/reset-password-form';

export default async function ResetPasswordPage() {
  return (
    <div className="m-auto mt-10 max-w-screen-md">
      <div className="glassmorphism grid place-items-center px-6 pb-6 pt-3">
        <Heading as="h1">{config.APP_NAME}</Heading>
        <Heading className="mt-0 md:mt-0">パスワードをリセット</Heading>
        <ResetPasswordForm />
        <Text className="text-primary">
          アカウントをお持ちですか？
          <Link href="/login" className="underline hover:no-underline">
            <b>ログインする</b>
          </Link>
        </Text>
        <Divider text="または" />
        <SocialLoginButtons />
      </div>
    </div>
  );
}
