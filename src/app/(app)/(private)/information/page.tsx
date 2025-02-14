import { JoinRequestList } from '@/features/information/components/join-request-list';
import { getUser } from '@/lib/supabase/user/user';

export default async function InformationPage() {
  const { user } = await getUser();
  return <div>{user?.id && <JoinRequestList userId={user?.id} />}</div>;
}
