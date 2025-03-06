'use client';

import { ReactElement, useCallback, useEffect, useState } from 'react';

import { Cards } from '@/components/ui/card';
import { Tab, TabHeader, TabItem, TabItemProps } from '@/components/ui/tab';
import { fetchTasksByUserIdClient } from '@/lib/supabase/data/tasks/select/fetch-tasks-by-user-id-client';
import { subscribeDBChanges } from '@/lib/supabase/realtime/subscribe-db-changes';
import { Task } from '@/types/task.types';
import { cn } from '@/utils/cn';

import { FormDeleteTask } from '../form/form-delete-task';
import { FormUpdateTask } from '../form/update/form-update-task';

type ClientUserTabProps = {
  userId: string;
  initialTasks: Task[];
  className?: string;
};

export const ClientUserTab = ({
  userId,
  initialTasks,
  className,
}: ClientUserTabProps) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLatestTasks = useCallback(async () => {
    setIsLoading(true);

    const { data, error } = await fetchTasksByUserIdClient(userId, {
      filterType: 'assignee',
      filterValue: userId,
    });

    if (error) {
      setIsLoading(false);
      return;
    }
    setTasks(data ?? []);
    setIsLoading(false);
  }, [userId]);

  useEffect(() => {
    const channel = subscribeDBChanges({
      schema: 'public',
      table: 'tasks',
      filter: `assignee_id=eq.${userId}`,
      onChange: fetchLatestTasks,
    });

    return () => {
      channel.unsubscribe();
    };
  }, [userId, fetchLatestTasks]);

  const statusList = ['対応中', '未対応', '保留', '完了'];
  const tasksByStatus = statusList.reduce<Record<string, Task[]>>(
    (acc, status) => {
      acc[status] = tasks.filter((t) => t.statusName === status);
      return acc;
    },
    {},
  );

  const renderActions = (item: {
    id: string;
    title: string;
    description?: string | null;
    expiresAt?: string | null;
    statusName?: string | null;
  }) => [
    <FormUpdateTask
      key="update"
      taskId={item.id}
      title={item.title}
      description={item.description || ''}
      expiresAt={item.expiresAt || ''}
      statusId={undefined}
    />,
    <FormDeleteTask key="delete" taskId={item.id} />,
  ];

  return (
    <Tab defaultKey="対応中" className={cn('mt-3', className)}>
      <TabHeader
        ariaLabel="タスクナビゲーション"
        statusList={statusList.map((status) => ({
          key: status,
          label: status,
        }))}
      />
      {statusList.map(
        (status): ReactElement<TabItemProps> => (
          <TabItem key={status} tabKey={status} label={status}>
            {isLoading ? (
              <p>読み込み中です...</p>
            ) : tasksByStatus[status]?.length > 0 ? (
              <Cards
                items={tasksByStatus[status]}
                background="glassmorphism"
                renderActions={renderActions}
              />
            ) : (
              <p className="text-base">タスクはありません。</p>
            )}
          </TabItem>
        ),
      )}
    </Tab>
  );
};
