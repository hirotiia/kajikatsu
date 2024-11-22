'use server';

import { createClient } from '@/lib/supabase/server';

export const signUp = async (
  state: any,
  formData: FormData,
): Promise<any | null> => {
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
      'サインアップが完了しました。確認メールを送信しましたので、メールをご確認のうえログインしてください。',
  };
};

export const signIn = async (
  state: any,
  formData: FormData,
): Promise<any | null> => {
  const supabase = await createClient();
  const userData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(userData);

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
