import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '@/stores';
import { add, NotificationType, remove } from '@/stores/notifications';

export const useNotifications = () => {
  const notifications = useSelector((state: RootState) => state.notifications);
  const dispatch = useDispatch();
  const addNotification = useCallback(
    (notification: Omit<NotificationType, 'id'>) => {
      dispatch(add(notification));
    },
    [dispatch],
  );
  const deleteNotification = useCallback(
    (id: string) => {
      dispatch(remove({ id }));
    },
    [dispatch],
  );

  return { notifications, deleteNotification, addNotification };
};
