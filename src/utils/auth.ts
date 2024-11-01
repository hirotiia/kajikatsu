import 'server-only';

import { cache } from 'react';

import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const currentUser = cache(async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
});
