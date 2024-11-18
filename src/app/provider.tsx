'use client';

import { Notifications } from '@/components/ui/notifications';
import { NotificationContextProvider } from '@/components/ui/notifications/context/notification-context-provider';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <>
      <NotificationContextProvider>
        <Notifications />
        {children}
      </NotificationContextProvider>
    </>
  );
};
