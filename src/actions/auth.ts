'use server';

import { createClient } from '@/lib/supabase/server';

const supabase = createClient();

export const signIn = async () => {
  await supabase.auth.signInAnonymously();
};

export const signOut = async () => {
  await supabase.auth.signOut();
};
