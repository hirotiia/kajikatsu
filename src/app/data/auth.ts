import { cache } from 'react';

import { createClient } from '@/lib/supabase/server';

const supabase = createClient();

export const currentUser = cache(async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
});
