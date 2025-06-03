import { z } from 'zod';

import { fetchTargetHistory } from '@/lib/supabase/data/task-history/select/fetch-target-history';
import { baseProcedure, createTRPCRouter } from '@/trpc/init';

export const targetHistoryRouter = createTRPCRouter({
  getTargetHistory: baseProcedure
    .input(z.object({ year: z.number(), month: z.number() }))
    .query(async ({ input }) => {
      return await fetchTargetHistory(input);
    }),
});
