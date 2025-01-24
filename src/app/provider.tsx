'use client';

import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';

import { Notifications } from '@/components/ui/notifications';
import { AppDispatch, store } from '@/stores/index';
import { fetchAsyncUserData } from '@/stores/user/reducer';

type AppProviderProps = {
  userId: string | null;
  children: React.ReactNode;
};

function AppProviderInner({
  userId,
  children,
}: {
  userId: string | null;
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (userId) {
      dispatch(fetchAsyncUserData(userId));
    }
  }, [dispatch, userId]);

  return <>{children}</>;
}

export const AppProvider = ({ userId, children }: AppProviderProps) => {
  return (
    <>
      <Provider store={store}>
        <Notifications />
        <AppProviderInner userId={userId}>{children}</AppProviderInner>
      </Provider>
    </>
  );
};
