'use server';

import { createClient } from '@/lib/supabase/server';

export const signIn = async () => {
  const supabase = await createClient();
  await supabase.auth.signInAnonymously();
};

export const signOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
};
