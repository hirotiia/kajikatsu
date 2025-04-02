'use client';

import { useCallback, useEffect, useOptimistic, useState } from 'react';

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
  const [tasks, setTasks] = useState(initialData);
  const [optimisticTasks, addOptimisticTask] = useOptimistic(
    tasks,
    (currentTasks, taskIdToRemove) => {
      return currentTasks.filter((task) => task.id !== taskIdToRemove);
    },
  );

  const fetchLatestTasks = useCallback(async () => {
    const { data, error } = await fetchTasksClient({
      groupId,
      assigneeId: null,
    });

    if (error || !data) {
      return;
    }

    setTasks(data);
  }, [groupId]);

  useEffect(() => {
    const channel = subscribeDBChanges({
      schema: 'public',
      table: 'tasks',
      filter: `group_id=eq.${groupId}`,
      onChange: fetchLatestTasks,
      unique: 'render-request-tasks',
    });

    return () => {
      channel.unsubscribe();
    };
  }, [fetchLatestTasks, groupId]);

  const handleAssign = useCallback(
    (taskId: string) => {
      addOptimisticTask(taskId);
    },
    [addOptimisticTask],
  );

  if (optimisticTasks.length === 0) {
    return <p>お願いされているおしごとはありません。</p>;
  }

  const renderActions = (
    card: Omit<Task, 'createdAt' | 'updatedAt' | 'assigneeId'>,
  ) => {
    return [
      <AssignButton
        key="assign"
        taskId={card.id}
        onAssign={() => handleAssign(card.id)}
        groupId={groupId}
        setTasks={setTasks}
      />,
    ];
  };

  return (
    <Cards
      background="glassmorphism"
      items={optimisticTasks.map((task) => ({
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
