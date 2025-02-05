import { Task } from '@/types/task.types';
import { cn } from '@/utils/cn';

import { AssignButton } from '../button';

/**
 * ユーザーが担当するタスクを一覧表示するコンポーネント
 */

type TaskCardProps = {
  tasks: Task[];
  className?: string;
  assignButton?: boolean;
};

export const TaskCard = ({ tasks, className, assignButton }: TaskCardProps) => {
  return (
    <ul className={cn('grid gap-4', className)}>
      {tasks.map((task) => (
        <li
          key={task.id}
          className="rounded-lg border border-muted bg-background p-4 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-foreground">
            {task.title}
          </h2>

          {/* タスクの説明 */}
          {task.description && (
            <p className="text-foreground/80 mt-2 text-sm">
              {task.description}
            </p>
          )}

          {/* 期限日時 */}
          <p className="mt-1 text-xs text-destructive">
            期限:
            {task.expiresAt ?? '設定なし'}
          </p>

          {/* ステータス */}
          {task.statusName && (
            <p className="mt-1 text-xs text-secondary">
              ステータス: {task.statusName}
            </p>
          )}

          {/* 外部から渡されたアクション用ボタン等を表示 */}
          {assignButton && <AssignButton taskId={task.id} />}
        </li>
      ))}
    </ul>
  );
};
