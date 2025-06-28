import { createClient } from '@/lib/supabase/server';

export const isAuthenticated = async (): Promise<boolean> => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return !!data?.user;
};
