'use server';

import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { loginSchema, signUpSchema } from '@/lib/zod/validation-schema';
import { NotificationType } from '@/types/notification/notification.types';

type ForgotPasswordActionResult = Omit<NotificationType, 'id'> & {
  fieldErrors?: Record<string, string[] | undefined>;
};

export const signUp = async (
  currentState: ForgotPasswordActionResult,
  formData: FormData,
): Promise<ForgotPasswordActionResult> => {
  try {
    const { username, email, password } = signUpSchema.parse({
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
    });

    const supabase = await createClient();

    // サインアップ処理
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, avatar_url: '' },
        emailRedirectTo: process.env.SIGNUP_REDIRECT_URL,
      },
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
      message:
        'サインアップが完了しました！確認メールを送信しましたので、メールをご確認のうえログインしてください。',
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

export const signIn = async (
  currentState: ForgotPasswordActionResult,
  formData: FormData,
): Promise<ForgotPasswordActionResult> => {
  try {
    const { email, password } = loginSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    const supabase = await createClient();

    // サインイン
    const { error } = await supabase.auth.signInWithPassword({
      email,
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
      message: 'ログインに成功しました。',
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

export const signOut = async (): Promise<void> => {
  const supabase = await createClient();
  await supabase.auth.signOut();
};
