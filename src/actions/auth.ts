'use server';

import { createClient } from '@/lib/supabase/server';

// 新規ユーザーのサインアップして結果を返す
export const signUp = async (
  username: string,
  email: string,
  password: string,
): Promise<{ data: any; error: any }> => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username },
      emailRedirectTo: process.env.SIGNUP_REDIRECT_URL,
    },
  });

  return { data, error };
};

export const signIn = async () => {
  const supabase = await createClient();
  await supabase.auth.signInAnonymously();
};

export const signOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
};
