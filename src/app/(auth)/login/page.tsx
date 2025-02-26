import { Divider } from '@/components/ui/divider';
import { Heading } from '@/components/ui/heading/index';
import { SocialLoginButtons } from '@/components/ui/social-button';
import { LoginForm } from '@/features/login/components/login-form';
import { RegisterLink } from '@/features/login/components/register-link';
import { ResetPassword } from '@/features/login/components/reset-password';

export default function LoginPage() {
  return (
    <>
      <div className="m-auto mt-10 max-w-screen-md">
        <div className="glassmorphism grid place-items-center px-6 pb-6 pt-3">
          <Heading as="h1" className="mt-3">
            ログイン
          </Heading>
          <LoginForm />
          <ResetPassword />
          <RegisterLink />
          <Divider text="または" />
          <SocialLoginButtons />
        </div>
      </div>
    </>
  );
}
