import type { SupabaseClient, User } from '@supabase/supabase-js';

export type TRPCContext = {
  supabase: SupabaseClient;
  user: User | null;
};
