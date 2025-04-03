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

/**
 * 未担当のタスク一覧を表示するコンポーネント
 * グループIDに紐づく未割り当てのタスクを表示し、リアルタイム更新を処理する
 */
export const RenderRequestTasks = ({
  groupId,
  initialData,
}: RenderRequestTasksProps) => {
  const [tasks, setTasks] = useState<Task[]>(initialData);
  const [optimisticTasks, addOptimisticTask] = useOptimistic(
    tasks,
    (currentTasks, taskIdToRemove: string) => {
      return currentTasks.filter((task) => task.id !== taskIdToRemove);
    },
  );

  const fetchLatestTasks = useCallback(async () => {
    const { data, error } = await fetchTasksClient({
      groupId,
      assigneeId: null,
    });

    if (!error && data) {
      setTasks(data);
    }
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
    task: Omit<Task, 'createdAt' | 'updatedAt' | 'assigneeId'>,
  ) => {
    return [
      <AssignButton
        key="assign"
        taskId={task.id}
        setOptimistic={() => handleAssign(task.id)}
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
