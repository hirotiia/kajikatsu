'use client';

import { useCallback, useEffect, useState } from 'react';

import { Cards } from '@/components/ui/card';
import { Tab, TabSelectHeader, TabPanel } from '@/components/ui/tab';
import { subscribeDBChanges } from '@/lib/supabase/realtime/subscribe-db-changes';
import { MemberWithTasks } from '@/types/member-with-tasks';
import { cn } from '@/utils/cn';

import { createGroupMembersTaskClient } from '../api/create-group-members-task-client';

type Props = {
  groupId: string;
  className?: string;
  initialState: MemberWithTasks[];
};

export const RenderMembersTasks = ({
  groupId,
  className,
  initialState,
}: Props) => {
  console.log(initialState);

  const [members, setMembers] = useState<MemberWithTasks[]>(initialState);

  const defaultKey = members[0]?.user_id ?? 'no-member';
  const options = members.map(({ user_id, username }) => ({
    key: user_id,
    label: username,
  }));

  const fetchAllMembersTasks = useCallback(async () => {
    const res = await createGroupMembersTaskClient(groupId);

    if (res.error) {
      throw new Error(res.error);
    } else {
      setMembers(res.data?.members ?? []);
    }
  }, [groupId]);

  useEffect(() => {
    const channel = subscribeDBChanges({
      table: 'tasks',
      filter: `group_id=eq.${groupId}`,
      onChange: fetchAllMembersTasks,
    });

    return () => {
      channel.unsubscribe();
    };
  }, [fetchAllMembersTasks, groupId]);

  return (
    <Tab defaultKey={defaultKey} className={cn('', className)}>
      <TabSelectHeader options={options} />

      {members.map(({ user_id, username, tasks }) => (
        <TabPanel
          key={user_id}
          tabKey={user_id}
          label={`${username}さんの担当タスク`}
        >
          <div className="space-y-4">
            {tasks.length > 0 ? (
              <Cards
                background="glassmorphism"
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
        </TabPanel>
      ))}
    </Tab>
  );
};
