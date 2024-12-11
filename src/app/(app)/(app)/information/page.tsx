import { JoinRequestList } from '@/features/information/components/requests/request-list';
import { UpdateRealtimeInfo } from '@/features/information/components/update-realtime-info';
import { getUser } from '@/lib/supabase/user/user';

export default async function InformationPage() {
  const { user } = await getUser();
  return (
    <div>
      <UpdateRealtimeInfo />
      {user?.id && <JoinRequestList userId={user?.id} />}
    </div>
  );
}
