'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

import { resetPasswordAction } from '@/actions/auth/reset-password-action';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form/';
import { useNotifications } from '@/components/ui/notifications';

export const ResetPasswordForm = () => {
  const initialState = {
    type: null,
    status: null,
    message: null,
    fieldErrors: {},
  };
  const router = useRouter();
  const [state, submitAction, isPending] = useActionState(
    resetPasswordAction,
    initialState,
  );

  const { addNotification } = useNotifications();

  useEffect(() => {
    if (state.status !== null) {
      addNotification(state);
    }
    if (state.type === 'success') {
      router.push('/login');
    }
  }, [state, addNotification, router]);
  return (
    <form action={submitAction} className="mt-20 grid w-full gap-6">
      <FormInput
        label="新しいパスワード"
        id="password"
        name="password"
        type="password"
        className=""
        error={state.fieldErrors?.password ?? []}
        required
      />
      <FormInput
        label="確認用パスワード"
        id="confirm-password"
        name="confirm-password"
        type="password"
        className=""
        error={state.fieldErrors?.confirmPassword ?? []}
        required
      />
      <Button className="mx-auto max-w-screen-sm" disabled={isPending}>
        {isPending ? 'リセット中...' : 'リセット'}
      </Button>
    </form>
  );
};
