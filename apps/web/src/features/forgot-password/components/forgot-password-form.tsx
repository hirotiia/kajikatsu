'use client';

import { useActionState } from 'react';

import { forgotPasswordAction } from '@/actions/auth/forgot-password-action';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form/';
import { useNotifications } from '@/components/ui/notifications';

const INITIAL_STATE = {
  type: null,
  status: undefined,
  message: null,
  fieldErrors: {},
};

export const ForgotPasswordForm = () => {
  const { addNotification } = useNotifications();

  const forgotPasswordHandler = async (prevState: any, formData: FormData) => {
    const result = await forgotPasswordAction(prevState, formData);

    if (result.status !== undefined) {
      addNotification(state);
    }

    return result;
  };

  const [state, submitAction, isPending] = useActionState(
    forgotPasswordHandler,
    INITIAL_STATE,
  );

  return (
    <form action={submitAction} className="mt-20 grid w-full gap-6">
      <FormInput
        label="メールアドレス"
        id="email"
        name="email"
        type="email"
        error={state.fieldErrors?.email ?? []}
        required
      />
      <Button
        as="button"
        className="mx-auto max-w-screen-sm"
        disabled={isPending}
      >
        {isPending ? '送信中です...' : 'メールを送信する'}
      </Button>
    </form>
  );
};
