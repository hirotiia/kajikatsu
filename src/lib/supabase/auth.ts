import { cache } from 'react';

import { createClient } from './server';

export const currentUser = cache(async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
});
