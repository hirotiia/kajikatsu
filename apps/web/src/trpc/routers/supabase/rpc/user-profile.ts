import { fetchUserProfileRpc } from '@/lib/supabase/user/fetch-user-profile-rpc';
import { baseProcedure, createTRPCRouter } from '@/trpc/init';
import { isAuthed } from '@/trpc/middleware';

export const userProfileRouter = createTRPCRouter({
  getUserProfile: baseProcedure.use(isAuthed).query(async ({ ctx }) => {
    return await fetchUserProfileRpc(ctx);
  }),
});
