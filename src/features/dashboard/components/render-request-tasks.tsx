import { TaskCard } from '@/components/ui/card';
import { Task } from '@/types/task.types';
import { cn } from '@/utils/cn';

import { createRequestMembersTask } from '../api/create-request-members-task';

import { RenderAssignButton } from './button/render-assign-button';

type props = {
  className?: string;
  groupId: string;
};

export const RenderRequestTasks = async ({ className, groupId }: props) => {
  const res = await createRequestMembersTask(groupId);

  if (res.error) {
    return <p className="text-destructive-foreground">エラー: {res.error}</p>;
  }

  const members = res.data?.members ?? [];

  // 各メンバーが担当しているタスクを1つの配列にまとめる
  // => Task[] の配列としてフラット化
  const tasks: Task[] = members.flatMap((member) => member.tasks);

  return tasks.length === 0 ? (
    <p>お願いされているタスクはありません。</p>
  ) : (
    <TaskCard
      tasks={tasks}
      className={cn(className)}
      renderActionButton={<RenderAssignButton />}
    />
  );
};
