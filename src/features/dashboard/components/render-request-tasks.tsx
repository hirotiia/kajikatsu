'use client';

import { AssignButton } from '@/components/ui/button';
import { Cards } from '@/components/ui/card';

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

  if (isLoading) {
    return <p>読み込み中...</p>;
  }

  if (error) {
    return <p className="text-destructive-foreground">エラー: {error}</p>;
  }

  if (tasks.length === 0) {
    return (
      <p className="text-sm md:text-base">
        お願いされているタスクはありません。
      </p>
    );
  }

  const items = tasks.map((task) => ({
    id: task.id,
    title: task.title,
    description: task.description,
    expiresAt: task.expiresAt,
    statusName: task.statusName,
  }));

  const renderActions = (item: (typeof items)[number]) => {
    return [<AssignButton key="assign" taskId={item.id} />];
  };

  return (
    <Cards items={items} className={className} renderActions={renderActions} />
  );
};
