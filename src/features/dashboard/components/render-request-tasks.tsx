'use client';

import { TaskCard } from '@/components/ui/card';
import { cn } from '@/utils/cn';

import { useRequestTasks } from '../api/get-request-tasks';

type props = {
  className?: string;
  groupId: string;
};

export const RenderRequestTasks = ({ className, groupId }: props) => {
  const { tasks, error, isLoading } = useRequestTasks(groupId);

  if (isLoading) {
    return <p>読み込み中...</p>;
  }

  if (error) {
    return <p className="text-destructive-foreground">エラー: {error}</p>;
  }

  return tasks.length === 0 ? (
    <p className="text-sm md:text-base">お願いされているタスクはありません。</p>
  ) : (
    <TaskCard tasks={tasks} className={cn(className)} assignButton />
  );
};
