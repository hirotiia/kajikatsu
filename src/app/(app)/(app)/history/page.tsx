import { Heading } from '@/components/ui/heading';
import { TaskHistoryPageClient } from '@/features/history/components/history';
import { getUserData } from '@/lib/supabase/data/users/get-user-data';
import { getUser } from '@/lib/supabase/user/user';

export default async function TaskHistoryPage() {
  const { user, authError } = await getUser();

  if (!user || authError) {
    console.error('[getUserData] ユーザー情報の取得に失敗しました:', authError);
    return null;
  }

  const userData = await getUserData(user.id);

  if (!userData) {
    return <p>データが見つかりませんでした。</p>;
  }

  return (
    <>
      <Heading as="h1" className="mb-8 mt-3">
        履歴
      </Heading>
      <TaskHistoryPageClient userData={userData} />
    </>
  );
}
