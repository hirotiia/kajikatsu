'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

import { signIn } from '@/actions/auth/auth';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form/';
import { useNotifications } from '@/components/ui/notifications';

export const LoginForm = () => {
  const router = useRouter();
  const INITIAL_STATE = {
    type: null,
    status: undefined,
    message: null,
    fieldErrors: {},
  };

  const [state, submitAction, isPending] = useActionState(
    signIn,
    INITIAL_STATE,
  );
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (state.type === 'success') {
      if (state.status !== null) {
        addNotification(state);
      }
      router.push('/dashboard');
    }
    if (state.type === 'error') {
      if (state.status !== null) {
        addNotification(state);
      }
    }
  }, [state, addNotification, router]);
  return (
    <form action={submitAction} className="grid w-full gap-6 pt-12">
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
