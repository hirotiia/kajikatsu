'use client';

import { useRouter } from 'next/router';
import { useActionState, useEffect } from 'react';

import { signIn } from '@/actions/auth/auth';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form/';
import { useNotifications } from '@/components/ui/notifications';

export const LoginForm = () => {
  const router = useRouter();
  const initialState = {
    type: null,
    status: null,
    message: null,
  };

  const [state, submitAction, isPending] = useActionState(signIn, initialState);
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (state.status !== null) {
      addNotification(state);
    }
    if (state.type === 'success') {
      router.push('/dashboard');
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
        error={['メールアドレスが入力されていません']}
        required
      />
      <FormInput
        label="パスワード"
        id="password"
        name="password"
        type="password"
        className=""
        error={['パスワードが入力されていません']}
        required
      />
      <Button
        disabled={isPending}
        size="small"
        className="mx-auto max-w-screen-sm"
      >
        {isPending ? 'ログイン中...' : 'ログイン'}
      </Button>
    </form>
  );
};
