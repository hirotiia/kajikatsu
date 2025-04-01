'use client';

import { useCallback, useEffect, useState } from 'react';

import { AssignButton } from '@/components/ui/button';
import { Cards } from '@/components/ui/card';
import { fetchTasksClient } from '@/lib/supabase/data/tasks/select/fetch-tasks-client';
import { subscribeDBChanges } from '@/lib/supabase/realtime/subscribe-db-changes';
import { Task } from '@/types/task.types';

type RenderRequestTasksProps = {
  groupId: string;
  initialData: Task[];
};

export const RenderRequestTasks = ({
  groupId,
  initialData,
}: RenderRequestTasksProps) => {
  const [tasks, setTasks] = useState<Task[]>(initialData);

  const updateTasks = useCallback(async () => {
    try {
      const tasksResult = await fetchTasksClient({
        groupId,
        assigneeId: null,
      });

      const newTasks = tasksResult.data || [];

      setTasks(newTasks);
    } catch (error) {
      console.error('タスク更新中にエラーが発生しました', error);
    }
  }, [groupId]);

  useEffect(() => {
    const channel = subscribeDBChanges({
      table: 'tasks',
      filter: `group_id=eq.${groupId}`,
      onChange: updateTasks,
    });

    return () => {
      channel.unsubscribe();
    };
  }, [groupId, updateTasks]);

  if (tasks.length === 0) {
    return <p>お願いされているおしごとはありません。</p>;
  }

  const renderActions = (
    card: Omit<Task, 'createdAt' | 'updatedAt' | 'assigneeId'>,
  ) => {
    return [<AssignButton key="assign" taskId={card.id} />];
  };

  return (
    <Cards
      background="glassmorphism"
      items={tasks.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        expiresAt: task.expiresAt,
        statusName: task.statusName,
      }))}
      renderActions={renderActions}
    />
  );
};
