'use client';

import { useRouter } from 'next/navigation';
import { useActionState } from 'react';

import { signIn } from '@/actions/auth/auth';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form/';
import { useNotifications } from '@/components/ui/notifications';

const INITIAL_STATE = {
  type: null,
  status: undefined,
  message: null,
  fieldErrors: {},
};

export const LoginForm = () => {
  const router = useRouter();
  const { addNotification } = useNotifications();

  const handleSignInWithNotification = async (
    prevState: any,
    formData: FormData,
  ) => {
    const result = await signIn(prevState, formData);

    if (result.status !== undefined) {
      addNotification(result);

      if (result.type === 'success') {
        router.push('/dashboard');
      }
    }

    return result;
  };

  const [state, handleSubmit, isPending] = useActionState(
    handleSignInWithNotification,
    INITIAL_STATE,
  );

  return (
    <form action={handleSubmit} className="grid w-full gap-6 pt-12">
      <FormInput
        label="メールアドレス"
        id="email"
        name="email"
        type="text"
        className=""
        error={state.fieldErrors?.email ?? []}
        required
      />
      <FormInput
        label="パスワード"
        id="password"
        name="password"
        type="password"
        className=""
        error={state.fieldErrors?.password ?? []}
        required
      />
      <Button
        as="button"
        disabled={isPending}
        className="mx-auto max-w-screen-sm"
      >
        {isPending ? 'ログイン中...' : 'ログイン'}
      </Button>
    </form>
  );
};
