'use client';

import { useCallback, useOptimistic, useState } from 'react';

import { AssignButton } from '@/components/ui/button';
import { Cards } from '@/components/ui/card';
import { Task } from '@/types/task.types';

type RenderRequestTasksProps = {
  initialData: Task[];
};

export const RenderRequestTasks = ({
  initialData,
}: RenderRequestTasksProps) => {
  const [tasks, setTasks] = useState(initialData);
  const [optimisticTasks, addOptimisticTask] = useOptimistic(
    tasks,
    (currentTasks, taskIdToRemove) => {
      return currentTasks.filter((task) => task.id !== taskIdToRemove);
    },
  );

  console.log(setTasks);

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
