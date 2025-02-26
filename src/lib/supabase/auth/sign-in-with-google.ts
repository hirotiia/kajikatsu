import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

export async function signInWithGoogle() {
  const supabase = await createClient();
  const {
    data: { url },
    error,
  } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.SUPABASE_AUTH_URL}/api/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });
  if (error) console.error('Googleログインエラー:', error.message);
  if (!error && url) redirect(url);
}
