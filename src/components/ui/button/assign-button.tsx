'use client';

import { useTransition } from 'react';

import { assignTask } from '@/lib/supabase/data/tasks/update/assign-task';

import { useNotifications } from '../notifications';

import { Button } from './button';

type AssignTaskButtonProps = {
  taskId: string;
};

/**
 * 「担当する」ボタン。押すとサーバーアクションを呼び出して、タスクの担当者を自分に設定する。
 */
export function AssignButton({ taskId }: AssignTaskButtonProps) {
  const [isPending, startTransition] = useTransition();
  const { addNotification } = useNotifications();

  const handleClick = () => {
    startTransition(async () => {
      try {
        assignTask(taskId);
        addNotification({
          type: 'success',
          status: 200,
          message: '担当者をあなたに変更しました。',
        });
      } catch (error: any) {
        addNotification({
          type: 'error',
          status: 500,
          message: `担当者設定に失敗しました: ${error.message}`,
        });
      }
    });
  };

  return (
    <Button
      variant="default"
      size="small"
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? '更新中...' : '担当する'}
    </Button>
  );
}
