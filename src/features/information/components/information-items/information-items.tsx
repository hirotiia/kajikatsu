import { JoinRequestList } from '@/features/information/components/join-request-list';
import { fetchUserProfileRpc } from '@/lib/supabase/user/fetch-user-profile-rpc';

export const InformationItems = async () => {
  const data = await fetchUserProfileRpc();
  return data?.userId && <JoinRequestList userId={data.userId} />;
};
