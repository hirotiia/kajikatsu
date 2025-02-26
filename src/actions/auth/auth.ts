'use server';

import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { loginSchema } from '@/lib/zod/validation-schema';
import { NotificationType } from '@/types/notification/notification.types';

export const signUp = async (
  currentState: Omit<NotificationType, 'id'>,
  formData: FormData,
): Promise<Omit<NotificationType, 'id'>> => {
  const supabase = await createClient();
  const userData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: { username: formData.get('username'), avatar_url: '' },
      emailRedirectTo: process.env.SIGNUP_REDIRECT_URL,
    },
  };

  const { error } = await supabase.auth.signUp(userData);

  if (error) {
    return { type: 'error', status: error.status, message: error.message };
  }

  return {
    type: 'success',
    status: 200,
    message:
      'サインアップが完了しました！確認メールを送信しましたので、メールをご確認のうえログインしてください。',
  };
};

export const signIn = async (
  currentState: Omit<NotificationType, 'id'>,
  formData: FormData,
): Promise<any | null> => {
  let validatedData;

  try {
    validatedData = loginSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
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

  const { error } = await supabase.auth.signInWithPassword({
    email: validatedData.email,
    password: validatedData.password,
  });

  if (error) {
    return { type: 'error', status: error.status, message: error.message };
  }

  return {
    type: 'success',
    status: 200,
    message: 'ログインに成功しました。',
  };
};

export const signOut = async (): Promise<void> => {
  const supabase = await createClient();
  await supabase.auth.signOut();
};
