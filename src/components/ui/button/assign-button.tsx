'use client';

import { useActionState } from 'react';

import { assignTask } from '@/actions/task/assign-task';

import { useNotifications } from '../notifications';

import { Button } from './button';

type AssignTaskButtonProps = {
  taskId: string;
  onAssign?: (taskId: string) => void;
};

const INITIAL_STATE = {
  type: null,
  status: undefined,
  message: null,
};

/**
 * 「担当する」ボタン。押すとサーバーアクションを呼び出して、タスクの担当者を自分に設定する。
 */
export function AssignButton({ taskId, onAssign }: AssignTaskButtonProps) {
  const { addNotification } = useNotifications();

  const handleAssignFunction = async (prevState: any, formData: FormData) => {
    const result = await assignTask(prevState, formData);

    if (result.status !== undefined) {
      addNotification({
        type: result.type,
        status: result.status,
        message: result.message,
      });
    }

    if (onAssign && result.type === 'success') {
      onAssign(taskId);
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
