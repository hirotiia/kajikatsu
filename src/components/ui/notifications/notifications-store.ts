import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '@/stores';
import {
  add,
  remove,
  Notification,
} from '@/stores/ducks/notifications/reducer';

export const useNotifications = () => {
  const notifications = useSelector((state: RootState) => state.notifications);
  const dispatch = useDispatch();
  const addNotification = (notification: Omit<Notification, 'id'>) => {
    dispatch(add(notification));
  };
  const deleteNotification = (id: string) => {
    dispatch(remove({ id }));
  };

  return { notifications, deleteNotification, addNotification };
};
