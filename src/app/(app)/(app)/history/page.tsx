import { Heading } from '@/components/ui/heading';
import { TaskHistoryPageClient } from '@/features/history/components/history';
import { getUserData } from '@/lib/supabase/data/users/get-user-data';
import { getGroup } from '@/lib/supabase/group/get-group';
import { getUser } from '@/lib/supabase/user/user';

export default async function TaskHistoryPage() {
  const { group, error } = await getGroup();
  // ログインユーザー情報を取得
  const { user, authError } = await getUser();
  if (!user || authError) {
    console.error('[getUserData] ユーザー情報の取得に失敗しました:', authError);
    return null;
  }

  const userData = await getUserData(user.id);

  if (!userData) {
    return <p>データが見つかりませんでした。</p>;
  }

  if (error) {
    console.error('Error fetching group:', error);
    return <div>エラーが発生しました。</div>;
  }

  if (!group || group.length === 0) {
    return <div>グループが見つかりませんでした。</div>;
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
