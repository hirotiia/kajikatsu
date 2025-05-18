import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useNotifications } from '@/components/ui/notifications';
import { deleteTask } from '@/lib/supabase/data/tasks/delete/delete-task';

type FormDeleteTaskProps = {
  taskId: string;
};

export const FormDeleteTask = ({ taskId }: FormDeleteTaskProps) => {
  const { addNotification } = useNotifications();
  const handleFormDeleteTask = async () => {
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
      as="button"
      className="grid place-content-center rounded-md md:size-[50px]"
      variant="destructive"
      size="full"
      onClick={handleFormDeleteTask}
    >
      <Trash2 size={20}>削除する</Trash2>
    </Button>
  );
};
