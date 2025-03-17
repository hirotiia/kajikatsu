import { JoinRequestList } from '@/features/information/components/join-request-list';
import { getUser } from '@/lib/supabase/user/user';

export const InformationItems = async () => {
  const { user } = await getUser();
  return user?.id && <JoinRequestList userId={user?.id} />;
};
