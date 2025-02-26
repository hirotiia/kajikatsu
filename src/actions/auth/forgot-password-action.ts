'use server';

import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { forgotPasswordSchema } from '@/lib/zod/validation-schema';
import { NotificationType } from '@/stores/notifications';

type ForgotPasswordActionResult = Omit<NotificationType, 'id'> & {
  fieldErrors?: Record<string, string[] | undefined>;
};

export const forgotPasswordAction = async (
  currentState: ForgotPasswordActionResult,
  formData: FormData,
): Promise<ForgotPasswordActionResult> => {
  try {
    const { email } = forgotPasswordSchema.parse({
      email: formData.get('email'),
    });

    const supabase = await createClient();

    // パスワードリセットメール送信
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_PROJECT_URL}/reset-password`,
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
      message: 'リセットメールを送信しました。',
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
