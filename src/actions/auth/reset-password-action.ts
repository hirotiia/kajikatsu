'use server';

import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { resetPasswordSchema } from '@/lib/zod/validation-schema';
import { NotificationType } from '@/stores/notifications';

type ForgotPasswordActionResult = Omit<NotificationType, 'id'> & {
  fieldErrors?: Record<string, string[] | undefined>;
};

export const resetPasswordAction = async (
  currentState: ForgotPasswordActionResult,
  formData: FormData,
): Promise<ForgotPasswordActionResult> => {
  try {
    const { password } = resetPasswordSchema.parse({
      password: formData.get('password'),
      confirmPassword: formData.get('confirm-password'),
    });

    const supabase = await createClient();

    // パスワード更新
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      return {
        type: 'error',
        status: error.status,
        message: error.message,
      };
    }

    return {
      type: 'success',
      status: 200,
      message: 'パスワードをリセットしました。',
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        type: 'error',
        status: 400,
        message: '入力内容にエラーがあります。',
        fieldErrors: error.flatten().fieldErrors,
      };
    }

    return {
      type: 'error',
      status: 500,
      message: 'サーバーエラーが発生しました。',
    };
  }
};
