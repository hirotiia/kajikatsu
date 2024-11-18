'use client';

import { createContext } from 'react';

import {
  Notifications,
  NotificationsStore,
  // useNotifications,
} from '@/components/ui/notifications';

type AppProviderProps = {
  children: React.ReactNode;
};

export const NotificationsContext = createContext<
  NotificationsStore['addNotification'] | null
>(null);

export const AppProvider = ({ children }: AppProviderProps) => {
  // const { addNotification } = useNotifications();

  const addNotification: NotificationsStore['addNotification'] = (item) => {
    console.log(item);
  };

  return (
    <>
      <NotificationsContext.Provider value={addNotification}>
        <Notifications />
        {children}
      </NotificationsContext.Provider>
    </>
  );
};
