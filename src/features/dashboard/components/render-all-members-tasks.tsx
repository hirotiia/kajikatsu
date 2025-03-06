'use client';

import { Cards } from '@/components/ui/card';
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
  const options = members.map(({ user_id, username }) => ({
    key: user_id,
    label: username,
  }));

  return (
    <Tab defaultKey={defaultKey} className={className}>
      <TabSelectHeader options={options} />

      {members.map(({ user_id, username, tasks }) => (
        <TabItem
          key={user_id}
          tabKey={user_id}
          label={`${username}さんの担当タスク`}
        >
          <div className="space-y-4">
            {tasks.length > 0 ? (
              <Cards
                items={tasks.map((task) => ({
                  id: task.id,
                  title: task.title,
                  description: task.description,
                  expiresAt: task.expiresAt,
                  statusName: task.statusName,
                }))}
              />
            ) : (
              <p>担当しているタスクはありません。</p>
            )}
          </div>
        </TabItem>
      ))}
    </Tab>
  );
}
