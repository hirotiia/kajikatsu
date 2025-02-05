'use client';

import { TaskCard } from '@/components/ui/card';
import { Tab, TabSelectHeader, TabItem } from '@/components/ui/tab';

import { useAllMembersTasks } from '../api/get-all-members-tasks';

/**
 * グループメンバーごとの担当タスクを一覧表示するコンポーネント
 */
export function RenderAllMembersTasks({
  groupId,
  className,
}: {
  groupId: string;
  className?: string;
}) {
  const { members, error, isLoading } = useAllMembersTasks(groupId);

  if (isLoading) {
    return <p>読み込み中...</p>;
  }

  if (error) {
    return <p className="text-destructive-foreground">エラー: {error}</p>;
  }

  if (members.length === 0) {
    return <p>このグループにメンバーはいません。</p>;
  }

  // 先頭メンバーの user_id をデフォルトのタブキーに
  const defaultKey = members[0]?.user_id ?? 'no-member';

  return (
    <Tab defaultKey={defaultKey} className={className}>
      <TabSelectHeader />

      {members.map((member) => (
        <TabItem
          key={member.user_id}
          tabKey={member.user_id}
          label={`${member.username}さんの担当タスク`}
        >
          <div className="space-y-4">
            {member.tasks.length > 0 ? (
              <TaskCard tasks={member.tasks} />
            ) : (
              <p>担当しているタスクはありません。</p>
            )}
          </div>
        </TabItem>
      ))}
    </Tab>
  );
}
