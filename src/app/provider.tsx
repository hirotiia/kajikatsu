'use client';

import { Provider } from 'react-redux';

import { Notifications } from '@/components/ui/notifications';
import { store } from '@/stores/index';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <>
      <Provider store={store}>
        <Notifications />
        {children}
      </Provider>
    </>
  );
};
