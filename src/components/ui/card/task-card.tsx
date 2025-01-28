import { Task } from '@/types/task.types';

/**
 * ユーザーが担当するタスクを一覧表示するコンポーネント
 */
export const TaskCard = ({ tasks }: { tasks: Task[] }) => {
  return (
    <ul className="grid gap-4">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="rounded-lg border border-muted bg-background p-4 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-primary-foreground">
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
        </li>
      ))}
    </ul>
  );
};
