'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useEffect } from 'react';

import { resetPasswordAction } from '@/actions/auth/reset-password-action';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form/';
import { useNotifications } from '@/components/ui/notifications';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/utils/cn';

export const ResetPasswordForm = ({ className }: { className?: string }) => {
  const initialState = {
    type: null,
    status: undefined,
    message: null,
    fieldErrors: {},
  };
  const router = useRouter();
  const [state, submitAction, isPending] = useActionState(
    resetPasswordAction,
    initialState,
  );
  const searchParams = useSearchParams();
  const { addNotification } = useNotifications();

  useEffect(() => {
    const setupSession = async () => {
      try {
        const supabase = createClient();
        const token = searchParams.get('token');
        const type = searchParams.get('type');

        if (!token || type !== 'recovery') {
          throw new Error('無効なリセットリンクです');
        }

        const { error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'recovery',
        });

        if (error) {
          throw new Error(
            'セッションの確立に失敗しました。リンクが期限切れか無効です。',
          );
        }

        if (state.type === 'success') {
          addNotification(state);

          setTimeout(() => {
            router.push('/dashboard');
          }, 2000);
        } else if (state.type === 'error') {
          addNotification(state);
        }
      } catch (error: any) {
        addNotification({
          type: 'error',
          status: error.code,
          message: error.message,
        });
      }
    };

    setupSession();
  }, [searchParams, addNotification, router, state]);

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
