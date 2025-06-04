import { Text } from '@/components/ui/text/text';
import { createTRPCContext } from '@/trpc/init';
import { createCaller } from '@/trpc/routers/_app';

export const UserGreeting = async () => {
  const ctx = await createTRPCContext();
  const caller = createCaller(ctx);
  const user = await caller.userProfile.getUserProfile();

  return (
    <Text className="mb-6 text-lg">
      <b>ようこそ、{user?.username ?? 'unknown user'}さん👏</b>
    </Text>
  );
};
