import { Notifications } from '@/components/ui/notifications';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <>
      <Notifications />
      {children}
    </>
  );
};
