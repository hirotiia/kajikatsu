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
    console.log('----------エラーが発生----------');
    console.log(error);
    return { type: 'error', status: error.status, message: error.message };
  }
  console.log(`state:${state}`);
  console.log(`data:${data}`);

  return {
    type: 'success',
    status: 200,
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
    console.log('---------- start: error----------');
    console.log(error.status);
    console.log('---------- end: error----------');

    return { type: 'error', status: error.status, message: error.message };
  }
  console.log(`state:${state}`);
  console.log(`data:${data}`);

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
