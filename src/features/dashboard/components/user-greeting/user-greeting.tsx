import { Text } from '@/components/ui/text/text';
import { fetchUserProfileRpc } from '@/lib/supabase/user/fetch-user-profile-rpc';

export const UserGreeting = async () => {
  const user = await fetchUserProfileRpc();

  return (
    <Text className="mb-6 text-lg">
      <b>ようこそ、{user?.username ?? 'unknown user'}さん👏</b>
    </Text>
  );
};
