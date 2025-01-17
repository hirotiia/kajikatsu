import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useNotifications } from '@/components/ui/notifications';
import { deleteTask } from '@/lib/supabase/data/tasks/delete/delete-task';

type DeleteTaskProps = {
  taskId: string;
};

export const DeleteTask = ({ taskId }: DeleteTaskProps) => {
  const { addNotification } = useNotifications();
  const handleDeleteTask = async () => {
    try {
      const { data, error } = await deleteTask(taskId);

      if (error) {
        addNotification({
          type: 'error',
          status: 404,
          message: `タスクの削除に失敗しました: ${error}`,
        });
        return;
      }

      if (data?.alreadyDeleted) {
        addNotification({
          type: 'info',
          status: 200,
          message: 'すでにタスクは削除済みです。',
        });
      } else {
        addNotification({
          type: 'success',
          status: 200,
          message: 'タスクを削除しました',
        });
      }
    } catch (err) {
      addNotification({
        type: 'error',
        status: 500,
        message: `タスクの削除に失敗しました: ${(err as Error).message}`,
      });
    }
  };

  return (
    <Button
      className="rounded-md"
      variant="destructive"
      size="small"
      onClick={handleDeleteTask}
      icon={<Trash2>削除する</Trash2>}
    >
      削除する
    </Button>
  );
};
