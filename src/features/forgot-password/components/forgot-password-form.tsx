'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

import { forgotPasswordAction } from '@/actions/auth/forgot-password-action';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form/';
import { useNotifications } from '@/components/ui/notifications';

export const ForgotPasswordForm = () => {
  const initialState = {
    type: null,
    status: undefined,
    message: null,
    fieldErrors: {},
  };
  const router = useRouter();
  const [state, submitAction, isPending] = useActionState(
    forgotPasswordAction,
    initialState,
  );

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
    <form action={submitAction} className="mt-20 grid w-full gap-6">
      <FormInput
        label="メールアドレス"
        id="mail"
        name="mail"
        type="email"
        className=""
        error={state.fieldErrors?.email ?? []}
        required
      />
      <Button className="mx-auto max-w-screen-sm" disabled={isPending}>
        {isPending ? 'メールを送信中です...' : 'メールを送信する'}
      </Button>
    </form>
  );
};
