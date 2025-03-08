'use client';

import { useActionState, useEffect } from 'react';

import { resetPasswordAction } from '@/actions/auth/reset-password-action';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form/';
import { useNotifications } from '@/components/ui/notifications';
import { cn } from '@/utils/cn';

export const ResetPasswordForm = ({ className }: { className?: string }) => {
  const initialState = {
    type: null,
    status: undefined,
    message: null,
    fieldErrors: {},
  };

  const [state, submitAction, isPending] = useActionState(
    resetPasswordAction,
    initialState,
  );

  const { addNotification } = useNotifications();

  useEffect(() => {
    if (state.type !== undefined || state.type !== null) {
      addNotification(state);
    }
  }, [state, addNotification]);
  return (
    <form action={submitAction} className={cn('grid w-full gap-6', className)}>
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
