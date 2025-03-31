import { JoinRequestList } from '@/features/information/components/join-request-list';
import { fetchUserData } from '@/lib/supabase/user/fetch-user-data';

export const InformationItems = async () => {
  const data = await fetchUserData();
  return data?.userId && <JoinRequestList userId={data.userId} />;
};
