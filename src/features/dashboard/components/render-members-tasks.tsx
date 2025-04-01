'use client';

import { useCallback, useEffect, useState } from 'react';

import { Cards } from '@/components/ui/card';
import { Tab, TabSelectHeader, TabPanel } from '@/components/ui/tab';
import { fetchTasks } from '@/lib/supabase/data/tasks/select/fetch-tasks';
import { subscribeDBChanges } from '@/lib/supabase/realtime/subscribe-db-changes';
import { MemberWithTasks } from '@/types/member-with-tasks';
import { cn } from '@/utils/cn';

type RenderMembersTasksProps = {
  groupId: string;
  className?: string;
  initialState: MemberWithTasks[];
};
export const RenderMembersTasks = ({
  groupId,
  className,
  initialState,
}: RenderMembersTasksProps) => {
  const [members, setMembers] = useState<MemberWithTasks[]>(initialState);

  const defaultKey = members[0]?.user_id;
  const options = members.map(({ user_id, username }) => ({
    key: user_id,
    label: username,
  }));

  const updateTasksDiff = useCallback(async () => {
    try {
      const tasksResult = await fetchTasks({ groupId });
      const tasks = tasksResult.data || [];

      setMembers((currentMembers) =>
        currentMembers.map((member) => {
          const memberTasks = tasks.filter(
            (task) => task.assigneeId === member.user_id,
          );

          return {
            ...member,
            tasks: memberTasks,
          };
        }),
      );
    } catch (error) {
      console.error('タスク更新中にエラーが発生しました:', error);
    }
  }, [groupId]);

  useEffect(() => {
    const channel = subscribeDBChanges({
      table: 'tasks',
      filter: `group_id=eq.${groupId}`,
      onChange: updateTasksDiff,
    });

    return () => {
      channel.unsubscribe();
    };
  }, [updateTasksDiff, groupId]);

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
