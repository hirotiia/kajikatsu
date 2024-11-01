import 'server-only';

import { cache } from 'react';

import { createClient } from '@/lib/supabase/server';

export const currentUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
});
