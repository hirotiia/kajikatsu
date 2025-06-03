import { fetchUserProfileRpc } from '@/lib/supabase/user/fetch-user-profile-rpc';
import { baseProcedure, createTRPCRouter } from '@/trpc/init';

export const userProfileRouter = createTRPCRouter({
  getUserProfile: baseProcedure.query(async () => {
    return await fetchUserProfileRpc();
  }),
});
