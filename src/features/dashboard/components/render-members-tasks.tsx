'use client';

import { useCallback, useState } from 'react';

import { Cards } from '@/components/ui/card';
import { Tab, TabSelectHeader, TabItem } from '@/components/ui/tab';
import { useRealtimeTasksChannel } from '@/hooks/use-realtime-tasks-channel';
import { cn } from '@/utils/cn';

import {
  createGroupMembersTaskClient,
  GroupMembersTasks,
  MemberWithTasks,
} from '../api/create-group-members-task-client';

type Props = {
  groupId: string;
  className: string;
  initialState: GroupMembersTasks;
};

export const RenderMembersTasks = ({
  groupId,
  className,
  initialState,
}: Props) => {
  const [members, setMembers] = useState<MemberWithTasks[]>(
    initialState.members,
  );

  // 先頭メンバーの user_id をデフォルトのタブキーに
  const defaultKey = members[0]?.user_id ?? 'no-member';
  const options = members.map(({ user_id, username }) => ({
    key: user_id,
    label: username,
  }));

  // データ取得処理
  const fetchAllMembersTasks = useCallback(async () => {
    try {
      const res = await createGroupMembersTaskClient(groupId);
      if (res.error) {
        throw new Error(res.error);
      } else {
        setMembers(res.data?.members ?? []);
      }
    } catch (err: any) {
      return <p>グループのタスクの取得に失敗しました。{err}</p>;
    }
  }, [groupId]);

  // Realtime購読: tasks テーブルに変更があったら再取得する
  useRealtimeTasksChannel({
    table: 'tasks',
    onChange: fetchAllMembersTasks,
  });
  return (
    <Tab defaultKey={defaultKey} className={cn('', className)}>
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
};
