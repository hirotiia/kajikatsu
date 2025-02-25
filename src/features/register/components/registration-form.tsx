'use client';

import { useActionState, useEffect } from 'react';

import { signUp } from '@/actions/auth/auth';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form/';
import { useNotifications } from '@/components/ui/notifications';

export function RegistrationForm() {
  const initialState = {
    type: null,
    status: undefined,
    message: null,
  };
  const [state, actionSubmit, isPending] = useActionState(signUp, initialState);
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (state && state.status !== undefined) {
      addNotification(state);
    }
  }, [state, addNotification]);
  return (
    <form action={actionSubmit} className="mt-20 grid w-full gap-6">
      <FormInput
        label="ユーザー名"
        id="username"
        name="username"
        type="text"
        error={['ユーザー名が入力されていません']}
        required
      />
      <FormInput
        label="メールアドレス"
        id="email"
        name="email"
        type="email"
        error={['メールアドレスが入力されていません']}
        required
      />
      <FormInput
        label="パスワード"
        id="password"
        name="password"
        type="password"
        error={['パスワードが入力されていません']}
        required
      />
      <Button className="mx-auto max-w-screen-sm" disabled={isPending}>
        {isPending ? '登録中...' : '登録'}
      </Button>
    </form>
  );
}
