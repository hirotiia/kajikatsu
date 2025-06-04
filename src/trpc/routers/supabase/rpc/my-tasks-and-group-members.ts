import { fetchMyTasksAndGroupMembersRpc } from '@/lib/supabase/rpc/fetch-my-tasks-and-group-users-rpc';
import { baseProcedure, createTRPCRouter } from '@/trpc/init';
import { isAuthed } from '@/trpc/middleware';

export const myTasksAndGroupMembersRouter = createTRPCRouter({
  getUserProfile: baseProcedure.use(isAuthed).query(async ({ ctx }) => {
    return await fetchMyTasksAndGroupMembersRpc(ctx);
  }),
});
