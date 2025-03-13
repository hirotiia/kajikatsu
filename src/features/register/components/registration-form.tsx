'use client';

import { useActionState, useEffect } from 'react';

import { signUp } from '@/actions/auth/auth';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form/';
import { useNotifications } from '@/components/ui/notifications';

export function RegistrationForm() {
  const INITIAL_STATE = {
    type: null,
    status: undefined,
    message: null,
    fieldErrors: {},
  };
  const [state, actionSubmit, isPending] = useActionState(
    signUp,
    INITIAL_STATE,
  );
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (state && state.status !== undefined) {
      addNotification(state);
    }
  }, [state, addNotification]);
  return (
    <form
      action={actionSubmit}
      className="grid w-full gap-y-3 pt-6 md:gap-y-6 md:pt-12"
    >
      <FormInput
        label="ユーザー名"
        id="username"
        name="username"
        type="text"
        error={state.fieldErrors?.username ?? []}
        required
      />
      <FormInput
        label="メールアドレス"
        id="email"
        name="email"
        type="email"
        error={state.fieldErrors?.email ?? []}
        required
      />
      <FormInput
        label="パスワード"
        id="password"
        name="password"
        type="password"
        error={state.fieldErrors?.password ?? []}
        required
      />
      <Button className="mx-auto max-w-screen-sm" disabled={isPending}>
        {isPending ? '登録中...' : '登録'}
      </Button>
    </form>
  );
}
