import { TaskCard } from '@/components/ui/card';
import { Tab, TabSelectHeader, TabItem } from '@/components/ui/tab';

import { createGroupMembersTask } from '../api/create-group-members-task';

/**
 * グループメンバーごとの担当タスクを一覧表示するコンポーネント
 */
export async function RenderAllMembersTasks({
  groupId,
  className,
}: {
  groupId: string;
  className?: string;
}) {
  const res = await createGroupMembersTask(groupId);

  if (res.error) {
    return <p className="text-destructive-foreground">エラー: {res.error}</p>;
  }

  const members = res.data?.members ?? [];
  if (members.length === 0) {
    return <p>このグループにメンバーはいません。</p>;
  }

  // 最初に表示するタブを先頭メンバーのIDに
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
