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

  const { error, data } = await supabase.auth.signUp(userData);

  if (error) {
    console.log(error);
    return { type: 'error', title: error.message, message: error.message };
  }
  console.log(`state:${state}`);
  console.log(`data:${data}`);

  return {
    type: 'success',
    title: '200:success',
    message: 'sign up が完了しました。',
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

  const { error, data } = await supabase.auth.signInWithPassword(userData);

  if (error) {
    console.log(error);
    return { type: 'error', title: error.message, message: error.message };
  }
  console.log(`state:${state}`);
  console.log(`data:${data}`);

  return {
    type: 'success',
    title: '200:success',
    message: 'ログインに成功しました。',
  };
};

export const signOut = async (): Promise<void> => {
  const supabase = await createClient();
  await supabase.auth.signOut();
};
