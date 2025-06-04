import { z } from 'zod';

import { fetchTargetHistory } from '@/lib/supabase/data/task-history/select/fetch-target-history';
import { baseProcedure, createTRPCRouter } from '@/trpc/init';
import { isAuthed } from '@/trpc/middleware';

export const targetHistoryRouter = createTRPCRouter({
  getTargetHistory: baseProcedure
    .use(isAuthed)
    .input(z.object({ year: z.number(), month: z.number() }))
    .query(async ({ ctx, input }) => {
      return await fetchTargetHistory(ctx, input);
    }),
});
