'use client';

import { useActionState } from 'react';

import { assignTask } from '@/actions/task/assign-task';
import { fetchTasksClient } from '@/lib/supabase/data/tasks/select/fetch-tasks-client';
import { Task } from '@/types/task.types';

import { useNotifications } from '../notifications';

import { Button } from './button';

type AssignTaskButtonProps = {
  taskId: string;
  groupId: string;
  setOptimistic?: (taskId: string) => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const INITIAL_STATE = {
  type: null,
  status: undefined,
  message: null,
};

/**
 * タスク担当ボタンコンポーネント
 * クリックするとサーバーアクションを呼び出し、タスクを自分に割り当てる
 */
export function AssignButton({
  taskId,
  groupId,
  setOptimistic,
  setTasks,
}: AssignTaskButtonProps) {
  const { addNotification } = useNotifications();

  const handleAssignFunction = async (prevState: any, formData: FormData) => {
    if (setOptimistic) {
      setOptimistic(taskId);
    }
    const result = await assignTask(prevState, formData);

    if (result.status !== undefined) {
      addNotification({
        type: result.type,
        status: result.status,
        message: result.message,
      });
    }

    const { data } = await fetchTasksClient({
      groupId,
      assigneeId: null,
    });

    if (data) {
      setTasks(data);
    }

    return result;
  };

  const [, formAction, isPending] = useActionState(
    handleAssignFunction,
    INITIAL_STATE,
  );

  return (
    <form action={formAction}>
      <input type="hidden" name="taskId" value={taskId} />
      <Button size="small" disabled={isPending}>
        {isPending ? '更新中...' : '担当する'}
      </Button>
    </form>
  );
}
