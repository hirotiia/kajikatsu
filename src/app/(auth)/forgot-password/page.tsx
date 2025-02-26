import Link from 'next/link';

import { Divider } from '@/components/ui/divider';
import { Heading } from '@/components/ui/heading';
import { SocialLoginButtons } from '@/components/ui/social-button';
import { ResetPassword } from '@/features/forgot-password/components/reset-password';

export default async function ResetPasswordPage() {
  return (
    <>
      <div className="m-auto mt-10 max-w-screen-md">
        <div className="glassmorphism grid place-items-center px-6 pb-6 pt-3">
          <Heading as="h1" className="mt-3">
            パスワードをリセット
          </Heading>
          <ResetPassword />
          <p className="mt-6 text-primary">
            アカウントをお持ちですか？
            <Link href="/login" className="underline hover:no-underline">
              <b>ログインする</b>
            </Link>
          </p>
          <Divider text="または" />
          <SocialLoginButtons />
        </div>
      </div>
    </>
  );
}
