'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

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
  const [state, handleSignIn, isPending] = useActionState(
    signIn,
    INITIAL_STATE,
  );

  useEffect(() => {
    if (state.status !== undefined) {
      addNotification(state);

      if (state.type === 'success') {
        router.push('/dashboard');
      }
    }
  }, [state, addNotification, router]);
  return (
    <form action={handleSignIn} className="grid w-full gap-6 pt-12">
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
      <Button disabled={isPending} className="mx-auto max-w-screen-sm">
        {isPending ? 'ログイン中...' : 'ログイン'}
      </Button>
    </form>
  );
};
