import TaskHistoryPageClient from '@/features/history/components/history';
import { getGroup } from '@/lib/supabase/group/get-group';

export default async function TaskHistoryPage() {
  const { group, error } = await getGroup();

  if (error) {
    console.error('Error fetching group:', error);
    return <div>エラーが発生しました。</div>;
  }

  if (!group || group.length === 0) {
    return <div>グループが見つかりませんでした。</div>;
  }

  // グループ情報をクライアントコンポーネントに渡す
  return <TaskHistoryPageClient groupId={group[0].group_id} />;
}
