import { Heading } from '@/components/ui/heading';
import { LoginLink } from '@/features/register/components/login-link';
import { RegistrationForm } from '@/features/register/components/registration-form';

export default function RegisterPage() {
  return (
    <div className="m-auto mt-10 max-w-screen-md">
      <div className="glassmorphism grid place-items-center px-6 pb-6 pt-3">
        <Heading className="mt-3">ユーザー登録</Heading>
        <RegistrationForm />
        <LoginLink />
      </div>
    </div>
  );
}
