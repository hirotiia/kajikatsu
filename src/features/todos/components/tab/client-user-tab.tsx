'use client';

import { ReactElement, useCallback, useEffect, useState } from 'react';

import { Cards } from '@/components/ui/card';
import { Tab, TabHeader, TabPanel, TabPanelProps } from '@/components/ui/tab';
import { Statuses } from '@/lib/supabase/data/statuses/select/fetch-status';
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
  statusList: Statuses;
};

export const ClientUserTab = ({
  userId,
  initialTasks,
  className,
  statusList,
}: ClientUserTabProps) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLatestTasks = useCallback(async () => {
    setIsLoading(true);

    const { data, error } = await fetchTasksByUserIdClient(userId, {
      filterType: 'assignee',
      filterValue: userId,
    });
    if (error || !data) {
      setIsLoading(false);
      return;
    }

    const tasksAssignedToMe = data.filter((task) => task.assigneeId === userId);
    setTasks(tasksAssignedToMe);
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
  }, [fetchLatestTasks, userId]);

  const tasksByStatus = statusList.reduce<Record<string, Task[]>>(
    (acc, status) => {
      acc[status.id] = tasks.filter((t) => t.statusId === status.id);
      return acc;
    },
    {},
  );

  const defaultKey = statusList[0]?.id || '';

  const renderActions = (item: {
    id: string;
    title: string;
    description?: string | null;
    expiresAt?: string | null;
    statusId?: string | null;
    statusName?: string | null;
  }) => [
    <FormUpdateTask
      key="update"
      taskId={item.id}
      title={item.title}
      description={item.description ?? ''}
      expiresAt={item.expiresAt ?? ''}
      statusId={item.statusId ?? ''}
      statusList={statusList}
      userId={userId}
    />,
    <FormDeleteTask key="delete" taskId={item.id} />,
  ];

  return (
    <Tab defaultKey={defaultKey} className={cn('mt-3', className)}>
      <TabHeader
        ariaLabel="あなたのおしごと一覧"
        tabs={statusList.map(({ id, label }) => ({
          key: id,
          label: `${label}(${tasksByStatus[id]?.length ?? 0})`,
        }))}
      />
      {statusList.map(({ id, label }): ReactElement<TabPanelProps> => {
        const tasksInThisStatus = tasksByStatus[id] ?? [];
        return (
          <TabPanel key={id} tabKey={id} label={label}>
            {isLoading ? (
              <p>読み込み中です...</p>
            ) : tasksInThisStatus.length > 0 ? (
              <Cards
                items={tasksInThisStatus}
                background="glassmorphism"
                renderActions={renderActions}
              />
            ) : (
              <p className="text-base">タスクはありません。</p>
            )}
          </TabPanel>
        );
      })}
    </Tab>
  );
};
