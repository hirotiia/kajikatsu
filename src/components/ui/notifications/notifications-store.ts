import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '@/stores';
import { add, remove, Notification } from '@/stores/notifications';

export const useNotifications = () => {
  const notifications = useSelector((state: RootState) => state.notifications);
  const dispatch = useDispatch();
  const addNotification = useCallback(
    (notification: Omit<Notification, 'id'>) => {
      dispatch(add(notification));
    },
    [dispatch],
  );
  const deleteNotification = useCallback(
    (id: string) => {
      console.log(id);
      dispatch(remove({ id }));
    },
    [dispatch],
  );

  return { notifications, deleteNotification, addNotification };
};
