import { JoinRequestList } from '@/features/information/components/join-request-list';
import { createTRPCContext } from '@/trpc/init';
import { createCaller } from '@/trpc/routers/_app';

export const InformationItems = async () => {
  const ctx = await createTRPCContext();
  const caller = createCaller(ctx);
  const user = await caller.userProfile.getUserProfile();
  return user?.userId && <JoinRequestList userId={user.userId} />;
};
