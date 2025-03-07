'use client';

import { useActionState, useEffect } from 'react';

import { assignTask } from '@/actions/task/assign-task';

import { useNotifications } from '../notifications';

import { Button } from './button';

type AssignTaskButtonProps = {
  taskId: string;
};

/**
 * 「担当する」ボタン。押すとサーバーアクションを呼び出して、タスクの担当者を自分に設定する。
 */
export function AssignButton({ taskId }: AssignTaskButtonProps) {
  const { addNotification } = useNotifications();
  const initialState = {
    type: null,
    status: null,
    message: '',
  };
  const [data, actionSubmit, isPending] = useActionState(
    assignTask,
    initialState,
  );

  useEffect(() => {
    if (data.status) {
      addNotification({
        type: data.type,
        status: data.status,
        message: data.message,
      });
    }
  }, [data, addNotification]);

  return (
    <form action={actionSubmit}>
      <input type="hidden" name="taskId" value={taskId} />
      <Button size="small" disabled={isPending}>
        {isPending ? '更新中...' : '担当する'}
      </Button>
    </form>
  );
}
