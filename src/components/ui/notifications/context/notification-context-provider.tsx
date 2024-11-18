import { createContext } from 'react';

import { NotificationsStore, useNotifications } from '../notifications-store';

export const NotificationsContext = createContext<
  NotificationsStore['addNotification'] | null
>(null);

export const NotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { addNotification } = useNotifications();
  return (
    <NotificationsContext.Provider value={addNotification}>
      {children}
    </NotificationsContext.Provider>
  );
};
