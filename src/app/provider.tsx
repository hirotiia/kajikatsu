'use client';

import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';

import { Notifications } from '@/components/ui/notifications';
import { AppDispatch, store } from '@/stores/index';
import { fetchAsyncUserData } from '@/stores/user/reducer';

type AppProviderProps = {
  children: React.ReactNode;
};

function AppProviderInner({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAsyncUserData());
  }, [dispatch]);

  return <>{children}</>;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <>
      <Provider store={store}>
        <Notifications />
        <AppProviderInner>{children}</AppProviderInner>
      </Provider>
    </>
  );
};
