'use client';

import { TaskCard } from '@/components/ui/card';

import { useRequestTasks } from '../api/get-request-tasks';

type RenderRequestTasksProps = {
  className?: string;
  groupId: string;
};

export const RenderRequestTasks = ({
  className,
  groupId,
}: RenderRequestTasksProps) => {
  const { tasks, error, isLoading } = useRequestTasks(groupId);
  console.log('------------------');
  console.log(tasks);
  console.log('------------------');

  if (isLoading) {
    return <p>読み込み中...</p>;
  }

  if (error) {
    return <p className="text-destructive-foreground">エラー: {error}</p>;
  }

  return tasks.length === 0 ? (
    <p className="text-sm md:text-base">お願いされているタスクはありません。</p>
  ) : (
    <TaskCard tasks={tasks} className={className} assignButton />
  );
};
