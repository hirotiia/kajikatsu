'use server';

import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { forgotPasswordSchema } from '@/lib/zod/validation-schema';
import { NotificationType } from '@/stores/notifications';

export const forgotPasswordAction = async (
  currentState: Omit<NotificationType, 'id'>,
  formData: FormData,
): Promise<any | null> => {
  let validatedData;

  try {
    validatedData = forgotPasswordSchema.parse({
      email: formData.get('email'),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors = error.flatten().fieldErrors;
      return {
        type: 'error',
        status: 400,
        message: '入力内容にエラーがあります。',
        fieldErrors,
      };
    }

    return {
      type: 'error',
      status: 500,
      message: 'サーバーエラーが発生しました。',
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(
    validatedData.email,
    {
      redirectTo: `${process.env.NEXT_PUBLIC_PROJECT_URL}/reset-password`,
    },
  );

  if (error) {
    return { type: 'error', status: error.status, message: error.message };
  }

  return {
    type: 'success',
    status: 200,
    message: 'リセットメールを送信しました。',
  };
};
