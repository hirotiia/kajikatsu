import { initTRPC } from '@trpc/server';
import { cache } from 'react';

import { createClient } from '@/lib/supabase/server';
import { TRPCContext } from '@/types/trpc';
export const createTRPCContext = cache(async (): Promise<TRPCContext> => {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user ?? null;
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return {
    supabase,
    user,
  };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
export const t = initTRPC.context<TRPCContext>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
