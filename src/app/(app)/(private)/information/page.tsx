import { Heading } from '@/components/ui/heading';
import { JoinRequestList } from '@/features/information/components/join-request-list';
import { getUser } from '@/lib/supabase/user/user';

export default async function InformationPage() {
  const { user } = await getUser();
  return (
    <>
      <Heading as="h1" className="mb-8 mt-3">
        お知らせ
      </Heading>
      <div>{user?.id && <JoinRequestList userId={user?.id} />}</div>
    </>
  );
}
