'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

export const signUp = async (formData: FormData): Promise<void> => {
  const supabase = await createClient();
  const userData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: { username: formData.get('username') },
      emailRedirectTo: process.env.SIGNUP_REDIRECT_URL,
    },
  };

  const { error } = await supabase.auth.signUp(userData);

  if (error) {
    console.error(`${error.status}: ${error.message}`);
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/login');
};

export const signIn = async (formData: FormData): Promise<void> => {
  const supabase = await createClient();
  const userData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(userData);

  if (error) {
    console.error(`${error.status}: ${error.message}`);
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
};

export const signOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
};
