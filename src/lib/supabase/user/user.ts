import 'server-only';

import { createClient } from '@/lib/supabase/server';

export const getUser = async () => {
  const supabase = await createClient();
  console.log(supabase);

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  return { user, authError };
};
